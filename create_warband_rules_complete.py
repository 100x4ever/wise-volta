import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\warband_roster_and_campaign_rules'
os.makedirs(target_dir, exist_ok=True)

files_data = {}

# 01_WARBAND_CREATION_AND_ROSTER_RULES.txt
files_data["01_WARBAND_CREATION_AND_ROSTER_RULES.txt"] = """================================================================================
TRENCH CRUSADE - WARBAND CREATION & ROSTER CONSTRUCTION RULES
DOCUMENT CATEGORY: Warband Construction & Roster Rules
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & Warbands of Trench Crusade
TAG: [WARBAND_RULES: CONSTRUCTION_AND_LIMITS]
================================================================================

1. STARTING WARBAND BUDGET & CURRENCY
--------------------------------------------------------------------------------
* Ducats (Crowns / Ducats): Primary currency used to hire models and purchase Battlekit.
  - Standard Starting Budget: 700 Ducats (for standard one-off or campaign entry).
  - Skirmish Starting Budget: 500 Ducats.
  - Full Campaign Budget: 1,000 Ducats.
* Glory Points: Secondary prestige currency earned through campaign accomplishments and
  glorious deeds, used to purchase rare Glory Items and high-tier relics.


2. WARBAND COMPOSITION & MODEL LIMITS
--------------------------------------------------------------------------------
* Maximum Field Strength: A starting Warband can contain up to a MAXIMUM OF 12 MODELS
  (unless specified by a variant rule).
* Mandatory Leader Requirement:
  - Every Warband MUST include EXACTLY ONE model with the LEADER keyword (e.g. Lieutenant,
    War Prophet, Serpent Sorcerer, Alchemist, Heretic Priest, Lord of Tumours).
  - If a Warband Leader is killed in a campaign, a new Leader must be promoted or appointed
    before the next battle.
* Model Availability Limits:
  - Models have strict per-warband caps (e.g. 0-1 Death Commando, 0-2 Sniper Priests, 0-4 Troopers).
* Trench Dogs & Auxiliaries: Trench Dogs count towards Maximum Field Strength model limits,
  but do NOT count as models for Morale Check calculations.


3. SUBFACTION / VARIANT ROSTER RESTRICTIONS
--------------------------------------------------------------------------------
* Variant Warbands (e.g., Prussian Stosstruppen, Red Brigade, Black Grail Great Hunger)
  modify the base Faction Armoury access, unit caps, and starting special rules:
  - Example (Prussian Stosstruppen): Replaces standard New Antioch infantry with Stosstruppen
    Veterans, gains mandatory Gas Grenades, and restricts non-shock units.
  - Example (Abyssinian Expeditionary Force): Replaces standard Sultanate troops with
    Holy Warriors and Takuba Swordsmen.

================================================================================
"""

# 02_GLORY_ITEMS_AND_FACTION_RELICS.txt
files_data["02_GLORY_ITEMS_AND_FACTION_RELICS.txt"] = """================================================================================
TRENCH CRUSADE - GLORY ITEMS & RELICS REGISTRY
DOCUMENT CATEGORY: Rare Equipment & Campaign Relics
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & Official Commentaries
TAG: [WARGEAR: GLORY_ITEMS_AND_RELICS]
================================================================================

1. GLORY ITEM SYSTEM
--------------------------------------------------------------------------------
Glory Items are exceptionally rare, holy, or demonic relics of immense power. They are
purchased using Glory Points earned during campaigns (or in one-off games with opponent consent).

================================================================================
ITEM_ID: GL_MARTYRS_SHROUD
ITEM_NAME: Martyr's Shroud
CATEGORY: GLORY_ITEM
COST: 3 Glory Points
KEYWORDS: [KW_GLORY_ITEM, KW_DEFENSE]
DESCRIPTION: Woven from sacred burial cloths. Grants bearer +1 Armour rating and immunity to critical hits.
================================================================================

================================================================================
ITEM_ID: GL_TORMENTOR_CHAINS
ITEM_NAME: Tormentor Chains
CATEGORY: GLORY_ITEM
COST: 4 Glory Points
KEYWORDS: [KW_GLORY_ITEM, KW_RANGED, KW_HOOK_REACH]
DESCRIPTION: Hell-forged barbed chains (Range 12"). If target is hit, pull target 6" towards bearer into base contact!
================================================================================

================================================================================
ITEM_ID: GL_CROWN_OF_THORNS
ITEM_NAME: Relic Crown of Thorns
CATEGORY: GLORY_ITEM
COST: 5 Glory Points
KEYWORDS: [KW_GLORY_ITEM, KW_FAITH, KW_BLESSING_GENERATOR]
DESCRIPTION: Sacred relic. Bearer generates +1 extra Blessing Marker at the start of every Turn.
================================================================================

================================================================================
ITEM_ID: GL_DEMONIC_GRIMOIRE
ITEM_NAME: Demonic Grimoire of Avarice
CATEGORY: GLORY_ITEM
COST: 4 Glory Points
KEYWORDS: [KW_GLORY_ITEM, KW_GOETIC_MAGIC]
DESCRIPTION: Bound in unholy hide. Allows bearer to cast 1 additional Goetic spell per turn.
================================================================================
"""

# 03_CAMPAIGN_ADVANCEMENT_AND_CASUALTIES.txt
files_data["03_CAMPAIGN_ADVANCEMENT_AND_CASUALTIES.txt"] = """================================================================================
TRENCH CRUSADE - CAMPAIGN ADVANCEMENT & CASUALTY SYSTEM
DOCUMENT CATEGORY: Campaign Mechanics & Post-Game Sequence
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Campaign Rules)
TAG: [CAMPAIGN: POST_GAME_AND_CASUALTIES]
================================================================================

1. POST-GAME SEQUENCE STEPS
--------------------------------------------------------------------------------
After every campaign battle, players resolve the post-game sequence in order:

  Step 1: CASUALTY ROLLS - Roll on Serious Injury Table for every model taken Out of Action.
  Step 2: PROMOTION & EXPERIENCE ROLLS - Check for unit XP gains and roll for Promotions.
  Step 3: EXPLORATION & LOOTING - Roll on Faction Exploration Tables to gain Ducats/Glory/Items.
  Step 4: RECRUITMENT & RE-EQUIPMENT - Spend earned Ducats and Glory Points to hire new models
          or purchase Battlekit.


2. SERIOUS INJURY TABLE (FOR OUT OF ACTION MODELS)
--------------------------------------------------------------------------------
Roll 2D6 for every model that was taken Out of Action during the game:

   Roll      Result                 Campaign Effect
   -----------------------------------------------------------------------------
   2         DEAD                   Model is permanently dead. Remove from roster!
   3 - 4     SERIOUS INJURY         Model misses the next battle while recovering.
   5 - 6     PERMANENT WOUND        Model suffers permanent -1 to Movement or Ranged profile.
   7 - 10    FULL RECOVERY          Model recovers completely with no long-term effects.
   11 - 12   GLORIOUS SCAR          Model gains +1 Courage / Morale from battlefield bravery!

================================================================================
"""

for fname, content in files_data.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll warband roster and campaign rules files created successfully in:\n{target_dir}")
