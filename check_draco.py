import json

def has_draco(filepath):
    with open(filepath, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF': return False
        version = int.from_bytes(f.read(4), byteorder='little')
        length = int.from_bytes(f.read(4), byteorder='little')
        
        chunk0_length = int.from_bytes(f.read(4), byteorder='little')
        chunk0_type = f.read(4)
        if chunk0_type != b'JSON': return False
        
        json_data = f.read(chunk0_length)
        parsed = json.loads(json_data.decode('utf-8'))
        
        extensions_used = parsed.get('extensionsUsed', [])
        extensions_required = parsed.get('extensionsRequired', [])
        
        print("Extensions Used:", extensions_used)
        print("Extensions Required:", extensions_required)
        return 'KHR_draco_mesh_compression' in extensions_used

print("Draco compressed?", has_draco('public/buggy.glb'))
