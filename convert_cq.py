import sys
import os

print("Importing cadquery...")
try:
    import cadquery as cq
except ImportError as e:
    print(f"ImportError: {e}")
    sys.exit(1)

stp_file = "public/Assembly for rendering.stp"
stl_file = "public/buggy.stl"
glb_file = "public/buggy.glb"

print(f"Loading {stp_file}...")
try:
    # Use load/importStep to load the STEP file
    assembly = cq.importers.importStep(stp_file)
except Exception as e:
    print(f"Failed to load STEP file: {e}")
    sys.exit(1)

print(f"Exporting to {stl_file}...")
try:
    # cadquery can export directly to STL using assembly or compound
    if hasattr(assembly, 'export'):
        assembly.export(stl_file)
    else:
        # It might be a Workplane object
        cq.exporters.export(assembly, stl_file)
except Exception as e:
    print(f"Failed to export STL: {e}")
    sys.exit(1)

if not os.path.exists(stl_file):
    print("STL file was not created.")
    sys.exit(1)

print("STL created successfully. Converting to GLB using trimesh...")
import trimesh

try:
    mesh = trimesh.load(stl_file)
    mesh.export(glb_file)
    print("GLB export complete!")
except Exception as e:
    print(f"Failed to export GLB: {e}")
    sys.exit(1)
