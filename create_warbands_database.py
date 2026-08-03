import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\warbands_and_subfactions'
os.makedirs(target_dir, exist_ok=True)

files_data = {}

# ==============================================================================
# 01_NEW_ANTIOCH_AND_VARIANTS.txt
# ==============================================================================
files_data["01_NEW_ANTIOCH_AND_VARIANTS.txt"] = """================================================================================
FACTION REGISTRY: PRINCIPALITY OF NEW ANTIOCH & SUBFACTION VARIANTS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Warband rules, variant lists, and unit profiles for New Antioch
================================================================================

================================================================================
FACTION_NAME: Principality of New Antioch
SUBFACTIONS / VARIANTS:
  1. Standard Principality Warband (Combined Arms & Trench Line)
  2. Free State of Prussia Stosstruppen (Infiltration & Shock Tactics)
  3. Mechanized Detachments & Sniper Priests (Long-range & Armor)
  4. The Red Brigade (Naval Assault & Close Quarters)

FACTION SPECIAL RULES:
  - Combined Arms: Can take a balanced mix of ranged, melee, and support specialists.
  - Tactical Acumen: May reroll one failed Initiative tie-breaker per battle.
================================================================================

================================================================================
UNIT_ID: UNIT_NA_LIEUTENANT
UNIT_NAME: Lieutenant of New Antioch
FACTION: Principality of New Antioch
SUBFACTIONS: [Standard New Antioch, Prussian Stosstruppen, Red Brigade]
CATEGORY: Elite / Leader
MAX_PER_WARBAND: 1 (Mandatory Leader)
COST: 70 Ducats
BASE_SIZE: 32mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +2 DICE
  Melee (M): +2 DICE
  Armour (A): 0 (Base) / 1 (with Body Armour)
  Wounds (W): 2
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_RETREAT [Retreat Action]
  - ACT_DASH [Dash Action]
  - ACT_SHOOT [Shoot Action]
  - ACT_FIGHT [Fight Action]
  - ACT_COMMAND [Carry Out Command Action]

LINKED_ABILITIES:
  - ABL_LEADER [Leader: Required frontline officer]
  - ABL_TOUGH [Tough: High resilience in combat]
  - ABL_INSPIRING [Inspiring Command: Morale check rerolls]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_LEADER
  - KW_ARMOUR_1

DEFAULT_EQUIPMENT:
  - Trench Sword (Melee, Reach)
  - Automatic Pistol (Ranged 12", AUTOMATIC 2)
  - Body Armour (Armour 1)

ALLOWED_EQUIPMENT_TABLES:
  - New Antioch Armoury Tables
  - Officer Wargear & Glory Items

UNIT_DESCRIPTION:
  Frontline commander of New Antioch forces. Maintains unit morale, directs fire, and leads tactical charges.
================================================================================

================================================================================
UNIT_ID: UNIT_NA_SNIPER_PRIEST
UNIT_NAME: Sniper Priest
FACTION: Principality of New Antioch
SUBFACTIONS: [Standard New Antioch, Mechanized Detachments]
CATEGORY: Specialist / Elite
MAX_PER_WARBAND: 0-2
COST: 50 Ducats
BASE_SIZE: 25mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +2 DICE
  Melee (M): -1 DICE
  Armour (A): 0
  Wounds (W): 1
  Courage (C): 7+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_DASH [Dash Action]
  - ACT_SHOOT [Shoot Action]
  - ACT_AIM [Aim Action - Risky +2 DICE]

LINKED_ABILITIES:
  - ABL_ABSOLUTE_FAITH [Absolute Faith: Opponent CANNOT spend Blood Markers on Sniper Priest ranged attacks!]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_SNIPER

DEFAULT_EQUIPMENT:
  - Bolt-Action Sniper Rifle (Ranged 36", IGNORE LONG RANGE)

ALLOWED_EQUIPMENT_TABLES:
  - New Antioch Armoury Tables

UNIT_DESCRIPTION:
  Blind holy marksmen who rely solely on divine faith to guide their shots across immense distances.
================================================================================

================================================================================
UNIT_ID: UNIT_NA_STOSSTRUPPEN_VETERAN
UNIT_NAME: Prussian Stosstruppen Veteran
FACTION: Principality of New Antioch
SUBFACTIONS: [Free State of Prussia Stosstruppen]
CATEGORY: Elite / Shock Troop
MAX_PER_WARBAND: 0-4
COST: 60 Ducats
BASE_SIZE: 28mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +1 DICE
  Melee (M): +2 DICE
  Armour (A): 1 (Reinforced Trench Armour)
  Wounds (W): 1
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_DASH [Dash Action]
  - ACT_FIGHT [Fight Action]
  - ACT_SHOOT [Shoot Action]

LINKED_ABILITIES:
  - ABL_INFILTRATE [Infiltrate: Advanced deployment]
  - ABL_SHOCK_CHARGE [Shock Charge: +1 INJURY DICE on charge]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_ASSAULT

DEFAULT_EQUIPMENT:
  - Trench Shotgun / Submachine Gun
  - Trench Axe (Cleave 1)
  - Gas Grenades (BLAST 2, GAS)

ALLOWED_EQUIPMENT_TABLES:
  - Prussian Stosstruppen Armoury Table

UNIT_DESCRIPTION:
  Elites of the Free State of Prussia specializing in trench raiding, gas attacks, and close-quarters combat.
================================================================================
"""

# ==============================================================================
# 02_TRENCH_PILGRIMS_AND_VARIANTS.txt
# ==============================================================================
files_data["02_TRENCH_PILGRIMS_AND_VARIANTS.txt"] = """================================================================================
FACTION REGISTRY: PROCESSIONS OF THE TRENCH PILGRIMS & VARIANTS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Warband rules, variant lists, and unit profiles for Trench Pilgrims
================================================================================

================================================================================
FACTION_NAME: Processions of the Trench Pilgrims
SUBFACTIONS / VARIANTS:
  1. Procession of the Sacred Affliction (Standard Zealots)
  2. Shrine of the Holy Stigmata (Flagellant & Penitent Host)
  3. Iron Brotherhood (Armoured Fanatics)

FACTION SPECIAL RULES:
  - Religious Fervour: Gain +1 Blessing Marker at the start of each Initiative Phase.
  - Martyrdom: When a friendly Pilgrim model is taken Out of Action, nearby allies gain +1 DICE on Morale.
================================================================================

================================================================================
UNIT_ID: UNIT_TP_WAR_PROPHET
UNIT_NAME: War Prophet
FACTION: Processions of the Trench Pilgrims
SUBFACTIONS: [Procession of Sacred Affliction, Shrine of Holy Stigmata, Iron Brotherhood]
CATEGORY: Elite / Leader
MAX_PER_WARBAND: 1 (Mandatory Leader)
COST: 80 Ducats
BASE_SIZE: 32mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +1 DICE
  Melee (M): +2 DICE
  Armour (A): 1
  Wounds (W): 2
  Courage (C): 9+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_DASH [Dash Action]
  - ACT_FIGHT [Fight Action]
  - ACT_CAST_SPELL [Perform Miracle / Prayer Action]

LINKED_ABILITIES:
  - ABL_LEADER [Leader: Warband commander]
  - ABL_BLESSED_PSALM [Blessed Psalm: Generate extra Blessing Markers]
  - ABL_FEARLESS [Fearless: Immune to Shaken penalties]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_LEADER
  - KW_FAITH

DEFAULT_EQUIPMENT:
  - Holy Relic Mace (Melee, CLEAVE 1)
  - Heavy Crossbow / Flame Pistol
  - Pilgrim Armour (Armour 1)

ALLOWED_EQUIPMENT_TABLES:
  - Trench Pilgrim Armoury Tables
  - Holy Relics & Glory Items

UNIT_DESCRIPTION:
  Fanatical preacher driving the crusade forward with fiery sermons, miracles, and relentless zeal.
================================================================================

================================================================================
UNIT_ID: UNIT_TP_COMMUNICANT
UNIT_NAME: Communicant
FACTION: Processions of the Trench Pilgrims
SUBFACTIONS: [Procession of Sacred Affliction, Iron Brotherhood]
CATEGORY: Heavy Elite / Mutant Construct
MAX_PER_WARBAND: 0-1
COST: 100 Ducats
BASE_SIZE: 40mm

PROFILE_STATS:
  Movement (M): 6"/Large Infantry
  Ranged (R): +1 DICE
  Melee (M): +3 DICE
  Armour (A): 2
  Wounds (W): 3
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_FIGHT [Fight Action]

LINKED_ABILITIES:
  - ABL_TOUGH [Tough: Ignores first Down result]
  - ABL_SACRED_MUTATION [Sacred Mutation: Extra melee attacks]

LINKED_KEYWORDS:
  - KW_LARGE_INFANTRY
  - KW_ELITE
  - KW_STRONG
  - KW_ARMOUR_2

DEFAULT_EQUIPMENT:
  - Great Eviscerator / Heavy Flail (CLEAVE 2, DEADLY)
  - Plate Armour (Armour 2)

ALLOWED_EQUIPMENT_TABLES:
  - Trench Pilgrim Heavy Armoury

UNIT_DESCRIPTION:
  Genetically and spiritually altered holy giant wielding massive weapons capable of cleaving armored troops in half.
================================================================================
"""

# ==============================================================================
# 03_IRON_SULTANATE_AND_VARIANTS.txt
# ==============================================================================
files_data["03_IRON_SULTANATE_AND_VARIANTS.txt"] = """================================================================================
FACTION REGISTRY: THE IRON SULTANATE & SUBFACTION VARIANTS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Warband rules, variant lists, and unit profiles for The Iron Sultanate
================================================================================

================================================================================
FACTION_NAME: The Iron Sultanate of Jabir
SUBFACTIONS / VARIANTS:
  1. Standard Jabirean Forces (Alchemy & Engineering)
  2. Abyssinian Expeditionary Force (Holy Warriors of Abyssinia)
  3. Wall-Guard Sapper Detachments (Fortifications & Heavy Siege)

FACTION SPECIAL RULES:
  - Alchemy of Jabir: Access to alchemical gas, liquid fire, and homunculus beasts.
  - Iron Wall Discipline: +1 Armour rating when in cover or behind fortifications.
================================================================================

================================================================================
UNIT_ID: UNIT_IS_ALCHEMIST
UNIT_NAME: Jabirean Alchemist
FACTION: The Iron Sultanate
SUBFACTIONS: [Standard Jabirean, Wall-Guard Sapper]
CATEGORY: Elite / Leader
MAX_PER_WARBAND: 1 (Mandatory Leader)
COST: 75 Ducats
BASE_SIZE: 32mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +2 DICE
  Melee (M): +1 DICE
  Armour (A): 1
  Wounds (W): 2
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_SHOOT [Shoot Action]
  - ACT_FIGHT [Fight Action]
  - ACT_CAST_SPELL [Alchemical Concoction Action]

LINKED_ABILITIES:
  - ABL_LEADER [Leader: Sultanate officer]
  - ABL_ALCHEMICAL_MASTERY [Alchemical Mastery: Enhances gas/fire weapons]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_LEADER
  - KW_ALCHEMY

DEFAULT_EQUIPMENT:
  - Alchemical Gas Grenades (BLAST 2, GAS)
  - Scimitar / Jezail Rifle
  - Reinforced Robes (Armour 1)

ALLOWED_EQUIPMENT_TABLES:
  - Sultanate Armoury Tables
  - Alchemical Inventions

UNIT_DESCRIPTION:
  Master of secrets from the House of Wisdom, combining chemistry and warfare to devastate enemies.
================================================================================

================================================================================
UNIT_ID: UNIT_IS_LION_OF_JABIR
UNIT_NAME: Lion of Jabir
FACTION: The Iron Sultanate
SUBFACTIONS: [Standard Jabirean]
CATEGORY: Artificial Beast / Monster
MAX_PER_WARBAND: 0-1
COST: 110 Ducats
BASE_SIZE: 50mm

PROFILE_STATS:
  Movement (M): 8"/Beast
  Ranged (R): -1 DICE
  Melee (M): +3 DICE
  Armour (A): 2
  Wounds (W): 3
  Courage (C): 10+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_FIGHT [Fight Action]

LINKED_ABILITIES:
  - ABL_ARTIFICIAL_LIFE [Artificial Life: -1 INJURY DICE on all Injury Rolls made FOR this model!]
  - ABL_BEAST_POUNCE [Beast Pounce: Extended charge range]

LINKED_KEYWORDS:
  - KW_MONSTER
  - KW_ARTIFICIAL
  - KW_STRONG
  - KW_ARMOUR_2

DEFAULT_EQUIPMENT:
  - Steel Claws & Alchemical Fangs (CLEAVE 2)

ALLOWED_EQUIPMENT_TABLES:
  - None (Construct Profile)

UNIT_DESCRIPTION:
  Alchemical automaton beast crafted from brass and alchemy. Extremely resilient against all trauma.
================================================================================
"""

# ==============================================================================
# 04_HERETIC_LEGIONS_AND_BLACK_GRAIL.txt
# ==============================================================================
files_data["04_HERETIC_LEGIONS_AND_BLACK_GRAIL.txt"] = """================================================================================
FACTION REGISTRY: HERETIC LEGIONS & CULT OF THE BLACK GRAIL
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Warband rules, variant lists, and unit profiles for Heretic forces
================================================================================

================================================================================
FACTION_NAME: Heretic Legions & Cult of the Black Grail
SUBFACTIONS / VARIANTS:
  1. Standard Heretic Legion (Hellish Shock Troops)
  2. Death Commando Infiltrators (Stealth & Assassination)
  3. Cult of the Black Grail (Plague & Contamination)
  4. The Great Hunger (Black Grail Parasite Strain)

FACTION SPECIAL RULES:
  - Bloodthirst: Gains extra Blood Markers when causing casualties.
  - Hellfire & Contamination: Immunity to poison/gas hazards; causes decay.
================================================================================

================================================================================
UNIT_ID: UNIT_HL_DEATH_COMMANDO
UNIT_NAME: Death Commando
FACTION: Heretic Legions
SUBFACTIONS: [Death Commando Infiltrators, Standard Heretic Legion]
CATEGORY: Elite / Assassin
MAX_PER_WARBAND: 0-1
COST: 90 Ducats
BASE_SIZE: 32mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +1 DICE
  Melee (M): +2 DICE
  Armour (A): 0
  Wounds (W): 2
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_DASH [Dash Action]
  - ACT_SHOOT [Shoot Action]
  - ACT_FIGHT [Fight Action]
  - ACT_HIDE [Hide Action - Risky +1 DICE]

LINKED_ABILITIES:
  - ABL_STEALTH_GENERATOR [Stealth Generator: -1 DICE to enemy ranged attacks targeting this model; cannot be shot > 12"]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_STEALTH
  - KW_INFILTRATOR

DEFAULT_EQUIPMENT:
  - Tartarus Claws / Silenced Pistols
  - Gas Grenades (BLAST 2, GAS)

ALLOWED_EQUIPMENT_TABLES:
  - Heretic Legions Armoury Tables (Silenced Pistols, Gas, Tormentor Chains only for ranged)

UNIT_DESCRIPTION:
  Terrifying stealth assassin equipped with infernal cloaking devices that mask it from enemy sight.
================================================================================

================================================================================
UNIT_ID: UNIT_HL_LORD_OF_TUMOURS
UNIT_NAME: Lord of Tumours
FACTION: Cult of the Black Grail
SUBFACTIONS: [Cult of Black Grail, The Great Hunger]
CATEGORY: Elite / Leader
MAX_PER_WARBAND: 0-1 (Leader)
COST: 130 Ducats
BASE_SIZE: 40mm

PROFILE_STATS:
  Movement (M): 5"/Large Infantry
  Ranged (R): 0
  Melee (M): +3 DICE
  Armour (A): 2
  Wounds (W): 3
  Courage (C): 9+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_CHARGE [Charge Action]
  - ACT_FIGHT [Fight Action]
  - ACT_DEVOUR [Devour Down Model Action]

LINKED_ABILITIES:
  - ABL_CRUSHING_BLOWS [Crushing Blows: Unarmed strikes count as Cleave 1 Melee Weapon]
  - ABL_CONTAGION_AURA [Contagion Aura: Spreads infection markers to adjacent enemies]
  - ABL_TOUGH [Tough: Ignores first Down result]

LINKED_KEYWORDS:
  - KW_LARGE_INFANTRY
  - KW_ELITE
  - KW_LEADER
  - KW_BLACK_GRAIL
  - KW_ARMOUR_2

DEFAULT_EQUIPMENT:
  - Great Plague Cleaver / Shield
  - Rotting Carapace (Armour 2)

ALLOWED_EQUIPMENT_TABLES:
  - Black Grail Armoury Tables

UNIT_DESCRIPTION:
  Monstrous champion of decay covered in festering growths, capable of crushing armor with bare hands.
================================================================================
"""

# ==============================================================================
# 05_COURT_OF_SEVEN_HEADED_SERPENT.txt
# ==============================================================================
files_data["05_COURT_OF_SEVEN_HEADED_SERPENT.txt"] = """================================================================================
FACTION REGISTRY: COURT OF THE SEVEN-HEADED SERPENT
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Warband rules, variant lists, and unit profiles for Serpent Court
================================================================================

================================================================================
FACTION_NAME: Court of the Seven-Headed Serpent
SUBFACTIONS / VARIANTS:
  1. Standard Serpent Court (Infernal Nobility & Slavemasters)
  2. Knights of Avarice (Heavy Armour & Greed Warlocks)

FACTION SPECIAL RULES:
  - Slave Master: Can command Yoke Fiends to sacrifice themselves or form living shields.
  - Goetic Magic: Access to powerful Greed and Pride spells.
================================================================================

================================================================================
UNIT_ID: UNIT_CS_SERPENT_SORCERER
UNIT_NAME: Serpent Sorcerer
FACTION: Court of the Seven-Headed Serpent
SUBFACTIONS: [Standard Serpent Court]
CATEGORY: Elite / Leader / Spellcaster
MAX_PER_WARBAND: 1 (Mandatory Leader)
COST: 85 Ducats
BASE_SIZE: 32mm

PROFILE_STATS:
  Movement (M): 6"/Infantry
  Ranged (R): +1 DICE
  Melee (M): +1 DICE
  Armour (A): 1
  Wounds (W): 2
  Courage (C): 8+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_SHOOT [Shoot Action]
  - ACT_FIGHT [Fight Action]
  - ACT_CAST_SPELL [Cast Goetic Spell Action]

LINKED_ABILITIES:
  - ABL_LEADER [Leader: Court officer]
  - ABL_SLAVEMASTER [Slavemaster: Issues commands to Yoke Fiends within 18"]

LINKED_KEYWORDS:
  - KW_INFANTRY
  - KW_ELITE
  - KW_LEADER
  - KW_GOETIC_MAGIC

DEFAULT_EQUIPMENT:
  - Ritual Dagger (PARRY)
  - Burning Inferno Spell (Ranged 18", ON FIRE)

ALLOWED_EQUIPMENT_TABLES:
  - Serpent Court Armoury & Spell Tables

UNIT_DESCRIPTION:
  Warlock noble wielding dark magic and driving enslaved Yoke Fiends to slaughter.
================================================================================
"""

# ==============================================================================
# 06_MERCENARIES_AND_MONSTERS.txt
# ==============================================================================
files_data["06_MERCENARIES_AND_MONSTERS.txt"] = """================================================================================
FACTION REGISTRY: MERCENARIES, HIRED GUNS & CONSTRUCTS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Neutral units, hired mercenaries, and auxiliary beasts
================================================================================

================================================================================
UNIT_ID: UNIT_MC_MERCY_DOG
UNIT_NAME: Mercy Dog
FACTION: Neutral / Any Warband
SUBFACTIONS: [All Factions]
CATEGORY: Support Beast
MAX_PER_WARBAND: 0-2
COST: 20 Ducats
BASE_SIZE: 25mm

PROFILE_STATS:
  Movement (M): 7"/Beast
  Ranged (R): 0
  Melee (M): 0
  Armour (A): 0
  Wounds (W): 1
  Courage (C): 6+

LINKED_ACTIONS:
  - ACT_MOVE [Move Action]
  - ACT_DASH [Dash Action]
  - ACT_DRAG_MODEL [Drag Down Model Action]

LINKED_ABILITIES:
  - ABL_RESCUE_BEAST [Rescue Beast: Can drag a Down model up to 6" without penalty]

LINKED_KEYWORDS:
  - KW_BEAST
  - KW_SUPPORT

DEFAULT_EQUIPMENT:
  - First Aid Harness & Drag Straps

ALLOWED_EQUIPMENT_TABLES:
  - None

UNIT_DESCRIPTION:
  Trained war hound equipped with medical supplies and harness to drag wounded troopers to safety.
================================================================================
"""

for fname, content in files_data.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll Warbands and Subfactions database files created successfully in:\n{target_dir}")
