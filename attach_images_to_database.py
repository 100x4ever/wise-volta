import os
import re

brain_dir = r'C:\Users\vp\.gemini\antigravity\brain\3d3df4af-2b30-4bd0-84f7-1fa2feaec63b'
warbands_dir = r'C:\Users\vp\Downloads\tc-1.0.2\warbands_and_subfactions'
battlekit_dir = r'C:\Users\vp\Downloads\tc-1.0.2\battlekit_armoury_wargear'

# Find all generated images
img_map = {}
for f in os.listdir(brain_dir):
    if f.endswith('.jpg'):
        full_path = os.path.join(brain_dir, f)
        # Extract prefix before timestamp e.g. lieutenant_new_antioch
        key = re.sub(r'_\d+\.jpg$', '', f)
        img_map[key] = full_path

print(f"Mapped {len(img_map)} image keys:")
for k, v in img_map.items():
    print(f" - {k}: {v}")

# Mapping of record IDs to image keys
record_to_img = {
    "UNIT_NA_LIEUTENANT": "lieutenant_new_antioch",
    "UNIT_NA_SNIPER_PRIEST": "sniper_priest",
    "UNIT_NA_STOSSTRUPPEN_VETERAN": "stosstruppen_veteran",
    "UNIT_TP_WAR_PROPHET": "war_prophet",
    "UNIT_TP_COMMUNICANT": "communicant_giant",
    "UNIT_IS_ALCHEMIST": "jabirean_alchemist",
    "UNIT_IS_LION_OF_JABIR": "lion_of_jabir",
    "UNIT_HL_DEATH_COMMANDO": "death_commando",
    "UNIT_HL_LORD_OF_TUMOURS": "lord_of_tumours",
    "UNIT_CS_SERPENT_SORCERER": "serpent_sorcerer",
    "UNIT_MC_MERCY_DOG": "mercy_dog",
    "WP_RNG_BOLT_ACTION_RIFLE": "bolt_action_rifle",
    "WP_RNG_SNIPER_RIFLE": "sniper_rifle",
    "WP_RNG_FLAMETHROWER": "flamethrower",
    "WP_MEL_TRENCH_SWORD": "trench_sword",
    "WP_MEL_GREATSWORD": "greatsword",
    "EX_GAS_GRENADE": "gas_grenade"
}

def update_folder(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = False
            for rec_id, img_key in record_to_img.items():
                if rec_id in content and img_key in img_map:
                    img_path = img_map[img_key]
                    tag = f"IMAGE_PATH: file:///{img_path.replace('\\', '/')}"
                    if tag not in content:
                        # Insert IMAGE_PATH right after UNIT_NAME or ITEM_NAME
                        content = re.sub(
                            rf'((?:UNIT_ID|ITEM_ID):\s*{rec_id}.*?\n(?:UNIT_NAME|ITEM_NAME):.*?\n)',
                            rf'\1{tag}\n',
                            content,
                            flags=re.DOTALL
                        )
                        modified = True
                        print(f"Attached image {img_key} to {rec_id} in {filename}")
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

update_folder(warbands_dir)
update_folder(battlekit_dir)

print("\nImage attachments updated across all warband and battlekit database files!")
