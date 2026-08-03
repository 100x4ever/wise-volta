import os
import re

battlekit_dir = r'C:\Users\vp\Downloads\tc-1.0.2\battlekit_armoury_wargear'

equip_linkages = {
    "WP_RNG_BOLT_ACTION_RIFLE": {
        "actions": ["ACT_SHOOT [Shoot Action]"],
        "abilities": ["ABL_LONG_RANGE_PRECISION [Standard Ranged Attack]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_PISTOL": {
        "actions": ["ACT_SHOOT [Shoot Action]"],
        "abilities": ["ABL_SIDEARM [Close range sidearm]"],
        "keywords": ["KW_RANGED", "KW_ONE_HANDED"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_AUTOMATIC_PISTOL": {
        "actions": ["ACT_SHOOT [Shoot Action - 2 Attacks]"],
        "abilities": ["ABL_AUTOMATIC_FIRE [Fires 2 attacks in sequence]"],
        "keywords": ["KW_RANGED", "KW_ONE_HANDED", "KW_AUTOMATIC_2"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_SUBMACHINE_GUN": {
        "actions": ["ACT_SHOOT [Shoot Action - 2 Attacks]", "ACT_CHARGE [Allowed after shooting]"],
        "abilities": ["ABL_ASSAULT_FIRE [Allows Shoot + Charge in same activation]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED", "KW_AUTOMATIC_2", "KW_ASSAULT"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_TRENCH_SHOTGUN": {
        "actions": ["ACT_SHOOT [Shoot Action]", "ACT_CHARGE [Allowed after shooting]"],
        "abilities": ["ABL_POINT_BLANK_BLAST [+1 DICE at <= 6 inches range]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED", "KW_ASSAULT"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_SNIPER_RIFLE": {
        "actions": ["ACT_SHOOT [Shoot Action]", "ACT_AIM [Aim Action - Risky +2 DICE]"],
        "abilities": ["ABL_PRECISION_OPTIC [Ignores Long Range penalty]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED", "KW_IGNORE_LONG_RANGE"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_HEAVY_MACHINE_GUN": {
        "actions": ["ACT_SHOOT [Shoot Action - 3 Attacks]"],
        "abilities": ["ABL_SUPPRESSIVE_BURST [Fires 3 attacks in sequence; Requires setup if moved]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED", "KW_HEAVY", "KW_AUTOMATIC_3"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_RNG_FLAMETHROWER": {
        "actions": ["ACT_SHOOT [Shoot Action - Area Blast]"],
        "abilities": ["ABL_LIQUID_FIRE [Causes BLAST 3, Ignores Cover, ignites target]"],
        "keywords": ["KW_RANGED", "KW_TWO_HANDED", "KW_BLAST_3", "KW_IGNORE_COVER", "KW_INCENDIARY"],
        "effects": ["EFF_ON_FIRE [Target set ON FIRE]", "EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_MEL_TRENCH_KNIFE": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_CLOSE_COMBAT [Standard melee strike]"],
        "keywords": ["KW_MELEE", "KW_ONE_HANDED"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_MEL_TRENCH_SWORD": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_PARRY_STRIKE [Allows parrying 1 enemy melee hit per turn]"],
        "keywords": ["KW_MELEE", "KW_ONE_HANDED", "KW_PARRY"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_MEL_TRENCH_AXE": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_ARMOUR_PIERCING [Reduces target Armour rating by 1]"],
        "keywords": ["KW_MELEE", "KW_ONE_HANDED", "KW_CLEAVE_1"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "WP_MEL_GREATSWORD": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_DEADLY_SWING [Triggers 4D6 sum-all Bloodbath rolls]"],
        "keywords": ["KW_MELEE", "KW_TWO_HANDED", "KW_CLEAVE_1", "KW_DEADLY"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]", "EFF_OUT_OF_ACTION [High decapitation rate]"]
    },
    "WP_MEL_GREAT_EVISCERATOR": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_MOTORISED_TEETH [+1 DICE on hit, Cleave 2, 4D6 Bloodbath]"],
        "keywords": ["KW_MELEE", "KW_TWO_HANDED", "KW_CLEAVE_2", "KW_DEADLY"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]", "EFF_OUT_OF_ACTION"]
    },
    "WP_MEL_TARTARUS_CLAWS": {
        "actions": ["ACT_FIGHT [Fight Action]"],
        "abilities": ["ABL_SILENT_ASSASSINATION [+1 DICE on hit, Cleave 1]"],
        "keywords": ["KW_MELEE", "KW_ONE_HANDED", "KW_CLEAVE_1"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll on hit]"]
    },
    "AR_BODY_ARMOUR": {
        "actions": ["PASSIVE_DEFENSE"],
        "abilities": ["ABL_ARMOUR_PROTECTION [Subtracts 1 from Injury Roll total]"],
        "keywords": ["KW_ARMOUR_1"],
        "effects": ["EFF_DAMAGE_REDUCTION [Reduces incoming injury results]"]
    },
    "AR_REINFORCED_TRENCH_ARMOUR": {
        "actions": ["PASSIVE_DEFENSE"],
        "abilities": ["ABL_REINFORCED_PROTECTION [Subtracts 1 from Injury Roll total; Shrapnel immunity]"],
        "keywords": ["KW_ARMOUR_1", "KW_REINFORCED"],
        "effects": ["EFF_DAMAGE_REDUCTION [Reduces incoming injury results]"]
    },
    "AR_PLATE_ARMOUR": {
        "actions": ["PASSIVE_DEFENSE"],
        "abilities": ["ABL_HEAVY_PLATE [Subtracts 2 from Injury Roll total]"],
        "keywords": ["KW_ARMOUR_2"],
        "effects": ["EFF_DAMAGE_REDUCTION [Reduces incoming injury results]"]
    },
    "AR_TRENCH_SHIELD": {
        "actions": ["PASSIVE_DEFENSE", "ACT_FIGHT [Parry reaction]"],
        "abilities": ["ABL_SHIELD_PARRY [+1 Armour frontal; Parries 1 melee hit]"],
        "keywords": ["KW_SHIELD", "KW_PARRY"],
        "effects": ["EFF_DAMAGE_REDUCTION [Reduces incoming injury results]"]
    },
    "EX_FRAG_GRENADE": {
        "actions": ["ACT_THROW_GRENADE [Ranged Throw 8 inches]"],
        "abilities": ["ABL_FRAGMENTATION [Causes BLAST 2 explosion]"],
        "keywords": ["KW_BLAST_2", "KW_CONSUMABLE"],
        "effects": ["EFF_BLOOD_MARKER [Causes Injury Roll to all models in 2 inch radius]"]
    },
    "EX_GAS_GRENADE": {
        "actions": ["ACT_THROW_GRENADE [Ranged Throw 8 inches]"],
        "abilities": ["ABL_CHOKING_GAS [Causes BLAST 3 cloud, Ignores Cover]"],
        "keywords": ["KW_BLAST_3", "KW_GAS", "KW_IGNORE_COVER", "KW_CONSUMABLE"],
        "effects": ["EFF_GAS_CLOUD [Spreads gas hazard in 3 inch radius]", "EFF_BLOOD_MARKER"]
    },
    "EX_DEMO_CHARGE": {
        "actions": ["ACT_PLANT_DEMO [Plant or Throw 6 inches]"],
        "abilities": ["ABL_HEAVY_DEMOLITION [Causes BLAST 4 explosion, DEADLY 4D6 Bloodbath]"],
        "keywords": ["KW_BLAST_4", "KW_DEADLY", "KW_CONSUMABLE"],
        "effects": ["EFF_OUT_OF_ACTION [High destruction rate]", "EFF_BLOOD_MARKER"]
    },
    "EQ_GAS_MASK": {
        "actions": ["PASSIVE_EQUIPMENT"],
        "abilities": ["ABL_GAS_IMMUNITY [Completely immune to Gas Grenades and Gas Cloud hazards]"],
        "keywords": ["KW_IGNORE_GAS"],
        "effects": ["EFF_HAZARD_IMMUNITY [Negates gas injury rolls]"]
    },
    "EQ_MEDIC_KIT": {
        "actions": ["ACT_TREAT_WOUNDS [Treat Wounds Action]"],
        "abilities": ["ABL_FIELD_SURGERY [Removes 1D3 Blood Markers or stands up a Down model]"],
        "keywords": ["KW_MEDICAL"],
        "effects": ["EFF_RECOVERY [Removes Blood Markers / recovers Down state]"]
    },
    "EQ_WAR_BANNER": {
        "actions": ["PASSIVE_EQUIPMENT"],
        "abilities": ["ABL_WARBAND_INSPIRATION [Grants friendly models within 6 inches Morale Check rerolls]"],
        "keywords": ["KW_MORALE_BUFF"],
        "effects": ["EFF_MORALE_BOOST [Prevents Shaken status]"]
    }
}

for filename in os.listdir(battlekit_dir):
    if filename.endswith('.txt'):
        filepath = os.path.join(battlekit_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        for item_id, links in equip_linkages.items():
            if item_id in content and "LINKED_ACTIONS" not in content.split(item_id)[1].split("================================================================================")[0]:
                actions_str = "\n".join([f"  - {a}" for a in links["actions"]])
                abilities_str = "\n".join([f"  - {a}" for a in links["abilities"]])
                kw_str = "\n".join([f"  - {k}" for k in links["keywords"]])
                eff_str = "\n".join([f"  - {e}" for e in links["effects"]])
                
                linkage_block = f"\nLINKED_ACTIONS:\n{actions_str}\n\nLINKED_ABILITIES:\n{abilities_str}\n\nLINKED_KEYWORDS:\n{kw_str}\n\nLINKED_EFFECTS:\n{eff_str}\n"
                
                content = re.sub(
                    rf'(ITEM_ID:\s*{item_id}.*?)(ALLOWED_FACTIONS:|DESCRIPTION:)',
                    rf'\1{linkage_block}\2',
                    content,
                    flags=re.DOTALL
                )
                modified = True
                print(f"Updated explicit linkages for {item_id} in {filename}")
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("\nAll equipment items now have explicit LINKED_ACTIONS, LINKED_ABILITIES, LINKED_KEYWORDS, and LINKED_EFFECTS!")
