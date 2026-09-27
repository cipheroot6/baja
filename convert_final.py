import sys
import cadquery as cq

stp_file = "public/Assembly for rendering.stp"
glb_file = "public/buggy.glb"

print("Loading STEP into Assembly...")
a = cq.Assembly()
a.importStep(stp_file)

print("Saving to GLB...")
# Tolerance values determine mesh density. 
# tolerance is linear deflection in mm (1.0 is very fast and low poly)
# angularTolerance is in radians (0.5 is low poly)
try:
    a.save(glb_file, exportType="GLTF", tolerance=2.0, angularTolerance=0.5)
    print("Done!")
except Exception as e:
    print(f"Error saving: {e}")
