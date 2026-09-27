import json, sys
with open("public/buggy.glb", "rb") as f:
    magic = f.read(4)
    if magic != b'glTF': sys.exit(1)
    version = int.from_bytes(f.read(4), 'little')
    length = int.from_bytes(f.read(4), 'little')
    c_len = int.from_bytes(f.read(4), 'little')
    c_type = f.read(4)
    data = json.loads(f.read(c_len).decode('utf-8'))
    
    min_b = [float('inf'), float('inf'), float('inf')]
    max_b = [float('-inf'), float('-inf'), float('-inf')]
    for acc in data['accessors']:
        if 'min' in acc and 'max' in acc:
            for i in range(3):
                min_b[i] = min(min_b[i], acc['min'][i])
                max_b[i] = max(max_b[i], acc['max'][i])
    print("Min:", min_b)
    print("Max:", max_b)
