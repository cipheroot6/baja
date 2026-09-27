
import sys
import FreeCAD
import Import
import importOBJ
try:
    doc = FreeCAD.newDocument()
    Import.insert('/kaggle/input/datasets/cipheroot/baja-stp-files/assembly.stp', doc.Name)
    importOBJ.export(doc.Objects, '/kaggle/working/temp.obj')
    print("OBJ export successful")
except Exception as e:
    print("FreeCAD error:", e)
    sys.exit(1)
