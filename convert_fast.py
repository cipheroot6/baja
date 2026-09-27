import sys
import cadquery as cq

stp_file = "public/Assembly for rendering.stp"
glb_file = "public/buggy.glb"

print(f"Loading {stp_file}...")
assembly = cq.importers.importStep(stp_file)

# Export directly to GLB using Assembly.save!
# tolerance in model units (millimeters). 1.0mm is fine for web.
# angularTolerance in radians. 0.2 is fine.
print("Exporting to GLB...")
assembly.save(glb_file, exportType="GLTF", tolerance=2.0, angularTolerance=0.2)

print("Finished!")
