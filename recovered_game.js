/* Trench Crusade - Tactical Battlefield Map & Game Engine v1.0.2 */

document.addEventListener('DOMContentLoaded', () => {
  const CANVAS_WIDTH = 840;
  const CANVAS_HEIGHT = 720;
  const INCH_PX = 25; // 1 inch = 25 pixels
  const MELEE_RANGE_INCHES = 1.5; // Strict Melee Engagement Range Limit

  // Canvas & Context
  const canvas = document.getElementById('battleCanvas');
  const ctx = canvas.getContext('2d');

  // Master Keyword Rules Codex Dictionary
  const masterCodex = {
    "COMMANDER": { type: "activated", cat: "Warband Leadership", desc: "Model is an official Warband Commander. Can spend 1 Action to issue a Command Order granting +1 Blessing or Aura boost to allies.", impact: "\u26a1 Activated: +1 Activation Die \u2022 Command Order Action" },
    "DEADEYE AIM": { type: "activated", cat: "Specialist Action", desc: "Spends 1 Action to perform a precision AIM action, granting +2 to hit rolls on the subsequent Ranged attack.", impact: "\u26a1 Activated: +2 Hit Modifier when Aiming (Costs 1 Action)" },
    "DIVINE GUIDANCE": { type: "activated", cat: "Miracle Ability", desc: "Spends 1 Action to invoke a holy miracle, granting +1 Blessing Marker or 1x Re-roll for your warband.", impact: "\u26a1 Activated: +1 Blessing Marker / Re-roll (Costs 1 Action)" },
    "FIELD SURGEON": { type: "activated", cat: "Medic Action", desc: "Spends 1 Action to perform Treat Wounds on an adjacent wounded or Down allied model.", impact: "\u26a1 Activated: Heal 1 Wound on 4+ (Costs 1 Action)" },
    "TREAT WOUNDS": { type: "activated", cat: "Medic Action", desc: "Spends 1 Action to heal 1 Wound on an adjacent allied model on a 4+ roll.", impact: "\u26a1 Activated: Heal 1 Wound on 4+ (Costs 1 Action)" },
    "INFILTRATOR": { type: "activated", cat: "Tactical Deployment", desc: "Special deployment action allowing forward positioning outside 9 inches of enemy deployment zones during battle setup.", impact: "\u26a1 Activated: Forward Deployment >9\"" },
    "DARK BLESSINGS": { type: "activated", cat: "Heretic Leadership", desc: "Spends 1 Action to channel unholy blessings from the Pit, adding +1 Blood Marker to your pool.", impact: "\u26a1 Activated: +1 Blood Marker Pool (Costs 1 Action)" },
    "PROPHECY OF DOOM": { type: "activated", cat: "Trench Pilgrim Miracle", desc: "Spends 1 Action to utter a terrifying prophecy, forcing an enemy model within 12\" to make an immediate Courage test.", impact: "\u26a1 Activated: Force Enemy Courage Test (Costs 1 Action)" },
    "ALCHEMY ELIXIR": { type: "activated", cat: "Sultanate Specialist", desc: "Spends 1 Action to brew a quick alchemical stimulant, granting +2 Movement to an adjacent model for 1 turn.", impact: "\u26a1 Activated: +2\" Speed Boost to Ally (Costs 1 Action)" },
    "DEMO CHARGE": { type: "activated", cat: "Explosive Action", desc: "Spends 1 Action to place or throw a heavy explosive charge destroying trench walls and bunker structures.", impact: "\u26a1 Activated: Demolish Terrain Feature (Costs 1 Action)" },

    "SNIPER": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Model automatically ignores long-range hit penalties beyond 12 inches when firing sniper rifles.", impact: "\ud83d\udee1\ufe0f Passive: Always Ignores Range Penalties" },
    "TRENCH RAID": { type: "passive", cat: "Elite Passive Trait", desc: "Passive Trait: Model automatically gains +1 Attack die when charging across trench walls or sandbags.", impact: "\ud83d\udee1\ufe0f Passive: +1 Attack Die on Trench Charge" },
    "SHOCK TROOPER": { type: "passive", cat: "Specialist Passive Trait", desc: "Passive Trait: Model automatically ignores movement penalties in mud, barbed wire, and trench sludge.", impact: "\ud83d\udee1\ufe0f Passive: Always Ignores Difficult Terrain" },
    "LINE INFANTRY": { type: "passive", cat: "Trooper Passive Rule", desc: "Passive Rule: Standard line unit. Automatically gains +1 Courage when within 3 inches of allied Line Infantry.", impact: "\ud83d\udee1\ufe0f Passive: +1 Courage near Line Allies" },
    "GRIM DISCIPLINE": { type: "passive", cat: "Trooper Passive Rule", desc: "Passive Rule: Automatically grants 1 free re-roll on a failed Morale check once per battle.", impact: "\ud83d\udee1\ufe0f Passive: 1x Automatic Morale Re-roll" },
    "HEAVY CONSTRUCT": { type: "passive", cat: "Monstrous Unit Trait", desc: "Passive Trait: Giant construct with increased Wound capacity. Automatically immune to Knockdown & Down status.", impact: "\ud83d\udee1\ufe0f Passive: Knockdown & Down Immunity" },
    "BLACK GRAIL PLAGUE": { type: "passive", cat: "Unholy Passive Hazard", desc: "Passive Trait: Melee hits automatically inflict Contagion markers causing end-of-turn damage to enemies.", impact: "\ud83d\udee1\ufe0f Passive: Automatic Contagion on Melee Hit" },
    "REGENERATION": { type: "passive", cat: "Monster Passive Ability", desc: "Passive Trait: Automatically rolls at the start of each turn to heal 1 Wound on a 4+ roll.", impact: "\ud83d\udee1\ufe0f Passive: Start of Turn 4+ Heal" },
    "MARTYR": { type: "passive", cat: "Pilgrim Passive Trait", desc: "Passive Trait: When this model is taken Out of Action, all adjacent allies automatically gain +1 Courage and +1 Blessing.", impact: "\ud83d\udee1\ufe0f Passive: Death Blessing to Adjacent Allies" },
    "AZAB WARRIOR": { type: "passive", cat: "Sultanate Passive Rule", desc: "Passive Trait: Gains +1 Armour rating when standing inside cover terrain.", impact: "\ud83d\udee1\ufe0f Passive: +1 Armour in Cover" },
    "HEAVY": { type: "passive", cat: "Equipment Passive Restriction", desc: "Passive Restriction: Model cannot Move and Shoot in the same activation turn without setting up.", impact: "\ud83d\udee1\ufe0f Passive: No Move & Shoot in Same Turn" },
    "2-HANDED": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon requires both hands to operate. Model cannot equip a shield.", impact: "\ud83d\udee1\ufe0f Passive: Requires 2 Hands \u2022 No Shield" },
    "1-HANDED": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon operates in one hand. Compatible with a shield or secondary pistol.", impact: "\ud83d\udee1\ufe0f Passive: 1 Handed \u2022 Compatible with Shield" },
    "PARRY": { type: "passive", cat: "Defensive Passive Trait", desc: "Passive Trait: When defending in melee combat, enemy attacker is automatically forced to re-roll their highest hit die.", impact: "\ud83d\udee1\ufe0f Passive: Enemy Re-rolls Highest Hit Die" },
    "CLEAVE 1": { type: "passive", cat: "Armour Piercing Passive", desc: "Passive Trait: Automatically reduces enemy target's Armour rating by 1 point on hits.", impact: "\ud83d\udee1\ufe0f Passive: -1 Enemy Armour Rating" },
    "CLEAVE 2": { type: "passive", cat: "Armour Piercing Passive", desc: "Passive Trait: Automatically reduces enemy target's Armour rating by 2 points on hits.", impact: "\ud83d\udee1\ufe0f Passive: -2 Enemy Armour Rating" },
    "AUTOMATIC 2": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon automatically fires 2 shots during a single Shoot action.", impact: "\ud83d\udee1\ufe0f Passive: 2 Shots per Shoot Action" },
    "AUTOMATIC 3": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon automatically fires 3 shots during a single Shoot action.", impact: "\ud83d\udee1\ufe0f Passive: 3 Shots per Shoot Action" },
    "BLAST 3\"": { type: "passive", cat: "Area Hazard Trait", desc: "Passive Trait: Explosive attack hits all models within a 3-inch blast radius circle.", impact: "\ud83d\udee1\ufe0f Passive: 3\" Blast Radius Area Effect" },
    "BLAST 5\"": { type: "passive", cat: "Area Hazard Trait", desc: "Passive Trait: Explosive attack hits all models within a 5-inch blast radius circle.", impact: "\ud83d\udee1\ufe0f Passive: 5\" Blast Radius Area Effect" },
    "GAS HAZARD": { type: "passive", cat: "Toxic Hazard Trait", desc: "Passive Trait: Creates a persistent toxic gas cloud zone on the target impact location.", impact: "\ud83d\udee1\ufe0f Passive: Persistent Mustard Gas Cloud" },
    "ARMOUR +1": { type: "passive", cat: "Defensive Passive Bonus", desc: "Passive Bonus: Automatically increases model's base Armour rating by +1.", impact: "\ud83d\udee1\ufe0f Passive: +1 Base Armour Rating" },
    "ARMOUR +2": { type: "passive", cat: "Defensive Passive Bonus", desc: "Passive Bonus: Automatically increases model's base Armour rating by +2.", impact: "\ud83d\udee1\ufe0f Passive: +2 Base Armour Rating" },
    "SHIELD": { type: "passive", cat: "Defensive Passive Item", desc: "Passive Bonus: Grants +1 Armour rating against frontal ranged attacks.", impact: "\ud83d\udee1\ufe0f Passive: +1 Frontal Ranged Armour" },
    "GAS IMMUNE": { type: "passive", cat: "Protection Passive Trait", desc: "Passive Trait: Model is completely immune to toxic gas hazard damage on the board.", impact: "\ud83d\udee1\ufe0f Passive: Complete Gas Immunity" },
    "GAS MASK": { type: "passive", cat: "Protection Equipment", desc: "Passive Item: Grants complete immunity to mustard gas hazards.", impact: "\ud83d\udee1\ufe0f Passive: Mustard Gas Immunity" }
  };

  // 8 MAP PACK PRESETS
  const mapPackPresets = {
    "map_1": {
      title: "1. FRONTLINE TRENCHES OF ANTIOCH",
      bg: "images/ww1_trench_table.jpg",
      modifiers: "MODIFIERS: +1 Armour in Trenches \u2022 +1 High Ground Hit from Watchtowers",
      terrain: [
        { id: "t1", type: "building", name: "Ruined Watchtower", x: 380, y: 150, w: 120, h: 100, elev: 2, cover: 1 },
        { id: "t2", type: "trench", name: "Frontline Trench Wall", x: 200, y: 350, w: 250, h: 25, elev: 0, cover: 1 },
        { id: "t3", type: "wire", name: "Barbed Wire Belt", x: 480, y: 360, w: 160, h: 30, elev: 0, cover: 0, difficult: true },
        { id: "t4", type: "gas", name: "Mustard Gas Cloud", x: 300, y: 480, w: 120, h: 100, elev: 0, gas: true },
        { id: "t5", type: "shrine", name: "Relic Shrine Objective", x: 430, y: 320, w: 40, h: 40, elev: 0, objective: true }
      ]
    },
    "map_2": {
      title: "2. NO MAN'S LAND CRATER FIELD",
      bg: "images/ww1_trench_table.jpg",
      modifiers: "MODIFIERS: Heavy Mud Craters (Halves Movement) \u2022 Open Sight Lines",
      terrain: [
        { id: "t1", type: "wire", name: "Deep Crater Mud", x: 250, y: 200, w: 140, h: 100, elev: 0, difficult: true },
        { id: "t2", type: "wire", name: "Bomb Crater Sludge", x: 480, y: 400, w: 160, h: 120, elev: 0, difficult: true },
        { id: "t3", type: "trench", name: "Sandbag Barrier", x: 350, y: 320, w: 140, h: 20, elev: 0, cover: 1 },
        { id: "t4", type: "shrine", name: "Relic Shrine Objective", x: 400, y: 340, w: 40, h: 40, elev: 0, objective: true }
      ]
    },
    "map_3": {
      title: "3. RUINED CATHEDRAL SPIRE & WATCHTOWERS",
      bg: "images/ww1_field_report.jpg",
      modifiers: "MODIFIERS: Plunging Fire (Level 4 Spire Ignores Low Cover Below)",
      terrain: [
        { id: "t1", type: "building", name: "Cathedral Spire Tower", x: 360, y: 120, w: 140, h: 120, elev: 4, cover: 1 },
        { id: "t2", type: "building", name: "Bunker Pillbox", x: 180, y: 400, w: 110, h: 90, elev: 2, cover: 1 },
        { id: "t3", type: "trench", name: "Cathedral Wall Ruin", x: 520, y: 350, w: 180, h: 25, elev: 0, cover: 1 },
        { id: "t4", type: "shrine", name: "Sacred Relic Shrine", x: 410, y: 480, w: 40, h: 40, elev: 0, objective: true }
      ]
    },
    "map_4": {
      title: "4. MUSTARD GAS SWAMPS OF VERDUN",
      bg: "images/rusted_trench_texture.jpg",
      modifiers: "MODIFIERS: Poison Fog (+1 Toxic Wound at turn end without Gas Mask)",
      terrain: [
        { id: "t1", type: "gas", name: "Heavy Mustard Fog", x: 180, y: 150, w: 200, h: 140, elev: 0, gas: true },
        { id: "t2", type: "gas", name: "Toxic Gas Pit", x: 450, y: 380, w: 220, h: 150, elev: 0, gas: true },
        { id: "t3", type: "wire", name: "Barbed Wire Belt", x: 320, y: 320, w: 150, h: 30, elev: 0, difficult: true },
        { id: "t4", type: "shrine", name: "Bunker Relic Shrine", x: 400, y: 260, w: 40, h: 40, elev: 0, objective: true }
      ]
    },
    "map_5": {
      title: "5. FORTIFIED REDOUBT & PILLBOX COMPLEX",
      bg: "images/ww1_trench_table.jpg",
      modifiers: "MODIFIERS: Fortified Pillbox (+2 Armour Bonus Inside Bunker)",
      terrain: [
        { id: "t1", type: "building", name: "Concrete Pillbox Redoubt", x: 350, y: 220, w: 160, h: 130, elev: 2, cover: 2 },
        { id: "t2", type: "trench", name: "North Trench Line", x: 150, y: 180, w: 200, h: 25, elev: 0, cover: 1 },
        { id: "t3", type: "trench", name: "South Trench Line", x: 500, y: 440, w: 200, h: 25, elev: 0, cover: 1 },
        { id: "t4", type: "wire", name: "Front Perimeter Wire", x: 320, y: 380, w: 220, h: 30, elev: 0, difficult: true }
      ]
    },
    "map_6": {
      title: "6. THE BLOOD RIVER CROSSING",
      bg: "images/rusted_trench_texture.jpg",
      modifiers: "MODIFIERS: Dangerous Water (Risky Test required to cross Sludge River)",
      terrain: [
        { id: "t1", type: "gas", name: "Blood Sludge River", x: 390, y: 0, w: 60, h: 720, elev: 0, gas: true },
        { id: "t2", type: "trench", name: "North Bridge Rampart", x: 330, y: 220, w: 180, h: 30, elev: 0, cover: 1 },
        { id: "t3", type: "trench", name: "South Bridge Rampart", x: 330, y: 480, w: 180, h: 30, elev: 0, cover: 1 },
        { id: "t4", type: "shrine", name: "Bridgehead Relic Shrine", x: 400, y: 350, w: 40, h: 40, elev: 0, objective: true }
      ]
    },
    "map_7": {
      title: "7. SHRINE OF THE BLEEDING MARTYR",
      bg: "images/gothic_blood_banner.jpg",
      modifiers: "MODIFIERS: Sacred Ground (+1 Blessing Marker generated at Shrine per turn)",
      terrain: [
        { id: "t1", type: "shrine", name: "Sacred Altar Shrine", x: 390, y: 330, w: 60, h: 60, elev: 0, objective: true },
        { id: "t2", type: "trench", name: "North Altar Wall", x: 280, y: 240, w: 280, h: 25, elev: 0, cover: 1 },
        { id: "t3", type: "trench", name: "South Altar Wall", x: 280, y: 450, w: 280, h: 25, elev: 0, cover: 1 },
        { id: "t4", type: "building", name: "Martyr Watchtower", x: 180, y: 310, w: 90, h: 100, elev: 2, cover: 1 }
      ]
    },
    "map_8": {
      title: "8. HELLFIRE ARTILLERY SECTOR",
      bg: "images/ww1_trench_table.jpg",
      modifiers: "MODIFIERS: Incendiary Shelling (Ending turn in craters inflicts Burning)",
      terrain: [
        { id: "t1", type: "building", name: "Artillery Battery Position", x: 360, y: 160, w: 140, h: 110, elev: 2, cover: 1 },
        { id: "t2", type: "gas", name: "Burning Shell Crater", x: 200, y: 420, w: 130, h: 100, elev: 0, gas: true },
        { id: "t3", type: "gas", name: "Incendiary Crater Zone", x: 510, y: 380, w: 140, h: 110, elev: 0, gas: true },
        { id: "t4", type: "wire", name: "Artillery Battery Wire", x: 340, y: 300, w: 180, h: 25, elev: 0, difficult: true }
      ]
    }
  };

  // Game Master State & Alternating Activation Lock
  let currentMapKey = "map_1";
  let gameTurn = 1;
  let currentPhaseIndex = 0;
  const phases = [
    "1. INITIATIVE PHASE",
    "2. ACTIVATION PHASE",
    "3. END PHASE"
  ];

  let activePlayerTurn = 1; // 1 = Player 1, 2 = Player 2
  let activeUnitId = null; // Currently activated unit ID

  let poolBlood = 3;
  let poolBlessing = 3;

  let activeTool = 'select';
  let selectedToken = null;
  let targetToken = null;
  let activeCodexKw = null;
  
  let isDraggingToken = false;
  let dragOffset = { x: 0, y: 0 };
  let startMovePos = null;

  let isMeasuring = false;
  let rulerStart = null;
  let rulerEnd = null;

  let terrainObjects = [];
  let unitTokens = [];

  // DOM Elements
  const hudTurnNum = document.getElementById('hudTurnNum');
  const hudPhaseName = document.getElementById('hudPhaseName');
  const btnNextPhase = document.getElementById('btnNextPhase');
  const hudActivePlayer = document.getElementById('hudActivePlayer');
  const poolBloodEl = document.getElementById('poolBlood');
  const poolBlessingEl = document.getElementById('poolBlessing');
  const btnAddBlood = document.getElementById('btnAddBlood');
  const btnAddBlessing = document.getElementById('btnAddBlessing');

  const selWarbandP1 = document.getElementById('selWarbandP1');
  const selWarbandP2 = document.getElementById('selWarbandP2');
  const btnDeployBoth = document.getElementById('btnDeployBoth');
  const btnClearBoard = document.getElementById('btnClearBoard');
  const chkShowGrid = document.getElementById('chkShowGrid');
  const chkShowRanges = document.getElementById('chkShowRanges');

  const selMapPreset = document.getElementById('selMapPreset');
  const btnRandomMap = document.getElementById('btnRandomMap');
  const txtMapTitle = document.getElementById('txtMapTitle');
  const txtMapModifiers = document.getElementById('txtMapModifiers');

  const txtActiveTool = document.getElementById('txtActiveTool');
  const toolSelect = document.getElementById('toolSelect');
  const toolRuler = document.getElementById('toolRuler');
  const toolShoot = document.getElementById('toolShoot');
  const toolFight = document.getElementById('toolFight');

  const txtMeasurementInfo = document.getElementById('txtMeasurementInfo');
  const txtElevationInfo = document.getElementById('txtElevationInfo');
  const inspectorContent = document.getElementById('inspectorContent');
  const combatLogBox = document.getElementById('combatLogBox');

  // Modal Elements
  const combatModalOverlay = document.getElementById('combatModalOverlay');
  const btnCloseCombatModal = document.getElementById('btnCloseCombatModal');
  const btnCloseCombatBtn = document.getElementById('btnCloseCombatBtn');
  const btnExecuteRoll = document.getElementById('btnExecuteRoll');
  const combatResolverBody = document.getElementById('combatResolverBody');

  const codexModalOverlay = document.getElementById('codexModalOverlay');
  const btnCloseCodexModal = document.getElementById('btnCloseCodexModal');
  const btnCloseCodexBtn = document.getElementById('btnCloseCodexBtn');
  const btnActivateAbilityEffect = document.getElementById('btnActivateAbilityEffect');
  const codexKwName = document.getElementById('codexKwName');
  const codexCategory = document.getElementById('codexCategory');
  const codexDescription = document.getElementById('codexDescription');
  const codexImpact = document.getElementById('codexImpact');

  const bgImage = new Image();

  function updateActivePlayerHUD() {
    if (activePlayerTurn === 1) {
      hudActivePlayer.textContent = "PLAYER 1 TURN (NEW ANTIOCH)";
      hudActivePlayer.style.color = varColor('--blood-bright');
    } else {
      hudActivePlayer.textContent = "PLAYER 2 TURN (HERETIC LEGIONS)";
      hudActivePlayer.style.color = "#386b99";
    }
  }

  function loadMapPreset(mapKey) {
    let preset = mapPackPresets[mapKey] || mapPackPresets["map_1"];
    currentMapKey = mapKey;

    txtMapTitle.textContent = preset.title;
    txtMapModifiers.textContent = preset.modifiers;
    terrainObjects = JSON.parse(JSON.stringify(preset.terrain));

    bgImage.src = preset.bg;
    bgImage.onload = () => drawBoard();

    logEvent(`Loaded Map: ${preset.title} (${preset.modifiers})`, "sys");
    drawBoard();
  }

  selMapPreset.addEventListener('change', (e) => {
    loadMapPreset(e.target.value);
  });