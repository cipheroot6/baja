import sys
import time
from OCP.TDocStd import TDocStd_Document
from OCP.XCAFApp import XCAFApp_Application
from OCP.STEPCAFControl import STEPCAFControl_Reader
from OCP.RWGltf import RWGltf_CafWriter
from OCP.BRepMesh import BRepMesh_IncrementalMesh
from OCP.XCAFDoc import XCAFDoc_DocumentTool
from OCP.TColStd import TColStd_IndexedDataMapOfStringString
from OCP.TDF import TDF_LabelSequence
from OCP.Message import Message_ProgressRange
from OCP.TCollection import TCollection_ExtendedString

stp_file = "public/Assembly for rendering.stp"
glb_file = "public/buggy.glb"

print("Initializing XCAF Application...")
app = XCAFApp_Application.GetApplication_s()
ext_str = TCollection_ExtendedString("MDTV-XCAF")
doc = TDocStd_Document(ext_str)
app.NewDocument(ext_str, doc)

print(f"Reading {stp_file}...")
start = time.time()
reader = STEPCAFControl_Reader()
reader.SetNameMode(True)
reader.SetColorMode(True)
reader.SetLayerMode(True)
status = reader.ReadFile(stp_file)
if status != 1:
    print("Error reading STEP file!")
    sys.exit(1)

reader.Transfer(doc)
print(f"Read in {time.time()-start:.2f}s")

print("Meshing document...")
start = time.time()
shape_tool = XCAFDoc_DocumentTool.ShapeTool_s(doc.Main())
free_shapes = TDF_LabelSequence()
shape_tool.GetFreeShapes(free_shapes)
for i in range(1, free_shapes.Length() + 1):
    shape = shape_tool.GetShape_s(free_shapes.Value(i))
    # linear deflection = 1.0mm, angular deflection = 0.5 rad (default is 0.1, 0.5 is lower poly)
    mesh = BRepMesh_IncrementalMesh(shape, 2.0, False, 0.5, True)
    mesh.Perform()
print(f"Meshed in {time.time()-start:.2f}s")

print("Exporting to GLB...")
start = time.time()
writer = RWGltf_CafWriter(glb_file, True)
file_info = TColStd_IndexedDataMapOfStringString()
progress = Message_ProgressRange()
res = writer.Perform(doc, file_info, progress)

if res:
    print(f"GLB export complete in {time.time()-start:.2f}s!")
else:
    print("GLB export failed!")
    sys.exit(1)
