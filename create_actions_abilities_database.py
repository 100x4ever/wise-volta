import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\actions_abilities_effects'
os.makedirs(target_dir, exist_ok=True)

files_data = {}

# ==============================================================================
# 01_COMMON_AND_SPECIAL_ACTIONS.txt
# ==============================================================================
files_data["01_COMMON_AND_SPECIAL_ACTIONS.txt"] = """================================================================================
DATABASE: COMMON AND SPECIAL ACTIONS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Standardized action registry for unit auto-population and gameplay engine
================================================================================

================================================================================
RECORD_ID: ACT_MOVE
NAME: Move Action
CATEGORY: Common Action
TAGS: [ACTION, MOVEMENT, COMMON]
KEYWORDS: MOVEMENT, STANDARD_MOVE
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: False
TARGET_TYPE: Self
RANGE: Movement Characteristic (M")
DESCRIPTION: Pick up the model and move it along a path across the battlefield up to its Movement Characteristic (M"). Cannot be used to move within 1" of an enemy model.
VALIDATION_RULES:
  - Cannot take if already took Charge or Retreat in the same Activation.
  - Cannot move within 1" of enemy models (must Charge instead).
  - If starting within 1" of enemy, must remain within 1" of all starting enemies throughout or Retreat.
LINKS: [ACT_CHARGE, ACT_DASH, ACT_RETREAT, EFF_DOWN]
================================================================================

================================================================================
RECORD_ID: ACT_CHARGE
NAME: Charge Action
CATEGORY: Common Action
TAGS: [ACTION, MOVEMENT, COMBAT, CHARGE]
KEYWORDS: MOVEMENT, CHARGE, ENGAGE
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: True (D6 Roll added to M")
TARGET_TYPE: Enemy Model
RANGE: 12 Inches (Line of Sight required)
DESCRIPTION: Declare an enemy within Line of Sight and 12" as target. Roll a D6, add result to Movement Characteristic (M"), and move model towards target into base contact / within 1". Grants +1 DICE Charge Bonus to next Melee Attack.
VALIDATION_RULES:
  - Cannot take if model is already within 1" of an enemy model.
  - Cannot take Shoot Action and Charge Action in same Activation unless weapon has ASSAULT keyword.
  - Cannot take Move or Retreat Action in same Activation.
LINKS: [ACT_MOVE, ACT_FIGHT, KW_ASSAULT, KW_CHARGE_BONUS]
================================================================================

================================================================================
RECORD_ID: ACT_DASH
NAME: Dash Action
CATEGORY: Common Action
TAGS: [ACTION, MOVEMENT, RISKY]
KEYWORDS: MOVEMENT, DASH, RISKY_ROLL
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Risky Success Roll (2D6 vs 7+)
TARGET_TYPE: Self
RANGE: Movement Characteristic (M")
DESCRIPTION: Take a Risky Success Roll FIRST. If successful, move model up to its Movement Characteristic (M") in any direction. Can be taken in addition to Move, Charge, or Retreat.
VALIDATION_RULES:
  - MUST roll Risky Success Roll BEFORE moving.
  - IF ROLL FAILS: Model Activation ENDS IMMEDIATELY and no movement is made.
  - Cannot be used to charge or retreat directly.
LINKS: [ACT_MOVE, ACT_CHARGE, EFF_SHAKEN]
================================================================================

================================================================================
RECORD_ID: ACT_RETREAT
NAME: Retreat Action
CATEGORY: Common Action
TAGS: [ACTION, MOVEMENT, DISENGAGE]
KEYWORDS: MOVEMENT, RETREAT, DISENGAGE
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Risky Success Roll (2D6 vs 7+)
TARGET_TYPE: Self
RANGE: Movement Characteristic (M")
DESCRIPTION: Special move used when starting within 1" of an enemy. Take a Risky Success Roll. If successful, move model up to M" away from enemy models.
VALIDATION_RULES:
  - Can only be taken if model starts within 1" of enemy.
  - Enemies previously in contact may take Opportunity Strikes before model moves.
  - Failure ends activation immediately.
LINKS: [ACT_MOVE, ACT_CHARGE, ACT_DASH]
================================================================================

================================================================================
RECORD_ID: ACT_SHOOT
NAME: Shoot Action
CATEGORY: Common Action
TAGS: [ACTION, RANGED, COMBAT]
KEYWORDS: RANGED_ATTACK, SHOOT
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Success Roll (2D6 vs 7+)
TARGET_TYPE: Enemy Model / Point
RANGE: Weapon Range Characteristic
DESCRIPTION: Make a Ranged Attack using an equipped Ranged Weapon against a target in Line of Sight and range. Success hits target and leads to Injury Roll.
VALIDATION_RULES:
  - Cannot take Shoot Action if model took Charge or Fight Action in same Activation, UNLESS using an ASSAULT weapon.
  - Must check Line of Sight and Cover (-1 DICE if target in cover).
  - Add -1 DICE if target is at Long Range (> 1/2 max range).
  - If shooting into Melee, roll D6: 1-3 hits random friendly model in melee.
LINKS: [ACT_FIGHT, KW_ASSAULT, KW_COVER, KW_LONG_RANGE, EFF_BLOOD_MARKER]
================================================================================

================================================================================
RECORD_ID: ACT_FIGHT
NAME: Fight Action
CATEGORY: Common Action
TAGS: [ACTION, MELEE, COMBAT]
KEYWORDS: MELEE_ATTACK, FIGHT
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Success Roll (2D6 vs 7+)
TARGET_TYPE: Enemy Model within 1"
RANGE: 1 Inch (Base Contact)
DESCRIPTION: Make a Melee Attack using an equipped Melee Weapon against an enemy model within 1". Success hits target and leads to Injury Roll.
VALIDATION_RULES:
  - Model must have a Melee Weapon equipped and be within 1" of target.
  - Cannot take Shoot Action in same activation unless ASSAULT weapon used.
  - Receive +1 DICE if model charged this activation.
  - Target receives +1 INJURY DICE if Down.
LINKS: [ACT_SHOOT, ACT_CHARGE, EFF_DOWN, KW_CHARGE_BONUS]
================================================================================

================================================================================
RECORD_ID: ACT_DIVING_CHARGE
NAME: Diving Charge Action
CATEGORY: Special Action
TAGS: [ACTION, MOVEMENT, COMBAT, RISKY]
KEYWORDS: MOVEMENT, CHARGE, DIVING_CHARGE, RISKY_ROLL
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Risky Success Roll (2D6 vs 7+)
TARGET_TYPE: Enemy Model
RANGE: Height Jump (3"+ vertical drop) into 1" contact
DESCRIPTION: Convert a Charge action into a Diving Charge by jumping down at least 3" from high terrain into base contact with enemy. Take Risky Roll after landing: if successful, avoid falling injury and gain +1 DICE on next Melee Attack!
VALIDATION_RULES:
  - Must jump down at least 3" vertically.
  - Must land within 1" of target.
  - IF FAILED: Model is taken DOWN and suffers Falling Injury Roll immediately.
LINKS: [ACT_CHARGE, ACT_JUMP_DOWN, EFF_DOWN]
================================================================================

================================================================================
RECORD_ID: ACT_JUMP_GAP
NAME: Jump Over Gap Action
CATEGORY: Movement Action
TAGS: [ACTION, MOVEMENT, TERRAIN, RISKY]
KEYWORDS: MOVEMENT, JUMP_GAP, RISKY_ROLL
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: Part of Movement
REQUIRES_ROLL: Risky Success Roll (2D6 vs 7+)
TARGET_TYPE: Self / Terrain Edge
RANGE: Gap Width + Movement <= M"
DESCRIPTION: Attempt to jump across a horizontal gap between terrain features. If total move <= M", take Risky Success Roll. Success clears gap; Failure results in model Falling off ledge.
VALIDATION_RULES:
  - Total move distance including gap width must not exceed M".
  - Failure results in immediate Fall from edge and Falling Injury Roll.
LINKS: [ACT_MOVE, ACT_JUMP_DOWN, EFF_DOWN]
================================================================================

================================================================================
RECORD_ID: ACT_STAND_UP
NAME: Stand Up Action
CATEGORY: Common Action
TAGS: [ACTION, MOVEMENT, RECOVERY]
KEYWORDS: RECOVERY, STAND_UP
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: Automatic on Activation
REQUIRES_ROLL: False
TARGET_TYPE: Self
RANGE: Self
DESCRIPTION: A model that is DOWN stands back up automatically when it is next Activated. However, its Movement Characteristic (M") is HALVED for the rest of that Activation.
VALIDATION_RULES:
  - Must be DOWN prior to activation.
  - Halves M" for all move/charge actions taken during that activation.
LINKS: [EFF_DOWN, ACT_MOVE]
================================================================================

================================================================================
RECORD_ID: ACT_CAST_SPELL
NAME: Cast Spell / Miracle Action
CATEGORY: Magic / Faith Action
TAGS: [ACTION, MAGIC, MIRACLE, SPELL]
KEYWORDS: SPELLCASTING, GOETIC_MAGIC, PRAYER, MIRACLE
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Action per Activation
REQUIRES_ROLL: Success Roll / Risky Roll (Per Spell Profile)
TARGET_TYPE: Per Spell Profile
RANGE: Per Spell Profile
DESCRIPTION: Perform a spell, prayer, or miracle action granted by model profile or battlekit.
VALIDATION_RULES:
  - Cannot cast the same spell more than once per Activation.
  - Ranged spell attacks do NOT count as Shoot Actions (can combine with other actions).
LINKS: [SPL_BURNING_INFERNO, SPL_BLACK_HEART, SPL_SACRIFICE_COMMAND]
================================================================================
"""

# ==============================================================================
# 02_WEAPON_AND_EQUIPMENT_KEYWORDS.txt
# ==============================================================================
files_data["02_WEAPON_AND_EQUIPMENT_KEYWORDS.txt"] = """================================================================================
DATABASE: WEAPON AND EQUIPMENT KEYWORDS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Property keywords applied to weapons, armor, and battlekit
================================================================================

================================================================================
RECORD_ID: KW_ASSAULT
NAME: Assault
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, COMBAT_FLEXIBILITY]
DESCRIPTION: Weapons with the ASSAULT keyword allow the wielding model to perform both a Shoot Action and a Charge or Fight Action during the same Activation.
APPLIES_TO: Ranged Weapons
EFFECT_RULES: Removes standard restriction prohibiting Shoot + Charge/Fight in same activation.
LINKS: [ACT_SHOOT, ACT_CHARGE, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: KW_AUTOMATIC_X
NAME: Automatic X
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, MULTI_ATTACK]
DESCRIPTION: Weapon fires a rapid burst of fire. Allows making X separate Ranged Attacks sequentially against targets in range during a single Shoot Action.
APPLIES_TO: Automatic Pistols, Submachine Guns, Heavy Machine Guns
EFFECT_RULES: Make X individual success rolls and injury rolls one after another.
LINKS: [ACT_SHOOT, ABL_GUNSLINGER]
================================================================================

================================================================================
RECORD_ID: KW_BLAST_X
NAME: Blast X
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, AREA_EFFECT]
DESCRIPTION: Weapon explodes upon impact. Target a point on the ground or model. All models within X inches of the target point are hit by the attack.
APPLIES_TO: Grenades, Mortars, Artillery, Explosives
EFFECT_RULES: Roll separate Injury Rolls for every model caught within X" radius.
LINKS: [ACT_SHOOT, KW_DEADLY]
================================================================================

================================================================================
RECORD_ID: KW_DEADLY
NAME: Deadly
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, HIGH_DAMAGE]
DESCRIPTION: Extremely destructive weapon causing catastrophic trauma.
APPLIES_TO: Heavy Weapons, Explosives, Greatswords
EFFECT_RULES: When converted to a Bloodbath Roll, roll 4D6 and SUM ALL FOUR DICE together instead of 3D6!
LINKS: [EFF_BLOOD_MARKER, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: KW_HEAVY
NAME: Heavy
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, RESTRICTION]
DESCRIPTION: Cumbersome or high-recoil weapon requiring preparation or support.
APPLIES_TO: Heavy Machine Guns, Anti-Tank Rifles, Flame Throwers
EFFECT_RULES: Model cannot take a Move/Dash Action and a Shoot Action in the same Activation unless supported or mounted.
LINKS: [ACT_SHOOT, ACT_MOVE]
================================================================================

================================================================================
RECORD_ID: KW_CLEAVE_X
NAME: Cleave X
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, ARMOUR_PENETRATION]
DESCRIPTION: Weapon punches through physical armor. Ignores up to X points of target ARMOUR characteristic, or adds +X INJURY MODIFIER.
APPLIES_TO: Warhammers, Trench Axes, Power Weapons
EFFECT_RULES: Reduces target Armour rating by X when resolving Injury Roll.
LINKS: [KW_ARMOUR_X, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: KW_IGNORE_COVER
NAME: Ignore Cover
CATEGORY: Weapon Keyword
TAGS: [KEYWORD, WEAPON, ACCURACY]
DESCRIPTION: Weapon negates defensive obscuration or barricades.
APPLIES_TO: Flamethrowers, Gas Grenades, Seek Spells
EFFECT_RULES: Target does not gain the -1 DICE penalty for being in Cover against attacks made with this weapon.
LINKS: [ACT_SHOOT, KW_COVER]
================================================================================

================================================================================
RECORD_ID: KW_SHIELD
NAME: Shield
CATEGORY: Armour / Gear Keyword
TAGS: [KEYWORD, DEFENSE, ARMOUR]
DESCRIPTION: Defensive barrier carried in off-hand. Grants +1 Armour rating against frontal ranged/melee attacks and enables Parry.
APPLIES_TO: Trench Shields, Tower Shields
EFFECT_RULES: +1 Armour rating; allows model to force opponent reroll on 1 melee hit.
LINKS: [KW_ARMOUR_X, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: KW_ARMOUR_X
NAME: Armour X
CATEGORY: Profile Keyword
TAGS: [KEYWORD, PROFILE, DEFENSE]
DESCRIPTION: Physical protection rating. Reduces final Injury Roll total by X.
APPLIES_TO: Body Armour, Helmets, Natural Carapace
EFFECT_RULES: Subtract X from total on Injury Roll Table (e.g. Armour 1 turns a 7 into a 6, saving model from Out of Action!).
LINKS: [ACT_SHOOT, ACT_FIGHT, KW_CLEAVE_X]
================================================================================

================================================================================
RECORD_ID: KW_PARRY
NAME: Parry
CATEGORY: Weapon / Gear Keyword
TAGS: [KEYWORD, MELEE, DEFENSE]
DESCRIPTION: Ability to deflect incoming melee strikes.
APPLIES_TO: Swords, Daggers, Shields
EFFECT_RULES: Force opponent to reroll one successful Melee Attack hit roll per turn.
LINKS: [ACT_FIGHT, KW_SHIELD]
================================================================================
"""

# ==============================================================================
# 03_UNIT_AND_FACTION_ABILITIES.txt
# ==============================================================================
files_data["03_UNIT_AND_FACTION_ABILITIES.txt"] = """================================================================================
DATABASE: UNIT AND FACTION ABILITIES
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Unit traits, passive abilities, and faction special powers
================================================================================

================================================================================
RECORD_ID: ABL_STEALTH_GENERATOR
NAME: Stealth Generator
CATEGORY: Unit Ability
TAGS: [ABILITY, DEFENSE, STEALTH]
FACTION: Heretic Legions (Death Commando)
TRIGGER_PHASE: WHEN_ATTACKED
DESCRIPTION: Distorts light and sound around the model. Enemy models cannot target this model with Ranged Attacks if the distance is greater than 12", unless the attack is a Blast targeting a point on the ground.
APPLIES_TO: Death Commando
LINKS: [ACT_SHOOT, KW_BLAST_X]
================================================================================

================================================================================
RECORD_ID: ABL_ARTIFICIAL_LIFE
NAME: Artificial Life
CATEGORY: Unit Ability
TAGS: [ABILITY, DEFENSE, TOUGHNESS]
FACTION: New Antioch (Lion of Jabir)
TRIGGER_PHASE: WHEN_ATTACKED
DESCRIPTION: Constructed beast of alchemy and steel. Subtract -1 INJURY DICE from all Injury Rolls made FOR the Lion of Jabir.
APPLIES_TO: Lion of Jabir
LINKS: [EFF_DOWN, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: ABL_CRUSHING_BLOWS
NAME: Crushing Blows
CATEGORY: Unit Ability
TAGS: [ABILITY, MELEE, ATTACK]
FACTION: Black Grail (Lord of Tumours)
TRIGGER_PHASE: ACTIVATION_PHASE
DESCRIPTION: Lord of Tumours can make devastating unarmed melee strikes even if carrying no weapons or wielding a shield. Counts as equipped with a Cleave 1 Melee Weapon.
APPLIES_TO: Lord of Tumours
LINKS: [ACT_FIGHT, KW_CLEAVE_X, KW_SHIELD]
================================================================================

================================================================================
RECORD_ID: ABL_SLAVEMASTER
NAME: Slavemaster
CATEGORY: Unit Ability / Spell
TAGS: [ABILITY, COMMAND, CONTROL]
FACTION: Court of the Seven-Headed Serpent
TRIGGER_PHASE: ACTIVATION_PHASE
DESCRIPTION: Spellcaster can issue Carry Out Commands to friendly or enemy Yoke Fiends within 18". Can be used to compel enemy Yoke Fiends to perform Sacrifice Commands.
APPLIES_TO: Serpent Sorcerer
LINKS: [ACT_CAST_SPELL, SPL_SACRIFICE_COMMAND]
================================================================================

================================================================================
RECORD_ID: ABL_GUNSLINGER
NAME: Gunslinger
CATEGORY: Campaign Skill / Ability
TAGS: [ABILITY, SKILL, MULTI_ATTACK]
FACTION: Universal / Ranged Skill
TRIGGER_PHASE: ACTIVATION_PHASE
DESCRIPTION: Model armed with two Pistols can make attacks with both pistols in sequence during a single Shoot or Fight Action. Ignore Off-Hand Weapon penalty for second pistol.
APPLIES_TO: Models with Ranged Skill table access
LINKS: [ACT_SHOOT, ACT_FIGHT, KW_AUTOMATIC_X]
================================================================================

================================================================================
RECORD_ID: ABL_TOUGH
NAME: Tough
CATEGORY: Unit Trait
TAGS: [ABILITY, DEFENSE, SURVIVAL]
FACTION: Universal
TRIGGER_PHASE: WHEN_INJURED
DESCRIPTION: Exceptionally resilient warrior. The first time in a battle that an Injury Roll results in DOWN, treat it as NO EFFECT instead.
APPLIES_TO: Elites, Monsters, Champions
LINKS: [EFF_DOWN, EFF_OUT_OF_ACTION]
================================================================================

================================================================================
RECORD_ID: ABL_DEVOUR_THE_GUILTY
NAME: Devour the Guilty
CATEGORY: Unit Ability
TAGS: [ABILITY, RECOVERY, REAP]
FACTION: Cult of the Black Grail
TRIGGER_PHASE: ACTIVATION_PHASE
DESCRIPTION: When in base contact with a DOWN model (friendly or enemy), perform a Devour Action to instantly remove the Down model from play and restore 1D3 wounds / remove Blood Markers.
APPLIES_TO: Hounds of Abaddon, Black Grail Behemoths
LINKS: [EFF_DOWN, EFF_BLOOD_MARKER]
================================================================================
"""

# ==============================================================================
# 04_STATUS_EFFECTS_AND_CONDITIONS.txt
# ==============================================================================
files_data["04_STATUS_EFFECTS_AND_CONDITIONS.txt"] = """================================================================================
DATABASE: STATUS EFFECTS AND CONDITIONS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Game conditions, markers, and states affecting models or warbands
================================================================================

================================================================================
RECORD_ID: EFF_DOWN
NAME: Down State
CATEGORY: Model Status Condition
TAGS: [STATUS, CONDITION, DEBUFF]
TRIGGER_PHASE: PASSIVE / ON_INJURY
DESCRIPTION: Model has been knocked down or severely wounded.
GAMEPLAY_EFFECTS:
  - If taken Down during Activation: Activation ENDS IMMEDIATELY.
  - Model suffers -1 DICE on ALL Success Rolls while Down.
  - Enemy Melee Attacks against a Down model gain +1 INJURY DICE.
  - Stand Up Action occurs automatically on next activation, halving M" for that turn.
  - Opponent can spend 3 Blood Markers (instead of 6) to convert Injury Roll to Bloodbath Roll against Down model.
LINKS: [ACT_STAND_UP, ACT_FIGHT, EFF_BLOOD_MARKER]
================================================================================

================================================================================
RECORD_ID: EFF_OUT_OF_ACTION
NAME: Out of Action State
CATEGORY: Model Status Condition
TAGS: [STATUS, CASUALTY, REMOVED]
TRIGGER_PHASE: ON_INJURY
DESCRIPTION: Model has been killed, incapacitated, or permanently disabled. Removed from battlefield immediately.
GAMEPLAY_EFFECTS:
  - Model is removed from battlefield.
  - Counts towards Warband Morale Casualty Threshold.
LINKS: [EFF_SHAKEN, ACT_FIGHT, ACT_SHOOT]
================================================================================

================================================================================
RECORD_ID: EFF_SHAKEN
NAME: Shaken Warband State
CATEGORY: Warband Status Condition
TAGS: [STATUS, WARBAND_DEBUFF, MORALE]
TRIGGER_PHASE: MORALE_PHASE / PASSIVE
DESCRIPTION: Warband has suffered heavy casualties and lost resolve following a failed Morale Check.
GAMEPLAY_EFFECTS:
  - ALL Success Rolls taken for models in a Shaken Warband are treated as RISKY SUCCESS ROLLS.
  - Failed rolls immediately end model activations.
  - Mandatory Morale Check retest in every subsequent Morale Phase.
LINKS: [ACT_DASH, ACT_RETREAT]
================================================================================

================================================================================
RECORD_ID: EFF_BLOOD_MARKER
NAME: Blood Marker
CATEGORY: Resource / Debuff Token
TAGS: [TOKEN, MARKER, INJURY, DEBUFF]
TRIGGER_PHASE: ANY_TIME / ACTIVATION / COMBAT
MAX_STACK: 6 Tokens per Model
DESCRIPTION: Represents physical wounds, trauma, shellshock, or fatigue.
GAMEPLAY_EFFECTS:
  - Opponent can spend 1-3 Blood Markers when you take a Success Roll to add -1 to -3 DICE to your roll.
  - Opponent can spend Blood Markers when injuring your model to add +1 INJURY DICE per marker.
  - Opponent can spend 6 Blood Markers (or 3 if Down) to trigger a Bloodbath Roll (roll 3D6/4D6 sum all).
LINKS: [EFF_DOWN, ACT_SHOOT, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: EFF_BLESSING_MARKER
NAME: Blessing Marker
CATEGORY: Resource / Buff Token
TAGS: [TOKEN, MARKER, FAITH, BUFF]
TRIGGER_PHASE: ANY_TIME
MAX_STACK: Uncapped
DESCRIPTION: Represents divine favor, holy inspiration, or demonic empowerment.
GAMEPLAY_EFFECTS:
  - Spend 1 Blessing Marker to reroll a failed Success Roll for a friendly model.
  - Spend Blessing Markers to add +DICE to attacks or spellcasting.
LINKS: [ACT_CAST_SPELL, ACT_SHOOT, ACT_FIGHT]
================================================================================

================================================================================
RECORD_ID: EFF_ON_FIRE
NAME: Ignited / On Fire State
CATEGORY: Damage Over Time Condition
TAGS: [STATUS, HAZARD, FIRE]
TRIGGER_PHASE: START_OF_ACTIVATION
DESCRIPTION: Model has been set ablaze by incendiary weapons or hellfire.
GAMEPLAY_EFFECTS:
  - At start of model's Activation, suffer an immediate automatic Injury Roll with +1 INJURY DICE.
  - Model must spend 1 Action to Stop, Drop & Roll (Risky Roll vs 7+) to extinguish fire.
LINKS: [KW_BLAST_X, EFF_DOWN]
================================================================================
"""

# ==============================================================================
# 05_MAGIC_MIRACLES_AND_COMMANDS.txt
# ==============================================================================
files_data["05_MAGIC_MIRACLES_AND_COMMANDS.txt"] = """================================================================================
DATABASE: MAGIC, MIRACLES, AND COMMANDS
SYSTEM: TRENCH CRUSADE v1.0.2 DATABASE
DESCRIPTION: Registry of Goetic spells, divine miracles, prayers, and military commands
================================================================================

================================================================================
RECORD_ID: SPL_BURNING_INFERNO
NAME: Burning Inferno
CATEGORY: Spell / Goetic Magic
TAGS: [SPELL, GOETIC_MAGIC, RANGED_ATTACK]
FACTION: Court of the Seven-Headed Serpent / Heretic Legions
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Cast Spell Action
REQUIRES_ROLL: Success Roll (2D6 vs 7+)
RANGE: 18 Inches (Line of Sight)
DESCRIPTION: Sorcerer unleashes a column of hellfire. Counts as a Ranged Attack causing an Injury Roll with +1 INJURY DICE and setting target ON FIRE. Does NOT count as a Shoot Action.
LINKS: [ACT_CAST_SPELL, ACT_SHOOT, EFF_ON_FIRE]
================================================================================

================================================================================
RECORD_ID: SPL_BLACK_HEART
NAME: Black Heart
CATEGORY: Spell / Goetic Power (Greed)
TAGS: [SPELL, GOETIC_MAGIC, REACTION, BUFF]
FACTION: Court of the Seven-Headed Serpent
TRIGGER_PHASE: OUTSIDE_ACTIVATION / REACTION
ACTION_COST: Free Reaction
REQUIRES_ROLL: Success Roll vs 7+
RANGE: Self
DESCRIPTION: Enables the Sorcerer to add +1 DICE or reroll a Success Roll taken outside of its own Activation (e.g. defensive tests, morale, opportunity strikes). Cannot be cast > once per turn.
LINKS: [ACT_CAST_SPELL, EFF_BLESSING_MARKER]
================================================================================

================================================================================
RECORD_ID: SPL_SACRIFICE_COMMAND
NAME: Sacrifice Command
CATEGORY: Command / Compulsion
TAGS: [COMMAND, SACRIFICE, CONTROL]
FACTION: Court of the Seven-Headed Serpent
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Command Action
REQUIRES_ROLL: Automatic / Success Roll vs Target
RANGE: 18 Inches (Yoke Fiends)
DESCRIPTION: Order a controlled Yoke Fiend (friendly or enemy via Slavemaster) to execute itself, triggering an explosive burst damaging all adjacent models.
LINKS: [ABL_SLAVEMASTER, KW_BLAST_X, EFF_OUT_OF_ACTION]
================================================================================

================================================================================
RECORD_ID: SPL_DIVINE_JUDGEMENT
NAME: Divine Judgement
CATEGORY: Miracle / Prayer
TAGS: [MIRACLE, PRAYER, FAITH, SMITE]
FACTION: Trench Pilgrims / New Antioch
TRIGGER_PHASE: ACTIVATION_PHASE
ACTION_COST: 1 Miracle Action
REQUIRES_ROLL: Success Roll (2D6 vs 7+)
RANGE: 24 Inches
DESCRIPTION: Priest invokes holy wrath. Target enemy suffers an automatic hit with +1 INJURY DICE. Ignores Cover.
LINKS: [ACT_CAST_SPELL, KW_IGNORE_COVER, EFF_BLOOD_MARKER]
================================================================================
"""

for fname, content in files_data.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll actions, abilities, and effects database files created successfully in:\n{target_dir}")
