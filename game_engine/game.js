/* Trench Crusade - Tactical Battlefield Map & Game Engine v1.0.2 */

document.addEventListener('DOMContentLoaded', () => {
    const imageCache = {};
  function getCachedImage(src, fallbackName, playerNum) {
    if (!src || src.trim() === '') src = 'images/lieutenant_new_antioch.jpg';
    let fullPath = getImgPath(src);
    if (imageCache[fullPath]) return imageCache[fullPath];

    let img = new Image();
    img.onload = () => { if (typeof drawBoard === 'function') drawBoard(); };
    img.onerror = () => {
      let fallbackSrc = playerNum === 2 ? 'images/heretic_priest.jpg' : 'images/lieutenant_new_antioch.jpg';
      let fbPath = getImgPath(fallbackSrc);
      if (imageCache[fbPath]) {
        imageCache[fullPath] = imageCache[fbPath];
      } else {
        let fbImg = new Image();
        fbImg.onload = () => { if (typeof drawBoard === 'function') drawBoard(); };
        fbImg.src = fbPath;
        imageCache[fullPath] = fbImg;
        imageCache[fbPath] = fbImg;
      }
    };
    img.src = fullPath;
    imageCache[fullPath] = img;
    return img;
  }

    function getImgPath(src) {
    if (!src) return '';
    let clean = src.replace(/^game_engine\//, '').replace(/^images\//, '').replace(/^\//, '');
    return 'images/' + clean;
  }

  const DISPLAY_WIDTH = 840;
  const DISPLAY_HEIGHT = 680;
  const INCH_PX = 25; // 1 inch = 25 pixels
  const MELEE_RANGE_INCHES = 1.5; // Strict Melee Engagement Range Limit

  // Canvas & Context with High-DPI / Retina Crisp Scaling
  const canvas = document.getElementById('battleCanvas');
  const ctx = canvas.getContext('2d');

  let dpr = window.devicePixelRatio || 1;

  function resizeCanvasForHighDPI() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(DISPLAY_WIDTH * dpr);
    canvas.height = Math.floor(DISPLAY_HEIGHT * dpr);
    canvas.style.width = `${DISPLAY_WIDTH}px`;
    canvas.style.height = `${DISPLAY_HEIGHT}px`;
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }

  resizeCanvasForHighDPI();
  window.addEventListener('resize', () => {
    resizeCanvasForHighDPI();
    drawBoard();
  });

  // 6 OFFICIAL TRENCH CRUSADE GAMEPLAY SCENARIOS DATABASE
  const scenariosDict = {
    "scen_1": {
      title: "1. CLASH OF PATROLS",
      objective: "OBJECTIVE: Control central Relic Shrine (+3 VP). First Blood grants +1 VP.",
      deed: "GLORIOUS DEED: Slay enemy Commander (+2 VP).",
      depLineLeft: 9, // 9 inches
      depLineRight: 9
    },
    "scen_2": {
      title: "2. NO MAN'S LAND BREAKTHROUGH",
      objective: "OBJECTIVE: Escort squad models into Enemy Deployment Zone (+2 VP per model escaped).",
      deed: "GLORIOUS DEED: Escort Warband Leader across No Man's Land (+2 VP).",
      depLineLeft: 9,
      depLineRight: 9
    },
    "scen_3": {
      title: "3. RELIC RECOVERY",
      objective: "OBJECTIVE: Retrieve 4 Sacred Relic tokens from craters & carry back (+2 VP each).",
      deed: "GLORIOUS DEED: Retrieve Primary High Relic with your Leader (+2 VP).",
      depLineLeft: 9,
      depLineRight: 9
    },
    "scen_4": {
      title: "4. TRENCH SIEGE & BUNKER ASSAULT",
      objective: "OBJECTIVE: Defender holds Pillbox Redoubt (+4 VP). Attacker breach bunker walls.",
      deed: "GLORIOUS DEED: Bunker Buster (Demolish Pillbox wall with Demo Charge) (+2 VP).",
      depLineLeft: 12,
      depLineRight: 12
    },
    "scen_5": {
      title: "5. MUSTARD GAS EXTRACTION",
      objective: "OBJECTIVE: Extract Gas Casks before poison fog consumes central field (+1 VP per Cask).",
      deed: "GLORIOUS DEED: Flawless Extraction (Extract squad without losing models to Gas) (+2 VP).",
      depLineLeft: 9,
      depLineRight: 9
    },
    "scen_6": {
      title: "6. BLEEDING ALTAR & GOETIC RITUAL",
      objective: "OBJECTIVE: Perform Sacrificial Blood Offering at Altar (+1 VP per Blood Marker offered).",
      deed: "GLORIOUS DEED: Ritual Consecration (Offer 3 Blood Markers at Altar in 1 turn) (+2 VP).",
      depLineLeft: 9,
      depLineRight: 9
    }
  };

  // Master Keyword Rules Codex Dictionary
  const masterCodex = window.masterCodex || {};

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
  let currentScenarioKey = "scen_1";
  let gameTurn = 1;
  let currentPhaseIndex = 0;
  const phases = [
    "1. INITIATIVE PHASE",
    "2. ACTIVATION PHASE",
    "3. END PHASE"
  ];

  let activePlayerTurn = 1;
  let activeUnitId = null;

  let vpPlayer1 = 0;
  let vpPlayer2 = 0;
  let poolBlood = 3;
  let poolBlessing = 3;

  let activeTool = 'select';
  let shootHoverPos = null;
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

  const vpPlayer1El = document.getElementById('vpPlayer1');
  const vpPlayer2El = document.getElementById('vpPlayer2');
  const btnAddVpP1 = document.getElementById('btnAddVpP1');
  const btnAddVpP2 = document.getElementById('btnAddVpP2');

  const poolBloodEl = document.getElementById('poolBlood');
  const poolBlessingEl = document.getElementById('poolBlessing');
  const btnAddBlood = document.getElementById('btnAddBlood');
  const btnAddBlessing = document.getElementById('btnAddBlessing');

  const selScenario = document.getElementById('selScenario');
  const scenTitle = document.getElementById('scenTitle');
  const scenObjective = document.getElementById('scenObjective');
  const scenDeed = document.getElementById('scenDeed');
  const chkShowDeployment = document.getElementById('chkShowDeployment');

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

  function loadScenario(scenKey) {
    currentScenarioKey = scenKey;
    let scen = scenariosDict[scenKey] || scenariosDict["scen_1"];

    if (scenTitle) scenTitle.textContent = scen.title;
    if (scenObjective) scenObjective.textContent = scen.objective;
    if (scenDeed) scenDeed.textContent = scen.deed;

    logEvent(`Loaded Scenario: ${scen.title}. ${scen.objective}`, "sys");
    drawBoard();
  }

  if (selScenario) selScenario.addEventListener('change', (e) => loadScenario(e.target.value));
  if (chkShowDeployment) chkShowDeployment.addEventListener('change', () => drawBoard());

  if (btnAddVpP1) btnAddVpP1.addEventListener('click', () => {
    vpPlayer1++;
    if (vpPlayer1El) vpPlayer1El.textContent = vpPlayer1;
    logEvent(`🏆 Player 1 awarded +1 Victory Point! (Total: ${vpPlayer1} VP)`, "sys");
  });

  if (btnAddVpP2) btnAddVpP2.addEventListener('click', () => {
    vpPlayer2++;
    if (vpPlayer2El) vpPlayer2El.textContent = vpPlayer2;
    logEvent(`🏆 Player 2 awarded +1 Victory Point! (Total: ${vpPlayer2} VP)`, "sys");
  });

  function updateActivePlayerHUD() {
    if (!hudActivePlayer) return;
    if (activePlayerTurn === 1) {
      hudActivePlayer.textContent = "PLAYER 1 TURN (NEW ANTIOCH)";
      hudActivePlayer.style.color = varColor('--blood-bright');
    } else {
      hudActivePlayer.textContent = "PLAYER 2 TURN (HERETIC LEGIONS)";
      hudActivePlayer.style.color = "#386b99";
    }
  }

  function loadMapPreset(mapKey) {
    console.log("🗺️ [GAME DEBUG] loadMapPreset called with mapKey:", mapKey);
    let preset = mapPackPresets[mapKey] || mapPackPresets["map_1"];
    currentMapKey = mapKey;

    if (txtMapTitle) txtMapTitle.textContent = preset.title;
    if (txtMapModifiers) txtMapModifiers.textContent = preset.modifiers;
    terrainObjects = JSON.parse(JSON.stringify(preset.terrain));

    console.log("🗺️ [GAME DEBUG] Map Background Path:", getImgPath(preset.bg));
    bgImage.src = getImgPath(preset.bg);
    bgImage.onload = () => {
      console.log("🗺️ [GAME DEBUG] bgImage loaded successfully! Redrawing board...");
      drawBoard();
    };
    bgImage.onerror = (err) => {
      console.error("❌ [GAME DEBUG ERROR] bgImage failed to load:", getImgPath(preset.bg), err);
    };

    logEvent(`Loaded Map: ${preset.title} (${preset.modifiers})`, "sys");
    drawBoard();
  }

  if (selMapPreset) selMapPreset.addEventListener('change', (e) => {
    loadMapPreset(e.target.value);
  });

  if (btnRandomMap) btnRandomMap.addEventListener('click', () => {
    let keys = Object.keys(mapPackPresets);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    selMapPreset.value = randomKey;
    loadMapPreset(randomKey);
  });

  function openCodex(kwName) {
    activeCodexKw = kwName;
    let entry = masterCodex[kwName.toUpperCase()] || {
      type: "passive",
      cat: "System Trait",
      desc: `Official Trench Crusade rule mechanic for ${kwName}.`,
      impact: `\ud83d\udee1\ufe0f Passive: ${kwName} active modifier`
    };

    if (codexKwName) codexKwName.textContent = kwName.toUpperCase();
    if (codexCategory) codexCategory.textContent = entry.cat.toUpperCase();
    if (codexDescription) codexDescription.textContent = entry.desc;
    if (codexImpact) codexImpact.textContent = entry.impact;

    if (entry.type === "activated" && btnActivateAbilityEffect) {
      btnActivateAbilityEffect.style.display = "block";
      btnActivateAbilityEffect.textContent = "⚡ INITIATE / ACTIVATE ABILITY EFFECT (COSTS 1 ACTION)";
    } else if (btnActivateAbilityEffect) {
      btnActivateAbilityEffect.style.display = "none";
    }

    if (codexModalOverlay) codexModalOverlay.classList.remove('hidden');
  }

  function closeCodex() {
    if (codexModalOverlay) codexModalOverlay.classList.add('hidden');
  }

  if (btnCloseCodexModal) btnCloseCodexModal.addEventListener('click', closeCodex);
  if (btnCloseCodexBtn) btnCloseCodexBtn.addEventListener('click', closeCodex);

  if (btnActivateAbilityEffect) {
    btnActivateAbilityEffect.addEventListener('click', () => {
      if (!activeCodexKw) return;
      let u = selectedToken;
      let uName = u ? u.name : "Model";

      if (u && (!u.activated || u.actionsRemaining <= 0)) {
        alert("Unit must be ACTIVATED and have Actions Remaining (Spend 1 Action) to use this ability!");
        return;
      }

      if (activeCodexKw.toUpperCase() === "FIELD SURGEON" || activeCodexKw.toUpperCase() === "TREAT WOUNDS") {
        if (u && u.wounds < u.maxWounds) {
          u.wounds = Math.min(u.maxWounds, u.wounds + 1);
          if (u.status === "Down") u.status = "Active";
          u.bloodMarkers = Math.max(0, (u.bloodMarkers || 0) - 1);
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          logEvent(`⚡ [ACTIVATED ABILITY] ${uName} performed FIELD SURGEON: Healed 1 Wound and removed 1 Blood Marker! (1 Action spent)`, "sys");
        } else {
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          logEvent(`⚡ [ACTIVATED ABILITY] ${uName} performed FIELD SURGEON treatment on adjacent squadmate. (1 Action spent)`, "sys");
        }
      } else if (activeCodexKw.toUpperCase() === "DEADEYE AIM") {
        if (u) {
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          u.blessingMarkers = (u.blessingMarkers || 0) + 1;
        }
        logEvent(`⚡ [ACTIVATED ABILITY] ${uName} activated DEADEYE AIM: Added +1 Blessing Marker to unit! (1 Action spent)`, "sys");
      } else if (activeCodexKw.toUpperCase() === "DIVINE GUIDANCE") {
        if (u) {
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          u.blessingMarkers = (u.blessingMarkers || 0) + 1;
        }
        poolBlessing++;
        if (poolBlessingEl) poolBlessingEl.textContent = poolBlessing;
        logEvent(`⚡ [ACTIVATED ABILITY] ${uName} invoked DIVINE GUIDANCE: +1 Blessing Marker added to unit & pool! (1 Action spent)`, "sys");
      } else if (activeCodexKw.toUpperCase() === "COMMANDER") {
        if (u) {
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          u.blessingMarkers = (u.blessingMarkers || 0) + 1;
        }
        poolBlessing++;
        if (poolBlessingEl) poolBlessingEl.textContent = poolBlessing;
        logEvent(`⚡ [ACTIVATED ABILITY] ${uName} issued COMMAND ORDER: +1 Blessing Marker & Command Aura activated! (1 Action spent)`, "sys");
      } else if (activeCodexKw.toUpperCase() === "DARK BLESSINGS") {
        if (u) {
          u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
          u.bloodMarkers = (u.bloodMarkers || 0) + 1;
        }
        poolBlood++;
        if (poolBloodEl) poolBloodEl.textContent = poolBlood;
        logEvent(`⚡ [ACTIVATED ABILITY] ${uName} channeled DARK BLESSINGS: +1 Blood Marker added to unit & pool! (1 Action spent)`, "sys");
      } else if (activeCodexKw.toUpperCase() === "INFILTRATOR") {
        if (u) u.isMovingActive = true;
        logEvent(`⚡ [ACTIVATED ABILITY] ${uName} activated INFILTRATOR: Unlocked tactical forward movement!`, "sys");
      } else {
      if (u) u.actionsRemaining = Math.max(0, u.actionsRemaining - 1);
      logEvent(`\u26a1 [ACTIVATED ABILITY] ${uName} activated ${activeCodexKw.toUpperCase()} effect on battlefield! (1 Action spent)`, "sys");
    }

    closeCodex();
    drawBoard();
    renderInspector();
    });
  }

  function populateWarbandSelects() {
    let savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    
    let selects = [
      document.getElementById('selWarbandP1'),
      document.getElementById('selWarbandP2'),
      document.getElementById('selWizardP1Warband'),
      document.getElementById('selWizardP2Warband')
    ].filter(Boolean);

    selects.forEach(s => {
      let curr = s.value;
      s.innerHTML = '';

      if (savedVault.length > 0) {
        savedVault.forEach((v, idx) => {
          let opt = document.createElement('option');
          opt.value = `vault_${idx}`;
          opt.textContent = `🏆 [VAULT] ${v.name} (${v.spent}D)`;
          s.appendChild(opt);
        });
      }

      let defaults = [
        { id: "default_na", name: "Order of Antioch (New Antioch)" },
        { id: "default_tp", name: "Procession of the Cross (Trench Pilgrims)" },
        { id: "default_hl", name: "Black Grail Host (Heretic Legions)" },
        { id: "default_is", name: "Alchemist Force (Iron Sultanate)" },
        { id: "default_cs", name: "Court of the Seven-Headed Serpent" }
      ];

      defaults.forEach(d => {
        let opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        s.appendChild(opt);
      });

      if (curr && Array.from(s.options).some(o => o.value === curr)) {
        s.value = curr;
      } else {
        s.selectedIndex = 0;
      }
    });
  }

  window.refreshVaultDropdowns = populateWarbandSelects;

  function applyDoctrineToTokens(tokens, doctrineKey, playerNum) {
    if (!tokens || tokens.length === 0 || !doctrineKey || doctrineKey === 'doctrine_none') return;
    tokens.forEach(t => {
      if (!t.kw) t.kw = [];
      if (doctrineKey === 'sin_pride') {
        t.ranged = (t.ranged || 0) + 1;
        t.kw.push("SIN OF PRIDE (+1 Hit)");
      } else if (doctrineKey === 'sin_wrath') {
        t.melee = (t.melee || 0) + 1;
        t.kw.push("SIN OF WRATH (+1 Melee)");
      } else if (doctrineKey === 'sin_gluttony') {
        t.wounds = (t.wounds || 1) + 1;
        t.maxWounds = (t.maxWounds || 1) + 1;
        t.kw.push("SIN OF GLUTTONY (+1 Wound)");
      } else if (doctrineKey === 'sin_greed') {
        t.kw.push("SIN OF GREED (+2 Blessing)");
      } else if (doctrineKey === 'relic_banner') {
        t.kw.push("GOTHIC BLOOD BANNER (+1 Courage)");
      } else if (doctrineKey === 'relic_martyr') {
        t.kw.push("SACRED MARTYR (+1 Injury Die)");
      } else if (doctrineKey === 'antioch_combined') {
        t.kw.push("COMBINED ARMS");
      } else if (doctrineKey === 'sultan_takwin') {
        t.move = (t.move || 6) + 1;
        t.kw.push("TAKWIN ALCHEMY (+1 Speed)");
      }
    });

    if (doctrineKey === 'sin_greed') {
      if (playerNum === 1) poolBlessing += 2;
    }
  }

  function getDefaultRoster(type) {
    if (type === 'default_tp') {
      return [
        { name: "War Prophet", cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "images/war_prophet.jpg", kw: ["COMMANDER", "PROPHECY OF DOOM"], equippedSlots: { melee: { name: "Unholy Staff", kw: ["PARRY"] }, equipment: { name: "Gothic Blood Banner", kw: ["+1 COURAGE"] } } },
        { name: "Castigator", cat: "Elite", baseMM: 32, move: 6, ranged: 0, melee: 3, armour: 1, wounds: 2, img: "images/castigator.jpg", kw: ["CLEAVE 2"], equippedSlots: { melee: { name: "Greatsword", kw: ["CLEAVE 2"] } } },
        { name: "Martyr Penitent", cat: "Specialist", baseMM: 25, move: 6, ranged: 0, melee: 2, armour: 0, wounds: 1, img: "images/martyr_penitent.jpg", kw: [], equippedSlots: { melee: { name: "Trench Axe", kw: ["CLEAVE 1"] } } },
        { name: "Trench Pilgrim", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 1, armour: 0, wounds: 1, img: "images/trench_pilgrim.jpg", kw: ["LINE INFANTRY"], equippedSlots: { melee: { name: "Trench Knife", kw: ["1-HANDED"] } } }
      ];
    } else if (type === 'default_is') {
      return [
        { name: "Yuzbasi Captain", cat: "Leader", baseMM: 32, move: 6, ranged: 2, melee: 1, armour: 1, wounds: 2, img: "images/yuzbasi_captain.jpg", kw: ["COMMANDER", "INHERENT LEADERSHIP"], equippedSlots: { melee: { name: "Scimitar", kw: ["PARRY"] } } },
        { name: "Jabirean Alchemist", cat: "Elite", baseMM: 32, move: 6, ranged: 1, melee: 1, armour: 1, wounds: 2, img: "images/jabirean_alchemist.jpg", kw: ["FIRE IMMUNE"], equippedSlots: { ranged: { name: "Alchemical Projector", kw: ["GAS HAZARD"] } } },
        { name: "Azab Warrior", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/azab_warrior.jpg", kw: ["LINE INFANTRY"], equippedSlots: { ranged: { name: "Musket", kw: ["RELOAD"] } } },
        { name: "Sipahi Automaton", cat: "Elite", baseMM: 40, move: 5, ranged: 0, melee: 2, armour: 3, wounds: 3, img: "images/sipahi_automaton.jpg", kw: ["CLOCKWORK CONSTRUCT"], equippedSlots: { melee: { name: "Automaton Glaive", kw: ["CLEAVE 2"] } } }
      ];
    } else if (type === 'default_cs') {
      return [
        { name: "Serpent Sorcerer", cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "images/serpent_sorcerer.jpg", kw: ["COMMANDER", "GOETIC SORCERY"], equippedSlots: { melee: { name: "Ritual Dagger", kw: ["POISON BLADES"] } } },
        { name: "Takuba Swordsman", cat: "Elite", baseMM: 32, move: 7, ranged: 0, melee: 2, armour: 1, wounds: 2, img: "images/takuba_swordsman.jpg", kw: ["TRENCH RAID"], equippedSlots: { melee: { name: "Takuba Sword", kw: ["PARRY"] } } },
        { name: "Yoke Fiend", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/yoke_fiend.jpg", kw: ["WRETCHED"], equippedSlots: { melee: { name: "Barbed Whip", kw: ["1-HANDED"] } } }
      ];
    } else if (type === 'default_hl') {
      return [
        { name: "Heretic Priest", cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "images/heretic_priest.jpg", kw: ["COMMANDER", "DARK BLESSINGS"], equippedSlots: { ranged: { name: "Hellfire Pistol", kw: ["1-HANDED"] }, melee: { name: "Unholy Staff", kw: ["PARRY"] } } },
        { name: "Anointed Champion", cat: "Elite", baseMM: 32, move: 6, ranged: 0, melee: 2, armour: 2, wounds: 2, img: "images/anointed_champion.jpg", kw: ["BLACK GRAIL PLAGUE"], equippedSlots: { melee: { name: "Greatsword", kw: ["CLEAVE 2"] } } },
        { name: "Heretic Trooper", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/heretic_trooper.jpg", kw: ["LINE INFANTRY"], equippedSlots: { ranged: { name: "Submachine Gun", kw: ["AUTOMATIC 2"] } } },
        { name: "Heretic Trooper", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/heretic_trooper.jpg", kw: ["LINE INFANTRY"], equippedSlots: { melee: { name: "Trench Sword", kw: ["PARRY"] } } }
      ];
    } else {
      // Default: New Antioch
      return [
        { name: "Lieutenant of Antioch", cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 1, armour: 1, wounds: 2, img: "images/lieutenant_new_antioch.jpg", kw: ["COMMANDER", "DEADEYE AIM"], equippedSlots: { ranged: { name: "Automatic Pistol", kw: ["AUTOMATIC 2"] }, melee: { name: "Trench Sword", kw: ["PARRY"] } } },
        { name: "Sniper Priest", cat: "Specialist", baseMM: 25, move: 6, ranged: 2, melee: 0, armour: 0, wounds: 1, img: "images/sniper_priest.jpg", kw: ["SNIPER"], equippedSlots: { ranged: { name: "Heavy Sniper Rifle", kw: ["SNIPER"] } } },
        { name: "Trench Trooper", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/trench_trooper.jpg", kw: ["LINE INFANTRY"], equippedSlots: { ranged: { name: "Bolt Action Rifle", kw: ["RELOAD"] } } },
        { name: "Trench Trooper", cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "images/trench_trooper.jpg", kw: ["LINE INFANTRY"], equippedSlots: { melee: { name: "Trench Shotgun", kw: ["CLOSE-QUARTERS"] } } }
      ];
    }
  }

  // CUSTOM MATCH IMPORT & SAVE SYSTEM DATA STORES
  let customRosterP1 = null;
  let customRosterP2 = null;
  let customMapData = null;

  function generateProceduralMap(type = 'map_procedural_light') {
    console.log("🎲 [PROCEDURAL MAP] Generating map type:", type);
    currentMapKey = type;
    let bg = "images/ww1_trench_table.jpg";
    let title = "PROCEDURAL SKIRMISH SECTOR";
    let modifiers = "MODIFIERS: Dynamic Tactical Cover • Generated No Man's Land";
    let terrain = [];

    if (type === 'map_procedural_swamp') {
      title = "MUSTARD GAS SWAMP (PROCEDURAL)";
      bg = "images/rusted_trench_texture.jpg";
      modifiers = "MODIFIERS: +1 Toxic Hazard Damage • Reduced Line of Sight";
      terrain = [
        { id: "pt1", type: "gas", name: "Heavy Mustard Fog Cloud", x: 220, y: 160, w: 180, h: 140, elev: 0, gas: true },
        { id: "pt2", type: "gas", name: "Toxic Gas Crater", x: 440, y: 380, w: 200, h: 150, elev: 0, gas: true },
        { id: "pt3", type: "wire", name: "Submerged Barbed Wire", x: 340, y: 300, w: 160, h: 40, elev: 0, difficult: true },
        { id: "pt4", type: "building", name: "Ruined Bunker Wall", x: 180, y: 460, w: 100, h: 80, elev: 1, cover: 1 },
        { id: "pt5", type: "shrine", name: "Sunken Shrine Objective", x: 420, y: 280, w: 40, h: 40, elev: 0, objective: true }
      ];
    } else if (type === 'map_procedural_heavy') {
      title = "HEAVY FORTRESS SIEGE (PROCEDURAL)";
      bg = "images/ww1_field_report.jpg";
      modifiers = "MODIFIERS: Fortress Redoubts (+2 Armour) • Intersecting Trench Walls";
      terrain = [
        { id: "pt1", type: "building", name: "Command Pillbox Tower", x: 370, y: 140, w: 130, h: 110, elev: 3, cover: 1 },
        { id: "pt2", type: "trench", name: "Northern Trench Barrier", x: 180, y: 240, w: 220, h: 30, elev: 0, cover: 1 },
        { id: "pt3", type: "trench", name: "Southern Trench Line", x: 440, y: 420, w: 220, h: 30, elev: 0, cover: 1 },
        { id: "pt4", type: "wire", name: "Barbed Wire Belt Alpha", x: 300, y: 340, w: 120, h: 30, elev: 0, difficult: true },
        { id: "pt5", type: "wire", name: "Barbed Wire Belt Beta", x: 450, y: 280, w: 120, h: 30, elev: 0, difficult: true },
        { id: "pt6", type: "building", name: "Concrete Watchtower", x: 600, y: 150, w: 90, h: 90, elev: 2, cover: 1 },
        { id: "pt7", type: "shrine", name: "Sacred Altar Shrine", x: 410, y: 340, w: 40, h: 40, elev: 0, objective: true }
      ];
    } else {
      // Light Skirmish
      title = "LIGHT TRENCH SKIRMISH (PROCEDURAL)";
      bg = "images/ww1_trench_table.jpg";
      modifiers = "MODIFIERS: Standard Cover • Central Objective Relic";
      terrain = [
        { id: "pt1", type: "building", name: "Ruined Watchtower", x: 380, y: 180, w: 110, h: 90, elev: 2, cover: 1 },
        { id: "pt2", type: "trench", name: "Trench Sandbags", x: 220, y: 380, w: 180, h: 25, elev: 0, cover: 1 },
        { id: "pt3", type: "wire", name: "Crater Mud & Barbed Wire", x: 460, y: 360, w: 150, h: 50, elev: 0, difficult: true },
        { id: "pt4", type: "shrine", name: "Central Relic Shrine", x: 420, y: 320, w: 40, h: 40, elev: 0, objective: true }
      ];
    }

    if (txtMapTitle) txtMapTitle.textContent = title;
    if (txtMapModifiers) txtMapModifiers.textContent = modifiers;
    terrainObjects = terrain;

    bgImage.src = getImgPath(bg);
    bgImage.onload = () => drawBoard();
    logEvent(`Generated Procedural Map: ${title}`, "sys");
    drawBoard();
  }

  function exportMapJson() {
    let mapData = {
      title: txtMapTitle ? txtMapTitle.textContent : "Custom Map",
      modifiers: txtMapModifiers ? txtMapModifiers.textContent : "",
      currentMapKey,
      terrain: terrainObjects
    };
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mapData, null, 2));
    let dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `tc_map_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    logEvent("Exported Map JSON file.", "sys");
  }

  function importMapJson(mapData) {
    if (!mapData || !mapData.terrain) {
      alert("Invalid map JSON data.");
      return;
    }
    customMapData = mapData;
    if (txtMapTitle && mapData.title) txtMapTitle.textContent = mapData.title;
    if (txtMapModifiers && mapData.modifiers) txtMapModifiers.textContent = mapData.modifiers;
    terrainObjects = JSON.parse(JSON.stringify(mapData.terrain));
    logEvent(`Imported Custom Map: ${mapData.title || "Custom Map"}`, "sys");
    drawBoard();
  }

  function exportMatchState() {
    let matchState = {
      version: "1.0.2",
      savedAt: new Date().toISOString(),
      gameTurn,
      activePlayerTurn,
      vpPlayer1,
      vpPlayer2,
      poolBlood,
      poolBlessing,
      mapTitle: txtMapTitle ? txtMapTitle.textContent : "",
      mapModifiers: txtMapModifiers ? txtMapModifiers.textContent : "",
      currentMapKey,
      terrainObjects,
      unitTokens,
      combatLogHtml: combatLogBox ? combatLogBox.innerHTML : ""
    };

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matchState, null, 2));
    let dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `tc_match_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    logEvent("💾 EXPORTED FULL MATCH STATE (.JSON)", "sys");
  }

  function importMatchState(matchData) {
    if (!matchData || !Array.isArray(matchData.unitTokens)) {
      alert("INVALID MATCH JSON: Expected match state with unit tokens array.");
      return false;
    }

    unitTokens = matchData.unitTokens || [];
    terrainObjects = matchData.terrainObjects || [];
    gameTurn = matchData.gameTurn || 1;
    activePlayerTurn = matchData.activePlayerTurn || 1;
    vpPlayer1 = matchData.vpPlayer1 || 0;
    vpPlayer2 = matchData.vpPlayer2 || 0;
    poolBlood = matchData.poolBlood !== undefined ? matchData.poolBlood : 3;
    poolBlessing = matchData.poolBlessing !== undefined ? matchData.poolBlessing : 3;
    currentMapKey = matchData.currentMapKey || 'map_1';

    if (txtMapTitle && matchData.mapTitle) txtMapTitle.textContent = matchData.mapTitle;
    if (txtMapModifiers && matchData.mapModifiers) txtMapModifiers.textContent = matchData.mapModifiers;
    if (hudTurnNum) hudTurnNum.textContent = `TURN ${gameTurn} / 6`;
    if (vpP1El) vpP1El.textContent = vpPlayer1;
    if (vpP2El) vpP2El.textContent = vpPlayer2;
    if (poolBloodEl) poolBloodEl.textContent = poolBlood;
    if (poolBlessingEl) poolBlessingEl.textContent = poolBlessing;

    if (combatLogBox && matchData.combatLogHtml) {
      combatLogBox.innerHTML = matchData.combatLogHtml;
    }

    selectedToken = null;
    targetToken = null;
    updateActivePlayerHUD();
    resizeCanvasForHighDPI();
    drawBoard();
    renderInspector();

    logEvent(`[SESSION RESTORED] Resumed match from saved file! (${unitTokens.length} tokens active, Turn ${gameTurn})`, "sys");
    autoSaveMatch();
    return true;
  }

  function autoSaveMatch() {
    try {
      let matchState = {
        savedAt: new Date().toISOString(),
        gameTurn,
        activePlayerTurn,
        vpPlayer1,
        vpPlayer2,
        poolBlood,
        poolBlessing,
        mapTitle: txtMapTitle ? txtMapTitle.textContent : "",
        mapModifiers: txtMapModifiers ? txtMapModifiers.textContent : "",
        currentMapKey,
        terrainObjects,
        unitTokens,
        combatLogHtml: combatLogBox ? combatLogBox.innerHTML : ""
      };
      localStorage.setItem('tc_active_match', JSON.stringify(matchState));
      console.log("💾 [AUTO-SAVE] Saved active match state to localStorage!");
    } catch(e) {
      console.warn("⚠️ [AUTO-SAVE] Failed to write to localStorage:", e);
    }
  }

  function loadAutoMatch() {
    try {
      let dataStr = localStorage.getItem('tc_active_match');
      if (!dataStr) return false;
      let matchData = JSON.parse(dataStr);
      return importMatchState(matchData);
    } catch(e) {
      console.error("❌ Failed loading auto match:", e);
      return false;
    }
  }

  function hasAutoMatch() {
    try {
      let dataStr = localStorage.getItem('tc_active_match');
      if (!dataStr) return false;
      let matchData = JSON.parse(dataStr);
      return Array.isArray(matchData.unitTokens) && matchData.unitTokens.length > 0;
    } catch(e) {
      return false;
    }
  }

  function createTokensFromRoster(roster, playerNum, startX, formation = 'standard') {
    let tokens = [];
    if (!roster || !Array.isArray(roster)) return tokens;

    roster.forEach((m, idx) => {
      let baseSize = m.baseMM || 25;
      let radius = (baseSize / 2) * 1.15;
      
      let posX = startX;
      let posY = 120 + (idx * 110);

      if (formation === 'flanks') {
        if (idx % 2 === 0) {
          posX = playerNum === 1 ? 100 : 740;
          posY = 90 + (Math.floor(idx / 2) * 90);
        } else {
          posX = playerNum === 1 ? 160 : 680;
          posY = 480 + (Math.floor(idx / 2) * 90);
        }
      } else if (formation === 'ambush') {
        posX = playerNum === 1 ? 260 : 580;
        posY = 140 + (idx * 90);
      } else if (formation === 'scattered') {
        posX = playerNum === 1 ? 80 + (idx * 30) : 760 - (idx * 30);
        posY = 100 + ((idx * 85) % 460);
      } else {
        if (idx >= 5) {
          posX += (playerNum === 1 ? 75 : -75);
          posY = 120 + ((idx - 5) * 110);
        }
      }

      tokens.push({
        id: `p${playerNum}_${idx + 1}`,
        player: playerNum,
        name: m.name || "Trench Fighter",
        img: m.img || (playerNum === 1 ? "images/lieutenant_new_antioch.jpg" : "images/heretic_priest.jpg"),
        x: posX,
        y: posY,
        r: radius,
        baseMM: baseSize,
        wounds: m.wounds || 1,
        maxWounds: m.wounds || 1,
        move: m.move || 6,
        ranged: m.ranged !== undefined ? m.ranged : 1,
        melee: m.melee !== undefined ? m.melee : 1,
        armour: m.armour !== undefined ? m.armour : 0,
        bloodMarkers: 0,
        blessingMarkers: 0,
        isLeader: m.cat === "Leader" || idx === 0,
        activated: false,
        isMovingActive: false,
        movedThisTurn: false,
        actionsRemaining: 2,
        status: "Active",
        elev: 0,
        cost: m.cost || (m.totalCost || 50),
        cat: m.cat || "Trooper",
        equippedSlots: m.equippedSlots || { ranged: null, melee: null, armour: null, shields: null, grenades: null, equipment: null },
        baseKeywords: m.kw || (m.keywords || [])
      });
    });

    return tokens;
  }

  function deployWarbands() {
    console.log("⚔️ [GAME DEBUG] deployWarbands started!");
    let savedVault = [];
    try {
      savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    } catch(e) {
      savedVault = [];
    }

    let elP1 = document.getElementById('selWizardP1Warband') || document.getElementById('selWarbandP1');
    let elP2 = document.getElementById('selWizardP2Warband') || document.getElementById('selWarbandP2');
    let val1 = elP1 ? elP1.value : 'default_na';
    let val2 = elP2 ? elP2.value : 'default_hl';

    let doc1 = document.getElementById('selWizardP1Doctrine')?.value || 'doctrine_none';
    let doc2 = document.getElementById('selWizardP2Doctrine')?.value || 'doctrine_none';
    let formation = document.getElementById('selWizardFormation')?.value || 'standard';

    let rosterP1 = [];
    let rosterP2 = [];

    if (customRosterP1 && customRosterP1.length > 0) {
      rosterP1 = customRosterP1;
      console.log("⚔️ [GAME DEBUG] Using Custom Imported P1 Roster:", rosterP1.length, "units");
    } else if (val1 && val1.startsWith('vault_')) {
      let idx1 = parseInt(val1.replace('vault_', ''), 10);
      if (savedVault[idx1] && savedVault[idx1].roster && savedVault[idx1].roster.length > 0) {
        rosterP1 = savedVault[idx1].roster;
      } else {
        rosterP1 = getDefaultRoster('default_na');
      }
    } else {
      rosterP1 = getDefaultRoster(val1);
    }

    if (customRosterP2 && customRosterP2.length > 0) {
      rosterP2 = customRosterP2;
      console.log("⚔️ [GAME DEBUG] Using Custom Imported P2 Roster:", rosterP2.length, "units");
    } else if (val2 && val2.startsWith('vault_')) {
      let idx2 = parseInt(val2.replace('vault_', ''), 10);
      if (savedVault[idx2] && savedVault[idx2].roster && savedVault[idx2].roster.length > 0) {
        rosterP2 = savedVault[idx2].roster;
      } else {
        rosterP2 = getDefaultRoster('default_hl');
      }
    } else {
      rosterP2 = getDefaultRoster(val2);
    }

    let tokensP1 = createTokensFromRoster(rosterP1, 1, 100, formation);
    let tokensP2 = createTokensFromRoster(rosterP2, 2, 740, formation);

    applyDoctrineToTokens(tokensP1, doc1, 1);
    applyDoctrineToTokens(tokensP2, doc2, 2);

    unitTokens = [...tokensP1, ...tokensP2];

    selectedToken = null;
    targetToken = null;
    activePlayerTurn = 1;
    activeUnitId = null;
    updateActivePlayerHUD();

    let nameP1 = customRosterP1 ? "Custom P1 Warband" : (val1.startsWith('vault_') ? (savedVault[parseInt(val1.replace('vault_',''),10)]?.name || 'Vault Warband') : 'Player 1 Force');
    let nameP2 = customRosterP2 ? "Custom P2 Warband" : (val2.startsWith('vault_') ? (savedVault[parseInt(val2.replace('vault_',''),10)]?.name || 'Vault Warband') : 'Player 2 Force');

    logEvent(`[DEPLOYMENT] ${nameP1} (${tokensP1.length} models) vs ${nameP2} (${tokensP2.length} models) deployed in ${formation.toUpperCase()} formation!`, "sys");

    let selMap = document.getElementById('selWizardMap');
    if (selMap && selMap.value) {
      let mapKey = selMap.value;
      if (mapKey.startsWith('map_procedural_')) {
        generateProceduralMap(mapKey);
      } else if (mapKey === 'map_random') {
        const maps = ['map_1', 'map_2', 'map_3', 'map_4', 'map_5', 'map_6', 'map_7', 'map_8'];
        mapKey = maps[Math.floor(Math.random() * maps.length)];
        loadMapPreset(mapKey);
      } else {
        loadMapPreset(mapKey);
      }
    }

    resizeCanvasForHighDPI();
    drawBoard();
    renderInspector();
    autoSaveMatch();
    console.log("⚔️ [GAME DEBUG] deployWarbands completed successfully!");
  }

  window.refreshVaultDropdowns = populateWarbandSelects;
  window.deployWarbands = deployWarbands;
  window.drawBoard = drawBoard;
  window.resizeCanvasForHighDPI = resizeCanvasForHighDPI;
  window.loadMapPreset = loadMapPreset;
  window.generateProceduralMap = generateProceduralMap;
  window.exportMapJson = exportMapJson;
  window.importMapJson = importMapJson;
  window.exportMatchState = exportMatchState;
  window.importMatchState = importMatchState;
  window.autoSaveMatch = autoSaveMatch;
  window.loadAutoMatch = loadAutoMatch;
  window.hasAutoMatch = hasAutoMatch;
  window.setCustomP1Roster = (r) => { customRosterP1 = r; };
  window.setCustomP2Roster = (r) => { customRosterP2 = r; };

  // Terrain Tools
  document.querySelectorAll('.btn-terrain-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      let type = btn.dataset.type;
      let newTerrain = {
        id: "t_" + Date.now(),
        type,
        name: type === 'building' ? 'Ruined Building' : (type === 'trench' ? 'Trench Wall' : 'Terrain Feature'),
        x: 350 + Math.floor(Math.random() * 80),
        y: 200 + Math.floor(Math.random() * 80),
        w: type === 'building' ? 100 : 120,
        h: type === 'building' ? 100 : 30,
        elev: type === 'building' ? 2 : 0,
        cover: (type === 'building' || type === 'trench') ? 1 : 0
      };

      terrainObjects.push(newTerrain);
      logEvent(`Placed ${newTerrain.name} on battlefield.`, "sys");
      drawBoard();
    });
  });

  if (btnClearBoard) btnClearBoard.addEventListener('click', () => {
    if (confirm("Reset the entire battlefield board?")) {
      unitTokens = [];
      terrainObjects = [];
      selectedToken = null;
      activeUnitId = null;
      drawBoard();
      renderInspector();
    }
  });

  // Phase Control
  let p1Shaken = false;
  let p2Shaken = false;

  if (btnNextPhase) btnNextPhase.addEventListener('click', () => {
    currentPhaseIndex++;
    if (currentPhaseIndex >= phases.length) {
      currentPhaseIndex = 0;
      gameTurn++;
      if (gameTurn > 6) {
        let winner = vpPlayer1 > vpPlayer2 ? "PLAYER 1" : (vpPlayer2 > vpPlayer1 ? "PLAYER 2" : "TIE GAME");
        alert(`GAME OVER! Reached Turn 6 End Phase.\n\nFINAL SCORE:\nPlayer 1: ${vpPlayer1} VP\nPlayer 2: ${vpPlayer2} VP\n\nWINNER: ${winner}!`);
      }
      unitTokens.forEach(t => {
        t.activated = false;
        t.isMovingActive = false;
        t.movedThisTurn = false;
        t.actionsRemaining = 2;
      });
      activeUnitId = null;
      logEvent(`--- NEW TURN ${gameTurn} BEGINS ---`, "sys");
    }

    // Phase 1: Initiative Phase (Rulebook v1.0.2 Page 14)
    if (currentPhaseIndex === 0) {
      let activeP1 = unitTokens.filter(t => t.player === 1 && t.status === "Active").length;
      let activeP2 = unitTokens.filter(t => t.player === 2 && t.status === "Active").length;
      if (activeP1 < activeP2) {
        activePlayerTurn = 1;
        logEvent(`[INITIATIVE PHASE] Player 1 has fewer active models (${activeP1} vs ${activeP2}) and holds INITIATIVE for Turn ${gameTurn}!`, "sys");
      } else if (activeP2 < activeP1) {
        activePlayerTurn = 2;
        logEvent(`[INITIATIVE PHASE] Player 2 has fewer active models (${activeP2} vs ${activeP1}) and holds INITIATIVE for Turn ${gameTurn}!`, "sys");
      } else {
        let roll1 = Math.floor(Math.random() * 6) + 1;
        let roll2 = Math.floor(Math.random() * 6) + 1;
        while (roll1 === roll2) { roll1 = Math.floor(Math.random() * 6) + 1; roll2 = Math.floor(Math.random() * 6) + 1; }
        activePlayerTurn = roll1 > roll2 ? 1 : 2;
        logEvent(`[INITIATIVE PHASE] Active models tied (${activeP1} vs ${activeP2}). Roll-off: P1 rolled ${roll1}, P2 rolled ${roll2} -> Player ${activePlayerTurn} holds INITIATIVE!`, "dice");
      }
      updateActivePlayerHUD();
    }

    // Phase 3: Morale Phase (Rulebook v1.0.2 Page 14)
    if (currentPhaseIndex === 2) {
      [1, 2].forEach(pNum => {
        let totalP = unitTokens.filter(t => t.player === pNum).length;
        let casualties = unitTokens.filter(t => t.player === pNum && t.status !== "Active").length;
        if (totalP > 0 && casualties >= Math.ceil(totalP / 2)) {
          let d1 = Math.floor(Math.random() * 6) + 1;
          let d2 = Math.floor(Math.random() * 6) + 1;
          let sum = d1 + d2;
          let pass = sum >= 7;
          logEvent(`[MORALE PHASE] Player ${pNum} Warband has suffered 50%+ casualties (${casualties}/${totalP}). Morale Check 2D6 [${d1}, ${d2}] = ${sum}: ${pass ? 'PASSED (7+)' : 'FAILED - WARBAND IS SHAKEN!'}`, pass ? "sys" : "combat");
          if (!pass) {
            if (pNum === 1) p1Shaken = true;
            if (pNum === 2) p2Shaken = true;
          }
        }
      });
    }

    hudTurnNum.textContent = `TURN ${gameTurn} / 6`;
    hudPhaseName.textContent = phases[currentPhaseIndex];
    logEvent(`Phase advanced to ${phases[currentPhaseIndex]}.`, "sys");
    drawBoard();
    renderInspector();
  });

  if (btnAddBlood) btnAddBlood.addEventListener('click', () => { poolBlood++; poolBloodEl.textContent = poolBlood; });
  if (btnAddBlessing) btnAddBlessing.addEventListener('click', () => { poolBlessing++; poolBlessingEl.textContent = poolBlessing; });

  let toolGrenade = document.getElementById('toolGrenade');

  function setTool(toolName) {
    console.log("💣 [DEBUG setTool] Switching activeTool to:", toolName);
    logEvent(`💣 [DEBUG TOOL] Switched activeTool to '${toolName.toUpperCase()}'.`, "sys");
    activeTool = toolName;
    if (toolSelect) toolSelect.classList.toggle('active', toolName === 'select');
    if (toolRuler) toolRuler.classList.toggle('active', toolName === 'ruler');
    if (toolShoot) toolShoot.classList.toggle('active', toolName === 'shoot');
    if (toolFight) toolFight.classList.toggle('active', toolName === 'fight');
    if (toolGrenade) toolGrenade.classList.toggle('active', toolName === 'grenade');

    if (toolName === 'select') txtActiveTool.textContent = "ACTIVE TOOL: SELECT MODEL TOKEN";
    else if (toolName === 'ruler') txtActiveTool.textContent = "ACTIVE TOOL: MEASURE DISTANCE (CLICK & DRAG)";
    else if (toolName === 'shoot') txtActiveTool.textContent = "ACTIVE TOOL: TARGET SHOOT ACTION (CLICK TARGET)";
    else if (toolName === 'fight') txtActiveTool.textContent = "ACTIVE TOOL: TARGET CLOSE COMBAT FIGHT (CLICK TARGET)";
    else if (toolName === 'grenade') txtActiveTool.textContent = "ACTIVE TOOL: TARGET GRENADE / AOE BLAST (CLICK IMPACT POINT)";

    if (toolName === 'grenade' || toolName === 'shoot') {
      let targetX = selectedToken ? Math.min(DISPLAY_WIDTH - 100, selectedToken.x + (selectedToken.player === 1 ? 150 : -150)) : 400;
      let targetY = selectedToken ? selectedToken.y : 300;
      shootHoverPos = { x: targetX, y: targetY };
      if (typeof drawBoard === 'function') drawBoard();
    }
  }

  if (toolSelect) toolSelect.addEventListener('click', () => setTool('select'));
  if (toolRuler) toolRuler.addEventListener('click', () => setTool('ruler'));
  if (toolShoot) toolShoot.addEventListener('click', () => setTool('shoot'));
  if (toolFight) toolFight.addEventListener('click', () => setTool('fight'));
  if (toolGrenade) toolGrenade.addEventListener('click', () => setTool('grenade'));

  // HIGH-CLARITY ULTRA-CRISP RETINA CANVAS RENDERING ENGINE
  function drawBoard() {
    console.log(`🎨 [GAME DEBUG] drawBoard called! Canvas size: ${DISPLAY_WIDTH}x${DISPLAY_HEIGHT}, bgImage complete: ${bgImage.complete}, bgImage naturalWidth: ${bgImage.naturalWidth}, tokens: ${unitTokens.length}`);
    ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

    if (bgImage.complete && bgImage.naturalWidth > 0) {
      ctx.drawImage(bgImage, 0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fillRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    } else {
      ctx.fillStyle = "#0b0d11";
      ctx.fillRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
    }

    if (chkShowGrid && chkShowGrid.checked) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < DISPLAY_WIDTH; x += INCH_PX) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, DISPLAY_HEIGHT); ctx.stroke();
      }
      for (let y = 0; y < DISPLAY_HEIGHT; y += INCH_PX) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(DISPLAY_WIDTH, y); ctx.stroke();
      }
    }

    // SCENARIO DEPLOYMENT OVERLAY LINES
    if (chkShowDeployment && chkShowDeployment.checked) {
      ctx.save();
      let scen = scenariosDict[currentScenarioKey] || scenariosDict["scen_1"];
      let depP1Px = scen.depLineLeft * INCH_PX; // e.g. 9" = 225px
      let depP2Px = DISPLAY_WIDTH - (scen.depLineRight * INCH_PX);

      // Player 1 Zone (Crimson Red)
      ctx.fillStyle = "rgba(184, 15, 15, 0.06)";
      ctx.fillRect(0, 0, depP1Px, DISPLAY_HEIGHT);
      ctx.strokeStyle = "rgba(184, 15, 15, 0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.beginPath(); ctx.moveTo(depP1Px, 0); ctx.lineTo(depP1Px, DISPLAY_HEIGHT); ctx.stroke();

      // Player 2 Zone (Blue)
      ctx.fillStyle = "rgba(56, 120, 184, 0.06)";
      ctx.fillRect(depP2Px, 0, DISPLAY_WIDTH - depP2Px, DISPLAY_HEIGHT);
      ctx.strokeStyle = "rgba(56, 120, 184, 0.6)";
      ctx.beginPath(); ctx.moveTo(depP2Px, 0); ctx.lineTo(depP2Px, DISPLAY_HEIGHT); ctx.stroke();

      drawCrispPillLabel(ctx, `P1 DEPLOYMENT ZONE (${scen.depLineLeft}")`, depP1Px / 2 - 60, 12, "#3b0505", varColor('--bone-bright'));
      drawCrispPillLabel(ctx, `P2 DEPLOYMENT ZONE (${scen.depLineRight}")`, depP2Px + 20, 12, "#122030", "#8ab4f8");
      ctx.restore();
    }

    // Terrain Objects
    terrainObjects.forEach(t => {
      ctx.save();
      if (t.type === 'building') {
        ctx.fillStyle = "rgba(40, 45, 55, 0.88)";
        ctx.strokeStyle = varColor('--gold-glow');
        ctx.lineWidth = 2;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        drawCrispPillLabel(ctx, `\ud83c\udff0 ${t.name} (H:${t.elev}")`, t.x + 8, t.y + 18, "rgba(10, 12, 16, 0.95)", varColor('--gold-glow'));
        drawCrispPillLabel(ctx, `+1 High Ground Hit`, t.x + 8, t.y + 36, "rgba(10, 12, 16, 0.95)", varColor('--bone-bright'));
      } else if (t.type === 'trench') {
        ctx.fillStyle = "rgba(60, 40, 20, 0.88)";
        ctx.strokeStyle = "#8a6d4b";
        ctx.lineWidth = 2;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        drawCrispPillLabel(ctx, `\ud83e\uddf1 ${t.name} (+1 Cover)`, t.x + 6, t.y + 16, "rgba(15, 10, 5, 0.95)", "#e0c29e");
      } else if (t.type === 'wire') {
        ctx.fillStyle = "rgba(20, 20, 20, 0.85)";
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 1.5;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        drawCrispPillLabel(ctx, `\ud83e\udd94 Barbed Wire (Difficult)`, t.x + 4, t.y + 16, "rgba(5, 5, 5, 0.95)", "#cccccc");
      } else if (t.type === 'gas') {
        ctx.fillStyle = "rgba(80, 140, 40, 0.45)";
        ctx.strokeStyle = "#81c784";
        ctx.lineWidth = 1.5;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        drawCrispPillLabel(ctx, `\u2623\ufe0f Mustard Gas Hazard`, t.x + 8, t.y + 18, "rgba(10, 25, 10, 0.95)", "#a5d6a7");
      } else if (t.type === 'shrine') {
        ctx.fillStyle = "rgba(120, 10, 10, 0.75)";
        ctx.strokeStyle = varColor('--blood-bright');
        ctx.lineWidth = 2;
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        drawCrispPillLabel(ctx, `\u271d\ufe0f Relic Shrine`, t.x + 4, t.y + 22, "rgba(25, 5, 5, 0.95)", "#ffffff");
      }
      ctx.restore();
    });

    // 6" Movement Range Aura
    if (selectedToken && (selectedToken.isMovingActive || (chkShowRanges && chkShowRanges.checked))) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(selectedToken.x, selectedToken.y, selectedToken.move * INCH_PX, 0, Math.PI * 2);
      ctx.fillStyle = selectedToken.isMovingActive ? "rgba(229, 193, 88, 0.15)" : "rgba(184, 15, 15, 0.08)";
      ctx.strokeStyle = selectedToken.isMovingActive ? varColor('--gold-glow') : "rgba(184, 15, 15, 0.5)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Ranged Weapon Line of Sight (LoS) & Endpoint AoE Blast Overlay
    if ((activeTool === 'shoot' || activeTool === 'grenade') && shootHoverPos) {
      ctx.save();
      let strokeColor = "#4caf50";
      let isBlastWeapon = false;
      let blastRadiusPx = 100; // Default 4"

      if (selectedToken) {
        let dx = shootHoverPos.x - selectedToken.x;
        let dy = shootHoverPos.y - selectedToken.y;
        let distPx = Math.sqrt(dx * dx + dy * dy);
        let distInches = (distPx / INCH_PX);

        let maxRange = 24;
        let equippedRanged = selectedToken.equippedSlots ? (selectedToken.equippedSlots.ranged || selectedToken.equippedSlots.grenades) : null;
        if (equippedRanged) {
          if (activeTool === 'grenade' || (equippedRanged.name && equippedRanged.name.toLowerCase().includes('grenade'))) {
            maxRange = 8; // Grenade max throw range = 8"
          } else if (equippedRanged.kw) {
            let rKw = equippedRanged.kw.find(k => k.includes('RANGED'));
            if (rKw) {
              let match = rKw.match(/\d+/);
              if (match) maxRange = parseInt(match[0], 10);
            }
          }

          if (equippedRanged.kw) {
            let blastKw = equippedRanged.kw.find(k => k.includes('BLAST') || k.includes('GAS'));
            if (blastKw || activeTool === 'grenade') {
              isBlastWeapon = true;
              if (blastKw && blastKw.includes('5"')) blastRadiusPx = 125;
              else if (blastKw && blastKw.includes('3"')) blastRadiusPx = 75;
              else blastRadiusPx = activeGrenadeRadiusPx || 100;
            }
          } else if (activeTool === 'grenade') {
            isBlastWeapon = true;
            blastRadiusPx = activeGrenadeRadiusPx || 100;
          }
        } else if (activeTool === 'grenade') {
          isBlastWeapon = true;
          maxRange = 8;
          blastRadiusPx = activeGrenadeRadiusPx || 100;
        }

        let inRange = distInches <= maxRange;
        strokeColor = inRange ? "#4caf50" : "#f44336";
        let circleFill = inRange ? "rgba(76, 175, 80, 0.25)" : "rgba(244, 67, 54, 0.25)";

        // Dashed LoS Vector Ray from Attacker to Endpoint
        ctx.beginPath();
        ctx.moveTo(selectedToken.x, selectedToken.y);
        ctx.lineTo(shootHoverPos.x, shootHoverPos.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        ctx.stroke();

        let midX = (selectedToken.x + shootHoverPos.x) / 2;
        let midY = (selectedToken.y + shootHoverPos.y) / 2;
        let labelText = inRange 
          ? `🟢 ${activeTool === 'grenade' ? 'THROW LoS' : 'RANGED LoS'}: ${distInches.toFixed(1)}" (IN RANGE ${maxRange}")`
          : `⛔ OUT OF RANGE: ${distInches.toFixed(1)}" (MAX ${maxRange}")`;
        let bgLabel = inRange ? "#0a240c" : "#3b0505";
        drawCrispPillLabel(ctx, labelText, midX - 65, midY - 10, bgLabel, strokeColor, true);

        // Draw Endpoint AoE Blast Circle if Grenade or Blast weapon
        if (isBlastWeapon) {
          ctx.beginPath();
          ctx.arc(shootHoverPos.x, shootHoverPos.y, blastRadiusPx, 0, Math.PI * 2);
          ctx.fillStyle = circleFill;
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 3]);
          ctx.fill();
          ctx.stroke();

          // Highlight all models caught inside the Blast Circle
          unitTokens.forEach(t => {
            let tDx = t.x - shootHoverPos.x;
            let tDy = t.y - shootHoverPos.y;
            if (Math.sqrt(tDx * tDx + tDy * tDy) <= blastRadiusPx + t.r) {
              ctx.beginPath();
              ctx.arc(t.x, t.y, t.r + 4, 0, Math.PI * 2);
              ctx.strokeStyle = inRange ? "#ff9800" : "#ff1744";
              ctx.lineWidth = 2.5;
              ctx.stroke();
              drawCrispPillLabel(ctx, inRange ? "💥 IN BLAST ZONE" : "⚠️ OUT OF RANGE", t.x - 35, t.y - t.r - 20, "#280a04", "#ffab40");
            }
          });
        }
      }

      // Target Sight Crosshair
      ctx.beginPath();
      ctx.arc(shootHoverPos.x, shootHoverPos.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    }

    // Measuring Ray
    if (isMeasuring && rulerStart && rulerEnd) {
      let dx = rulerEnd.x - rulerStart.x;
      let dy = rulerEnd.y - rulerStart.y;
      let distPx = Math.sqrt(dx * dx + dy * dy);
      let distInches = (distPx / INCH_PX).toFixed(1);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rulerStart.x, rulerStart.y);
      ctx.lineTo(rulerEnd.x, rulerEnd.y);
      ctx.strokeStyle = varColor('--gold-glow');
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();

      let midX = (rulerStart.x + rulerEnd.x) / 2;
      let midY = (rulerStart.y + rulerEnd.y) / 2;
      drawCrispPillLabel(ctx, `${distInches}"`, midX - 25, midY - 10, "#000000", varColor('--gold-glow'), true);
      ctx.restore();

      txtMeasurementInfo.textContent = `MEASURED DISTANCE: ${distInches} Inches`;
    }

    // Unit Tokens
    unitTokens.forEach(t => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      
      let pColor = t.player === 1 ? varColor('--blood-bright') : "#386b99";
      ctx.fillStyle = t.status === "Out of Action" ? "#111" : (t.activated ? "#222" : (t.player === 1 ? "#3b0505" : "#122030"));
      ctx.fill();
      ctx.lineWidth = selectedToken === t ? 3.5 : 2.5;
      ctx.strokeStyle = selectedToken === t ? varColor('--gold-glow') : pColor;
      ctx.stroke();

      // Portrait Image
      let imgObj = getCachedImage(t.img, t.name, t.player);
      if (imgObj && imgObj.complete && imgObj.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(imgObj, t.x - t.r, t.y - t.r, t.r * 2, t.r * 2);
        ctx.restore();
      }

      // Marker Badges Attached Directly to Token
      let bCount = t.bloodMarkers || 0;
      let blCount = t.blessingMarkers || 0;

      if (bCount > 0) {
        drawCrispPillLabel(ctx, `\ud83e\ude78${bCount}`, t.x - t.r - 10, t.y - t.r - 4, "#500505", "#ff9999");
      }

      if (blCount > 0) {
        drawCrispPillLabel(ctx, `\u2728${blCount}`, t.x + t.r - 10, t.y - t.r - 4, "#141a24", varColor('--gold-glow'));
      }

      // Unit Name Crisp Label Box
      drawCrispPillLabel(ctx, t.name, t.x - 40, t.y + t.r + 6, "rgba(8, 10, 14, 0.95)", t.status === "Out of Action" ? "#888888" : varColor('--bone-bright'));

      if (t.status === "Down") {
        drawCrispPillLabel(ctx, "[DOWN]", t.x - 22, t.y - t.r - 18, "#780a0a", "#ffffff");
      } else if (t.status === "Out of Action") {
        drawCrispPillLabel(ctx, "[DEAD]", t.x - 22, t.y - t.r - 18, "#222222", "#aaaaaa");
      } else if (t.elev > 0) {
        drawCrispPillLabel(ctx, `\u25b2 LVL ${t.elev}`, t.x - 24, t.y - t.r - 18, "rgba(20, 24, 32, 0.95)", varColor('--gold-glow'));
      }
    });
  }

  function drawCrispPillLabel(context, text, x, y, bgColor, textColor, isCentered = false) {
    context.save();
    context.font = "bold 11px 'Inter', sans-serif";
    let textWidth = context.measureText(text).width;
    let paddingX = 6;
    let paddingY = 4;
    let boxW = textWidth + paddingX * 2;
    let boxH = 16;
    let drawX = isCentered ? x - boxW / 2 : Math.floor(x);
    let drawY = Math.floor(y);

    context.fillStyle = bgColor;
    context.strokeStyle = "rgba(255, 255, 255, 0.2)";
    context.lineWidth = 1;
    context.fillRect(drawX, drawY, boxW, boxH);
    context.strokeRect(drawX, drawY, boxW, boxH);

    context.fillStyle = textColor;
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(text, drawX + paddingX, drawY + boxH / 2 + 0.5);
    context.restore();
  }

  function varColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#fff';
  }

  // Mouse Handlers with High-DPI Display Scaling & Proximity Target Selection
  canvas.addEventListener('mousedown', (e) => {
    let rect = canvas.getBoundingClientRect();
    let scaleX = DISPLAY_WIDTH / (rect.width || DISPLAY_WIDTH);
    let scaleY = DISPLAY_HEIGHT / (rect.height || DISPLAY_HEIGHT);
    let mouseX = (e.clientX - rect.left) * scaleX;
    let mouseY = (e.clientY - rect.top) * scaleY;

    // Direct token hit check
    let clicked = unitTokens.find(t => {
      let dx = mouseX - t.x;
      let dy = mouseY - t.y;
      return Math.sqrt(dx * dx + dy * dy) <= (t.r || 18);
    });

    // Generous proximity target selection check
    if (!clicked) {
      let candidates = unitTokens.filter(t => {
        let dx = mouseX - t.x;
        let dy = mouseY - t.y;
        return Math.sqrt(dx * dx + dy * dy) <= 45; // 45px target proximity
      });
      if (candidates.length > 0) {
        candidates.sort((a, b) => Math.hypot(mouseX - a.x, mouseY - a.y) - Math.hypot(mouseX - b.x, mouseY - b.y));
        clicked = candidates[0];
      }
    }

    if (activeTool === 'ruler') {
      isMeasuring = true;
      rulerStart = { x: mouseX, y: mouseY };
      rulerEnd = { x: mouseX, y: mouseY };
    } else if (activeTool === 'select') {
      if (clicked) {
        selectedToken = clicked;
        renderInspector();

        if (clicked.isMovingActive && clicked.actionsRemaining > 0) {
          isDraggingToken = true;
          startMovePos = { x: clicked.x, y: clicked.y };
          dragOffset = { x: mouseX - clicked.x, y: mouseY - clicked.y };
        } else {
          isDraggingToken = false;
        }
      } else {
        selectedToken = null;
        isDraggingToken = false;
        renderInspector();
      }
    } else if (activeTool === 'shoot' || activeTool === 'fight') {
      if (clicked) {
        if (!selectedToken) {
          selectedToken = clicked;
          renderInspector();
          logEvent(`Selected ${clicked.name} as active unit. Choose a target enemy token.`, "sys");
        } else if (clicked !== selectedToken) {
          targetToken = clicked;

          if (activeTool === 'fight') {
            let dx = targetToken.x - selectedToken.x;
            let dy = targetToken.y - selectedToken.y;
            let distInches = (Math.sqrt(dx * dx + dy * dy) / INCH_PX);

            if (distInches > MELEE_RANGE_INCHES) {
              alert(`⛔ MELEE RANGE GUARDRAIL BLOCK:\n\nTarget is ${distInches.toFixed(1)}" away!\nMust be within ${MELEE_RANGE_INCHES}" Melee Engagement Range to Fight.\n\nUse your Movement action to Charge into melee contact first!`);
              setTool('select');
              return;
            }
          }

          openCombatResolver(selectedToken, targetToken, activeTool);
        }
      }
    }

    drawBoard();
  });

  canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let scaleX = DISPLAY_WIDTH / (rect.width || DISPLAY_WIDTH);
    let scaleY = DISPLAY_HEIGHT / (rect.height || DISPLAY_HEIGHT);
    let mouseX = (e.clientX - rect.left) * scaleX;
    let mouseY = (e.clientY - rect.top) * scaleY;

    if (activeTool === 'shoot' || activeTool === 'grenade') {
      shootHoverPos = { x: mouseX, y: mouseY };
      drawBoard();
    }

    if (isDraggingToken && selectedToken && selectedToken.isMovingActive && selectedToken.actionsRemaining > 0) {
      let newX = mouseX - dragOffset.x;
      let newY = mouseY - dragOffset.y;

      let dx = newX - startMovePos.x;
      let dy = newY - startMovePos.y;
      let distPx = Math.sqrt(dx * dx + dy * dy);
      let maxPx = selectedToken.move * INCH_PX;

      if (distPx <= maxPx) {
        selectedToken.x = newX;
        selectedToken.y = newY;
      } else {
        let angle = Math.atan2(dy, dx);
        selectedToken.x = startMovePos.x + Math.cos(angle) * maxPx;
        selectedToken.y = startMovePos.y + Math.sin(angle) * maxPx;
      }

      let onBuilding = terrainObjects.find(t => t.type === 'building' && 
        selectedToken.x >= t.x && selectedToken.x <= t.x + t.w &&
        selectedToken.y >= t.y && selectedToken.y <= t.y + t.h
      );

      selectedToken.elev = onBuilding ? onBuilding.elev : 0;
      selectedToken.movedThisTurn = true;

      drawBoard();
    }

    if (isMeasuring) {
      rulerEnd = { x: mouseX, y: mouseY };
      drawBoard();
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDraggingToken && selectedToken) {
      isDraggingToken = false;
      selectedToken.isMovingActive = false;
      selectedToken.actionsRemaining = Math.max(0, selectedToken.actionsRemaining - 1);
      logEvent(`${selectedToken.name} completed Movement action. (${selectedToken.actionsRemaining} actions remaining).`, "sys");
      
      if (selectedToken.actionsRemaining === 0) {
        finishUnitActivation(selectedToken);
      } else {
        renderInspector();
        drawBoard();
      }
    }
    isMeasuring = false;
  });

  function finishUnitActivation(u) {
    u.activated = true;
    u.isMovingActive = false;
    u.actionsRemaining = 0;
    activeUnitId = null;

    activePlayerTurn = activePlayerTurn === 1 ? 2 : 1;
    updateActivePlayerHUD();

    logEvent(`${u.name} completed activation. Turn passes to PLAYER ${activePlayerTurn}!`, "sys");
    renderInspector();
    drawBoard();
  }

  // Render Authentic Full-Art Trading Card in Right Inspector
  function renderInspector() {
    if (!selectedToken) {
      inspectorContent.innerHTML = `<div class="empty-inspector-msg">CLICK ANY UNIT TOKEN ON THE MAP TO DISPLAY ITS FULL-ART PLAYER CARD WITH INTERACTIVE WEAPONS, ABILITIES & ACTION CONTROLS.</div>`;
      return;
    }

    let u = selectedToken;

    let slotRangedName = u.equippedSlots.ranged ? u.equippedSlots.ranged.name : 'Empty Slot';
    let slotMeleeName = u.equippedSlots.melee ? u.equippedSlots.melee.name : 'Empty Slot';
    let slotArmourName = u.equippedSlots.armour ? u.equippedSlots.armour.name : 'Empty Slot';
    let slotShieldsName = u.equippedSlots.shields ? u.equippedSlots.shields.name : 'Empty Slot';
    let slotGrenadesName = u.equippedSlots.grenades ? u.equippedSlots.grenades.name : 'Empty Slot';
    let slotEquipmentName = u.equippedSlots.equipment ? u.equippedSlots.equipment.name : 'Empty Slot';

    let activeKeywords = [...u.baseKeywords];
    Object.values(u.equippedSlots).forEach(item => {
      if (item && item.kw) {
        item.kw.forEach(k => { if (!activeKeywords.includes(k)) activeKeywords.push(k); });
      }
    });

    let kwBadges = activeKeywords.map(k => {
      let isEquipKw = !u.baseKeywords.includes(k);
      return `<span class="kw-pill ${isEquipKw ? 'equip-kw' : 'base-kw'}" data-kw="${k}">${k}</span>`;
    }).join(' ');

    let isCurrentPlayerTurn = u.player === activePlayerTurn;
    let isAnotherUnitActive = activeUnitId !== null && activeUnitId !== u.id;
    let canActivate = isCurrentPlayerTurn && !isAnotherUnitActive && !u.activated && u.status === 'Active';

    let bCount = u.bloodMarkers || 0;
    let blCount = u.blessingMarkers || 0;

    inspectorContent.innerHTML = `
      <div class="full-art-roster-card" style="background-image: linear-gradient(180deg, rgba(12, 14, 18, 0.55), rgba(6, 7, 9, 0.95)), url('${getImgPath(u.img)}'); background-size: cover; background-position: center;">
        <div class="card-top-overlay">
          <div class="card-title-row">
            <span class="card-unit-name">#${u.id.split('_')[1]} ${u.name} ${u.isLeader ? '\u2b50' : ''}</span>
            <span class="card-cost-badge">${u.cost} D</span>
          </div>
          <div class="card-meta-line">${u.cat} \u2022 Base: ${u.baseMM}mm \u2022 Player ${u.player}</div>
        </div>

        <div class="card-mid-overlay">
          <div class="card-stats-strip">
            MOVE: ${u.move}" | RANGED: +${u.ranged} | MELEE: +${u.melee} | ARMOUR: ${u.armour} | WOUNDS: ${u.wounds}/${u.maxWounds}
          </div>

          <div class="card-markers-strip">
            <div class="marker-counter-box">
              <span style="color:#ff8a80; font-weight:bold;">\ud83e\ude78 Blood:</span>
              <button type="button" class="btn-card-marker-ctrl" id="btnMinusBlood">-</button>
              <strong style="color:#fff;" id="txtUnitBlood">${bCount}</strong>
              <button type="button" class="btn-card-marker-ctrl" id="btnPlusBlood">+</button>
            </div>

            <div class="marker-counter-box">
              <span style="color:var(--gold-glow); font-weight:bold;">\u2728 Blessing:</span>
              <button type="button" class="btn-card-marker-ctrl" id="btnMinusBlessing">-</button>
              <strong style="color:#fff;" id="txtUnitBlessing">${blCount}</strong>
              <button type="button" class="btn-card-marker-ctrl" id="btnPlusBlessing">+</button>
            </div>
          </div>

          <div class="card-slots-overlay-grid">
            <div class="card-slot-pill ${u.equippedSlots.ranged ? 'has-item' : ''}" id="slotRangedTrigger">
              <span class="slot-pill-header">\ud83d\udd2b Ranged:</span>
              <span class="slot-pill-title">${slotRangedName}</span>
            </div>

            <div class="card-slot-pill ${u.equippedSlots.melee ? 'has-item' : ''}" id="slotMeleeTrigger">
              <span class="slot-pill-header">\ud83d\udde1\ufe0f Melee:</span>
              <span class="slot-pill-title">${slotMeleeName}</span>
            </div>

            <div class="card-slot-pill ${u.equippedSlots.armour ? 'has-item' : ''}">
              <span class="slot-pill-header">\ud83d\udee1\ufe0f Armour:</span>
              <span class="slot-pill-title">${slotArmourName}</span>
            </div>

            <div class="card-slot-pill ${u.equippedSlots.shields ? 'has-item' : ''}">
              <span class="slot-pill-header">\ud83d\udee1\ufe0f Shield:</span>
              <span class="slot-pill-title">${slotShieldsName}</span>
            </div>

            <div class="card-slot-pill ${u.equippedSlots.grenades ? 'has-item' : ''}" id="slotGrenadesTrigger" data-slot="grenades" style="cursor:pointer;">
              <span class="slot-pill-header">\ud83d\udca3 Grenades:</span>
              <span class="slot-pill-title">${slotGrenadesName}</span>
            </div>

            <div class="card-slot-pill ${u.equippedSlots.equipment ? 'has-item' : ''}">
              <span class="slot-pill-header">\ud83e\ude96 Gear:</span>
              <span class="slot-pill-title">${slotEquipmentName}</span>
            </div>
          </div>

          <div class="card-keywords-overlay">
            <div class="kw-overlay-label">MODEL ABILITIES & KEYWORDS (CLICK FOR CODEX & EFFECT):</div>
            <div class="kw-overlay-badges-box">${kwBadges}</div>
          </div>
        </div>

        <div class="card-action-controls-bar">
          <button type="button" class="btn-card-ctrl activate-btn ${u.activated ? 'active-unit' : ''}" id="btnCardActivate" ${(!canActivate && !u.activated) ? 'disabled' : ''}>
            ${u.activated ? '\u2713 COMPLETED' : (canActivate ? '\u26a1 ACTIVATE' : `\ud83d\udd12 P${activePlayerTurn} TURN`)}
          </button>

          <button type="button" class="btn-card-ctrl move-btn ${u.isMovingActive ? 'active' : ''}" id="btnCardMove" ${(!u.activated || u.actionsRemaining <= 0 || u.status !== 'Active' || u.id !== activeUnitId) ? 'disabled' : ''}>
            \ud83c\udfc3 MOVE (${u.move}")
          </button>

          <button type="button" class="btn-card-ctrl done-btn" id="btnCardDone" ${(!u.activated || u.id !== activeUnitId) ? 'disabled' : ''}>
            \u2713 DONE
          </button>
        </div>
      </div>
    `;

    document.getElementById('btnPlusBlood')?.addEventListener('click', () => {
      u.bloodMarkers = (u.bloodMarkers || 0) + 1;
      renderInspector();
      drawBoard();
    });

    document.getElementById('btnMinusBlood')?.addEventListener('click', () => {
      u.bloodMarkers = Math.max(0, (u.bloodMarkers || 0) - 1);
      renderInspector();
      drawBoard();
    });

    document.getElementById('btnPlusBlessing')?.addEventListener('click', () => {
      u.blessingMarkers = (u.blessingMarkers || 0) + 1;
      renderInspector();
      drawBoard();
    });

    document.getElementById('btnMinusBlessing')?.addEventListener('click', () => {
      u.blessingMarkers = Math.max(0, (u.blessingMarkers || 0) - 1);
      renderInspector();
      drawBoard();
    });

    document.querySelectorAll('.kw-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        openCodex(pill.dataset.kw);
      });
    });

    document.getElementById('slotRangedTrigger')?.addEventListener('click', () => {
      if (u.id !== activeUnitId) {
        alert(`Guardrail Block: It is Player ${activePlayerTurn}'s turn or another unit is active!`);
        return;
      }
      if (!u.equippedSlots.ranged) {
        alert("No Ranged weapon equipped in this slot!");
        return;
      }
      if (u.actionsRemaining <= 0) {
        alert("No Actions Remaining for this unit!");
        return;
      }
      if (u.baseKeywords.includes("HEAVY") && u.movedThisTurn) {
        alert("HEAVY Weapon Restriction: Model moved this turn and cannot shoot!");
        return;
      }
      setTool('shoot');
      if (u) shootHoverPos = { x: Math.min(DISPLAY_WIDTH - 100, u.x + (u.player === 1 ? 150 : -150)), y: u.y };
      drawBoard();
      logEvent(`${u.name} selected ${u.equippedSlots.ranged.name} for shooting. Click an enemy target on the map.`, "sys");
    });

    let slotG = document.getElementById('slotGrenadesTrigger');
    if (slotG) {
      slotG.addEventListener('click', () => {
        if (u.id !== activeUnitId) {
          alert(`Guardrail Block: It is Player ${activePlayerTurn}'s turn or another unit is active!`);
          return;
        }
        if (u.actionsRemaining <= 0 && !u.exemptionMode) {
          alert("No Actions Remaining for this unit!");
          return;
        }
        activeGrenadeRadiusPx = u.equippedSlots.grenades && u.equippedSlots.grenades.kw && u.equippedSlots.grenades.kw.some(k => k.includes('5"')) ? 125 : 75;
        setTool('grenade');
        
        let targetX = Math.min(DISPLAY_WIDTH - 100, u.x + (u.player === 1 ? 150 : -150));
        shootHoverPos = { x: targetX, y: u.y };
        grenadeHoverPos = { x: targetX, y: u.y };

        logEvent(`${u.name} armed ${slotGrenadesName} (Blast ${(activeGrenadeRadiusPx/INCH_PX).toFixed(0)}"). Click impact point on map.`, "sys");
        drawBoard();
      });
    }

    document.getElementById('slotMeleeTrigger')?.addEventListener('click', () => {
      if (u.id !== activeUnitId) {
        alert(`Guardrail Block: It is Player ${activePlayerTurn}'s turn or another unit is active!`);
        return;
      }
      if (!u.equippedSlots.melee) {
        alert("No Melee weapon equipped in this slot!");
        return;
      }
      if (u.actionsRemaining <= 0) {
        alert("No Actions Remaining for this unit!");
        return;
      }
      setTool('fight');
      logEvent(`${u.name} selected ${u.equippedSlots.melee.name} for melee strike. Click an enemy target within 1.5" on the map.`, "sys");
    });

    document.getElementById('btnCardActivate')?.addEventListener('click', () => {
      if (!canActivate && !u.activated) {
        alert(`Alternating Turn Guardrail: It is Player ${activePlayerTurn}'s turn to activate a unit!`);
        return;
      }

      if (!u.activated) {
        u.activated = true;
        u.actionsRemaining = 2;
        activeUnitId = u.id;
        logEvent(`${u.name} ACTIVATED for Player ${u.player} (2 Actions granted).`, "sys");
      }
      renderInspector();
      drawBoard();
    });

    document.getElementById('btnCardMove')?.addEventListener('click', () => {
      if (u.id !== activeUnitId) {
        alert("Guardrail Block: Only the currently activated unit can move!");
        return;
      }
      u.isMovingActive = !u.isMovingActive;
      setTool('select');
      logEvent(`${u.name} ${u.isMovingActive ? 'unlocked for movement. Drag token on map.' : 'movement locked'}.`, "sys");
      renderInspector();
      drawBoard();
    });

    document.getElementById('btnCardDone')?.addEventListener('click', () => {
      if (u.id !== activeUnitId) return;
      finishUnitActivation(u);
    });
  }

  // 2-STEP COMBAT RESOLVER (RULEBOOK v1.0.2 ACCURATE)
  function openCombatResolver(attacker, defender, mode) {
    if (attacker.id !== activeUnitId) {
      alert("Guardrail Block: Attacker must be the currently activated unit!");
      return;
    }

    let dx = defender.x - attacker.x;
    let dy = defender.y - attacker.y;
    let distInches = (Math.sqrt(dx * dx + dy * dy) / INCH_PX);

    if (mode === 'fight' && distInches > MELEE_RANGE_INCHES) {
      alert(`⛔ MELEE RANGE GUARDRAIL BLOCK:\n\nTarget is ${distInches.toFixed(1)}" away!\nMust be within ${MELEE_RANGE_INCHES}" Melee Engagement Range to Fight.\n\nUse your Movement action to Charge into melee contact first!`);
      setTool('select');
      return;
    }

    // Shooting into Melee Check (Rulebook v1.0.2 Page 44)
    if (mode === 'shoot') {
      let friendlyNearTarget = unitTokens.find(t => t.player === attacker.player && t.id !== attacker.id && t.status === 'Active' && (Math.sqrt(Math.pow(t.x - defender.x, 2) + Math.pow(t.y - defender.y, 2)) / INCH_PX) <= MELEE_RANGE_INCHES);
      if (friendlyNearTarget) {
        let ffRoll = Math.floor(Math.random() * 6) + 1;
        if (ffRoll <= 3) {
          logEvent(`⚠️ [SHOOTING INTO MELEE] Shot strayed! Rolled ${ffRoll} (1-3) -> Target redirected from ${defender.name} to friendly model ${friendlyNearTarget.name}!`, "combat");
          defender = friendlyNearTarget;
        } else {
          logEvent(`🎯 [SHOOTING INTO MELEE] Rolled ${ffRoll} (4-6) -> Shot stayed true on target ${defender.name}.`, "sys");
        }
      }
    }

    let highGroundBonus = attacker.elev > defender.elev ? 1 : 0;
    let inTrenchCover = terrainObjects.some(t => t.type === 'trench' && defender.x >= t.x && defender.x <= t.x + t.w && defender.y >= t.y && defender.y <= t.y + t.h);
    let coverBonus = (inTrenchCover && highGroundBonus === 0) ? 1 : 0;

    let isLongRange = (mode === 'shoot' && distInches > 12.0);
    let hasSniperTrait = attacker.equippedSlots && attacker.equippedSlots.ranged && attacker.equippedSlots.ranged.kw && attacker.equippedSlots.ranged.kw.includes("SNIPER");
    let longRangePenalty = (isLongRange && !hasSniperTrait) ? -1 : 0;

    let baseStat = mode === 'shoot' ? attacker.ranged : attacker.melee;
    let equippedWeapon = mode === 'shoot' ? attacker.equippedSlots.ranged : attacker.equippedSlots.melee;
    let weaponName = equippedWeapon ? equippedWeapon.name : (mode === 'shoot' ? "Ranged Weapon" : "Melee Strike");
    let weaponTraits = equippedWeapon && equippedWeapon.kw ? equippedWeapon.kw : [];

    let defenderHasParry = mode === 'fight' && defender.equippedSlots.melee && defender.equippedSlots.melee.kw && defender.equippedSlots.melee.kw.includes("PARRY");

    let cleavePenalty = 0;
    if (weaponTraits.includes("CLEAVE 1")) cleavePenalty = 1;
    if (weaponTraits.includes("CLEAVE 2")) cleavePenalty = 2;

    let netTargetArmour = Math.max(0, defender.armour - cleavePenalty + coverBonus);

    renderStep1HitPrompt();

    function renderStep1HitPrompt() {
      let attackerBl = attacker.blessingMarkers || 0;
      let targetB = defender.bloodMarkers || 0;

      combatResolverBody.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
          <div style="background:#0d0f14; border:1px solid #2a2f3a; padding:8px;">
            <h4 style="color:var(--gold-glow);">ATTACKER: ${attacker.name}</h4>
            <div style="font-size:0.75rem;">Weapon: <strong>${weaponName}</strong></div>
            <div style="font-size:0.75rem;">Base Stat: +${baseStat} | High Ground: +${highGroundBonus} | ${isLongRange ? (hasSniperTrait ? '<span style="color:var(--gold-glow);">SNIPER (Ignores Long Range Penalty)</span>' : '<span style="color:#ff8a80;">Long Range (>12"): -1 Hit</span>') : 'Short Range (&le;12"): 0'}</div>
            <div style="font-size:0.75rem; color:var(--gold-glow);">Attacker Blessings: ✨ ${attackerBl}</div>
          </div>

          <div style="background:#0d0f14; border:1px solid #2a2f3a; padding:8px;">
            <h4 style="color:#ff8a80;">TARGET: ${defender.name}</h4>
            <div style="font-size:0.75rem;">Distance: <strong>${distInches.toFixed(1)} Inches</strong></div>
            <div style="font-size:0.75rem;">Base Armour: ${defender.armour} | Cleave: -${cleavePenalty} | Cover: +${coverBonus}</div>
            <div style="font-size:0.75rem; color:#ff8a80;">Target Bleeding Markers: 🩸 ${targetB} (Exploit for +1d6)</div>
            ${defenderHasParry ? `<div style="font-size:0.72rem; color:#ff8a80; font-weight:bold;">🛡️ DEFENDER HAS PARRY (Forces 2 Lowest Dice)!</div>` : ''}
          </div>
        </div>

        <div style="background:#0d0f14; border:1px solid var(--gold-glow); padding:10px; margin-bottom:10px;">
          <h4 style="color:var(--gold-glow); font-family:var(--font-roman); margin-bottom:6px;">🎯 STEP 1: ROLL FOR ACTION (HIT SUCCESS ROLL)</h4>
          <p style="font-size:0.72rem; color:var(--steel-grey); margin-bottom:8px;">Spend Markers to <strong>ADD EXTRA DICE (+1d6 PER MARKER)</strong> to your Dice Pool (Targeting 7+ to Hit):</p>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="display:flex; flex-direction:column; gap:2px;">
              <label style="font-size:0.7rem; color:var(--steel-grey);">🩸 Consume Target's Blood Markers (+1d6):</label>
              <input type="number" id="step1BloodSpend" min="0" max="${targetB}" value="0" style="background:#000; border:1px solid var(--blood-bright); color:#fff; padding:4px; font-family:var(--font-mono); font-weight:bold;">
            </div>

            <div style="display:flex; flex-direction:column; gap:2px;">
              <label style="font-size:0.7rem; color:var(--steel-grey);">✨ Spend Attacker's Blessing Markers (+1d6):</label>
              <input type="number" id="step1BlessingSpend" min="0" max="${attackerBl}" value="0" style="background:#000; border:1px solid var(--gold-glow); color:#fff; padding:4px; font-family:var(--font-mono); font-weight:bold;">
            </div>
          </div>
        </div>

        <div id="step1ResultBox" style="display:none;"></div>
      `;

      btnExecuteRoll.textContent = "🎲 STEP 1: EXECUTE ACTION / HIT ROLL";
      btnExecuteRoll.style.display = "block";
      combatModalOverlay.classList.remove('hidden');

      btnExecuteRoll.onclick = () => {
        let bSpend = parseInt(document.getElementById('step1BloodSpend').value || 0, 10);
        let blSpend = parseInt(document.getElementById('step1BlessingSpend').value || 0, 10);

        bSpend = Math.max(0, Math.min(defender.bloodMarkers || 0, bSpend));
        blSpend = Math.max(0, Math.min(attacker.blessingMarkers || 0, blSpend));
        let extraDiceFromMarkers = bSpend + blSpend;

        if (bSpend > 0) defender.bloodMarkers = (defender.bloodMarkers || 0) - bSpend;
        if (blSpend > 0) attacker.blessingMarkers = (attacker.blessingMarkers || 0) - blSpend;

        let baseDiceCount = defenderHasParry ? 3 : 2;
        let totalDiceToRoll = baseDiceCount + extraDiceFromMarkers;

        let diceRolls = [];
        for (let i = 0; i < totalDiceToRoll; i++) {
          diceRolls.push(Math.floor(Math.random() * 6) + 1);
        }

        let sortedRolls = [...diceRolls].sort((a, b) => b - a);
        let chosenDice = [];

        if (defenderHasParry) {
          let ascRolls = [...diceRolls].sort((a, b) => a - b);
          chosenDice = [ascRolls[0], ascRolls[1]];
        } else {
          chosenDice = [sortedRolls[0], sortedRolls[1]];
        }

        let chosenSum = chosenDice[0] + chosenDice[1];
        let netHitMod = baseStat + highGroundBonus + longRangePenalty;
        let totalHit = chosenSum + netHitMod;
        let hitSuccess = totalHit >= 7;

        let step1ResultBox = document.getElementById('step1ResultBox');
        step1ResultBox.style.display = "block";

        let diceGridHTML = diceRolls.map((val) => {
          let isChosen = chosenDice.includes(val);
          let isBest = !defenderHasParry && isChosen;
          let isWorst = defenderHasParry && isChosen;

          let cssClass = isBest ? 'best-die' : (isWorst ? 'worst-die' : 'worst-die');
          let tagText = isBest ? '⭐ CHOSEN' : (isWorst ? '✕ LOW' : '✕ DISCARDED');

          return `
            <div class="dice-square ${cssClass}">
              <span class="dice-val">${val}</span>
              <span class="dice-tag">${tagText}</span>
            </div>
          `;
        }).join('');

        let hitHTML = `
          <div style="background:#0b0d11; border:1px solid ${hitSuccess ? '#81c784' : '#ff8a80'}; padding:12px; font-family:var(--font-mono); font-size:0.78rem; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <div style="color:var(--gold-glow); font-weight:bold;">🎯 STEP 1 HIT ROLL RESULT (${totalDiceToRoll}d6 Pool):</div>
            
            <div class="dice-container-grid">
              ${diceGridHTML}
            </div>

            <div>Chosen 2 Highest: <strong>[${chosenDice.join(', ')}]</strong> (${chosenSum}) + Base (+${baseStat}) + Elev (+${highGroundBonus}) + Range Mod (${longRangePenalty}) = <strong>${totalHit}</strong> vs Target 7+</div>
            <div style="font-size:0.95rem; font-weight:bold; color:${hitSuccess ? '#81c784' : '#ff8a80'}; margin-top:2px;">
              ${hitSuccess ? '✓ HIT SUCCESS (7+) — UNLOCKING STEP 2: INJURY ROLL' : '✕ ATTACK MISSED (< 7) — ACTION ENDS'}
            </div>
          </div>
        `;

        step1ResultBox.innerHTML = hitHTML;

        attacker.actionsRemaining = Math.max(0, attacker.actionsRemaining - 1);
        if (attacker.actionsRemaining <= 0 && !attacker.exemptionMode) { finishUnitActivation(attacker); }
        attacker.isMovingActive = false;

        logEvent(`${attacker.name} ${mode.toUpperCase()} Step 1 Hit Roll: Rolled ${totalDiceToRoll}d6 [${diceRolls.join(', ')}] -> Chosen [${chosenDice.join(', ')}] Total: ${totalHit} (${hitSuccess ? 'HIT' : 'MISS'})`, "dice");

        if (hitSuccess) {
          btnExecuteRoll.textContent = "🩸 PROCEED TO STEP 2: ROLL FOR INJURY ➔";
          btnExecuteRoll.onclick = () => renderStep2InjuryPrompt();
        } else {
          btnExecuteRoll.style.display = "none";
          setTimeout(() => {
            combatModalOverlay.classList.add('hidden');
            setTool('select');
            if (attacker.actionsRemaining === 0) {
              finishUnitActivation(attacker);
            } else {
              drawBoard();
              renderInspector();
            }
          }, 3000);
        }
      };
    }

    function renderStep2InjuryPrompt() {
      let attackerBl = attacker.blessingMarkers || 0;
      let targetB = defender.bloodMarkers || 0;
      let isDefenderDown = defender.status === 'Down';
      let bloodbathCost = isDefenderDown ? 3 : 6;
      let canBloodbath = targetB >= bloodbathCost;
      let hasDeadlyKw = weaponTraits.includes("DEADLY");

      combatResolverBody.innerHTML = `
        <div style="background:#0d0f14; border:1px solid #ff8a80; padding:10px; margin-bottom:10px;">
          <h4 style="color:#ff8a80; font-family:var(--font-roman); margin-bottom:6px;">🩸 STEP 2: INJURY ROLL (RULEBOOK v1.0.2 STANDARDS)</h4>
          <div style="font-size:0.72rem; color:#ff8a80; margin-bottom:6px;">
            Target Net Armour: <strong>${netTargetArmour}</strong> (Base: ${defender.armour} - Cleave: ${cleavePenalty} + Cover: ${coverBonus})
            ${mode === 'fight' && isDefenderDown ? ' | <span style="color:var(--gold-glow); font-weight:bold;">+1 INJURY DIE (Melee vs Down Model)</span>' : ''}
          </div>
          <div style="font-size:0.70rem; color:var(--steel-grey); margin-bottom:8px; background:#07080a; padding:6px; border:1px dashed #333;">
            RULEBOOK INJURY TABLE: <strong>&le; 1 No Effect</strong> | <strong>2 - 6 Down</strong> (Upgrade to Out of Action if already Down) | <strong>7+ Out of Action</strong>
          </div>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="display:flex; flex-direction:column; gap:2px;">
              <label style="font-size:0.7rem; color:var(--steel-grey);">🩸 Consume Target's Blood Markers (+1d6) Available: ${targetB}:</label>
              <input type="number" id="step2BloodSpend" min="0" max="${targetB}" value="0" style="background:#000; border:1px solid var(--blood-bright); color:#fff; padding:4px; font-family:var(--font-mono); font-weight:bold;">
            </div>

            <div style="display:flex; flex-direction:column; gap:2px;">
              <label style="font-size:0.7rem; color:var(--steel-grey);">✨ Spend Attacker's Blessing Markers (+1d6) Available: ${attackerBl}:</label>
              <input type="number" id="step2BlessingSpend" min="0" max="${attackerBl}" value="0" style="background:#000; border:1px solid var(--gold-glow); color:#fff; padding:4px; font-family:var(--font-mono); font-weight:bold;">
            </div>
          </div>

          ${canBloodbath ? `
            <div style="margin-top:10px; background:rgba(184,15,15,0.15); border:1px solid var(--blood-bright); padding:8px; text-align:center;">
              <div style="font-size:0.75rem; color:#ff8a80; font-weight:bold; margin-bottom:4px;">🩸 BLOODBATH ROLL AVAILABLE (Spend ${bloodbathCost} Blood to Sum ALL ${hasDeadlyKw ? '4D6 (DEADLY)' : '3D6'})</div>
              <button type="button" id="btnExecuteBloodbath" style="background:var(--blood-bright); color:#fff; font-weight:bold; border:none; padding:6px 12px; cursor:pointer; font-size:0.75rem; font-family:var(--font-roman);">
                🔥 EXECUTE BLOODBATH ROLL (SUM ALL DICE)
              </button>
            </div>
          ` : ''}
        </div>

        <div id="step2ResultBox" style="display:none;"></div>
      `;

      btnExecuteRoll.textContent = "🎲 EXECUTE STANDARD STEP 2 INJURY ROLL";
      btnExecuteRoll.style.display = "block";

      function resolveInjury(isBloodbath = false) {
        let bSpend = isBloodbath ? bloodbathCost : parseInt(document.getElementById('step2BloodSpend').value || 0, 10);
        let blSpend = isBloodbath ? 0 : parseInt(document.getElementById('step2BlessingSpend').value || 0, 10);

        bSpend = Math.max(0, Math.min(defender.bloodMarkers || 0, bSpend));
        blSpend = Math.max(0, Math.min(attacker.blessingMarkers || 0, blSpend));
        let extraDiceFromMarkers = isBloodbath ? 0 : (bSpend + blSpend);

        if (bSpend > 0) defender.bloodMarkers = Math.max(0, (defender.bloodMarkers || 0) - bSpend);
        if (blSpend > 0) attacker.blessingMarkers = Math.max(0, (attacker.blessingMarkers || 0) - blSpend);

        let meleeDownBonus = (mode === 'fight' && isDefenderDown) ? 1 : 0;
        let totalDiceToRoll = (isBloodbath ? (hasDeadlyKw ? 4 : 3) : (2 + extraDiceFromMarkers + meleeDownBonus));

        let diceRolls = [];
        for (let i = 0; i < totalDiceToRoll; i++) {
          diceRolls.push(Math.floor(Math.random() * 6) + 1);
        }

        let chosenDice = [];
        let chosenSum = 0;

        if (isBloodbath) {
          chosenDice = [...diceRolls];
          chosenSum = diceRolls.reduce((a, b) => a + b, 0);
        } else {
          let sortedRolls = [...diceRolls].sort((a, b) => b - a);
          chosenDice = [sortedRolls[0], sortedRolls[1]];
          chosenSum = chosenDice[0] + chosenDice[1];
        }

        let netInjury = chosenSum - netTargetArmour;
        let resultStr = "";

        // Rulebook v1.0.2 Injury Roll Table thresholds (Pages 46-49)
        if (netInjury <= 1) {
          resultStr = "NO EFFECT (<=1)";
          defender.bloodMarkers = (defender.bloodMarkers || 0) + 1;
        } else if (netInjury <= 6) {
          if (defender.status === "Down") {
            resultStr = "OUT OF ACTION! (Secondary Down on Down Model)";
            defender.wounds = 0;
            defender.status = "Out of Action";
            defender.bloodMarkers = (defender.bloodMarkers || 0) + 2;
          } else {
            resultStr = "DOWN! (2-6)";
            defender.status = "Down";
            defender.bloodMarkers = (defender.bloodMarkers || 0) + 1;
          }
        } else {
          resultStr = "OUT OF ACTION! (7+)";
          defender.wounds = 0;
          defender.status = "Out of Action";
          defender.bloodMarkers = (defender.bloodMarkers || 0) + 2;

          // Check Glorious Deed: Slay Commander
          if (defender.isLeader) {
            if (attacker.player === 1) {
              vpPlayer1 += 2;
              vpPlayer1El.textContent = vpPlayer1;
              logEvent(`🏆 GLORIOUS DEED: Player 1's ${attacker.name} took the enemy Commander Out of Action! (+2 VP)`, "sys");
            } else {
              vpPlayer2 += 2;
              vpPlayer2El.textContent = vpPlayer2;
              logEvent(`🏆 GLORIOUS DEED: Player 2's ${attacker.name} took the enemy Commander Out of Action! (+2 VP)`, "sys");
            }
          }
        }

        let step2ResultBox = document.getElementById('step2ResultBox');
        step2ResultBox.style.display = "block";

        let diceGridHTML = diceRolls.map((val) => {
          let isChosen = chosenDice.includes(val);
          let cssClass = isChosen ? 'best-die' : 'worst-die';
          let tagText = isChosen ? '⭐ SUMMED' : '✕ DISCARDED';

          return `
            <div class="dice-square ${cssClass}">
              <span class="dice-val">${val}</span>
              <span class="dice-tag">${tagText}</span>
            </div>
          `;
        }).join('');

        let injuryHTML = `
          <div style="background:#0b0d11; border:1px solid #ff8a80; padding:12px; font-family:var(--font-mono); font-size:0.78rem; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <div style="color:#ff8a80; font-weight:bold;">🩸 STEP 2 ${isBloodbath ? 'BLOODBATH' : 'INJURY'} ROLL RESULT (${totalDiceToRoll}d6 Pool):</div>
            
            <div class="dice-container-grid">
              ${diceGridHTML}
            </div>

            <div>${isBloodbath ? 'Sum of All Dice' : 'Chosen 2 Highest'}: <strong>[${chosenDice.join(', ')}]</strong> (${chosenSum}) - Net Armour (${netTargetArmour}) = <strong>${netInjury}</strong></div>
            <div style="font-size:0.95rem; font-weight:bold; color:#ff8a80; margin-top:2px;">
              RULEBOOK INJURY RESULT: ${resultStr} (Inflicted +1 Blood Marker on Target!)
            </div>
          </div>
        `;

        step2ResultBox.innerHTML = injuryHTML;
        btnExecuteRoll.style.display = "none";

        logEvent(`${attacker.name} ${isBloodbath ? 'Bloodbath' : 'Injury'} Roll vs ${defender.name}: Rolled ${totalDiceToRoll}d6 [${diceRolls.join(', ')}] -> Chosen [${chosenDice.join(', ')}] Net Injury: ${netInjury} (${resultStr}).`, "combat");

        setTimeout(() => {
          combatModalOverlay.classList.add('hidden');
          setTool('select');
          if (attacker.actionsRemaining === 0) {
            finishUnitActivation(attacker);
          } else {
            drawBoard();
            renderInspector();
          }
        }, 3000);
      }

      btnExecuteRoll.onclick = () => resolveInjury(false);

      let btnB = document.getElementById('btnExecuteBloodbath');
      if (btnB) {
        btnB.onclick = () => resolveInjury(true);
      }
    }
  }

  function closeCombatModal() {
    combatModalOverlay.classList.add('hidden');
  }

  if (btnCloseCombatModal) btnCloseCombatModal.addEventListener('click', closeCombatModal);
  if (btnCloseCombatBtn) btnCloseCombatBtn.addEventListener('click', closeCombatModal);

  function logEvent(msg, type = "sys") {
    let entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] ${msg}`;
    combatLogBox.appendChild(entry);
    combatLogBox.scrollTop = combatLogBox.scrollHeight;
  }

  
  // BULLETPROOF EVENT DELEGATION FOR MODEL CARD SLOT PILLS (GRENADES, RANGED, MELEE)
  let inspectorEl = document.getElementById('inspectorPanel');
  if (inspectorEl) {
    inspectorEl.addEventListener('click', (e) => {
      let pill = e.target.closest('.card-slot-pill');
      if (!pill) return;

      let pillText = pill.innerText || pill.textContent || "";
      if (pillText.includes('Grenades')) {
        let u = selectedToken || unitTokens.find(t => t.id === activeUnitId) || unitTokens[0];
        if (!u) return;

        if (u.id !== activeUnitId) {
          alert(`Guardrail Block: It is Player ${activePlayerTurn}'s turn or another unit is active!`);
          return;
        }
        if (u.actionsRemaining <= 0 && !u.exemptionMode) {
          alert("No Actions Remaining for this unit!");
          return;
        }

        let slotGrenadesName = (u.equippedSlots && u.equippedSlots.grenades && u.equippedSlots.grenades.name) ? u.equippedSlots.grenades.name : "Gas Grenades";
        activeGrenadeRadiusPx = (u.equippedSlots && u.equippedSlots.grenades && u.equippedSlots.grenades.kw && u.equippedSlots.grenades.kw.some(k => k.includes('5"'))) ? 125 : 75;

        setTool('grenade');

        let targetX = Math.min(DISPLAY_WIDTH - 100, u.x + (u.player === 1 ? 150 : -150));
        shootHoverPos = { x: targetX, y: u.y };
        grenadeHoverPos = { x: targetX, y: u.y };

        console.log("💣 [EVENT DELEGATION GRENADE TRIGGERED]", u.name, slotGrenadesName);
        logEvent(`${u.name} armed ${slotGrenadesName} (Blast ${(activeGrenadeRadiusPx/INCH_PX).toFixed(0)}"). Click impact point on map.`, "sys");
        drawBoard();
      }
    });
  }

  populateWarbandSelects();
  deployWarbands();
  loadMapPreset("map_1");
  loadScenario("scen_1");
  logEvent("Tactical Battlefield Map & Game Engine initialized with Scenario Selector & VP Engine.", "sys");
});