import json

def inspect(filepath):
    with open(filepath, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF':
            print("Not a GLB")
            return
        version = int.from_bytes(f.read(4), byteorder='little')
        length = int.from_bytes(f.read(4), byteorder='little')
        
        chunk0_length = int.from_bytes(f.read(4), byteorder='little')
        chunk0_type = f.read(4)
        json_data = f.read(chunk0_length)
        parsed = json.loads(json_data.decode('utf-8'))
        
        print(f"Total Meshes: {len(parsed.get('meshes', []))}")
        
        accessors = parsed.get('accessors', [])
        nodes = parsed.get('nodes', [])
        meshes = parsed.get('meshes', [])
        
        sizes = []
        for mesh in meshes:
            for prim in mesh.get('primitives', []):
                pos_acc_idx = prim.get('attributes', {}).get('POSITION')
                if pos_acc_idx is not None:
                    acc = accessors[pos_acc_idx]
                    if 'min' in acc and 'max' in acc:
                        size = [
                            acc['max'][0] - acc['min'][0],
                            acc['max'][1] - acc['min'][1],
                            acc['max'][2] - acc['min'][2]
                        ]
                        sizes.append(size)
        
        # print max dimensions of all meshes
        max_dim = 0
        for i, s in enumerate(sizes):
            m = max(s)
            if m > max_dim:
                max_dim = m
            # print(f"Mesh {i} max dimension: {m}")
        print(f"Overall max single mesh dimension: {max_dim}")

inspect('public/buggy.glb')
