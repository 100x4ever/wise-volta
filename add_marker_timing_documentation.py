import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Target directories
dir_phases = r'C:\Users\vp\Downloads\tc-1.0.2\turn_phases_gameplay'
dir_dice = r'C:\Users\vp\Downloads\tc-1.0.2\dice_roll_rules'
dir_actions = r'C:\Users\vp\Downloads\tc-1.0.2\actions_abilities_effects'

marker_doc_content = """================================================================================
TRENCH CRUSADE - MARKER TIMING, AVAILABILITY & APPLICATION RULES
DOCUMENT CATEGORY: Core Mechanics - Marker System Master Reference
SOURCE: Trench Crusade Digital Rulebook v1.0.2 & Rules Commentaries v1.0.2
TAG: [MARKER_SYSTEM: AVAILABILITY_AND_TIMING]
================================================================================

1. OVERVIEW OF MARKER TYPES
--------------------------------------------------------------------------------
In Trench Crusade, markers are used for resource tracking, tactical debuffs/buffs,
and battlefield terrain hazards:

  A. GAMEPLAY RESOURCE & CONDITION MARKERS:
     - BLOOD MARKERS: Wounds, trauma, exhaustion (Max stack = 6).
     - BLESSING MARKERS: Divine favor, miracles, rerolls.
     - INFECTION MARKERS: Black Grail plague / contamination.
     - DOWN MARKERS: Model knocked down on battlefield.
     - ACTIVATION MARKERS: Model has completed its activation for the turn.

  B. BATTLEFIELD & SCENARIO MARKERS:
     - OBJECTIVE / RELIQUARY MARKERS: Control points.
     - GAS CLOUD & GAS MINE MARKERS: Poison / hazardous clouds.
     - MINE & BOOBY TRAP MARKERS: Explosive terrain hazards.
     - CRATER, BUNKER & DEFENCE WORKS MARKERS: Fortifications / cover.
     - SUPPLY CACHE & VIALS MARKERS: Scenario loot items.


2. BLOOD MARKERS - ACQUISITION & APPLICATION TIMING
--------------------------------------------------------------------------------
* MAXIMUM CAP: 6 Blood Markers per model. If a model reaches 6, ignore any instructions
  to place additional Blood Markers until the count drops below 6.

* ACQUISITION TIMING:
  - Placed IMMEDIATELY whenever a model suffers a wound, fails an Armour/Injury Roll,
    falls from terrain, or is hit by specific abilities/spells.

* AVAILABILITY & SPENDING TIMING WINDOWS:
  1. Opponent Spending on Success Rolls:
     - WINDOW: BEFORE the active player rolls dice for any Success Roll for a model
       that possesses Blood Markers.
     - EFFECT: Opponent declares spending 1, 2, or 3 Blood Markers -> removes them ->
       adds -1, -2, or -3 DICE to the active player's Success Roll.
  2. Opponent Spending on Injury Rolls:
     - WINDOW: BEFORE making an Injury Roll against an enemy model with Blood Markers.
     - EFFECT: Attacker declares spending 1+ Blood Markers -> removes them -> adds
       +1 INJURY DICE per spent marker to the Injury Roll.
  3. Conversion to Bloodbath Roll:
     - WINDOW: BEFORE making an Injury Roll against an enemy model.
     - COST: Spend 6 Blood Markers (or 3 if target is Down).
     - EFFECT: Converts standard Injury Roll into a Bloodbath Roll (roll 3D6 or 4D6 for
       DEADLY weapons and SUM ALL DICE together!).


3. BLESSING MARKERS - ACQUISITION & APPLICATION TIMING
--------------------------------------------------------------------------------
* ACQUISITION TIMING:
  - Placed during the Initiative Phase, by completing Prayers/Miracles during Activation,
    or via specific Warband passive rules / scenario events.

* AVAILABILITY & SPENDING TIMING WINDOWS:
  1. Rerolling Failed Rolls:
     - WINDOW: IMMEDIATELY AFTER a friendly model fails a Success Roll or Morale Check.
     - EFFECT: Spend 1 Blessing Marker to reroll ALL dice for that check once.
  2. Adding Bonus Dice (+DICE):
     - WINDOW: BEFORE rolling dice for a friendly Success Roll or Spellcast Action.
     - EFFECT: Spend 1+ Blessing Markers to add +1 DICE per spent marker.


4. SIMULTANEOUS MARKER APPLICATION & INITIATIVE TIMING (RULEBOOK & FAQ Q1)
--------------------------------------------------------------------------------
* THE INITIATIVE RULE (RULES Q1):
  - Question: In what order do players apply BLOOD and BLESSING MARKERS to the same roll?
  - Rule: If both players wish to apply or spend markers on the exact same roll or trigger,
    THE PLAYER HOLDING THE INITIATIVE DETERMINES THE EXACT ORDER IN WHICH THEY ARE APPLIED!
  - Example: Player A wants to spend a Blessing Marker to add +1 DICE, while Player B
    wants to spend a Blood Marker to add -1 DICE. The player holding Initiative chooses
    which player declares and applies their marker first.


5. SUMMARY TIMING MATRIX
--------------------------------------------------------------------------------
  Marker Type      Who Can Apply    Timing Window                    Effect
  ----------------------------------------------------------------------------------------------
  Blood Marker     Opponent         BEFORE active player Success Roll -1 to -3 DICE on roll
  Blood Marker     Attacker         BEFORE enemy Injury Roll          +1 INJURY DICE per marker
  Blood Marker     Attacker         BEFORE enemy Injury Roll (Spend 6) Convert to Bloodbath Roll
  Blessing Marker  Friendly Owner   BEFORE friendly Success Roll      +1 DICE on roll
  Blessing Marker  Friendly Owner   AFTER failed friendly Roll        Reroll all dice (Max 1 reroll)
  Infection Marker Opponent / Zone  START of Activation               Automatic Injury check
  Gas/Mine Marker  Active Player    WHEN model moves into 1" contact  Explosion / Gas trigger

================================================================================
"""

# Write to all 3 target folders
files_to_write = [
    os.path.join(dir_phases, "07_MARKER_TIMING_AND_APPLICATION_RULES.txt"),
    os.path.join(dir_dice, "06_MARKER_TIMING_AND_APPLICATION_RULES.txt"),
    os.path.join(dir_actions, "06_MARKER_TIMING_AND_APPLICATION_RULES.txt")
]

for path in files_to_write:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(marker_doc_content.strip() + '\n')
    size_kb = os.path.getsize(path) / 1024
    print(f"Created master marker timing doc: {path} ({size_kb:.1f} KB)")

print("\nMarker timing and availability rules updated across all rule folders!")
