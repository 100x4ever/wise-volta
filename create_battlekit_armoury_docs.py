import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\battlekit_armoury_wargear'
os.makedirs(target_dir, exist_ok=True)

files_data = {}

# ==============================================================================
# 01_RANGED_WEAPONS_REGISTRY.txt
# ==============================================================================
files_data["01_RANGED_WEAPONS_REGISTRY.txt"] = """================================================================================
DATABASE: RANGED WEAPONS REGISTRY
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Complete registry of ranged weapons, stats, keywords, and costs
================================================================================

================================================================================
ITEM_ID: WP_RNG_BOLT_ACTION_RIFLE
ITEM_NAME: Bolt-Action Rifle
CATEGORY: RANGED_WEAPON
COST: 15 Ducats
HANDS: 2-Handed
RANGE: 24 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_TWO_HANDED]
ALLOWED_FACTIONS: [New Antioch, Trench Pilgrims, Heretic Legions, Iron Sultanate]
DESCRIPTION: Standard service rifle of the Great War trenches. Highly reliable across medium to long ranges.
================================================================================

================================================================================
ITEM_ID: WP_RNG_PISTOL
ITEM_NAME: Service Pistol
CATEGORY: RANGED_WEAPON
COST: 5 Ducats
HANDS: 1-Handed
RANGE: 12 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_ONE_HANDED]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Standard military sidearm for close range firefights.
================================================================================

================================================================================
ITEM_ID: WP_RNG_AUTOMATIC_PISTOL
ITEM_NAME: Automatic Pistol
CATEGORY: RANGED_WEAPON
COST: 15 Ducats
HANDS: 1-Handed
RANGE: 12 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_ONE_HANDED, KW_AUTOMATIC_2]
ALLOWED_FACTIONS: [New Antioch, Heretic Legions, Iron Sultanate]
DESCRIPTION: Fires rapid bursts of pistol rounds. Allows making 2 separate Ranged Attacks in sequence.
================================================================================

================================================================================
ITEM_ID: WP_RNG_SUBMACHINE_GUN
ITEM_NAME: Submachine Gun
CATEGORY: RANGED_WEAPON
COST: 25 Ducats
HANDS: 2-Handed
RANGE: 12 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_TWO_HANDED, KW_AUTOMATIC_2, KW_ASSAULT]
ALLOWED_FACTIONS: [New Antioch, Prussian Stosstruppen, Heretic Legions]
DESCRIPTION: High rate of fire trench weapon. Fires 2 attacks and allows charging in the same activation.
================================================================================

================================================================================
ITEM_ID: WP_RNG_TRENCH_SHOTGUN
ITEM_NAME: Trench Shotgun
CATEGORY: RANGED_WEAPON
COST: 20 Ducats
HANDS: 2-Handed
RANGE: 12 Inches
MODIFIERS: +1 DICE at Short Range (<= 6")
KEYWORDS: [KW_RANGED, KW_TWO_HANDED, KW_ASSAULT]
ALLOWED_FACTIONS: [New Antioch, Prussian Stosstruppen, Red Brigade, Trench Pilgrims]
DESCRIPTION: Devastating close-quarters firearm. Grants +1 DICE to hit targets within 6".
================================================================================

================================================================================
ITEM_ID: WP_RNG_SNIPER_RIFLE
ITEM_NAME: Bolt-Action Sniper Rifle
CATEGORY: RANGED_WEAPON
COST: 35 Ducats
HANDS: 2-Handed
RANGE: 36 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_TWO_HANDED, KW_IGNORE_LONG_RANGE]
ALLOWED_FACTIONS: [New Antioch (Sniper Priests), Iron Sultanate]
DESCRIPTION: High-precision rifle with magnified optic or divine sights. Ignores the long-range penalty.
================================================================================

================================================================================
ITEM_ID: WP_RNG_HEAVY_MACHINE_GUN
ITEM_NAME: Heavy Machine Gun
CATEGORY: RANGED_WEAPON
COST: 45 Ducats
HANDS: 2-Handed
RANGE: 30 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_TWO_HANDED, KW_HEAVY, KW_AUTOMATIC_3]
ALLOWED_FACTIONS: [New Antioch, Iron Sultanate, Heretic Legions]
DESCRIPTION: Heavy crew-served automatic weapon delivering suppressive bursts of 3 attacks. Cannot move and shoot in same turn without support.
================================================================================

================================================================================
ITEM_ID: WP_RNG_FLAMETHROWER
ITEM_NAME: Alchemical Flame Thrower
CATEGORY: RANGED_WEAPON
COST: 40 Ducats
HANDS: 2-Handed
RANGE: 12 Inches
MODIFIERS: Standard
KEYWORDS: [KW_RANGED, KW_TWO_HANDED, KW_BLAST_3, KW_IGNORE_COVER, KW_INCENDIARY]
ALLOWED_FACTIONS: [New Antioch, Iron Sultanate, Trench Pilgrims, Heretic Legions]
DESCRIPTION: Projects liquid fire in a 3" blast radius. Ignores cover and sets targets ON FIRE.
================================================================================
"""

# ==============================================================================
# 02_MELEE_WEAPONS_REGISTRY.txt
# ==============================================================================
files_data["02_MELEE_WEAPONS_REGISTRY.txt"] = """================================================================================
DATABASE: MELEE WEAPONS REGISTRY
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Complete registry of melee weapons, stats, keywords, and costs
================================================================================

================================================================================
ITEM_ID: WP_MEL_TRENCH_KNIFE
ITEM_NAME: Trench Knife / Dagger
CATEGORY: MELEE_WEAPON
COST: 5 Ducats
HANDS: 1-Handed
RANGE: Melee (1")
MODIFIERS: Standard
KEYWORDS: [KW_MELEE, KW_ONE_HANDED]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Standard close-quarters blade for trench fighting.
================================================================================

================================================================================
ITEM_ID: WP_MEL_TRENCH_SWORD
ITEM_NAME: Trench Sword
CATEGORY: MELEE_WEAPON
COST: 10 Ducats
HANDS: 1-Handed
RANGE: Melee (1")
MODIFIERS: Standard
KEYWORDS: [KW_MELEE, KW_ONE_HANDED, KW_PARRY]
ALLOWED_FACTIONS: [New Antioch, Trench Pilgrims, Iron Sultanate, Court of Serpent]
DESCRIPTION: Well-balanced melee sword allowing the wielder to parry incoming melee strikes.
================================================================================

================================================================================
ITEM_ID: WP_MEL_TRENCH_AXE
ITEM_NAME: Trench Axe / Warhammer
CATEGORY: MELEE_WEAPON
COST: 15 Ducats
HANDS: 1-Handed
RANGE: Melee (1")
MODIFIERS: Standard
KEYWORDS: [KW_MELEE, KW_ONE_HANDED, KW_CLEAVE_1]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Heavy armor-piercing weapon that reduces target Armour rating by 1.
================================================================================

================================================================================
ITEM_ID: WP_MEL_GREATSWORD
ITEM_NAME: Two-Handed Greatsword
CATEGORY: MELEE_WEAPON
COST: 25 Ducats
HANDS: 2-Handed
RANGE: Melee (1")
MODIFIERS: Standard
KEYWORDS: [KW_MELEE, KW_TWO_HANDED, KW_CLEAVE_1, KW_DEADLY]
ALLOWED_FACTIONS: [New Antioch, Trench Pilgrims, Heretic Legions, Knights of Avarice]
DESCRIPTION: Massive double-handed blade. Triggers Deadly Bloodbath rolls (roll 4D6 sum all).
================================================================================

================================================================================
ITEM_ID: WP_MEL_GREAT_EVISCERATOR
ITEM_NAME: Great Eviscerator
CATEGORY: MELEE_WEAPON
COST: 35 Ducats
HANDS: 2-Handed
RANGE: Melee (1")
MODIFIERS: +1 DICE on Melee Success Roll
KEYWORDS: [KW_MELEE, KW_TWO_HANDED, KW_CLEAVE_2, KW_DEADLY]
ALLOWED_FACTIONS: [Trench Pilgrims (Communicant), Heretic Legions]
DESCRIPTION: Brutal motorised or spiked heavy weapon used by mutant giants. Reduces Armour by 2 and sums 4D6 on Bloodbath.
================================================================================

================================================================================
ITEM_ID: WP_MEL_TARTARUS_CLAWS
ITEM_NAME: Tartarus Claws
CATEGORY: MELEE_WEAPON
COST: 15 Ducats
HANDS: 1-Handed (Pair)
RANGE: Melee (1")
MODIFIERS: +1 DICE on Melee Success Roll
KEYWORDS: [KW_MELEE, KW_ONE_HANDED, KW_CLEAVE_1]
ALLOWED_FACTIONS: [Heretic Legions (Death Commando only)]
DESCRIPTION: Razor-sharp hell-forged gauntlets used by stealth assassins for instant silent kills.
================================================================================
"""

# ==============================================================================
# 03_ARMOUR_AND_SHIELDS_REGISTRY.txt
# ==============================================================================
files_data["03_ARMOUR_AND_SHIELDS_REGISTRY.txt"] = """================================================================================
DATABASE: ARMOUR AND SHIELDS REGISTRY
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Complete registry of protective gear, shields, and armor ratings
================================================================================

================================================================================
ITEM_ID: AR_BODY_ARMOUR
ITEM_NAME: Standard Body Armour
CATEGORY: ARMOUR
COST: 15 Ducats
ARMOUR_RATING: 1
KEYWORDS: [KW_ARMOUR_1]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Steel cuirass and helmet providing basic defense (subtracts 1 from Injury Roll totals).
================================================================================

================================================================================
ITEM_ID: AR_REINFORCED_TRENCH_ARMOUR
ITEM_NAME: Reinforced Trench Armour
CATEGORY: ARMOUR
COST: 25 Ducats
ARMOUR_RATING: 1
KEYWORDS: [KW_ARMOUR_1, KW_REINFORCED]
ALLOWED_FACTIONS: [New Antioch, Prussian Stosstruppen]
DESCRIPTION: Heavy trench plating. Subtracts 1 from Injury Rolls and grants immunity to shrapnel effects.
================================================================================

================================================================================
ITEM_ID: AR_PLATE_ARMOUR
ITEM_NAME: Heavy Plate Armour
CATEGORY: ARMOUR
COST: 40 Ducats
ARMOUR_RATING: 2
KEYWORDS: [KW_ARMOUR_2]
ALLOWED_FACTIONS: [Trench Pilgrims (Communicant), Knights of Avarice, Black Grail]
DESCRIPTION: Full plate suit providing high protection (subtracts 2 from Injury Rolls).
================================================================================

================================================================================
ITEM_ID: AR_TRENCH_SHIELD
ITEM_NAME: Trench Shield
CATEGORY: SHIELD
COST: 10 Ducats
ARMOUR_RATING: +1 (Frontal)
KEYWORDS: [KW_SHIELD, KW_PARRY]
ALLOWED_FACTIONS: [New Antioch, Trench Pilgrims, Iron Sultanate, Court of Serpent]
DESCRIPTION: Handheld ballistic shield. Grants +1 Armour rating against frontal attacks and allows parrying 1 melee hit per turn.
================================================================================
"""

# ==============================================================================
# 04_GRENADES_AND_EXPLOSIVES_REGISTRY.txt
# ==============================================================================
files_data["04_GRENADES_AND_EXPLOSIVES_REGISTRY.txt"] = """================================================================================
DATABASE: GRENADES AND EXPLOSIVES REGISTRY
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Explosive ordnance, gas canisters, and demolitions
================================================================================

================================================================================
ITEM_ID: EX_FRAG_GRENADE
ITEM_NAME: Frag Grenades
CATEGORY: GRENADE
COST: 10 Ducats
RANGE: 8 Inches (Thrown)
KEYWORDS: [KW_BLAST_2, KW_CONSUMABLE]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Fragmentation grenade hitting all models within 2" of target point.
================================================================================

================================================================================
ITEM_ID: EX_GAS_GRENADE
ITEM_NAME: Mustard / Alchemical Gas Grenade
CATEGORY: GRENADE
COST: 15 Ducats
RANGE: 8 Inches (Thrown)
KEYWORDS: [KW_BLAST_3, KW_GAS, KW_IGNORE_COVER, KW_CONSUMABLE]
ALLOWED_FACTIONS: [New Antioch, Prussian Stosstruppen, Iron Sultanate, Heretic Legions]
DESCRIPTION: Releases a cloud of choking gas (3" radius). Hits all models regardless of cover.
================================================================================

================================================================================
ITEM_ID: EX_DEMO_CHARGE
ITEM_NAME: Demolition Charge
CATEGORY: EXPLOSIVE
COST: 30 Ducats
RANGE: Planted / 6" Throw
KEYWORDS: [KW_BLAST_4, KW_DEADLY, KW_CONSUMABLE]
ALLOWED_FACTIONS: [New Antioch, Wall-Guard Sappers, Heretic Legions]
DESCRIPTION: High explosive charge for breaching bunkers. Causes 4" blast radius and Deadly Bloodbath rolls (roll 4D6 sum all).
================================================================================
"""

# ==============================================================================
# 05_EQUIPMENT_AND_ALCHEMICAL_ITEMS.txt
# ==============================================================================
files_data["05_EQUIPMENT_AND_ALCHEMICAL_ITEMS.txt"] = """================================================================================
DATABASE: EQUIPMENT AND ALCHEMICAL ITEMS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Medical supplies, gas masks, banners, and special wargear
================================================================================

================================================================================
ITEM_ID: EQ_GAS_MASK
ITEM_NAME: Gas Mask
CATEGORY: EQUIPMENT
COST: 5 Ducats
KEYWORDS: [KW_IGNORE_GAS]
ALLOWED_FACTIONS: [All Factions]
DESCRIPTION: Protective respirator granting complete immunity to Gas Grenades and Gas Cloud hazards.
================================================================================

================================================================================
ITEM_ID: EQ_MEDIC_KIT
ITEM_NAME: Field Surgeon Kit
CATEGORY: EQUIPMENT
COST: 15 Ducats
KEYWORDS: [KW_MEDICAL]
ALLOWED_FACTIONS: [New Antioch, Trench Doctors, Sultanate Alchemists]
DESCRIPTION: Medical supplies allowing the bearer to spend 1 Action to remove 1D3 Blood Markers or stand up a Down model.
================================================================================

================================================================================
ITEM_ID: EQ_WAR_BANNER
ITEM_NAME: Warband Banner / Shrine
CATEGORY: EQUIPMENT
COST: 25 Ducats
KEYWORDS: [KW_MORALE_BUFF]
ALLOWED_FACTIONS: [New Antioch, Trench Pilgrims, Iron Sultanate]
DESCRIPTION: Grants friendly models within 6" a reroll on failed Morale Checks.
================================================================================
"""

# ==============================================================================
# 06_FACTION_ARMOURY_TABLES_SUMMARY.txt
# ==============================================================================
files_data["06_FACTION_ARMOURY_TABLES_SUMMARY.txt"] = """================================================================================
DATABASE: FACTION ARMOURY TABLES MASTER INDEX
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Cross-reference index connecting factions to allowed Battlekit items
================================================================================

1. NEW ANTIOCH & VARIANTS ARMOURY
--------------------------------------------------------------------------------
* Ranged: Bolt-Action Rifle, Pistol, Automatic Pistol, Submachine Gun, Trench Shotgun, Sniper Rifle, Heavy Machine Gun, Flamethrower.
* Melee: Trench Knife, Trench Sword, Trench Axe, Greatsword.
* Armour & Shields: Body Armour, Reinforced Trench Armour, Trench Shield.
* Grenades & Gear: Frag Grenades, Gas Grenades, Demo Charge, Gas Mask, Medic Kit, War Banner.

2. TRENCH PILGRIMS ARMOURY
--------------------------------------------------------------------------------
* Ranged: Bolt-Action Rifle, Pistol, Trench Shotgun, Heavy Crossbow, Flamethrower.
* Melee: Trench Knife, Holy Relic Mace, Trench Axe, Greatsword, Great Eviscerator.
* Armour & Shields: Body Armour, Plate Armour, Trench Shield.
* Grenades & Gear: Frag Grenades, Holy Water Grenades, Gas Mask, War Banner.

3. THE IRON SULTANATE ARMOURY
--------------------------------------------------------------------------------
* Ranged: Jezail Rifle, Pistol, Automatic Pistol, Heavy Machine Gun, Alchemical Flamethrower, Sniper Rifle.
* Melee: Scimitar, Takuba Sword, Trench Knife, Trench Axe.
* Armour & Shields: Body Armour, Alchemical Robes, Trench Shield.
* Grenades & Gear: Gas Grenades, Alchemical Vials, Gas Mask, Medic Kit.

4. HERETIC LEGIONS & BLACK GRAIL ARMOURY
--------------------------------------------------------------------------------
* Ranged: Bolt-Action Rifle, Pistol, Automatic Pistol, Submachine Gun, Silenced Pistol, Flamethrower.
* Melee: Trench Knife, Trench Axe, Tartarus Claws, Greatsword, Great Cleaver.
* Armour & Shields: Body Armour, Plate Armour, Rotting Carapace.
* Grenades & Gear: Frag Grenades, Gas Grenades, Demo Charge, Gas Mask.

5. COURT OF THE SEVEN-HEADED SERPENT ARMOURY
--------------------------------------------------------------------------------
* Ranged: Ritual Pistols, Spell Focuses.
* Melee: Ritual Swords, Daggers, Knights Greatsword, Warlock Blades.
* Armour & Shields: Body Armour, Heavy Plate Armour, Serpent Shield.
* Grenades & Gear: Gas Grenades, Hellfire Vials.
================================================================================
"""

for fname, content in files_data.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll Battlekit and Armoury database files created successfully in:\n{target_dir}")
