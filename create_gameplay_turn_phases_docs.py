import os
import sys

# Configure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\turn_phases_gameplay'
os.makedirs(target_dir, exist_ok=True)

files_content = {}

# 00_OVERVIEW_AND_GAME_SEQUENCE.txt
files_content["00_OVERVIEW_AND_GAME_SEQUENCE.txt"] = """================================================================================
TRENCH CRUSADE - GAMEPLAY & TURN PHASES OVERVIEW
DOCUMENT CATEGORY: Game Sequence & Core Mechanics
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & Rules Commentaries v1.0.2
TAG: [SECTION: GAME_SEQUENCE_OVERVIEW]
================================================================================

1. GAME STRUCTURE & TURN SEQUENCE
--------------------------------------------------------------------------------
A game of Trench Crusade is played in a series of Game Turns. Each Game Turn
represents a brief, chaotic fragment of battle and is divided into three distinct
Phases that must be carried out in the following strict order:

   1. INITIATIVE PHASE:
      Players count their active models on the battlefield to determine who has
      the Initiative for the turn. Start-of-Turn tasks and simultaneous effects
      are resolved in the order chosen by the player with Initiative.

   2. ACTIVATION PHASE:
      The core gameplay phase. Players alternate Activating their models one at a
      time to move, shoot, charge, fight, dash, or perform special actions.

   3. MORALE PHASE:
      At the end of the turn, Warbands that have suffered heavy casualties (half or
      more models Down or Out of Action) must take Morale Checks to avoid becoming
      Shaken or Routing.

Once the Morale Phase is completed, the Turn ends, and a new Turn begins starting
with Phase 1 (Initiative Phase).


2. DICE & ROLL MECHANICS
--------------------------------------------------------------------------------
* Standard Dice: Six-sided dice (D6).
* D3 Rolls: Roll a D6 and halve the result (1-2 = 1, 3-4 = 2, 5-6 = 3).
* Success Roll: Standard check taken by rolling 2D6 + modifiers vs a Target Number.
* Risky Success Roll: A roll where failure incurs immediate penalties (e.g. Dashing
  fails and ends Activation; failed terrain jumps cause Falls).
* +DICE / -DICE System:
  - Adding +1 DICE means rolling an additional D6 (e.g. 3D6) and picking the 2 HIGHEST dice.
  - Adding -1 DICE means rolling an additional D6 (e.g. 3D6) and picking the 2 LOWEST dice.
  - +DICE and -DICE cancel each other out on a 1-to-1 basis before rolling.
* Critical Success: Rolling double 6s (natural 12 on two highest dice) produces a
  Critical Success, granting bonus effects (e.g. +1 INJURY DICE on attacks).


3. PLAYING SURFACE & SCENARIO INTEGRATION
--------------------------------------------------------------------------------
* Standard Board Size: Typically 3' x 3' (36" x 36") or larger (e.g. 4' x 4').
* Distance Measurement: Always measured in inches (") from the closest edge of an
  attacking/moving model's base to the target's base.
* Victory Conditions: Determined by the specific scenario being played (e.g. Looting,
  Assassination, King of the Hill) or table wipe.

================================================================================
"""

# 01_INITIATIVE_PHASE_RULES.txt
files_content["01_INITIATIVE_PHASE_RULES.txt"] = """================================================================================
TRENCH CRUSADE - PHASE 1: INITIATIVE PHASE
DOCUMENT CATEGORY: Turn Phases - Phase 1 Rules
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 14, 18, 32) & Commentaries
TAG: [PHASE: 1_INITIATIVE_PHASE]
================================================================================

1. DETERMINING INITIATIVE
--------------------------------------------------------------------------------
At the start of every Game Turn during Phase 1:

1. Count Active Models: Both players count the number of models in their Warband
   currently on the battlefield.
   * EXCLUSIONS: Do NOT count models that are currently DOWN or OUT OF ACTION.
2. Fewest Models Wins Initiative: The player with the fewest active models gains
   the Initiative for the remainder of the Game Turn.
3. Tie-Breaker Roll-Off: If both Warbands have the exact same number of active
   models, both players roll a D6. The player with the higher roll wins Initiative.
   Reroll any ties.


2. START OF TURN TASKS
--------------------------------------------------------------------------------
Certain rules, battlekit items, or scenario conditions require players to perform
actions at "the start of the Turn".

* Initiative Resolution: If multiple start-of-turn tasks must be resolved at the
  same time, the player who currently holds the Initiative decides the exact order
  in which all start-of-turn tasks are carried out.


3. SIMULTANEOUS ACTIVITIES & CONFLICT RESOLUTION
--------------------------------------------------------------------------------
Whenever two rules or effects trigger at the exact same time:
* The player with Initiative dictates the exact sequence and timing of resolution.
* OFFICAL COMMENTARY FAQ (RULES Q1): If Blood Markers and Blessing Markers can be
  applied to the same roll, the player holding Initiative determines the order in
  which they are applied.


4. STRATEGIC VALUE OF INITIATIVE
--------------------------------------------------------------------------------
The player holding Initiative gains two major tactical advantages for the turn:
1. Choice of First Activation: They choose which player Activates a model first in
   Phase 2 (Activation Phase).
2. Priority in Tie-Breakers & Trigger Ordering.

================================================================================
"""

# 02_ACTIVATION_PHASE_AND_ACTIONS.txt
files_content["02_ACTIVATION_PHASE_AND_ACTIONS.txt"] = """================================================================================
TRENCH CRUSADE - PHASE 2: ACTIVATION PHASE & ACTIONS
DOCUMENT CATEGORY: Turn Phases - Phase 2 Rules
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 15, 20, 33-35)
TAG: [PHASE: 2_ACTIVATION_PHASE]
================================================================================

1. ACTIVATION SEQUENCE
--------------------------------------------------------------------------------
1. Initiative Choice: The player with Initiative decides who Activates first.
2. Alternating Activations: Players take turns selecting and Activating ONE un-activated
   model from their Warband.
3. Remaining Activations: If one player runs out of models to Activate, the opponent
   Activates all of their remaining un-activated models one after another.
4. Completion: Once every model on the battlefield has been Activated once, the
   Activation Phase ends and play moves to Phase 3 (Morale Phase).


2. ACTION ECONOMY RULES
--------------------------------------------------------------------------------
During a model's Activation, it can take one or more ACTIONS.
* Execution Order: Actions can be taken in any sequence.
* Single Action Constraint: Each TYPE of Action can only be taken ONCE per Activation,
  unless explicitly permitted by a rule or keyword.
  - Example Allowed: Dash, then Shoot, then Move.
  - Example Illegal: Shoot, then Move, then Shoot again (Shoot taken twice).
* Ranged vs Melee/Charge Constraint: A model CANNOT take a Shoot ACTION and a
  Charge or Fight ACTION during the same Activation, UNLESS using a ranged weapon
  with the ASSAULT keyword.


3. COMMON ACTIONS LIST
--------------------------------------------------------------------------------
* MOVE: Move up to Movement Characteristic (M") in any direction. Cannot enter within
  1" of an enemy.
* CHARGE: Target an enemy within Line of Sight and 12". Roll D6 + M" and move towards
  target into base contact (within 1"). Cannot be taken if already within 1" of enemy.
* RETREAT: Special move used to disengage when starting within 1" of an enemy.
* DASH: Move up to M" in any direction. REQUIRES a Risky Success Roll FIRST.
  - Success: Perform the Dash move.
  - Failure: Activation IMMEDIATELY ENDS; no movement made.
* SHOOT: Make a Ranged Attack using an equipped Ranged Weapon.
* FIGHT: Make a Melee Attack against an enemy model within 1" / base contact.
* SPECIAL / SKILL ACTIONS: Unique actions granted by Warband entries, Battlekit,
  or Spells (e.g. Cast Spell, Carry Out Command). Count against the once-per-type limit.


4. RISKY SUCCESS ROLLS & FAILURE CONSEQUENCES
--------------------------------------------------------------------------------
Certain actions (e.g. Dash, Jumping Gaps, Climbing Dangerous Ledges) require a Risky
Success Roll:
* If a Risky Success Roll FAILS: The model's Activation ENDS IMMEDIATELY.
* If a model is taken DOWN during its Activation: Its Activation ENDS IMMEDIATELY.

================================================================================
"""

# 03_MOVEMENT_AND_POSITIONING_RULES.txt
files_content["03_MOVEMENT_AND_POSITIONING_RULES.txt"] = """================================================================================
TRENCH CRUSADE - MOVEMENT & POSITIONING MECHANICS
DOCUMENT CATEGORY: Gameplay Rules - Movement & Terrain
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 35-42) & Commentaries
TAG: [MECHANICS: MOVEMENT_POSITIONING]
================================================================================

1. GENERAL MOVEMENT RULES
--------------------------------------------------------------------------------
* Path Length: Measured in inches along the path traveled, not exceeding Movement (M").
* Pivoting: Models can pivot freely during movement without spending inches.
* Friendly Models: A model can move across friendly models ONLY if it has enough
  movement to pass their bases entirely.
* Enemy Models (Engagement Zone - 1"):
  - Standard Move/Dash cannot bring a model within 1" of an enemy model.
  - To enter within 1" of an enemy, a model MUST perform a CHARGE Action.
  - If starting within 1" of an enemy, a model can only move if it remains within 1"
    of ALL enemies it started near, OR performs a RETREAT Action.


2. RETREAT ACTIONS
--------------------------------------------------------------------------------
* Used to disengage from enemy models within 1".
* Must take a Risky Success Roll.
* If successful, move up to M" away from enemy models.
* Enemies previously within 1" may make a free Opportunity Melee Attack before the retreat.


3. VERTICAL MOVEMENT & TERRAIN
--------------------------------------------------------------------------------
* Climbing: Vertical surfaces can be climbed at normal movement cost unless designated
  Unclimbable.
* Jumping Over Gaps:
  - If gap distance + prior move <= M", make a Risky Success Roll.
  - Success: Clear the gap.
  - Failure: Model falls from the edge.
* Jumping Down:
  - Can jump down up to 3" without harm.
  - Jumping down > 3" requires a Risky Success Roll. Failure results in a Fall.
* Falling Mechanics:
  - If a model falls, take a Falling Injury Roll: 2D6 + 1 INJURY DICE per 2" fallen.
  - Model is placed Down at the bottom of the drop.


4. BASE SIZES & LINE OF SIGHT
--------------------------------------------------------------------------------
* Base Dimensions (MISC. Q1): For models with rectangular bases (e.g. 30x60mm), use
  the LARGER dimension (60mm) when checking rules based on size (above/below 40mm).
* Movement through Gaps (RULES Q7): A model cannot move through any gap or window
  smaller than its base size. Use the SMALLER dimension (30mm) for 30x60mm bases
  when checking if it fits through narrow openings.

================================================================================
"""

# 04_COMBAT_AND_INJURY_RESOLUTION.txt
files_content["04_COMBAT_AND_INJURY_RESOLUTION.txt"] = """================================================================================
TRENCH CRUSADE - COMBAT & INJURY RESOLUTION
DOCUMENT CATEGORY: Gameplay Rules - Combat & Damage
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 43-49)
TAG: [MECHANICS: COMBAT_INJURIES]
================================================================================

1. RANGED ATTACK SEQUENCE
--------------------------------------------------------------------------------
1. Pick Target: Must be in Line of Sight (LOS) and within Weapon Range.
2. Determine Modifiers:
   - Short Range: Distance <= Half Max Range (Standard Roll).
   - Long Range: Distance > Half Max Range (Add -1 DICE to attack roll).
   - Cover: Target behind obscuring terrain (Add -1 DICE to attack roll).
3. Make Success Roll: Roll 2D6 + Modifiers vs Target Number.
   - Failure: Attack misses.
   - Success: Target hit -> Proceed to Injury Roll.
   - Critical Success (Double 6s): Target hit -> Add +1 INJURY DICE to Injury Roll.
4. Shooting into Melee: If target is in combat with friendly models, roll D6. On 1-3,
   the attack targets a random friendly model in the combat instead!


2. MELEE ATTACK SEQUENCE
--------------------------------------------------------------------------------
1. Requirement: Attacker must be within 1" / base contact of target.
2. Select Weapon: Pick equipped Melee Weapon.
3. Modifiers:
   - Charge Bonus: Add +1 DICE to Melee Success Roll on turn model charged.
   - Diving Charge: Jumping down 3"+ into contact grants +1 DICE on hit roll if
     Risky test succeeds.
4. Take Success Roll: Resolve hit. On success, proceed to Injury Roll.


3. INJURY ROLLS & RESULTS TABLE
--------------------------------------------------------------------------------
To resolve an injury: Roll 2D6 + (Injury Dice). Pick the 2 HIGHEST (if +DICE) or
2 LOWEST (if -DICE), add modifiers, and look up result on Injury Table:

   Roll Result       Outcome
   -----------------------------------------------------------------------------
   1 or less         NO EFFECT. Model is unharmed.
   2 - 6             DOWN. Model knocked Down. Activation ends if active.
   7 or higher       OUT OF ACTION. Model is killed or incapacitated (removed).


4. RULES FOR DOWN MODELS
--------------------------------------------------------------------------------
* If taken Down during Activation: Activation ENDS immediately.
* Modifiers against Down models:
  - Model suffers -1 DICE on all Success Rolls while Down.
  - Enemy Melee Attacks against a Down target gain +1 INJURY DICE.
* Standing Up: A Down model stands up when next Activated, but its Movement (M")
  is HALVED for that Activation.
* Fall Risk: If taken Down within 1" of a ledge, make a Success Roll. If failed,
  the model falls off the ledge!


5. BLOOD & BLESSING MARKERS
--------------------------------------------------------------------------------
* Blood Markers: Gained when models suffer damage or hits.
  - Bloodbath Roll: Spend 6 BLOOD MARKERS (or 3 if target is Down) to convert an
    Injury Roll into a Bloodbath Roll (Roll 3D6/4D6 and sum ALL dice!).
* Blessing Markers: Can be spent to add +DICE or reroll failed Success Rolls.

================================================================================
"""

# 05_MORALE_PHASE_AND_ROUT_RULES.txt
files_content["05_MORALE_PHASE_AND_ROUT_RULES.txt"] = """================================================================================
TRENCH CRUSADE - PHASE 3: MORALE PHASE & ROUT MECHANICS
DOCUMENT CATEGORY: Turn Phases - Phase 3 Rules
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 21, 50-51) & Commentaries
TAG: [PHASE: 3_MORALE_PHASE]
================================================================================

1. CASUALTY THRESHOLD & MORALE CHECK TRIGGER
--------------------------------------------------------------------------------
In Phase 3 (Morale Phase), check if your Warband has reached its Casualty Threshold:

* Threshold Condition: Half or more of the models in your Warband are DOWN or OUT OF ACTION.
* Rounding Rule: Fractions are ALWAYS rounded UP.
  - Example 1: Warband of 5 models -> Half is 2.5 -> 3 casualties needed for check.
  - Example 2: Warband of 7 models -> Half is 3.5 -> 4 casualties needed for check.
* Mandatory Check: If the threshold is met, the player MUST take a Morale Check.


2. EXCLUSION RULES FOR MODEL COUNTS
--------------------------------------------------------------------------------
* Trench Dogs (CAMPAIGNS Q3): Count towards maximum field strength, but do NOT count
  as models for Morale Check casualty calculations.


3. MORALE CHECK RESOLUTION & SHAKEN STATUS
--------------------------------------------------------------------------------
A Morale Check is a Success Roll taken for the Warband.

* SUCCESS: The Warband maintains discipline and continues fighting normally.
* FAILURE -> WARBAND BECOMES SHAKEN:
  - Shaken Penalty: ALL Success Rolls taken for models in a Shaken Warband are
    automatically treated as RISKY SUCCESS ROLLS (unless already Risky).
  - Mandatory Retest: In the Morale Phase of subsequent turns, a Shaken Warband
    MUST take another Morale Check, even if casualties drop below half.
  - Recovery: If the subsequent Morale Check is successful, the Warband removes
    the Shaken status.


4. ROUT & SURRENDER
--------------------------------------------------------------------------------
* Voluntary Rout: During the Morale Phase, a player with a Shaken Warband may choose
  to voluntarily Rout and concede the battle to prevent further casualties.
* Involuntary Rout: Specific scenario rules or consecutive failed Morale Checks may
  cause a Warband to automatically Rout, immediately ending the game.

================================================================================
"""

# 06_TURN_PHASES_FAQ_AND_COMMENTARIES.txt
files_content["06_TURN_PHASES_FAQ_AND_COMMENTARIES.txt"] = """================================================================================
TRENCH CRUSADE - OFFICIAL RULES COMMENTARY & FAQS (TURN PHASES)
DOCUMENT CATEGORY: Official Clarifications & FAQs
SOURCE: Rules Commentaries Version 1.0.2 (Official FAQ Document)
TAG: [FAQ: OFFICIAL_COMMENTARIES_1.0.2]
================================================================================

Q1: In what order do players apply BLOOD and BLESSING MARKERS to the same roll?
--------------------------------------------------------------------------------
A: If two things happen at the same time, the player who has the Initiative determines
   the order in which they are performed. (Page 32 of Digital Rulebook).


Q2: Is 'Move or Charge or Retreat' a single ACTION? Or are they each a different
    type of ACTION?
--------------------------------------------------------------------------------
A: They are different types of ACTION: a Move ACTION, a Charge ACTION, and a Retreat
   ACTION. However, a model cannot take more than one of them during the same Activation.
   If you want to move a model more than once, you must use a Dash ACTION instead.


Q3: Can you declare a Retreat ACTION for a model even if it is unable to move?
--------------------------------------------------------------------------------
A: Yes. However, even though the model cannot move, it is still subject to being
   attacked as if it had Retreated (unless stated otherwise).


Q7: Can a model move through windows in buildings or narrow gaps in general?
--------------------------------------------------------------------------------
A: A model cannot move through any space (e.g. a window, a corridor, a gap between
   terrain pieces) that is smaller than its base size. If a model has a base with two
   dimensions (e.g. 30mm by 60mm), use the smaller dimension when determining if it
   can move through a space.


Q8: Do all ACTIONS require making Success Rolls or Risky Success Rolls?
--------------------------------------------------------------------------------
A: No, ACTIONS that require Success Rolls are specified in the rule text of the ACTION
   (or in the Comprehensive Rules section if it is a generic ACTION like Dash).


THE COURT Q1: Can my Sorcerer make a cast spell ACTION and a Shoot ACTION in the same Activation?
--------------------------------------------------------------------------------
A: Yes. Ranged (and Melee) Attacks are not ACTIONS, and it is only ACTIONS that are
   limited to once per type of ACTION per Activation unless stated otherwise.


MISC Q1: How do 30x60mm bases interact with rules that refer to Base size (> or < 40mm)?
--------------------------------------------------------------------------------
A: Models with bases of different dimensions count their Base size as the larger
   dimension (60mm) for rules referring to Base sizes.

================================================================================
"""

for fname, content in files_content.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll turn phase documentation created successfully in:\n{target_dir}")
