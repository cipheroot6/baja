import json

def get_glb_bounds(filepath):
    with open(filepath, 'rb') as f:
        f.read(12)
        chunk0_length = int.from_bytes(f.read(4), byteorder='little')
        f.read(4)
        json_data = f.read(chunk0_length)
        parsed = json.loads(json_data.decode('utf-8'))
        
        # just look at accessors
        for acc in parsed.get('accessors', []):
            if 'min' in acc and 'max' in acc:
                print("Accessor min:", acc['min'], "max:", acc['max'])

get_glb_bounds('public/buggy.glb')
