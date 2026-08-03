import os
import sys

# Configure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

target_dir = r'C:\Users\vp\Downloads\tc-1.0.2\dice_roll_rules'
os.makedirs(target_dir, exist_ok=True)

files_content = {}

# 00_DICE_ROLLING_OVERVIEW.txt
files_content["00_DICE_ROLLING_OVERVIEW.txt"] = """================================================================================
TRENCH CRUSADE - DICE ROLLING MECHANICS & OVERVIEW
DOCUMENT CATEGORY: Core Mechanics - Dice System Overview
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 23-28, 44, 48)
TAG: [DICE_SYSTEM: OVERVIEW]
================================================================================

1. BASIC DICE TYPES & CONVENTIONS
--------------------------------------------------------------------------------
All dice rolls in Trench Crusade are performed using standard six-sided dice (D6).

* D6: Standard 6-sided die returning a value from 1 to 6.
* D3 Rolls: When asked to roll a D3, roll a standard D6 and halve the result
  (rounding up):
  - 1 or 2  = 1
  - 3 or 4  = 2
  - 5 or 6  = 3
* 2D6 Base Pool: Almost all major checks (Success Rolls, Injury Rolls, Morale Checks)
  begin with a baseline pool of TWO six-sided dice (2D6).


2. TYPES OF DICE ROLLS IN THE GAME
--------------------------------------------------------------------------------
1. Success Rolls: Used for task checks (Ranged Hits, Melee Hits, Climbing, Spells).
2. Risky Success Rolls: Standard Success Rolls that carry an immediate penalty upon
   failure (e.g., Dashing, Jumping Gaps, Shaken state rolls).
3. Injury Rolls: Made when a model suffers damage to determine if it is unharmed,
   taken Down, or knocked Out of Action.
4. Bloodbath Rolls: A deadly alternative to Injury Rolls triggered by spending
   Blood Markers, summing 3D6 or 4D6 together.
5. Morale Checks: Special Success Rolls taken during the Morale Phase to prevent
   a Warband from becoming Shaken or Routing.
6. Roll-Offs: Contested 1D6 rolls used to break ties (e.g. Initiative ties).


3. ANATOMY OF A DICE ROLL (STEP-BY-STEP)
--------------------------------------------------------------------------------
Whenever a rule calls for a dice roll, follow this mandatory 7-step sequence:

  Step 1: Start with the baseline pool (usually 2D6).
  Step 2: Identify all positive dice modifiers (+DICE / +INJURY DICE).
  Step 3: Identify all negative dice modifiers (-DICE / -INJURY DICE).
  Step 4: Cancel out pairs of +DICE and -DICE (1-to-1 cancellation).
  Step 5: Roll all remaining dice simultaneously.
  Step 6: Select the 2 HIGHEST dice (if net +DICE) or 2 LOWEST dice (if net -DICE).
  Step 7: Sum the selected dice, add any flat numerical modifiers, and consult
          the appropriate results table.

================================================================================
"""

# 01_SUCCESS_ROLLS_AND_RISKY_ROLLS.txt
files_content["01_SUCCESS_ROLLS_AND_RISKY_ROLLS.txt"] = """================================================================================
TRENCH CRUSADE - SUCCESS ROLLS & RISKY SUCCESS ROLLS
DOCUMENT CATEGORY: Core Mechanics - Success & Risky Rolls
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 24-25, 44)
TAG: [DICE_SYSTEM: SUCCESS_AND_RISKY_ROLLS]
================================================================================

1. SUCCESS ROLL PROCEDURE
--------------------------------------------------------------------------------
To resolve a standard Success Roll for a model:

1. Base Pool: Take 2D6.
2. Apply Dice Modifiers: Add any +DICE or -DICE (after 1-to-1 cancellation).
3. Roll: Roll all dice together.
4. Dice Selection:
   - If net +DICE: Pick the 2 HIGHEST dice.
   - If net -DICE: Pick the 2 LOWEST dice.
   - If no net dice modifiers: Pick both 2D6.
5. Calculate & Lookup: Add the 2 selected dice together, add any flat numerical
   modifiers, and check the result against the Success Roll Table.


2. SUCCESS ROLL TABLE
--------------------------------------------------------------------------------
   Final Total     Result             Effect / Outcome
   -----------------------------------------------------------------------------
   2 - 6           FAILURE            The task fails. (Attack misses, action fails).
   7 - 11          SUCCESS            The task succeeds. (Attack hits, spell cast).
   12+             CRITICAL SUCCESS   The task succeeds with bonus critical effects
                                      (e.g., +1 INJURY DICE on attacks).


3. RISKY SUCCESS ROLLS
--------------------------------------------------------------------------------
A Risky Success Roll is calculated and rolled in the EXACT SAME WAY as a standard
Success Roll, but carries strict failure consequences:

* Definition: A Success Roll designated as "Risky" due to dangerous actions or warband state.
* Actions Requiring Risky Rolls:
  - Dash Action (moving extra M").
  - Jumping Over Gaps or Jumping Down from height (> 3").
  - Climbing dangerous/precarious surfaces.
  - Diving Charges.
* CONSEQUENCE OF FAILURE:
  - Inside Model Activation: If a Risky Success Roll fails, the model's Activation
    ENDS IMMEDIATELY. No further actions or moves may be taken.
  - Outside Model Activation: If taken as part of an Action outside activation, that
    Action ends immediately.
* SHAKEN WARBAND EFFECT:
  - When a Warband is SHAKEN (from a failed Morale Check), ALL Success Rolls taken
    for models in that Warband are treated as RISKY SUCCESS ROLLS.

================================================================================
"""

# 02_PLUS_DICE_AND_MINUS_DICE_SYSTEM.txt
files_content["02_PLUS_DICE_AND_MINUS_DICE_SYSTEM.txt"] = """================================================================================
TRENCH CRUSADE - THE +DICE AND -DICE MODIFIER SYSTEM
DOCUMENT CATEGORY: Core Mechanics - Dice Pool Modifiers
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 25-26)
TAG: [DICE_SYSTEM: POOL_MODIFIERS]
================================================================================

1. CONCEPT OF DICE POOL MODIFICATION
--------------------------------------------------------------------------------
In Trench Crusade, modifiers frequently add or subtract dice from the pool rather
than adjusting the target number. This is written as "+1 DICE", "-1 DICE",
"+1 INJURY DICE", or "-1 INJURY DICE".


2. HOW +DICE WORKS (HIGHEST DICE SELECTION)
--------------------------------------------------------------------------------
For every +1 DICE added to a roll, add 1 additional D6 to the roll, then roll all
dice and select the TWO HIGHEST ROLLS:

* +1 DICE: Roll 3D6 -> Pick the 2 HIGHEST dice.
* +2 DICE: Roll 4D6 -> Pick the 2 HIGHEST dice.
* +3 DICE: Roll 5D6 -> Pick the 2 HIGHEST dice.


3. HOW -DICE WORKS (LOWEST DICE SELECTION)
--------------------------------------------------------------------------------
For every -1 DICE added to a roll, add 1 additional D6 to the roll, then roll all
dice and select the TWO LOWEST ROLLS:

* -1 DICE: Roll 3D6 -> Pick the 2 LOWEST dice.
* -2 DICE: Roll 4D6 -> Pick the 2 LOWEST dice.
* -3 DICE: Roll 5D6 -> Pick the 2 LOWEST dice.


4. COMBINING +DICE AND -DICE (1-TO-1 CANCELLATION)
--------------------------------------------------------------------------------
If a single roll receives both +DICE and -DICE from different sources:

1. Cancel in Pairs: Remove pairs of +1 DICE and -1 DICE until only ONE type remains.
2. Example A: +2 DICE (Elevation & Skill) and -1 DICE (Long Range) -> 1 +DICE cancels
   1 -DICE, leaving +1 DICE. Roll 3D6, pick 2 HIGHEST.
3. Example B: +1 DICE (Aim) and -1 DICE (Cover) -> They completely cancel out!
   Roll standard 2D6.


5. STRICT SEPARATION: DICE VS INJURY DICE
--------------------------------------------------------------------------------
* +/- DICE: Applies STRICTLY to Success Rolls (Hit rolls, Dash tests, Spell casts).
* +/- INJURY DICE: Applies STRICTLY to Injury Rolls (Damage/Injury tables).
* Rule: Keywords or items granting "+1 DICE" do NOT affect Injury Rolls. Keywords
  granting "+1 INJURY DICE" do NOT affect Success Rolls.

================================================================================
"""

# 03_INJURY_ROLLS_AND_BLOODBATH_ROLLS.txt
files_content["03_INJURY_ROLLS_AND_BLOODBATH_ROLLS.txt"] = """================================================================================
TRENCH CRUSADE - INJURY ROLLS & BLOODBATH ROLLS
DOCUMENT CATEGORY: Core Mechanics - Damage & Injury Rolls
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 46-49)
TAG: [DICE_SYSTEM: INJURY_AND_BLOODBATH_ROLLS]
================================================================================

1. INJURY ROLL PROCEDURE
--------------------------------------------------------------------------------
When a model suffers an attack or fall that causes an injury:

1. Base Pool: Take 2D6.
2. Apply Injury Dice: Add any +INJURY DICE or -INJURY DICE (after 1-to-1 cancellation).
3. Roll: Roll all dice.
4. Select 2 Dice: Pick the 2 HIGHEST dice (if net +INJURY DICE) or 2 LOWEST (if net -INJURY DICE).
5. Add Modifiers: Sum the 2 selected dice and add any flat numerical Injury Modifiers.
6. Consult Table: Look up final result on the Injury Roll Table.


2. INJURY ROLL TABLE
--------------------------------------------------------------------------------
   Final Total     Result            Effect
   -----------------------------------------------------------------------------
   1 or less       NO EFFECT         Model is unharmed; injury has no effect.
   2 - 6           DOWN              Model is taken Down. Activation ends if active.
                                     Halve move when standing up. -1 DICE on rolls.
   7 or higher     OUT OF ACTION     Model is removed from play (dead/incapacitated).


3. BLOODBATH ROLLS (SUM ALL DICE)
--------------------------------------------------------------------------------
A Bloodbath Roll is an extremely lethal alternative to a standard Injury Roll.

* Trigger / Cost: When making an Injury Roll for an enemy, spend 6 BLOOD MARKERS
  (or 3 BLOOD MARKERS if the target is already DOWN).
* Standard Bloodbath Procedure:
  - Roll 3D6 and SUM ALL THREE DICE TOGETHER.
  - Apply +/- INJURY DICE by picking the 3 HIGHEST or 3 LOWEST dice instead of 2.
* DEADLY Keyword Bloodbath Procedure:
  - If the attack has the DEADLY keyword, roll 4D6 and SUM ALL FOUR DICE TOGETHER!
  - Pick the 4 HIGHEST or 4 LOWEST dice if INJURY DICE apply.

================================================================================
"""

# 04_SPECIAL_ROLLS_REROLLS_AND_MARKERS.txt
files_content["04_SPECIAL_ROLLS_REROLLS_AND_MARKERS.txt"] = """================================================================================
TRENCH CRUSADE - SPECIAL ROLLS, REROLLS & MARKER MANIPULATION
DOCUMENT CATEGORY: Core Mechanics - Dice Manipulation & Special Checks
SOURCE: Trench Crusade Digital Rulebook v1.0.2 (Pages 20, 27-28, 32)
TAG: [DICE_SYSTEM: REROLLS_AND_MARKERS]
================================================================================

1. BLOOD MARKERS & OPPONENT DICE MANIPULATION
--------------------------------------------------------------------------------
Blood Markers allow opponents to directly manipulate your dice rolls:

* Opponent Spending on Success Rolls: When you take a Success Roll for a model with
  Blood Markers, your opponent can spend 1 to 3 Blood Markers. For each marker spent,
  add -1 DICE to your Success Roll!
* Opponent Spending on Injury Rolls: When making an Injury Roll against your model,
  the attacker can spend Blood Markers. For each marker spent, add +1 INJURY DICE
  to the Injury Roll!


2. BLESSING MARKERS & REROLLS
--------------------------------------------------------------------------------
* Blessing Markers: Can be spent by a player to reroll failed Success Rolls or add
  +DICE to friendly checks.
* Reroll Rules:
  - When rerolling a roll, you must reroll ALL dice in the pool unless specified.
  - A single dice roll can NEVER be rerolled more than once. The second result is final.


3. CRITICAL SUCCESSES & CRITICAL FAILURES
--------------------------------------------------------------------------------
* Critical Success (Natural 12 / Double 6s):
  - In Ranged/Melee attacks: Automatically hits and grants +1 INJURY DICE on the Injury Roll.
  - In Spells/Abilities: Triggers empowered spell effects as detailed in the profile.
* Natural 2 (Double 1s): Always a Failure regardless of positive numerical modifiers.


4. ROLL-OFFS (TIE-BREAKERS)
--------------------------------------------------------------------------------
When two players are required to roll-off (e.g. Initiative ties):
* Each player rolls 1D6.
* The player with the higher roll wins.
* If tied, roll again until a clear winner is determined.

================================================================================
"""

# 05_DICE_ROLLS_FAQ_AND_COMMENTARIES.txt
files_content["05_DICE_ROLLS_FAQ_AND_COMMENTARIES.txt"] = """================================================================================
TRENCH CRUSADE - OFFICIAL FAQ & COMMENTARIES ON DICE ROLLS
DOCUMENT CATEGORY: Official Clarifications & FAQs
SOURCE: Rules Commentaries Version 1.0.2
TAG: [FAQ: DICE_ROLL_FAQS]
================================================================================

RULES Q1: In what order do players apply BLOOD and BLESSING MARKERS to the same roll?
--------------------------------------------------------------------------------
A: If two things happen at the same time, the player who has the Initiative determines
   the order in which they are performed. (Page 32 of Digital Rulebook).


RULES Q6: Sometimes an ability will say INJURY DICE applies "for a model". Does it apply
          to rolls MADE FOR the model, or attacks MADE BY the model?
--------------------------------------------------------------------------------
A: It applies to Injury Rolls made FOR the model (defensive). It does not apply to
   Injury Rolls for attacks made BY the model (unless explicitly specified).


RULES Q8: Do all ACTIONS require making Success Rolls or Risky Success Rolls?
--------------------------------------------------------------------------------
A: No, ACTIONS that require Success Rolls are specified in the rule text of the ACTION
   (or in the Comprehensive Rules section if it is a generic ACTION like Dash).


CAMPAIGNS Q7: Which modifiers apply to an attack made with the Point Blank Skill?
--------------------------------------------------------------------------------
A: Use the modifiers that apply to a Melee Attack (including Melee Success Roll modifiers).


MISC Q7: Does a model have Line of Sight to itself for self-targeting dice checks?
--------------------------------------------------------------------------------
A: Yes. A model is considered visible to itself and within 0" of itself.

================================================================================
"""

for fname, content in files_content.items():
    fpath = os.path.join(target_dir, fname)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    size_kb = os.path.getsize(fpath) / 1024
    print(f"Created: {fname} ({size_kb:.1f} KB)")

print(f"\nAll dice roll documentation created successfully in:\n{target_dir}")
