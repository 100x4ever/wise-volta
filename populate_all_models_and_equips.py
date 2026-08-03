import os
import re

brain_dir = r'C:\Users\vp\.gemini\antigravity\brain\3d3df4af-2b30-4bd0-84f7-1fa2feaec63b'
warbands_dir = r'C:\Users\vp\Downloads\tc-1.0.2\warbands_and_subfactions'
battlekit_dir = r'C:\Users\vp\Downloads\tc-1.0.2\battlekit_armoury_wargear'

# Build image lookup map from brain folder
img_map = {}
for f in os.listdir(brain_dir):
    if f.endswith('.jpg'):
        full_path = os.path.join(brain_dir, f)
        key = re.sub(r'_\d+\.jpg$', '', f)
        img_map[key] = f"file:///{full_path.replace('\\', '/')}"

print(f"Found {len(img_map)} generated image assets.")

# Master list of additional models to append/update
additional_models = {
    "01_NEW_ANTIOCH_AND_VARIANTS.txt": [
        {
            "id": "UNIT_NA_TRENCH_TROOPER",
            "name": "New Antioch Trench Trooper",
            "img": img_map.get("trench_trooper", ""),
            "faction": "Principality of New Antioch",
            "subfactions": "[Standard New Antioch, Prussian Stosstruppen, Red Brigade]",
            "cat": "Trooper / Line Infantry",
            "max": "0-12",
            "cost": "35 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+0 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_STEADFAST [Steadfast: +1 Courage when near Leader]"],
            "keywords": ["KW_INFANTRY", "KW_TROOPER"],
            "equip": ["Bolt-Action Rifle (Ranged 24 in)", "Trench Knife (Melee)"],
            "tables": ["New Antioch Armoury Tables"],
            "desc": "Standard frontline foot soldier of New Antioch, trained for bitter trench warfare."
        },
        {
            "id": "UNIT_NA_TRENCH_DOCTOR",
            "name": "Trench Doctor (Combat Medic)",
            "img": img_map.get("trench_doctor", ""),
            "faction": "Principality of New Antioch",
            "subfactions": "[Standard New Antioch, Red Brigade]",
            "cat": "Specialist / Medical",
            "max": "0-2",
            "cost": "45 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+0 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT", "ACT_TREAT_WOUNDS"],
            "abilities": ["ABL_MEDICAL_TREATMENT [Field Surgeon: Removes 1D3 Blood Markers or stands up Down model]"],
            "keywords": ["KW_INFANTRY", "KW_SPECIALIST", "KW_MEDICAL"],
            "equip": ["Field Surgeon Kit", "Service Pistol"],
            "tables": ["New Antioch Armoury Tables"],
            "desc": "Frontline surgeon equipped to patch up wounded troops under heavy fire."
        },
        {
            "id": "UNIT_NA_TRENCH_CHAPLAIN",
            "name": "Trench Chaplain",
            "img": img_map.get("trench_chaplain", ""),
            "faction": "Principality of New Antioch",
            "subfactions": "[Standard New Antioch]",
            "cat": "Specialist / Priest",
            "max": "0-1",
            "cost": "55 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+1 DICE", "a": "0", "w": "1", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_SHOOT", "ACT_FIGHT", "ACT_CAST_SPELL"],
            "abilities": ["ABL_HOLY_BLESSING [Grants Blessing Markers to nearby allies]"],
            "keywords": ["KW_INFANTRY", "KW_FAITH", "KW_SPECIALIST"],
            "equip": ["Holy Crucifix Mace", "Trench Shotgun"],
            "tables": ["New Antioch Armoury Tables"],
            "desc": "Priest administering last rites and firing holy ordnance on the frontlines."
        },
        {
            "id": "UNIT_NA_RED_BRIGADE_SHOCK",
            "name": "Red Brigade Shock Trooper",
            "img": img_map.get("red_brigade_shock", ""),
            "faction": "Principality of New Antioch",
            "subfactions": "[The Red Brigade]",
            "cat": "Elite / Naval Shock",
            "max": "0-4",
            "cost": "55 Ducats",
            "base": "28mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+2 DICE", "a": "1", "w": "1", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_BOARDING_ASSAULT [Boarding Assault: +1 INJURY DICE in naval / close quarters]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_RED_BRIGADE"],
            "equip": ["Submachine Gun (AUTOMATIC 2, ASSAULT)", "Boarding Axe"],
            "tables": ["Red Brigade Armoury Table"],
            "desc": "Elite naval assault trooper trained in breaching fortifications and close combat."
        },
        {
            "id": "UNIT_NA_MECHANIZED_INFANTRY",
            "name": "Mechanized Heavy Infantry",
            "img": img_map.get("mechanized_infantry", ""),
            "faction": "Principality of New Antioch",
            "subfactions": "[Mechanized Detachments]",
            "cat": "Heavy Infantry / Exo-Armor",
            "max": "0-2",
            "cost": "75 Ducats",
            "base": "40mm",
            "stats": {"m": "5\"/Heavy Infantry", "r": "+2 DICE", "m_stat": "+1 DICE", "a": "2", "w": "2", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_ARMORED_BULWARK [Exo-Suit: Armour 2 protection]"],
            "keywords": ["KW_HEAVY_INFANTRY", "KW_ELITE", "KW_ARMOUR_2"],
            "equip": ["Heavy Machine Gun (AUTOMATIC 3)", "Reinforced Exo-Armor"],
            "tables": ["New Antioch Heavy Armoury"],
            "desc": "Heavy armored exo-suit trooper capable of wielding squad-level support weapons."
        }
    ],
    "02_TRENCH_PILGRIMS_AND_VARIANTS.txt": [
        {
            "id": "UNIT_TP_TRENCH_PILGRIM",
            "name": "Trench Pilgrim",
            "img": img_map.get("trench_pilgrim", ""),
            "faction": "Processions of the Trench Pilgrims",
            "subfactions": "[Procession of Sacred Affliction, Shrine of Holy Stigmata, Iron Brotherhood]",
            "cat": "Trooper / Fanatic",
            "max": "0-12",
            "cost": "30 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+0 DICE", "m_stat": "+1 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_ZEALOT [Religious Fervour: +1 Courage against Fear]"],
            "keywords": ["KW_INFANTRY", "KW_TROOPER", "KW_FAITH"],
            "equip": ["Trench Club (Melee)", "Pistol"],
            "tables": ["Trench Pilgrim Armoury"],
            "desc": "Devout zealot marching into hellfire with holy chants and brute weaponry."
        },
        {
            "id": "UNIT_TP_FLAGELLANT",
            "name": "Flagellant",
            "img": img_map.get("flagellant", ""),
            "faction": "Processions of the Trench Pilgrims",
            "subfactions": "[Shrine of Holy Stigmata, Procession of Sacred Affliction]",
            "cat": "Penitent / Melee Shock",
            "max": "0-6",
            "cost": "40 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "-1 DICE", "m_stat": "+2 DICE", "a": "0", "w": "1", "c": "9+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_SELF_FLAGELLATION [Blood Penance: Suffers 1 Blood Marker for +1 DICE on Melee]"],
            "keywords": ["KW_INFANTRY", "KW_PENITENT", "KW_FEARLESS"],
            "equip": ["Barbed Iron Flail (CLEAVE 1)"],
            "tables": ["Trench Pilgrim Armoury"],
            "desc": "Self-scourging religious fanatic who welcomes pain and inflicts terrible melee trauma."
        },
        {
            "id": "UNIT_TP_MARTYR_PENITENT",
            "name": "Martyr Penitent",
            "img": img_map.get("martyr_penitent", ""),
            "faction": "Processions of the Trench Pilgrims",
            "subfactions": "[Shrine of Holy Stigmata]",
            "cat": "Suicide Assault",
            "max": "0-3",
            "cost": "35 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "-1 DICE", "m_stat": "+1 DICE", "a": "0", "w": "1", "c": "10+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_DETONATE"],
            "abilities": ["ABL_MARTYR_EXPLOSION [Holy Blast: Explodes upon death or activation causing BLAST 3]"],
            "keywords": ["KW_INFANTRY", "KW_MARTYR", "KW_EXPLOSIVE"],
            "equip": ["Explosive Relic Cross (BLAST 3, DEADLY)"],
            "tables": ["Trench Pilgrim Armoury"],
            "desc": "Penitent sinner strapped with holy explosives, seeking redemption through glorious martyrdom."
        },
        {
            "id": "UNIT_TP_CASTIGATOR",
            "name": "Castigator Executioner",
            "img": img_map.get("castigator", ""),
            "faction": "Processions of the Trench Pilgrims",
            "subfactions": "[Procession of Sacred Affliction]",
            "cat": "Elite Executioner",
            "max": "0-2",
            "cost": "65 Ducats",
            "base": "32mm",
            "stats": {"m": "6\"/Infantry", "r": "0", "m_stat": "+2 DICE", "a": "1", "w": "2", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_HOLY_EXECUTION [Executioner Strike: +1 INJURY DICE vs Down models]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_EXECUTIONER"],
            "equip": ["Two-Handed Holy Greatsword (CLEAVE 1, DEADLY)", "Plate Armour"],
            "tables": ["Trench Pilgrim Armoury"],
            "desc": "Masked executioner enforcing divine justice upon the battlefield."
        },
        {
            "id": "UNIT_TP_ANCHORITE_SHRINE",
            "name": "Anchorite Heavy Mech Shrine",
            "img": img_map.get("anchorite_shrine", ""),
            "faction": "Processions of the Trench Pilgrims",
            "subfactions": "[Iron Brotherhood, Procession of Sacred Affliction]",
            "cat": "Heavy Mech Construct",
            "max": "0-1",
            "cost": "150 Ducats",
            "base": "60mm",
            "stats": {"m": "5\"/Mech", "r": "+2 DICE", "m_stat": "+2 DICE", "a": "3", "w": "4", "c": "10+"},
            "actions": ["ACT_MOVE", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_WALKING_SHRINE [Mobile Sanctuary: Grants Cover & Morale rerolls to nearby allies]"],
            "keywords": ["KW_MECH", "KW_HEAVY", "KW_ARMOUR_3", "KW_RELIC"],
            "equip": ["Heavy Autocannon / Flamethrower", "Iron Piston Fist"],
            "tables": ["Pilgrim Heavy Relics"],
            "desc": "Enormous walking iron chapel mech containing a living hermit priest."
        }
    ],
    "03_IRON_SULTANATE_AND_VARIANTS.txt": [
        {
            "id": "UNIT_IS_JANISSARY",
            "name": "Iron Janissary",
            "img": img_map.get("janissary", ""),
            "faction": "The Iron Sultanate",
            "subfactions": "[Standard Jabirean, Wall-Guard Sapper]",
            "cat": "Elite Heavy Infantry",
            "max": "0-4",
            "cost": "60 Ducats",
            "base": "32mm",
            "stats": {"m": "6\"/Infantry", "r": "+2 DICE", "m_stat": "+1 DICE", "a": "2", "w": "1", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_IRON_DISCIPLINE [Wall Guard: +1 Armour rating when in Cover]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_ARMOUR_2"],
            "equip": ["Jezail Heavy Rifle", "Scimitar", "Ottoman Plate Armour"],
            "tables": ["Sultanate Armoury Tables"],
            "desc": "Elite heavy infantry of the Sultanate, renowned for unshakable discipline."
        },
        {
            "id": "UNIT_IS_AZAB",
            "name": "Azab Warrior",
            "img": img_map.get("azab_warrior", ""),
            "faction": "The Iron Sultanate",
            "subfactions": "[Standard Jabirean, Abyssinian Expeditionary Force]",
            "cat": "Trooper / Light Infantry",
            "max": "0-12",
            "cost": "30 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+0 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_SWIFT_LIGHT [Light Infantry: +1 in movement on Dash]"],
            "keywords": ["KW_INFANTRY", "KW_TROOPER"],
            "equip": ["Musket / Bow", "Curved Dagger"],
            "tables": ["Sultanate Armoury Tables"],
            "desc": "Agile light infantry providing ranged support and skirmishing."
        },
        {
            "id": "UNIT_IS_WALL_GUARD_SAPPER",
            "name": "Wall-Guard Sapper",
            "img": img_map.get("wall_guard_sapper", ""),
            "faction": "The Iron Sultanate",
            "subfactions": "[Wall-Guard Sapper]",
            "cat": "Specialist / Demolitions",
            "max": "0-3",
            "cost": "50 Ducats",
            "base": "28mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+1 DICE", "a": "1", "w": "1", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_SHOOT", "ACT_FIGHT", "ACT_PLANT_DEMO"],
            "abilities": ["ABL_BREACHING_EXPERT [Sapper: +1 INJURY DICE against fortifications]"],
            "keywords": ["KW_INFANTRY", "KW_SPECIALIST", "KW_SAPPER"],
            "equip": ["Demolition Charge (BLAST 4)", "Heavy Trench Pickaxe"],
            "tables": ["Sultanate Armoury Tables"],
            "desc": "Siege engineer expert in breaching enemy trenches and fortification walls."
        },
        {
            "id": "UNIT_IS_TAKUBA_SWORDSMAN",
            "name": "Abyssinian Takuba Swordsman",
            "img": img_map.get("takuba_swordsman", ""),
            "faction": "The Iron Sultanate",
            "subfactions": "[Abyssinian Expeditionary Force]",
            "cat": "Elite Melee Warrior",
            "max": "0-4",
            "cost": "55 Ducats",
            "base": "28mm",
            "stats": {"m": "6\"/Infantry", "r": "0", "m_stat": "+2 DICE", "a": "1", "w": "1", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_TAKUBA_STRIKE [Swordsman Mastery: Parry opponent melee strikes]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_ABYSSINIAN"],
            "equip": ["Takuba Sword (PARRY, CLEAVE 1)", "Leather Shield"],
            "tables": ["Abyssinian Armoury Table"],
            "desc": "Holy warrior of Abyssinia wielding traditional broadswords in furious close combat."
        },
        {
            "id": "UNIT_IS_BRAZEN_BULL",
            "name": "Brazen Bull Construct",
            "img": img_map.get("brazen_bull", ""),
            "faction": "The Iron Sultanate",
            "subfactions": "[Standard Jabirean]",
            "cat": "Alchemical Beast / Construct",
            "max": "0-1",
            "cost": "120 Ducats",
            "base": "50mm",
            "stats": {"m": "7\"/Beast", "r": "0", "m_stat": "+3 DICE", "a": "2", "w": "3", "c": "10+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_FIGHT"],
            "abilities": ["ABL_HELLFIRE_BREATH [Ignited Nostrils: Spews fire on charge causing ON FIRE status]"],
            "keywords": ["KW_MONSTER", "KW_ARTIFICIAL", "KW_ARMOUR_2"],
            "equip": ["Molten Horns & Steel Hooves (CLEAVE 2, INCENDIARY)"],
            "tables": ["Sultanate Heavy Constructs"],
            "desc": "Massive red-hot brass automaton bull charging through enemy fortifications."
        }
    ],
    "04_HERETIC_LEGIONS_AND_BLACK_GRAIL.txt": [
        {
            "id": "UNIT_HL_HERETIC_PRIEST",
            "name": "Heretic Priest (Captain)",
            "img": img_map.get("heretic_priest", ""),
            "faction": "Heretic Legions",
            "subfactions": "[Standard Heretic Legion, Cult of Black Grail]",
            "cat": "Elite / Leader",
            "max": "1 (Mandatory Leader)",
            "cost": "75 Ducats",
            "base": "32mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+2 DICE", "a": "1", "w": "2", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_SHOOT", "ACT_FIGHT", "ACT_CAST_SPELL"],
            "abilities": ["ABL_LEADER [Leader: Heretic commander]", "ABL_BLOODBATH_LEADER [Bloodthirst: Extra Blood Markers]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_LEADER", "KW_HERETIC"],
            "equip": ["Unholy Relic Staff", "Hellfire Pistol", "Corrupted Armour"],
            "tables": ["Heretic Legions Armoury Tables"],
            "desc": "Demonic cult commander driving the hellish warband forward with dark spells."
        },
        {
            "id": "UNIT_HL_HERETIC_TROOPER",
            "name": "Heretic Trooper",
            "img": img_map.get("heretic_trooper", ""),
            "faction": "Heretic Legions",
            "subfactions": "[Standard Heretic Legion, Death Commando Infiltrators]",
            "cat": "Trooper / Shock Infantry",
            "max": "0-12",
            "cost": "35 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+1 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_SHOOT", "ACT_FIGHT"],
            "abilities": ["ABL_HELLISH_FERVOUR [Bloodthirst: Gain blood markers on hits]"],
            "keywords": ["KW_INFANTRY", "KW_TROOPER"],
            "equip": ["Submachine Gun", "Spiked Trench Club"],
            "tables": ["Heretic Legions Armoury Tables"],
            "desc": "Damned shock trooper fighting under the banner of the Hellish Hosts."
        },
        {
            "id": "UNIT_HL_ANOINTED_CHAMPION",
            "name": "Anointed Champion",
            "img": img_map.get("anointed_champion", ""),
            "faction": "Heretic Legions",
            "subfactions": "[Standard Heretic Legion]",
            "cat": "Elite Melee Champion",
            "max": "0-2",
            "cost": "70 Ducats",
            "base": "32mm",
            "stats": {"m": "6\"/Infantry", "r": "+0 DICE", "m_stat": "+3 DICE", "a": "2", "w": "2", "c": "9+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_UNHOLY_CHAMPION [Dark Blessing: +1 INJURY DICE on charge]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_ARMOUR_2"],
            "equip": ["Two-Handed Unholy Flail (CLEAVE 2, DEADLY)", "Black Plate Armour"],
            "tables": ["Heretic Legions Armoury Tables"],
            "desc": "Heavy armored champion of Hell wielding massive spiked flails."
        },
        {
            "id": "UNIT_HL_PLAGUE_KNIGHT",
            "name": "Plague Knight of Abaddon",
            "img": img_map.get("plague_knight", ""),
            "faction": "Cult of the Black Grail",
            "subfactions": "[Cult of Black Grail, The Great Hunger]",
            "cat": "Elite Plague Warrior",
            "max": "0-2",
            "cost": "80 Ducats",
            "base": "32mm",
            "stats": {"m": "5\"/Infantry", "r": "0", "m_stat": "+2 DICE", "a": "2", "w": "2", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_FIGHT"],
            "abilities": ["ABL_ROTTING_BODY [Plague Carapace: Immune to gas and poison; causes contamination]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_BLACK_GRAIL", "KW_ARMOUR_2"],
            "equip": ["Rusted Great Halberd (CLEAVE 2)", "Plague Plate Armour"],
            "tables": ["Black Grail Armoury Tables"],
            "desc": "Rotted knight carrying the plague of the Black Grail into enemy lines."
        },
        {
            "id": "UNIT_HL_HOUND_OF_ABADDON",
            "name": "Hound of Abaddon",
            "img": img_map.get("hound_of_abaddon", ""),
            "faction": "Heretic Legions",
            "subfactions": "[Standard Heretic Legion, Cult of Black Grail]",
            "cat": "Demonic Beast",
            "max": "0-3",
            "cost": "30 Ducats",
            "base": "32mm",
            "stats": {"m": "7\"/Beast", "r": "0", "m_stat": "+2 DICE", "a": "0", "w": "1", "c": "7+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_DEMONIC_POUNCE [Hellish Pounce: Extra movement on charge]"],
            "keywords": ["KW_BEAST", "KW_DEMONIC"],
            "equip": ["Hell Fangs & Iron Collar (CLEAVE 1)"],
            "tables": ["None"],
            "desc": "Fiendish hell hound unleashed to track down fleeing survivors."
        }
    ],
    "05_COURT_OF_SEVEN_HEADED_SERPENT.txt": [
        {
            "id": "UNIT_CS_GOETIC_WARLOCK",
            "name": "Goetic Warlock of Greed",
            "img": img_map.get("goetic_warlock", ""),
            "faction": "Court of the Seven-Headed Serpent",
            "subfactions": "[Standard Serpent Court, House of Avarice]",
            "cat": "Elite / Spellcaster",
            "max": "0-2",
            "cost": "75 Ducats",
            "base": "32mm",
            "stats": {"m": "6\"/Infantry", "r": "+1 DICE", "m_stat": "+1 DICE", "a": "1", "w": "2", "c": "8+"},
            "actions": ["ACT_MOVE", "ACT_SHOOT", "ACT_FIGHT", "ACT_CAST_SPELL"],
            "abilities": ["ABL_GREED_MAGIC [Goetic Spells: Casts Black Heart & Wealth Compulsions]"],
            "keywords": ["KW_INFANTRY", "KW_ELITE", "KW_GOETIC_MAGIC"],
            "equip": ["Jewel-Encrusted Dagger (PARRY)", "Goetic Spellbook"],
            "tables": ["Serpent Court Armoury & Spell Tables"],
            "desc": "Warlock of the House of Avarice manipulating probability and wealth magic."
        },
        {
            "id": "UNIT_CS_KNIGHT_OF_AVARICE",
            "name": "Knight of Avarice",
            "img": img_map.get("knight_of_avarice", ""),
            "faction": "Court of the Seven-Headed Serpent",
            "subfactions": "[House of Avarice]",
            "cat": "Heavy Elite Knight",
            "max": "0-2",
            "cost": "85 Ducats",
            "base": "32mm",
            "stats": {"m": "5\"/Heavy Infantry", "r": "0", "m_stat": "+2 DICE", "a": "2", "w": "2", "c": "9+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_FIGHT"],
            "abilities": ["ABL_GILDED_BULWARK [Golden Plate: Armour 2 protection and parry]"],
            "keywords": ["KW_HEAVY_INFANTRY", "KW_ELITE", "KW_ARMOUR_2"],
            "equip": ["Golden Greatshield", "Spiked Mace (CLEAVE 1)", "Gilded Plate Armour"],
            "tables": ["Knights of Avarice Armoury"],
            "desc": "Gilded heavy knight clad in stolen gold and jewel-embedded armor."
        },
        {
            "id": "UNIT_CS_YOKE_FIEND",
            "name": "Enslaved Yoke Fiend",
            "img": img_map.get("yoke_fiend", ""),
            "faction": "Court of the Seven-Headed Serpent",
            "subfactions": "[Standard Serpent Court, House of Avarice]",
            "cat": "Trooper / Slave",
            "max": "0-12",
            "cost": "20 Ducats",
            "base": "25mm",
            "stats": {"m": "6\"/Infantry", "r": "0", "m_stat": "+0 DICE", "a": "0", "w": "1", "c": "5+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT", "ACT_CARRY_AMMO"],
            "abilities": ["ABL_SLAVE_COMPULSION [Slave Commands: Can be commanded by Sorcerer to sacrifice self]"],
            "keywords": ["KW_INFANTRY", "KW_SLAVE"],
            "equip": ["Iron Chains & Spiked Yoke"],
            "tables": ["Serpent Court Armoury"],
            "desc": "Enslaved demon brute used as meat shields and ammo porters by the Court."
        }
    ],
    "06_MERCENARIES_AND_MONSTERS.txt": [
        {
            "id": "UNIT_MC_TRENCH_DOG",
            "name": "Trench Dog War Hound",
            "img": img_map.get("trench_dog", ""),
            "faction": "Neutral / Any Warband",
            "subfactions": "[All Factions]",
            "cat": "Support Beast",
            "max": "0-3",
            "cost": "15 Ducats",
            "base": "25mm",
            "stats": {"m": "7\"/Beast", "r": "0", "m_stat": "+1 DICE", "a": "0", "w": "1", "c": "6+"},
            "actions": ["ACT_MOVE", "ACT_CHARGE", "ACT_DASH", "ACT_FIGHT"],
            "abilities": ["ABL_TRENCH_HOUND [War Hound: Excluded from Morale Check casualty counts]"],
            "keywords": ["KW_BEAST", "KW_SUPPORT"],
            "equip": ["Spiked Collar & Fangs"],
            "tables": ["None"],
            "desc": "Vicious trench hound trained to attack enemy scouts and flush out trenches."
        }
    ]
}

def format_unit_entry(u):
    actions_str = "\n".join([f"  - {a}" for a in u["actions"]])
    abilities_str = "\n".join([f"  - {a}" for a in u["abilities"]])
    kw_str = "\n".join([f"  - {k}" for k in u["keywords"]])
    eq_str = "\n".join([f"  - {e}" for e in u["equip"]])
    tbl_str = "\n".join([f"  - {t}" for t in u["tables"]])
    
    img_line = f"IMAGE_PATH: {u['img']}\n" if u['img'] else ""
    
    return f"""
================================================================================
UNIT_ID: {u['id']}
UNIT_NAME: {u['name']}
{img_line}FACTION: {u['faction']}
SUBFACTIONS: {u['subfactions']}
CATEGORY: {u['cat']}
MAX_PER_WARBAND: {u['max']}
COST: {u['cost']}
BASE_SIZE: {u['base']}

PROFILE_STATS:
  Movement (M): {u['stats']['m']}
  Ranged (R):   {u['stats']['r']}
  Melee (M):    {u['stats']['m_stat']}
  Armour (A):   {u['stats']['a']}
  Wounds (W):   {u['stats']['w']}
  Courage (C):  {u['stats']['c']}

LINKED_ACTIONS:
{actions_str}

LINKED_ABILITIES:
{abilities_str}

LINKED_KEYWORDS:
{kw_str}

DEFAULT_EQUIPMENT:
{eq_str}

ALLOWED_EQUIPMENT_TABLES:
{tbl_str}

UNIT_DESCRIPTION:
  {u['desc']}
================================================================================
"""

# Append missing models to warband text files
for filename, models in additional_models.items():
    filepath = os.path.join(warbands_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        existing_content = f.read()
    
    new_entries = []
    for u in models:
        if u['id'] not in existing_content:
            new_entries.append(format_unit_entry(u))
            print(f"Appended {u['name']} ({u['id']}) to {filename}")
    
    if new_entries:
        with open(filepath, 'a', encoding='utf-8') as f:
            f.write("".join(new_entries))

# Update equipment files with image paths
equip_img_updates = {
    "WP_RNG_SUBMACHINE_GUN": img_map.get("submachine_gun", ""),
    "WP_RNG_TRENCH_SHOTGUN": img_map.get("trench_shotgun", ""),
    "WP_RNG_HEAVY_MACHINE_GUN": img_map.get("heavy_machine_gun", ""),
    "WP_MEL_TRENCH_AXE": img_map.get("trench_axe", ""),
    "AR_TRENCH_SHIELD": img_map.get("trench_shield", ""),
    "EX_DEMO_CHARGE": img_map.get("demo_charge", ""),
    "EQ_GAS_MASK": img_map.get("gas_mask", "")
}

for filename in os.listdir(battlekit_dir):
    if filename.endswith('.txt'):
        filepath = os.path.join(battlekit_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        for eq_id, img_url in equip_img_updates.items():
            if eq_id in content and img_url:
                tag = f"IMAGE_PATH: {img_url}"
                if tag not in content:
                    content = re.sub(
                        rf'(ITEM_ID:\s*{eq_id}.*?\nITEM_NAME:.*?\n)',
                        rf'\1{tag}\n',
                        content,
                        flags=re.DOTALL
                    )
                    modified = True
                    print(f"Attached image to {eq_id} in {filename}")
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("\nAll remaining models and battlekit items fully populated and updated in database!")
