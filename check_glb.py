import json

def get_glb_info(filepath):
    with open(filepath, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF':
            print("Not a GLB file")
            return
        version = int.from_bytes(f.read(4), byteorder='little')
        length = int.from_bytes(f.read(4), byteorder='little')
        
        chunk0_length = int.from_bytes(f.read(4), byteorder='little')
        chunk0_type = f.read(4)
        if chunk0_type != b'JSON':
            print("No JSON chunk")
            return
        
        json_data = f.read(chunk0_length)
        parsed = json.loads(json_data.decode('utf-8'))
        
        print("Meshes:", len(parsed.get('meshes', [])))
        print("Nodes:", len(parsed.get('nodes', [])))
        print("Materials:", len(parsed.get('materials', [])))

get_glb_info('public/buggy.glb')
