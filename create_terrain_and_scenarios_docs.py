import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

dir_terrain = r'C:\Users\vp\Downloads\tc-1.0.2\terrain_and_line_of_sight'
dir_scenarios = r'C:\Users\vp\Downloads\tc-1.0.2\scenarios_and_deployment'

os.makedirs(dir_terrain, exist_ok=True)
os.makedirs(dir_scenarios, exist_ok=True)

# Terrain & LOS
t1 = """================================================================================
TRENCH CRUSADE - TERRAIN TYPES & MOVEMENT EFFECTS
DOCUMENT CATEGORY: Core Mechanics - Terrain System
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 23, 31, 35-42)
TAG: [TERRAIN_SYSTEM: CLASSIFICATION_AND_EFFECTS]
================================================================================

1. TERRAIN CATEGORIES & MOVEMENT RULES
--------------------------------------------------------------------------------
* OPEN GROUND: Standard battlefield floor. Normal movement rate (1" move per 1" distance).

* DIFFICULT TERRAIN: Mud, ruins, debris, shallow water, heavy trenches.
  - Movement Cost: Moving through Difficult Terrain costs 2" of movement for every 1" traveled.
  - Dash Action: Can Dash through Difficult Terrain, but distance is halved.

* DANGEROUS TERRAIN: Barbed wire, toxic slush, burning wreckage, minefields.
  - Requirement: Models moving into or through Dangerous Terrain MUST take a Risky Success Roll.
  - Failure: Model suffers an automatic Injury Roll immediately and stops moving.

* IMPASSABLE TERRAIN: Deep chasms, reinforced concrete walls, high sheer steel.
  - Rule: Models cannot move through Impassable Terrain. Base cannot overlap.

* ELEVATED TERRAIN: Ledges, rooftops, walkways, ramparts.
  - Elevation Advantage: Ranged Attacks made from elevated positions (> 2" higher than target)
    gain +1 DICE on the Success Roll.
  - Fall Hazard: Models taken DOWN within 1" of an elevated ledge risk Falling (Risky test vs Fall).


2. VERTICAL SURFACES & NARROW GAPS
--------------------------------------------------------------------------------
* Climbing: Vertical surfaces cost 1" per 1" climbed unless designated Unclimbable.
* Windows & Narrow Openings: Models cannot pass through any opening smaller than their base.
  For 30x60mm bases, use the smaller dimension (30mm) to check if the model fits.
================================================================================
"""

t2 = """================================================================================
TRENCH CRUSADE - LINE OF SIGHT & COVER MECHANICS
DOCUMENT CATEGORY: Core Mechanics - Line of Sight & Cover
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 43-44)
TAG: [TERRAIN_SYSTEM: LOS_AND_COVER]
================================================================================

1. LINE OF SIGHT (LOS) DETERMINATION
--------------------------------------------------------------------------------
* 3D Sightline: Draw an imaginary straight line from any part of the attacking model's
  head/torso/base to any visible part of the target model's base or torso.
* Self-LOS (MISC Q7): A model ALWAYS has Line of Sight to itself and is within 0" of itself.
* Obscured Visibility: If terrain blocks the sightline completely, the target is NOT in LOS
  and cannot be targeted by standard Ranged Attacks.


2. COVER RULES & MODIFIERS
--------------------------------------------------------------------------------
* In Cover Definition: A target is in Cover if any part of its base/body is obscured by
  intervening terrain, trench parapets, obstacles, or friendly models relative to attacker.
* COVER MODIFIER: Adds -1 DICE to the Ranged Attack Success Roll.
* IGNORE COVER Keyword: Weapon attacks with IGNORE COVER negate the -1 DICE penalty.
* Friendly Model Cover: Friendly models do NOT block LOS, but intervening models provide
  Cover (-1 DICE) to the target.

================================================================================
"""

# Scenarios & Deployment
s1 = """================================================================================
TRENCH CRUSADE - BATTLEFIELD SETUP & DEPLOYMENT
DOCUMENT CATEGORY: Scenario Mechanics - Setup & Deployment
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & All Out War
TAG: [SCENARIO_SYSTEM: SETUP_AND_DEPLOYMENT]
================================================================================

1. BATTLEFIELD PREPARATION
--------------------------------------------------------------------------------
* Board Dimensions: Standard boards are 3' x 3' (36" x 36") or larger (4' x 4', 6' x 4').
* Terrain Placement: Players alternate placing terrain features (ruins, trenches, craters,
  barricades) to create a balanced playing field.


2. DEPLOYMENT PROCEDURE
--------------------------------------------------------------------------------
1. Roll for Table Sides / Initiative: Players roll off; winner chooses deployment zone.
2. Deployment Zones: Typically 6" or 9" from board edge, depending on scenario.
3. Alternating Deployment: Players alternate placing 1 unit at a time within their deployment
   zone until all models are deployed.
4. Infiltrate / Special Deployment: Models with INFILTRATE or SPECIAL DEPLOYMENT can deploy
   outside standard zones as specified in unit rules.
================================================================================
"""

s2 = """================================================================================
TRENCH CRUSADE - OBJECTIVE & SCENARIO RULES
DOCUMENT CATEGORY: Scenario Mechanics - Objectives & Victory
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & All Out War
TAG: [SCENARIO_SYSTEM: OBJECTIVES_AND_VICTORY]
================================================================================

1. OBJECTIVE MARKERS & RELIQUARIES
--------------------------------------------------------------------------------
* Placing Objectives: Objectives (Reliquaries, Supply Crate Markers, Control Points) are placed
  according to scenario layout (e.g. 1 center, 2 flank).
* Claiming Objectives: A model within 1" of an un-contested Objective Marker can perform a
  Claim Objective Action during its Activation.
* Controlling Objectives: A player controls an objective if they have more active models
  within 3" than the opponent.


2. VICTORY CONDITIONS & GAME END
--------------------------------------------------------------------------------
* Fixed Turn Limit: Standard scenarios last 5 to 6 Game Turns.
* Victory Point (VP) Calculation:
  - Controlling Objective Markers at end of game.
  - Taking enemy Leaders / Champions Out of Action.
  - Forcing enemy Warband to Rout.
* Instant Victory: If an enemy Warband Routs completely or is wiped off the battlefield,
  the remaining player wins an immediate victory.
================================================================================
"""

with open(os.path.join(dir_terrain, "01_TERRAIN_TYPES_AND_EFFECTS.txt"), 'w', encoding='utf-8') as f:
    f.write(t1.strip() + '\n')

with open(os.path.join(dir_terrain, "02_LINE_OF_SIGHT_AND_COVER_RULES.txt"), 'w', encoding='utf-8') as f:
    f.write(t2.strip() + '\n')

with open(os.path.join(dir_scenarios, "01_BATTLEFIELD_SETUP_AND_DEPLOYMENT.txt"), 'w', encoding='utf-8') as f:
    f.write(s1.strip() + '\n')

with open(os.path.join(dir_scenarios, "02_OBJECTIVE_AND_SCENARIO_RULES.txt"), 'w', encoding='utf-8') as f:
    f.write(s2.strip() + '\n')

print("Created terrain and scenario infrastructure files successfully!")
