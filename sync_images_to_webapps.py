import os
import shutil
import re

brain_dir = r'C:\Users\vp\.gemini\antigravity\brain\3d3df4af-2b30-4bd0-84f7-1fa2feaec63b'
wb_img_dir = r'c:\Users\vp\Documents\antigravity\wise-volta\warband_builder\images'
dr_img_dir = r'c:\Users\vp\Documents\antigravity\wise-volta\dice_roller\images'

os.makedirs(wb_img_dir, exist_ok=True)
os.makedirs(dr_img_dir, exist_ok=True)

copied = {}
for f in os.listdir(brain_dir):
    if f.endswith('.jpg'):
        key = re.sub(r'_\d+\.jpg$', '', f)
        src = os.path.join(brain_dir, f)
        
        # Copy with clean key name
        dest1 = os.path.join(wb_img_dir, f"{key}.jpg")
        dest2 = os.path.join(dr_img_dir, f"{key}.jpg")
        
        shutil.copy2(src, dest1)
        shutil.copy2(src, dest2)
        copied[key] = f"images/{key}.jpg"

print(f"Successfully copied {len(copied)} image assets to webapp images directories:")
for k, v in copied.items():
    print(f" - {k} -> {v}")
