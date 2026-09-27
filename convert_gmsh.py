import gmsh
import os
import subprocess

stp_file = "public/Assembly for rendering.stp"
obj_file = "public/buggy.obj"
glb_file = "public/buggy.glb"

print("Initializing gmsh...")
gmsh.initialize()
gmsh.option.setNumber("General.Terminal", 1)

print("Merging STP file...")
gmsh.merge(stp_file)

print("Generating 2D mesh...")
gmsh.model.mesh.generate(2)

print("Writing OBJ file...")
gmsh.write(obj_file)
gmsh.finalize()

print("Checking if OBJ was created...")
if os.path.exists(obj_file):
    print("OBJ created successfully. Converting to GLB with npx obj2gltf...")
    res = os.system(f"npx obj2gltf -i '{obj_file}' -o '{glb_file}'")
    if res == 0 and os.path.exists(glb_file):
        print("GLB created successfully!")
    else:
        print("obj2gltf failed.")
else:
    print("gmsh failed to write OBJ.")
