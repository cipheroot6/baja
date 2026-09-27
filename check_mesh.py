import trimesh

try:
    mesh = trimesh.load('public/buggy.glb', force='scene')
    print("Is empty?", mesh.is_empty)
    print("Geometry count:", len(mesh.geometry))
    print("Extents:", mesh.extents)
except Exception as e:
    print("Error:", e)
