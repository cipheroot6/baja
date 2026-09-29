import pygltflib
import sys

def get_glb_bounds(filepath):
    gltf = pygltflib.GLTF2().load(filepath)
    min_bounds = [float('inf'), float('inf'), float('inf')]
    max_bounds = [float('-inf'), float('-inf'), float('-inf')]
    for mesh in gltf.meshes:
        for primitive in mesh.primitives:
            accessor = gltf.accessors[primitive.attributes.POSITION]
            for i in range(3):
                if accessor.min[i] < min_bounds[i]: min_bounds[i] = accessor.min[i]
                if accessor.max[i] > max_bounds[i]: max_bounds[i] = accessor.max[i]
    print(f"Min: {min_bounds}")
    print(f"Max: {max_bounds}")
    print(f"Size: {[max_bounds[i] - min_bounds[i] for i in range(3)]}")

get_glb_bounds(sys.argv[1])
