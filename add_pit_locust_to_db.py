import os

filepath = r'C:\Users\vp\Downloads\tc-1.0.2\warbands_and_subfactions\05_COURT_OF_SEVEN_HEADED_SERPENT.txt'
img_path = r'file:///C:/Users/vp/.gemini/antigravity/brain/3d3df4af-2b30-4bd0-84f7-1fa2feaec63b/pit_locust_1785707573549.jpg'

pit_locust_entry = f"""

================================================================================
UNIT_ID: UNIT_CS_PIT_LOCUST
UNIT_NAME: Pit Locust
IMAGE_PATH: {img_path}
FACTION: Court of the Seven-Headed Serpent
SUBFACTIONS: [Standard Serpent Court, House of Avarice]
CATEGORY: Demonic Monster / Flying Trooper
MAX_PER_WARBAND: 0-3
COST: 90 Ducats (Crowns)
BASE_SIZE: 30mm by 60mm

PROFILE_STATS:
  Movement (M): 8"/Flying
  Ranged (R):   +0 DICE
  Melee (M):    +2 DICE
  Armour (A):   2 (Natural Chitin Plating -2)
  Wounds (W):   2
  Courage (C):  8+

LINKED_ACTIONS:
  - ACT_MOVE  [Move Action - Flying 8"]
  - ACT_CHARGE [Charge Action]
  - ACT_DASH   [Dash Action]
  - ACT_FIGHT  [Fight Action]

LINKED_ABILITIES:
  - ABL_POISON_STINGERS [Poison Stingers: Unarmed Melee Attacks gain CLEAVE 2 and SHRAPNEL keywords]
  - ABL_FEAR [Fear: Causes morale penalties to enemies]
  - ABL_FLYING [Flying: Ignores terrain during movement]

LINKED_KEYWORDS:
  - KW_DEMONIC
  - KW_FEAR
  - KW_FLYING
  - KW_ARMOUR_2
  - KW_THE_COURT

DEFAULT_EQUIPMENT:
  - Rending Limbs & Poison Stinger (Melee, CLEAVE 2, SHRAPNEL)

ALLOWED_EQUIPMENT_TABLES:
  - Crown of Hellfire ONLY (No other Battlekit allowed)

UNIT_DESCRIPTION:
  Terrifying, horse-sized, winged, and armoured demonic creatures with twisted human faces. They fight with rending blade limbs and venomous stingers.
================================================================================
"""

with open(filepath, 'a', encoding='utf-8') as f:
    f.write(pit_locust_entry)

print("Added Pit Locust record to 05_COURT_OF_SEVEN_HEADED_SERPENT.txt successfully!")
