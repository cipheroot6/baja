import os
import subprocess
import shutil

input_dir = "/kaggle/input/"
output_dir = "/kaggle/working/"

stp_file = None
for root, dirs, files in os.walk(input_dir):
    for f in files:
        if f.lower().endswith(".stp") or f.lower().endswith(".step"):
            stp_file = os.path.join(root, f)
            break

if not stp_file:
    print("No STP file found.")
    exit(1)

print(f"Found STP file: {stp_file}")
obj_file = os.path.join(output_dir, "temp.obj")
glb_file = os.path.join(output_dir, "buggy.glb")

print("Installing FreeCAD and Node.js...")
os.system("apt-get update && apt-get install -y freecad nodejs npm")

script = f"""
import sys
import FreeCAD
import Import
import importOBJ
try:
    doc = FreeCAD.newDocument()
    Import.insert('{stp_file}', doc.Name)
    importOBJ.export(doc.Objects, '{obj_file}')
    print("OBJ export successful")
except Exception as e:
    print("FreeCAD error:", e)
    sys.exit(1)
"""
with open("fc_script.py", "w") as f:
    f.write(script)

print("Running FreeCAD conversion to OBJ...")
res = os.system("freecadcmd fc_script.py")

if res == 0 and os.path.exists(obj_file):
    print("Success with FreeCAD! Now converting OBJ to GLB...")
    os.system("npm install -g obj2gltf")
    res2 = os.system(f"obj2gltf -i '{obj_file}' -o '{glb_file}'")
    if res2 == 0 and os.path.exists(glb_file):
        print("Final GLB conversion successful!")
        exit(0)
    else:
        print("obj2gltf failed.")
        exit(1)
else:
    print("FreeCAD conversion failed.")
    exit(1)
