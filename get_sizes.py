import json

def print_sizes(filepath):
    with open(filepath, 'rb') as f:
        f.read(12)
        chunk0_length = int.from_bytes(f.read(4), byteorder='little')
        f.read(4)
        parsed = json.loads(f.read(chunk0_length).decode('utf-8'))
        accessors = parsed.get('accessors', [])
        
        m_count = 0
        over_10 = 0
        for mesh in parsed.get('meshes', []):
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
                        m = max(size)
                        if m > 10:
                            over_10 += 1
                        m_count += 1
        print(f"Total primitives: {m_count}")
        print(f"Primitives > 10 units: {over_10}")

print_sizes('public/buggy.glb')
