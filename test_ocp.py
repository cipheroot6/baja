from OCP.TDocStd import TDocStd_Document
from OCP.XCAFApp import XCAFApp_Application
from OCP.RWGltf import RWGltf_CafWriter
from OCP.TColStd import TColStd_IndexedDataMapOfStringString
from OCP.Message import Message_ProgressRange
from OCP.TCollection import TCollection_ExtendedString

app = XCAFApp_Application.GetApplication_s()
ext_str = TCollection_ExtendedString("MDTV-XCAF")
doc = TDocStd_Document(ext_str)
app.NewDocument(ext_str, doc)

writer = RWGltf_CafWriter("test.glb", True)
file_info = TColStd_IndexedDataMapOfStringString()
progress = Message_ProgressRange()

try:
    res = writer.Perform(doc, file_info, progress)
    print("Export successful:", res)
except Exception as e:
    print("Error:", e)
