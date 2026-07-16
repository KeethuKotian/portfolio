import trimesh
import sys

try:
    scene = trimesh.load('public/models/sangetsu_draco.glb', force='scene')
    bounds = scene.bounds
    extents = scene.extents
    print(f"Extents (X, Y, Z): {extents}")
    print(f"Max extent: {max(extents)}")
    
    # Check the ratio of width to length
    sorted_extents = sorted(extents)
    ratio = sorted_extents[1] / sorted_extents[2]
    print(f"Ratio of width/depth to length: {ratio:.3f}")
    
    if ratio < 0.1:
        print("This is a KATANA (long and thin).")
    else:
        print("This is a CLEAVER (wide).")
except Exception as e:
    print(f"Error: {e}")
