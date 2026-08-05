/* Trench Crusade - Master 1914 WW1 Application v1.0.2 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Router
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabViews = document.querySelectorAll('.tab-view');
  const navHome = document.getElementById('navHome');

  function switchTab(tabId) {
    navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    tabViews.forEach(v => v.classList.toggle('active', v.id === tabId));

    if (tabId === 'tabSandbox') {
      if (window.refreshVaultDropdowns) window.refreshVaultDropdowns();
      if (window.deployWarbands) window.deployWarbands();
      setTimeout(() => {
        if (window.resizeCanvasForHighDPI) window.resizeCanvasForHighDPI();
        if (window.drawBoard) window.drawBoard();
      }, 50);
    }

    if (tabId === 'tabProfile') {
      renderVaultRosters();
    }
  }

  navTabs.forEach(t => t.dataset && t.addEventListener('click', () => switchTab(t.dataset.tab)));
  if (navHome) navHome.addEventListener('click', () => switchTab('tabHome'));

  document.getElementById('cardLaunchBuilder').addEventListener('click', () => switchTab('tabBuilder'));
  document.getElementById('cardLaunchSandbox').addEventListener('click', () => switchTab('tabSandbox'));
  document.getElementById('cardLaunchPvp').addEventListener('click', () => switchTab('tabPvp'));
  document.getElementById('cardLaunchProfile').addEventListener('click', () => switchTab('tabProfile'));

  // Direct Button Handlers
  const btnDeployBoth = document.getElementById('btnDeployBoth');
  if (btnDeployBoth) {
    btnDeployBoth.addEventListener('click', () => {
      if (window.deployWarbands) window.deployWarbands();
    });
  }

  // VISUAL VAULT ROSTERS RENDERER
  const vaultRosterList = document.getElementById('vaultRosterList');

  function renderVaultRosters() {
    if (!vaultRosterList) return;
    let savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');

    if (savedVault.length === 0) {
      vaultRosterList.innerHTML = `<div style="grid-column: 1 / -1; color:var(--steel-grey); padding:15px; background:#0b0d11; border:1px dashed #333; text-align:center;">NO SAVED WARBANDS IN VAULT YET. DRAFT A WARBAND IN THE BUILDER AND CLICK "SAVE ROSTER TO VAULT".</div>`;
      return;
    }

    vaultRosterList.innerHTML = '';
    savedVault.forEach((v, idx) => {
      let card = document.createElement('div');
      card.className = 'glass-card';
      card.style.cssText = 'padding:10px; border:1px solid var(--gold-glow); background:rgba(15,18,24,0.9); display:flex; flex-direction:column; justify-content:space-between;';

      card.innerHTML = `
        <div>
          <div style="color:var(--gold-glow); font-weight:bold; font-size:0.9rem; font-family:var(--font-roman); margin-bottom:2px;">
            🏆 ${v.name}
          </div>
          <div style="color:var(--bone-bright); font-size:0.75rem;">
            FACTION: ${v.faction ? v.faction.toUpperCase() : 'NEW ANTIOCH'}
          </div>
          <div style="color:var(--steel-grey); font-size:0.7rem; margin-top:2px;">
            COST: ${v.spent || 0} Ducats • ${v.roster ? v.roster.length : 0} Models
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:4px; margin-top:10px;">
          <div style="display:flex; gap:4px;">
            <button type="button" class="btn-primary" style="flex:1; font-size:0.65rem; padding:4px;" onclick="loadVaultToSandbox(${idx}, 1)">
              ⚔️ SANDBOX P1
            </button>
            <button type="button" class="btn-primary" style="flex:1; font-size:0.65rem; padding:4px; background:#122030; border-color:#3878b8;" onclick="loadVaultToSandbox(${idx}, 2)">
              ⚔️ SANDBOX P2
            </button>
          </div>
          <div style="display:flex; gap:4px;">
            <button type="button" class="btn-secondary" style="flex:1; font-size:0.65rem; padding:4px;" onclick="exportVaultItem(${idx})">
              📥 EXPORT
            </button>
            <button type="button" class="btn-danger" style="flex:1; font-size:0.65rem; padding:4px;" onclick="deleteVaultItem(${idx})">
              🗑️ DELETE
            </button>
          </div>
        </div>
      `;

      vaultRosterList.appendChild(card);
    });
  }

  window.loadVaultToSandbox = function(idx, playerNum) {
    switchTab('tabSandbox');
    let sel = playerNum === 1 ? document.getElementById('selWarbandP1') : document.getElementById('selWarbandP2');
    if (sel) {
      sel.value = `vault_${idx}`;
    }
    if (window.deployWarbands) window.deployWarbands();
  };

  window.exportVaultItem = function(idx) {
    let savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    let item = savedVault[idx];
    if (!item) return;

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item, null, 2));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${item.name.replace(/\s+/g, '_')}.tcwarband.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  window.deleteVaultItem = function(idx) {
    let savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    if (confirm(`Delete "${savedVault[idx].name}" from Warband Vault?`)) {
      savedVault.splice(idx, 1);
      localStorage.setItem('tc_warband_vault', JSON.stringify(savedVault));
      renderVaultRosters();
      if (window.refreshVaultDropdowns) window.refreshVaultDropdowns();
    }
  };

  // MULTIPLAYER PVP LOBBY VAULT WARBAND IMPORT
  const btnPvpLoadVaultWarband = document.getElementById('btnPvpLoadVaultWarband');
  const btnPvpLaunchEngine = document.getElementById('btnPvpLaunchEngine');
  const selPvpVaultWarband = document.getElementById('selPvpVaultWarband');
  const selWarbandP1 = document.getElementById('selWarbandP1');

  if (btnPvpLoadVaultWarband) {
    btnPvpLoadVaultWarband.addEventListener('click', () => {
      if (!selPvpVaultWarband || !selPvpVaultWarband.value) return;
      if (selWarbandP1) selWarbandP1.value = selPvpVaultWarband.value;
      alert("🏆 Vault Warband locked for Multiplayer Match! Launching session will deploy this roster.");
    });
  }

  if (btnPvpLaunchEngine) {
    btnPvpLaunchEngine.addEventListener('click', () => {
      switchTab('tabSandbox');
      if (window.deployWarbands) window.deployWarbands();
    });
  }

  // WARBAND JSON IMPORT ENGINE
  const fileImportWarbandJson = document.getElementById('fileImportWarbandJson');
  const btnImportJSON = document.getElementById('btnImportJSON');
  const btnImportSandboxJson = document.getElementById('btnImportSandboxJson');
  const btnImportProfileJson = document.getElementById('btnImportProfileJson');

  function triggerImportFile() {
    if (fileImportWarbandJson) fileImportWarbandJson.click();
  }

  if (btnImportJSON) btnImportJSON.addEventListener('click', triggerImportFile);
  if (btnImportSandboxJson) btnImportSandboxJson.addEventListener('click', triggerImportFile);
  if (btnImportProfileJson) btnImportProfileJson.addEventListener('click', triggerImportFile);

  if (fileImportWarbandJson) {
    fileImportWarbandJson.addEventListener('change', (e) => {
      let file = e.target.files[0];
      if (!file) return;

      let reader = new FileReader();
      reader.onload = (event) => {
        try {
          let data = JSON.parse(event.target.result);
          let vault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');

          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.name && item.roster) vault.push(item);
            });
            alert(`🏆 Successfully imported ${data.length} warbands into Warband Vault!`);
          } else if (data.name && data.roster) {
            vault.push(data);
            alert(`🏆 Successfully imported "${data.name}" (${data.spent || 0}D) into Warband Vault!`);
          } else {
            alert("⚠️ Invalid Warband JSON format. Must contain 'name' and 'roster' fields.");
            return;
          }

          localStorage.setItem('tc_warband_vault', JSON.stringify(vault));
          renderVaultRosters();
          if (window.refreshVaultDropdowns) window.refreshVaultDropdowns(vault.length - 1);
          if (window.deployWarbands) window.deployWarbands();
          fileImportWarbandJson.value = '';
        } catch (err) {
          alert("⚠️ Failed to parse JSON file! Please upload a valid Trench Crusade warband JSON.");
        }
      };
      reader.readAsText(file);
    });
  }

  // USER PROFILE SYSTEM
  let userProfile = JSON.parse(localStorage.getItem('tc_user_profile') || JSON.stringify({
    name: "Commander TrenchMaster",
    avatar: "🎖️",
    faction: "New Antioch",
    games: 12,
    wins: 8,
    losses: 4,
    deeds: 15
  }));

  const txtHeaderProfileName = document.getElementById('txtHeaderProfileName');
  const txtProfileAvatarDisplay = document.getElementById('txtProfileAvatarDisplay');
  const profNameInput = document.getElementById('profNameInput');
  const profFactionSelect = document.getElementById('profFactionSelect');
  const statGames = document.getElementById('statGames');
  const statWins = document.getElementById('statWins');
  const statLosses = document.getElementById('statLosses');
  const statDeeds = document.getElementById('statDeeds');

  function renderUserProfile() {
    txtHeaderProfileName.textContent = userProfile.name;
    txtProfileAvatarDisplay.textContent = userProfile.avatar;
    profNameInput.value = userProfile.name;
    profFactionSelect.value = userProfile.faction;
    statGames.textContent = userProfile.games;
    statWins.textContent = userProfile.wins;
    statLosses.textContent = userProfile.losses;
    statDeeds.textContent = userProfile.deeds;
  }

  document.querySelectorAll('.btn-avatar-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      userProfile.avatar = btn.dataset.avatar;
      renderUserProfile();
    });
  });

  document.getElementById('btnSaveProfile').addEventListener('click', () => {
    userProfile.name = profNameInput.value;
    userProfile.faction = profFactionSelect.value;
    localStorage.setItem('tc_user_profile', JSON.stringify(userProfile));
    renderUserProfile();
    alert("Profile saved successfully!");
  });

  document.getElementById('btnExportProfileJson').addEventListener('click', () => {
    let vault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vault, null, 2));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `tc_warband_vault_savefiles.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  renderUserProfile();

  // 100% COMPLETE EXPANDED MASTER CODEX (KEYWORDS, ACTIONS & EFFECTS)
  window.masterCodex = window.masterCodex || {};
  Object.assign(window.masterCodex, {
    "MOVE": { cat: "Common Action", desc: "Standard movement action up to the model's Movement characteristic in inches.", impact: "Basic movement." },
    "CHARGE": { cat: "Common Action", desc: "Special movement action used to engage an enemy within 12 inches.", impact: "Enters melee base contact." },
    "SHOOT": { cat: "Common Action", desc: "Attack action using equipped ranged weapon.", impact: "Ranged hit roll." },
    "FIGHT": { cat: "Common Action", desc: "Melee attack action using equipped melee weapon in base contact.", impact: "Melee hit roll." },
    "DASH": { cat: "Risky Action", desc: "Special movement requiring a Risky Success Roll to gain +1D6 inches.", impact: "Risk of falling Down on fail." },
    "RETREAT": { cat: "Disengage Action", desc: "Allows a model engaged in 1\" melee to break away safely without free strikes.", impact: "Disengages from melee." },
    "AIM": { cat: "Precision Action", desc: "Spend 1 Action prior to shooting to gain +2 hit modifier or ignore cover.", impact: "+2 Ranged Hit / Ignore Cover." },
    "ASSAULT": { cat: "Weapon Trait", desc: "Allows a model to shoot or fight even if it performed a Charge action in the same turn.", impact: "Charge + Attack combo." },
    "SHRAPNEL": { cat: "Weapon Trait", desc: "Inflicts area splash damage on targets without heavy armor cover.", impact: "Bypasses light cover." },
    "CRITICAL": { cat: "Weapon Trait", desc: "On a natural 6 to hit, causes double injury dice or bypasses armour.", impact: "Double Damage on 6." },
    "RELOAD": { cat: "Weapon Trait", desc: "Requires spending 1 Action to chamber the next shell before firing again.", impact: "1 Action Reload cost." },
    "AUTOMATIC 2": { cat: "Weapon Trait", desc: "Fires 2 attack dice on ranged attack actions.", impact: "2 Ranged Attack Dice." },
    "AUTOMATIC 3": { cat: "Weapon Trait", desc: "Fires 3 attack dice on ranged attack actions.", impact: "3 Ranged Attack Dice." },
    "BLAST 3\"": { cat: "Explosive Trait", desc: "Explosive circular template affecting all models within 3 inches.", impact: "3\" Area Effect." },
    "BLAST 5\"": { cat: "Explosive Trait", desc: "Heavy explosive circular template affecting all models within 5 inches.", impact: "5\" Area Effect." },
    "GAS HAZARD": { cat: "Chemical Trait", desc: "Requires Gas Mask or forces Toughness / Courage test at end of turn.", impact: "Poison Gas Damage." },
    "COMMANDER": { cat: "Leadership", desc: "Model is an official Warband Leader. Grants aura bonuses and commands squad activations.", impact: "Required for legal warband roster." },
    "INHERENT LEADERSHIP": { cat: "Leadership", desc: "Allows issuing Command Orders to adjacent squadmates within 6 inches.", impact: "+1 Command Order per turn." },
    "GOETIC SORCERY": { cat: "Magic", desc: "Access to Goetic Greed and Wealth Spells.", impact: "Casts Black Heart & Compulsions." },
    "SLAVEMASTER": { cat: "Serpent Court", desc: "Commands Yoke Fiends to sacrifice themselves or form living shields within 18\".", impact: "Sacrifices Yoke Fiends to absorb hits." },
    "HELL KNIGHT": { cat: "Elite", desc: "Heavy plate demon knight armed with hell-forged polearm.", impact: "+2 Armour & Cleave 2." },
    "LEFT HAND PATH": { cat: "Assassin", desc: "Deadly stealth assassin executing priority leaders.", impact: "Infiltrator & Deadeye." },
    "DESECRATED SAINT": { cat: "Monster", desc: "Corrupted holy martyr reanimated by infernal blood.", impact: "Regeneration & Fear." },
    "SLAVE": { cat: "Trooper", desc: "Enslaved demon brute used as meat shield and ammo porter.", impact: "Cost 30D." },
    "WRETCHED": { cat: "Trooper", desc: "Pathetic thrall used as battlefield fodder.", impact: "Cost 20D." },
    "FLIGHT": { cat: "Movement", desc: "Ignores terrain and obstacles during movement.", impact: "Fly 8\"." },
    "DEADEYE AIM": { cat: "Specialist", desc: "Spends 1 Action to aim precision shots, ignoring cover penalties.", impact: "+2 Hit Bonus on Ranged shots." },
    "DIVINE GUIDANCE": { cat: "Miracle", desc: "Invokes holy miracles granting +1 Blessing Marker to unit pool.", impact: "+1 Blessing Marker per turn." },
    "SNIPER": { cat: "Weapon Trait", desc: "Ignores long-range penalties beyond 12 inches.", impact: "Always full accuracy at range." },
    "TRENCH RAID": { cat: "Elite Trait", desc: "Gains +1 Attack die when charging across trench terrain.", impact: "+1 Melee Die on Charge." },
    "SHOCK TROOPER": { cat: "Specialist", desc: "Ignores movement penalties in mud, wire, and trench sludge.", impact: "Full Speed in Difficult Terrain." },
    "LINE INFANTRY": { cat: "Trooper", desc: "Gains +1 Courage when within 3 inches of allied Line Infantry.", impact: "+1 Morale near allies." },
    "GRIM DISCIPLINE": { cat: "Trooper", desc: "Grants 1 free re-roll on failed Morale tests.", impact: "1x Morale Re-roll per game." },
    "FIELD SURGEON": { cat: "Medic", desc: "Heals 1 Wound on adjacent wounded models on a 4+ roll.", impact: "Heals 1 Wound (4+ roll)." },
    "TREAT WOUNDS": { cat: "Medic", desc: "Removes Down status or heals 1 Wound.", impact: "Restores Down units." },
    "INFILTRATOR": { cat: "Deployment", desc: "Forward deployment outside 9 inches of enemy deployment zone.", impact: "Forward Position at start." },
    "DARK BLESSINGS": { cat: "Heretic", desc: "Channels unholy blessings adding +1 Blood Marker to pool.", impact: "+1 Blood Marker per turn." },
    "PROPHECY OF DOOM": { cat: "Pilgrim Miracle", desc: "Forces an enemy model within 12 inches to make a Courage test.", impact: "Forces Enemy Morale Check." },
    "BLACK GRAIL PLAGUE": { cat: "Unholy", desc: "Melee hits inflict Contagion markers causing end-of-turn damage.", impact: "Persistent Damage to Enemies." },
    "REGENERATION": { cat: "Monster", desc: "Rolls at start of turn to heal 1 Wound on 4+.", impact: "Start of Turn Self-Heal." },
    "CLEAVE 1": { cat: "Armour Piercing", desc: "Reduces target Armour rating by 1.", impact: "-1 Target Armour." },
    "CLEAVE 2": { cat: "Armour Piercing", desc: "Reduces target Armour rating by 2.", impact: "-2 Target Armour." },
    "PARRY": { cat: "Defensive", desc: "Forces enemy attacker to re-roll highest hit die in melee.", impact: "Forces Attacker Re-roll." }
  });
  const masterCodex = window.masterCodex;

  const masterArmory = {
    ranged: [
      { id: "pistol", name: "Service Pistol", cost: 15, kw: ["1-HANDED", "RANGED 12\""] },
      { id: "hellfire_pistol", name: "Hellfire Pistol", cost: 20, kw: ["1-HANDED", "RANGED 12\"", "UNHOLY"] },
      { id: "smg", name: "Submachine Gun", cost: 25, kw: ["AUTOMATIC 2", "RANGED 18\""] },
      { id: "rifle", name: "Bolt-Action Rifle", cost: 20, kw: ["2-HANDED", "RANGED 24\""] },
      { id: "sniper_rifle", name: "Sniper Rifle", cost: 35, kw: ["2-HANDED", "RANGED 36\"", "SNIPER"] },
      { id: "shotgun", name: "Trench Shotgun", cost: 25, kw: ["CLOSE RANGE", "RANGED 12\""] },
      { id: "flamethrower", name: "Flamethrower", cost: 40, kw: ["BLAST 3\"", "GAS HAZARD", "RANGED 12\""] },
      { id: "hmg", name: "Heavy Machine Gun", cost: 50, kw: ["HEAVY", "AUTOMATIC 3", "RANGED 36\""] }
    ],
    melee: [
      { id: "trench_knife", name: "Trench Knife / Dagger", cost: 5, kw: ["1-HANDED"] },
      { id: "trench_sword", name: "Trench Sword", cost: 15, kw: ["1-HANDED", "PARRY"] },
      { id: "trench_axe", name: "Trench Axe / Club", cost: 15, kw: ["1-HANDED", "CLEAVE 1"] },
      { id: "greatsword", name: "Greatsword / Eviscerator", cost: 25, kw: ["2-HANDED", "CLEAVE 2"] },
      { id: "unholy_staff", name: "Unholy Staff", cost: 20, kw: ["1-HANDED", "PARRY", "DARK BLESSINGS"] },
      { id: "takuba_scimitar", name: "Takuba Scimitar", cost: 20, kw: ["1-HANDED", "PARRY", "CLEAVE 1"] }
    ],
    armour: [
      { id: "body_armour", name: "Body Armour", cost: 15, kw: ["ARMOUR +1"] },
      { id: "heavy_carapace", name: "Rotting Carapace / Heavy Plate", cost: 30, kw: ["ARMOUR +2", "HEAVY"] }
    ],
    shields: [
      { id: "trench_shield", name: "Trench Shield", cost: 15, kw: ["SHIELD", "+1 FRONT ARMOUR"] }
    ],
    grenades: [
      { id: "gas_grenades", name: "Gas Grenades", cost: 20, kw: ["GAS HAZARD", "BLAST 3\""] },
      { id: "demo_charge", name: "Demo Charge", cost: 30, kw: ["DEMO CHARGE", "BLAST 5\""] }
    ],
    equipment: [
      { id: "gas_mask", name: "Gas Mask", cost: 10, kw: ["GAS IMMUNE"] },
      { id: "blood_banner", name: "Gothic Blood Banner", cost: 25, kw: ["AURA BOOST", "+1 COURAGE"] },
      { id: "surgeon_kit", name: "Field Surgeon Kit", cost: 20, kw: ["FIELD SURGEON", "TREAT WOUNDS"] },
      { id: "true_cross", name: "True Cross Relic Shard", cost: 30, gloryCost: 1, kw: ["ARMOUR +2", "DIVINE GUIDANCE"] },
      { id: "crown_abaddon", name: "Unholy Crown of Abaddon", cost: 35, gloryCost: 1, kw: ["DARK BLESSINGS", "PROPHECY OF DOOM"] },
      { id: "stone_alchemy", name: "Alchemical Philosopher's Stone", cost: 40, gloryCost: 2, kw: ["REGENERATION", "GOETIC SORCERY"] }
    ]
  };

  const subfactionsDict = {
    "new_antioch": [
      { id: "new_antioch_base", name: "Principality of New Antioch (Base Force)" },
      { id: "papal_states", name: "Papal States Intervention Force" },
      { id: "eire_rangers", name: "Eire Rangers" },
      { id: "stosstruppen_prussia", name: "Stosstruppen of the Free State of Prussia" },
      { id: "alba_assault", name: "Kingdom of Alba Assault Detachment" },
      { id: "abyssinia_expedition", name: "Expeditionary Forces of Abyssinia" },
      { id: "red_brigade", name: "The Red Brigade" }
    ],
    "trench_pilgrims": [
      { id: "trench_pilgrims_base", name: "Processions of the Trench Pilgrims (Base Force)" },
      { id: "sacred_affliction", name: "Procession of the Sacred Affliction" },
      { id: "tenth_plague", name: "Cavalcade of the Tenth Plague" },
      { id: "st_methodius", name: "War Pilgrimage of Saint Methodius" }
    ],
    "heretic_legions": [
      { id: "heretic_legion_base", name: "Heretic Legion (Base Chaos Host)" },
      { id: "naval_raiders", name: "Heretic Naval Raiders" },
      { id: "trench_ghosts", name: "Trench Ghosts" },
      { id: "knights_avarice", name: "Knights of Avarice" }
    ],
    "iron_sultanate": [
      { id: "iron_sultanate_base", name: "The Iron Sultanate (Base Force)" },
      { id: "fidai_alamut", name: "Fidai of Alamut (The Cabal of Assassins)" },
      { id: "house_wisdom", name: "House of Wisdom (Jabirean Alchemists)" },
      { id: "iron_wall_defenders", name: "Defenders of the Iron Wall" }
    ],
    "serpent_court": [
      { id: "standard_court", name: "Court of the Seven-Headed Serpent (Standard Roster)" },
      { id: "house_avarice_court", name: "House of Avarice (Infernal Nobility)" }
    ]
  };

  const fullFactionCatalog = {
    "new_antioch": [
      { name: "Lieutenant of New Antioch", cost: 65, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 1, armour: 1, wounds: 2, img: "game_engine/images/lieutenant_new_antioch.jpg", kw: ["COMMANDER", "INHERENT LEADERSHIP"], defaultSlots: { ranged: "Service Pistol", melee: "Trench Sword", armour: "Body Armour" } },
      { name: "Papal Guard Centurion", cost: 85, gloryCost: 0, cat: "Elite", baseMM: 32, move: 5, ranged: 1, melee: 2, armour: 2, wounds: 2, img: "game_engine/images/papal_states_guard.jpg", kw: ["DIVINE GUIDANCE", "SHIELD"], defaultSlots: { melee: "Trench Sword", shields: "Trench Shield", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Paladin of Sacred Heart", cost: 90, gloryCost: 1, cat: "Elite", baseMM: 32, move: 6, ranged: 1, melee: 3, armour: 2, wounds: 2, img: "game_engine/images/anointed_champion.jpg", kw: ["DIVINE GUIDANCE", "CLEAVE 2"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Relic Trench Tank", cost: 150, gloryCost: 2, cat: "Monster", baseMM: 50, move: 5, ranged: 3, melee: 2, armour: 3, wounds: 5, img: "game_engine/images/mechanized_infantry.jpg", kw: ["HEAVY CONSTRUCT", "SNIPER"], defaultSlots: { ranged: "Heavy Machine Gun", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Trench Doctor", cost: 55, gloryCost: 0, cat: "Specialist", baseMM: 25, move: 6, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "game_engine/images/trench_doctor.jpg", kw: ["FIELD SURGEON", "TREAT WOUNDS"], defaultSlots: { equipment: "Field Surgeon Kit" } },
      { name: "Trench Chaplain", cost: 60, gloryCost: 0, cat: "Specialist", baseMM: 25, move: 6, ranged: 0, melee: 1, armour: 1, wounds: 1, img: "game_engine/images/trench_chaplain.jpg", kw: ["DIVINE GUIDANCE"], defaultSlots: { melee: "Trench Sword", armour: "Body Armour" } },
      { name: "Sniper Priest", cost: 50, gloryCost: 0, cat: "Specialist", baseMM: 25, move: 6, ranged: 2, melee: -1, armour: 0, wounds: 1, img: "game_engine/images/sniper_priest.jpg", kw: ["DEADEYE AIM", "SNIPER"], defaultSlots: { ranged: "Sniper Rifle" } },
      { name: "Stosstruppen Veteran", cost: 55, gloryCost: 0, cat: "Elite", baseMM: 25, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 1, img: "game_engine/images/stosstruppen_veteran.jpg", kw: ["TRENCH RAID", "SHOCK TROOPER"], defaultSlots: { ranged: "Submachine Gun", melee: "Trench Knife / Dagger", armour: "Body Armour" } },
      { name: "Mechanized Heavy Trooper", cost: 70, gloryCost: 0, cat: "Elite", baseMM: 32, move: 5, ranged: 2, melee: 1, armour: 2, wounds: 2, img: "game_engine/images/mechanized_infantry.jpg", kw: ["ARMOUR +2"], defaultSlots: { ranged: "Heavy Machine Gun", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Red Brigade Shock Trooper", cost: 60, gloryCost: 0, cat: "Elite", baseMM: 25, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 1, img: "game_engine/images/red_brigade_shock.jpg", kw: ["TRENCH RAID"], defaultSlots: { ranged: "Submachine Gun", grenades: "Demo Charge" } },
      { name: "Trench Trooper", cost: 35, gloryCost: 0, cat: "Trooper", baseMM: 25, move: 6, ranged: 1, melee: 0, armour: 0, wounds: 1, img: "game_engine/images/trench_trooper.jpg", kw: ["LINE INFANTRY", "GRIM DISCIPLINE"], defaultSlots: { ranged: "Bolt-Action Rifle" } },
      { name: "Wall Guard Sapper", cost: 40, gloryCost: 0, cat: "Trooper", baseMM: 25, move: 5, ranged: 1, melee: 1, armour: 1, wounds: 1, img: "game_engine/images/wall_guard_sapper.jpg", kw: [], defaultSlots: { grenades: "Demo Charge", shields: "Trench Shield" } },
      { name: "Mercy Dog Medic", cost: 25, gloryCost: 0, cat: "Support Beast", baseMM: 25, move: 8, ranged: 0, melee: 1, armour: 0, wounds: 1, img: "game_engine/images/mercy_dog.jpg", kw: [], defaultSlots: {} }
    ],
    "trench_pilgrims": [
      { name: "War Prophet", cost: 70, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "game_engine/images/war_prophet.jpg", kw: ["COMMANDER", "PROPHECY OF DOOM"], defaultSlots: { melee: "Unholy Staff", equipment: "Gothic Blood Banner" } },
      { name: "Saint Lazarus Resurrected", cost: 110, gloryCost: 2, cat: "Leader", baseMM: 32, move: 6, ranged: 0, melee: 4, armour: 2, wounds: 3, img: "game_engine/images/martyr_penitent.jpg", kw: ["DIVINE GUIDANCE", "REGENERATION"], defaultSlots: { melee: "Greatsword / Eviscerator" } },
      { name: "Anchorite Shrine Construct", cost: 120, gloryCost: 0, cat: "Monster", baseMM: 50, move: 5, ranged: 2, melee: 3, armour: 2, wounds: 4, img: "game_engine/images/anchorite_shrine.jpg", kw: ["ARMOUR +2"], defaultSlots: { armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Castigator", cost: 65, gloryCost: 0, cat: "Elite", baseMM: 32, move: 6, ranged: 0, melee: 3, armour: 1, wounds: 2, img: "game_engine/images/castigator.jpg", kw: ["CLEAVE 2"], defaultSlots: { melee: "Greatsword / Eviscerator" } },
      { name: "Martyr Penitent", cost: 45, gloryCost: 0, cat: "Specialist", baseMM: 25, move: 6, ranged: 0, melee: 2, armour: 0, wounds: 1, img: "game_engine/images/martyr_penitent.jpg", kw: [], defaultSlots: { melee: "Trench Axe / Club" } },
      { name: "Trench Pilgrim", cost: 30, gloryCost: 0, cat: "Trooper", baseMM: 25, move: 6, ranged: 0, melee: 1, armour: 0, wounds: 1, img: "game_engine/images/trench_pilgrim.jpg", kw: [], defaultSlots: { melee: "Trench Knife / Dagger" } },
      { name: "Communicant Giant", cost: 110, gloryCost: 0, cat: "Monster", baseMM: 50, move: 6, ranged: 0, melee: 4, armour: 1, wounds: 4, img: "game_engine/images/communicant_giant.jpg", kw: ["CLEAVE 1"], defaultSlots: { melee: "Greatsword / Eviscerator" } }
    ],
    "heretic_legions": [
      { name: "Heretic Priest", cost: 75, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "game_engine/images/heretic_priest.jpg", kw: ["COMMANDER", "DARK BLESSINGS"], defaultSlots: { ranged: "Hellfire Pistol", melee: "Unholy Staff" } },
      { name: "Trench Ghost Spectre", cost: 70, gloryCost: 0, cat: "Elite", baseMM: 25, move: 7, ranged: 1, melee: 2, armour: 1, wounds: 2, img: "game_engine/images/trench_ghost.jpg", kw: ["INFILTRATOR", "FLIGHT"], defaultSlots: { melee: "Trench Knife / Dagger" } },
      { name: "Demon Prince of Avarice", cost: 160, gloryCost: 2, cat: "Monster", baseMM: 50, move: 7, ranged: 1, melee: 5, armour: 2, wounds: 5, img: "game_engine/images/brazen_bull.jpg", kw: ["CLEAVE 2", "DARK BLESSINGS"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Goetic Warlock", cost: 80, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 2, melee: 1, armour: 1, wounds: 2, img: "game_engine/images/goetic_warlock.jpg", kw: ["DARK BLESSINGS"], defaultSlots: { ranged: "Hellfire Pistol", melee: "Unholy Staff" } },
      { name: "Knight of Avarice", cost: 90, gloryCost: 0, cat: "Elite", baseMM: 32, move: 5, ranged: 1, melee: 3, armour: 2, wounds: 2, img: "game_engine/images/knight_of_avarice.jpg", kw: ["ARMOUR +2", "CLEAVE 1"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Anointed Champion", cost: 85, gloryCost: 0, cat: "Elite", baseMM: 32, move: 6, ranged: 0, melee: 3, armour: 2, wounds: 2, img: "game_engine/images/anointed_champion.jpg", kw: ["PARRY"], defaultSlots: { melee: "Trench Sword", armour: "Body Armour" } },
      { name: "Death Commando", cost: 65, gloryCost: 0, cat: "Elite", baseMM: 25, move: 7, ranged: 2, melee: 2, armour: 1, wounds: 1, img: "game_engine/images/death_commando.jpg", kw: ["INFILTRATOR"], defaultSlots: { ranged: "Submachine Gun", melee: "Trench Knife / Dagger" } },
      { name: "Hound of Abaddon", cost: 45, gloryCost: 0, cat: "Support Beast", baseMM: 32, move: 8, ranged: 0, melee: 2, armour: 0, wounds: 1, img: "game_engine/images/hound_of_abaddon.jpg", kw: [], defaultSlots: {} },
      { name: "Heretic Trooper", cost: 35, gloryCost: 0, cat: "Trooper", baseMM: 25, move: 6, ranged: 1, melee: 1, armour: 0, wounds: 1, img: "game_engine/images/heretic_trooper.jpg", kw: [], defaultSlots: { ranged: "Bolt-Action Rifle" } },
      { name: "Lord of Tumours", cost: 110, gloryCost: 0, cat: "Monster", baseMM: 50, move: 5, ranged: 0, melee: 3, armour: 2, wounds: 4, img: "game_engine/images/lord_of_tumours.jpg", kw: ["BLACK GRAIL PLAGUE", "REGENERATION"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Brazen Bull", cost: 125, gloryCost: 0, cat: "Monster", baseMM: 50, move: 6, ranged: 1, melee: 4, armour: 2, wounds: 5, img: "game_engine/images/brazen_bull.jpg", kw: [], defaultSlots: { armour: "Rotting Carapace / Heavy Plate" } }
    ],
    "serpent_court": [
      { name: "Praetor (Leader)", cost: 115, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 1, melee: 3, armour: 2, wounds: 3, img: "game_engine/images/anointed_champion.jpg", kw: ["COMMANDER", "INHERENT LEADERSHIP", "CLEAVE 2"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Sorcerer (Leader)", cost: 75, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 2, melee: 1, armour: 1, wounds: 2, img: "game_engine/images/serpent_sorcerer.jpg", kw: ["COMMANDER", "GOETIC SORCERY", "SLAVEMASTER"], defaultSlots: { ranged: "Hellfire Pistol", melee: "Trench Knife / Dagger" } },
      { name: "Hell Knight", cost: 100, gloryCost: 0, cat: "Elite", baseMM: 32, move: 5, ranged: 0, melee: 3, armour: 2, wounds: 2, img: "game_engine/images/knight_of_avarice.jpg", kw: ["HELL KNIGHT", "CLEAVE 2"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Hunter of the Left-Hand Path", cost: 110, gloryCost: 0, cat: "Elite", baseMM: 25, move: 7, ranged: 2, melee: 2, armour: 1, wounds: 2, img: "game_engine/images/hunter_left_hand.jpg", kw: ["LEFT HAND PATH", "INFILTRATOR", "DEADEYE AIM"], defaultSlots: { ranged: "Sniper Rifle", melee: "Trench Knife / Dagger" } },
      { name: "Desecrated Saint", cost: 140, gloryCost: 1, cat: "Troop / Monster", baseMM: 50, move: 6, ranged: 0, melee: 4, armour: 2, wounds: 4, img: "game_engine/images/desecrated_saint.jpg", kw: ["DESECRATED SAINT", "REGENERATION", "CLEAVE 2"], defaultSlots: { melee: "Greatsword / Eviscerator", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Pit Locust", cost: 90, gloryCost: 0, cat: "Troop / Monster", baseMM: 32, move: 8, ranged: 0, melee: 2, armour: 2, wounds: 2, img: "game_engine/images/pit_locust.jpg", kw: ["FLIGHT", "RENDING LIMBS", "POISON STINGER"], defaultSlots: {} },
      { name: "Yoke Fiend", cost: 30, gloryCost: 0, cat: "Troop", baseMM: 25, move: 6, ranged: 0, melee: 1, armour: 0, wounds: 1, img: "game_engine/images/yoke_fiend.jpg", kw: ["SLAVE", "SLAVE COMPULSION"], defaultSlots: {} },
      { name: "Wretched", cost: 20, gloryCost: 0, cat: "Troop", baseMM: 25, move: 5, ranged: 0, melee: 0, armour: 0, wounds: 1, img: "game_engine/images/wretched_thrall.jpg", kw: ["WRETCHED"], defaultSlots: {} }
    ],
    "iron_sultanate": [
      { name: "Fidai Assassin of Alamut", cost: 85, gloryCost: 0, cat: "Elite", baseMM: 25, move: 7, ranged: 1, melee: 3, armour: 1, wounds: 2, img: "game_engine/images/fidai_assassin.jpg", kw: ["INFILTRATOR", "PARRY", "CLEAVE 1"], defaultSlots: { melee: "Takuba Scimitar" } },
      { name: "Jabirean Alchemist", cost: 70, gloryCost: 0, cat: "Leader", baseMM: 32, move: 6, ranged: 2, melee: 1, armour: 1, wounds: 2, img: "game_engine/images/jabirean_alchemist.jpg", kw: ["COMMANDER"], defaultSlots: { ranged: "Hellfire Pistol", melee: "Takuba Scimitar" } },
      { name: "Grand Vizier Alchemist", cost: 90, gloryCost: 1, cat: "Leader", baseMM: 32, move: 6, ranged: 2, melee: 2, armour: 1, wounds: 3, img: "game_engine/images/jabirean_alchemist.jpg", kw: ["COMMANDER", "GOETIC SORCERY"], defaultSlots: { ranged: "Hellfire Pistol", melee: "Takuba Scimitar" } },
      { name: "Efreet Automaton", cost: 140, gloryCost: 2, cat: "Monster", baseMM: 50, move: 6, ranged: 2, melee: 4, armour: 2, wounds: 5, img: "game_engine/images/lion_of_jabir.jpg", kw: ["CLEAVE 2"], defaultSlots: { armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Serpent Sorcerer", cost: 75, gloryCost: 0, cat: "Specialist", baseMM: 32, move: 6, ranged: 2, melee: 1, armour: 1, wounds: 2, img: "game_engine/images/serpent_sorcerer.jpg", kw: [], defaultSlots: { grenades: "Gas Grenades" } },
      { name: "Lion of Jabir", cost: 105, gloryCost: 0, cat: "Monster", baseMM: 50, move: 7, ranged: 0, melee: 4, armour: 1, wounds: 4, img: "game_engine/images/lion_of_jabir.jpg", kw: ["CLEAVE 1"], defaultSlots: {} },
      { name: "Janissary Heavy Gunner", cost: 75, gloryCost: 0, cat: "Elite", baseMM: 32, move: 5, ranged: 3, melee: 1, armour: 2, wounds: 2, img: "game_engine/images/janissary.jpg", kw: [], defaultSlots: { ranged: "Heavy Machine Gun", armour: "Rotting Carapace / Heavy Plate" } },
      { name: "Takuba Swordsman", cost: 60, gloryCost: 0, cat: "Elite", baseMM: 25, move: 6, ranged: 0, melee: 3, armour: 1, wounds: 1, img: "game_engine/images/takuba_swordsman.jpg", kw: ["PARRY", "CLEAVE 1"], defaultSlots: { melee: "Takuba Scimitar" } },
      { name: "Azab Warrior", cost: 40, gloryCost: 0, cat: "Trooper", baseMM: 25, move: 6, ranged: 1, melee: 1, armour: 0, wounds: 1, img: "game_engine/images/azab_warrior.jpg", kw: [], defaultSlots: { ranged: "Bolt-Action Rifle" } }
    ]
  };

  const selFaction = document.getElementById('selFaction');
  const selSubfaction = document.getElementById('selSubfaction');
  const selBudget = document.getElementById('selBudget');
  const selGloryBudget = document.getElementById('selGloryBudget');
  const txtWarbandName = document.getElementById('txtWarbandName');
  const unitCatalog = document.getElementById('unitCatalog');
  const activeRosterList = document.getElementById('activeRosterList');

  const auditBudget = document.getElementById('auditBudget');
  const auditSpent = document.getElementById('auditSpent');
  const auditRemaining = document.getElementById('auditRemaining');
  const auditGlory = document.getElementById('auditGlory');
  const auditModels = document.getElementById('auditModels');
  const auditLeader = document.getElementById('auditLeader');

  let activeRoster = [];
  let activeEquipTarget = null;
  let activeEquipSlotCategory = null;

  function updateSubfactionDropdown() {
    let list = subfactionsDict[selFaction.value] || subfactionsDict["new_antioch"];
    selSubfaction.innerHTML = '';
    list.forEach(sf => {
      let opt = document.createElement('option');
      opt.value = sf.id;
      opt.textContent = sf.name;
      selSubfaction.appendChild(opt);
    });
  }

  function renderCatalog() {
    let list = fullFactionCatalog[selFaction.value] || fullFactionCatalog["new_antioch"];
    let gloryLimit = parseInt(selGloryBudget.value, 10);
    unitCatalog.innerHTML = '';

    list.forEach(template => {
      let card = document.createElement('div');
      card.className = 'full-art-card';
      card.style.backgroundImage = `url('${template.img}')`;

      let isGloryLocked = template.gloryCost > gloryLimit;
      let gloryBadgeHtml = template.gloryCost > 0 
        ? `<span style="background:var(--gold-glow); color:#000; font-weight:bold; font-size:0.65rem; padding:2px 6px; border-radius:2px;">👑 ${template.gloryCost} GLORY</span>`
        : '';

      let kwBadges = template.kw.map(k => `<span class="kw-pill base-kw">${k}</span>`).join(' ');

      card.innerHTML = `
        <div class="card-top-bar">
          <div class="card-title-row">
            <span class="card-unit-name">${template.name}</span>
            <span class="card-cost-badge">${template.cost} D</span>
          </div>
          <div class="card-meta-line" style="display:flex; justify-content:space-between; align-items:center;">
            <span>${template.cat} • Base: ${template.baseMM}mm</span>
            ${gloryBadgeHtml}
          </div>
        </div>

        <div class="card-bottom-bar">
          <div class="card-stats-strip">
            MOVE: ${template.move}" | RANGED: +${template.ranged} | MELEE: +${template.melee} | ARMOUR: ${template.armour} | WOUNDS: ${template.wounds}/${template.wounds}
          </div>
          <div class="card-kw-container">${kwBadges}</div>
          <button type="button" class="btn-full-art-recruit" style="${isGloryLocked ? 'background:#333; border-color:#555; cursor:not-allowed;' : ''}" onclick="recruitCatalogModel('${template.name}')">
            ${isGloryLocked ? '🔒 GLORY LOCKED' : '➕ RECRUIT MODEL'}
          </button>
        </div>
      `;
      unitCatalog.appendChild(card);
    });
  }

  window.recruitCatalogModel = function(modelName) {
    let list = fullFactionCatalog[selFaction.value] || fullFactionCatalog["new_antioch"];
    let template = list.find(m => m.name === modelName);
    if (!template) return;

    let gloryLimit = parseInt(selGloryBudget.value, 10);
    let currentGlorySpent = activeRoster.reduce((sum, m) => sum + (m.gloryCost || 0), 0);

    if (template.gloryCost > 0 && currentGlorySpent + template.gloryCost > gloryLimit) {
      alert(`Requires ${template.gloryCost} Glory Points! Increase Warband Glory Points selector.`);
      return;
    }

    let currentSpent = activeRoster.reduce((sum, m) => sum + m.totalCost, 0);
    let budget = parseInt(selBudget.value, 10);

    if (currentSpent + template.cost > budget) {
      alert("Exceeds Ducat Draft Limit!");
      return;
    }

    let newModel = JSON.parse(JSON.stringify(template));
    newModel.instanceId = "m_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    newModel.equippedSlots = { ranged: null, melee: null, armour: null, shields: null, grenades: null, equipment: null };

    if (template.defaultSlots) {
      Object.keys(template.defaultSlots).forEach(slot => {
        let eqName = template.defaultSlots[slot];
        let found = masterArmory[slot].find(e => e.name === eqName);
        if (found) newModel.equippedSlots[slot] = found;
      });
    }

    recalculateModelCost(newModel);
    activeRoster.push(newModel);
    renderActiveRoster();
  };

  function recalculateModelCost(model) {
    let equipCost = Object.values(model.equippedSlots).reduce((sum, item) => sum + (item ? item.cost : 0), 0);
    model.totalCost = model.cost + equipCost;
  }

  function renderActiveRoster() {
    let budget = parseInt(selBudget.value, 10);
    let spent = activeRoster.reduce((sum, m) => sum + m.totalCost, 0);
    let remaining = budget - spent;

    let gloryLimit = parseInt(selGloryBudget.value, 10);
    let glorySpent = activeRoster.reduce((sum, m) => sum + (m.gloryCost || 0), 0);
    Object.values(activeRoster).forEach(m => {
      Object.values(m.equippedSlots).forEach(eq => {
        if (eq && eq.gloryCost) glorySpent += eq.gloryCost;
      });
    });

    let hasLeader = activeRoster.some(m => m.cat === 'Leader' || m.cat.includes('Leader'));

    auditBudget.textContent = `${budget} Ducats`;
    auditSpent.textContent = `${spent} Ducats`;
    auditRemaining.textContent = `${remaining} Ducats`;
    auditGlory.textContent = `${glorySpent} / ${gloryLimit} GL`;
    auditModels.textContent = `${activeRoster.length} / 12 Models`;

    if (hasLeader) {
      auditLeader.textContent = "✓ LEADER PRESENT";
      auditLeader.className = "status-ok";
    } else {
      auditLeader.textContent = "NO LEADER (REQUIRED)";
      auditLeader.className = "status-warning";
    }

    if (activeRoster.length === 0) {
      activeRosterList.innerHTML = `<div class="empty-roster-msg">NO UNITS RECRUITED YET. SELECT UNITS FROM THE FULL-ART CATALOGUE ABOVE.</div>`;
      return;
    }

    activeRosterList.innerHTML = '';
    activeRoster.forEach((m, idx) => {
      let card = document.createElement('div');
      card.className = 'full-art-roster-card';
      card.style.backgroundImage = `url('${m.img}')`;

      let slotRangedName = m.equippedSlots.ranged ? m.equippedSlots.ranged.name : 'Empty Slot';
      let slotMeleeName = m.equippedSlots.melee ? m.equippedSlots.melee.name : 'Empty Slot';
      let slotArmourName = m.equippedSlots.armour ? m.equippedSlots.armour.name : 'Empty Slot';
      let slotShieldsName = m.equippedSlots.shields ? m.equippedSlots.shields.name : 'Empty Slot';
      let slotGrenadesName = m.equippedSlots.grenades ? m.equippedSlots.grenades.name : 'Empty Slot';
      let slotEquipmentName = m.equippedSlots.equipment ? m.equippedSlots.equipment.name : 'Empty Slot';

      let activeKwList = [...m.kw];
      Object.values(m.equippedSlots).forEach(item => {
        if (item && item.kw) {
          item.kw.forEach(k => { if (!activeKwList.includes(k)) activeKwList.push(k); });
        }
      });

      let kwBadges = activeKwList.map(k => {
        let isEquipKw = !m.kw.includes(k);
        return `<span class="kw-pill ${isEquipKw ? 'equip-kw' : 'base-kw'}" onclick="openCodexModal('${k}')">${k}</span>`;
      }).join(' ');

      card.innerHTML = `
        <div class="card-top-overlay">
          <div class="card-title-row">
            <span class="card-unit-name">#${idx + 1} ${m.name} ${m.cat.includes('Leader') ? '⭐' : ''}</span>
            <span class="card-cost-badge">${m.totalCost} D</span>
          </div>
          <div class="card-meta-line">${m.cat} • Base: ${m.baseMM}mm ${m.gloryCost > 0 ? `• 👑 ${m.gloryCost} GL` : ''}</div>
        </div>

        <div class="card-mid-overlay">
          <div class="card-stats-strip">
            MOVE: ${m.move}" | RANGED: +${m.ranged} | MELEE: +${m.melee} | ARMOUR: ${m.armour} | WOUNDS: ${m.wounds}/${m.wounds}
          </div>

          <div class="card-slots-overlay-grid">
            <div class="card-slot-pill ${m.equippedSlots.ranged ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'ranged')">
              <span class="slot-pill-header">🔫 Ranged:</span>
              <span class="slot-pill-title">${slotRangedName}</span>
            </div>
            <div class="card-slot-pill ${m.equippedSlots.melee ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'melee')">
              <span class="slot-pill-header">🗡️ Melee:</span>
              <span class="slot-pill-title">${slotMeleeName}</span>
            </div>
            <div class="card-slot-pill ${m.equippedSlots.armour ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'armour')">
              <span class="slot-pill-header">🛡️ Armour:</span>
              <span class="slot-pill-title">${slotArmourName}</span>
            </div>
            <div class="card-slot-pill ${m.equippedSlots.shields ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'shields')">
              <span class="slot-pill-header">🛡️ Shield:</span>
              <span class="slot-pill-title">${slotShieldsName}</span>
            </div>
            <div class="card-slot-pill ${m.equippedSlots.grenades ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'grenades')">
              <span class="slot-pill-header">💣 Grenades:</span>
              <span class="slot-pill-title">${slotGrenadesName}</span>
            </div>
            <div class="card-slot-pill ${m.equippedSlots.equipment ? 'has-item' : ''}" onclick="openEquipModal('${m.instanceId}', 'equipment')">
              <span class="slot-pill-header">🪖 Gear:</span>
              <span class="slot-pill-title">${slotEquipmentName}</span>
            </div>
          </div>

          <div class="card-keywords-overlay">
            <div class="kw-overlay-label">ABILITIES & SPECIAL KEYWORDS:</div>
            <div class="kw-overlay-badges-box">${kwBadges}</div>
          </div>
        </div>

        <div class="card-bottom-bar-actions">
          <button type="button" class="btn-card-copy" onclick="duplicateRosterModel('${m.instanceId}')">📋 DUPLICATE</button>
          <button type="button" class="btn-card-remove" onclick="removeRosterModel('${m.instanceId}')">🗑️ REMOVE</button>
        </div>
      `;

      activeRosterList.appendChild(card);
    });
  }

  window.duplicateRosterModel = function(instanceId) {
    let found = activeRoster.find(m => m.instanceId === instanceId);
    if (!found) return;
    let clone = JSON.parse(JSON.stringify(found));
    clone.instanceId = "m_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    activeRoster.push(clone);
    renderActiveRoster();
  };

  window.removeRosterModel = function(instanceId) {
    activeRoster = activeRoster.filter(m => m.instanceId !== instanceId);
    renderActiveRoster();
  };

  // EQUIPMENT CUSTOMIZATION MODAL
  const equipModalOverlay = document.getElementById('equipModalOverlay');
  const equipModalTitle = document.getElementById('equipModalTitle');
  const equipModalSubtitle = document.getElementById('equipModalSubtitle');
  const equipSelectionList = document.getElementById('equipSelectionList');
  const btnCloseEquipModal = document.getElementById('btnCloseEquipModal');
  const btnCloseModalBtn = document.getElementById('btnCloseModalBtn');

  window.openEquipModal = function(instanceId, slotCat) {
    let model = activeRoster.find(m => m.instanceId === instanceId);
    if (!model) return;

    activeEquipTarget = model;
    activeEquipSlotCategory = slotCat;

    equipModalTitle.textContent = `EQUIP ${slotCat.toUpperCase()} — ${model.name}`;
    equipModalSubtitle.textContent = `Select items to equip into ${model.name}'s ${slotCat} slot.`;

    document.querySelectorAll('.equip-acc-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === slotCat);
    });

    renderEquipSelectionOptions(slotCat);
    equipModalOverlay.classList.remove('hidden');
  };

  document.querySelectorAll('.equip-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let cat = btn.dataset.cat;
      activeEquipSlotCategory = cat;
      document.querySelectorAll('.equip-acc-btn').forEach(b => b.classList.toggle('active', b === btn));
      renderEquipSelectionOptions(cat);
    });
  });

  function renderEquipSelectionOptions(slotCat) {
    let options = masterArmory[slotCat] || [];
    equipSelectionList.innerHTML = '';

    // Option to Unequip / Clear
    let clearRow = document.createElement('div');
    clearRow.className = 'equip-option-row';
    clearRow.innerHTML = `
      <div class="equip-opt-info">
        <h4>[ UNEQUIP / CLEAR SLOT ]</h4>
        <p>Remove item from this slot.</p>
      </div>
      <div class="equip-opt-cost" style="color:var(--steel-grey);">0 D</div>
    `;
    clearRow.onclick = () => {
      activeEquipTarget.equippedSlots[slotCat] = null;
      recalculateModelCost(activeEquipTarget);
      renderActiveRoster();
      closeEquipModal();
    };
    equipSelectionList.appendChild(clearRow);

    options.forEach(item => {
      let isEquipped = activeEquipTarget.equippedSlots[slotCat] && activeEquipTarget.equippedSlots[slotCat].name === item.name;
      let gloryBadgeHtml = item.gloryCost ? `<span style="color:var(--gold-glow); font-weight:bold;">👑 ${item.gloryCost} GL</span>` : '';

      let row = document.createElement('div');
      row.className = `equip-option-row ${isEquipped ? 'equipped-option' : ''}`;
      row.innerHTML = `
        <div class="equip-opt-info">
          <h4>${item.name} ${isEquipped ? '✓ (EQUIPPED)' : ''} ${gloryBadgeHtml}</h4>
          <p>Keywords: ${item.kw.join(', ')}</p>
        </div>
        <div class="equip-opt-cost">+${item.cost} D</div>
      `;
      row.onclick = () => {
        activeEquipTarget.equippedSlots[slotCat] = item;
        recalculateModelCost(activeEquipTarget);
        renderActiveRoster();
        closeEquipModal();
      };
      equipSelectionList.appendChild(row);
    });
  }

  function closeEquipModal() {
    equipModalOverlay.classList.add('hidden');
  }

  btnCloseEquipModal.addEventListener('click', closeEquipModal);
  btnCloseModalBtn.addEventListener('click', closeEquipModal);

  // KEYWORD CODEX MODAL
  const codexModalOverlay = document.getElementById('codexModalOverlay');
  const codexKwName = document.getElementById('codexKwName');
  const codexCategory = document.getElementById('codexCategory');
  const codexDescription = document.getElementById('codexDescription');
  const codexImpact = document.getElementById('codexImpact');
  const btnCloseCodexModal = document.getElementById('btnCloseCodexModal');
  const btnCloseCodexBtn = document.getElementById('btnCloseCodexBtn');

  window.openCodexModal = function(kwName) {
    let rule = masterCodex[kwName.toUpperCase()] || {
      cat: "System Trait",
      desc: `Official Trench Crusade rule mechanic for ${kwName}.`,
      impact: `Active gameplay modifier: ${kwName}`
    };

    codexKwName.textContent = kwName.toUpperCase();
    codexCategory.textContent = rule.cat.toUpperCase();
    codexDescription.textContent = rule.desc;
    codexImpact.textContent = rule.impact;

    codexModalOverlay.classList.remove('hidden');
  };

  function closeCodexModal() {
    codexModalOverlay.classList.add('hidden');
  }

  btnCloseCodexModal.addEventListener('click', closeCodexModal);
  btnCloseCodexBtn.addEventListener('click', closeCodexModal);

  // Faction / Subfaction / Glory Change Handlers
  selFaction.addEventListener('change', () => {
    activeRoster = [];
    updateSubfactionDropdown();
    renderCatalog();
    renderActiveRoster();
  });

  selBudget.addEventListener('change', () => renderActiveRoster());
  selGloryBudget.addEventListener('change', () => {
    renderCatalog();
    renderActiveRoster();
  });

  document.getElementById('btnClearRoster').addEventListener('click', () => {
    if (confirm("Clear entire warband roster?")) {
      activeRoster = [];
      renderActiveRoster();
    }
  });

  document.getElementById('btnSaveRoster').addEventListener('click', () => {
    if (activeRoster.length === 0) {
      alert("Please recruit at least 1 model before saving to Vault!");
      return;
    }
    let vault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
    let newEntry = {
      name: txtWarbandName.value || "Custom Warband",
      faction: selFaction.value,
      subfaction: selSubfaction.value,
      spent: activeRoster.reduce((sum, m) => sum + m.totalCost, 0),
      roster: JSON.parse(JSON.stringify(activeRoster))
    };
    vault.push(newEntry);
    localStorage.setItem('tc_warband_vault', JSON.stringify(vault));
    renderVaultRosters();
    alert(`🏆 Saved "${newEntry.name}" (${newEntry.spent}D, ${newEntry.roster.length} models) to Warband Vault!`);
    if (window.refreshVaultDropdowns) window.refreshVaultDropdowns(vault.length - 1);
    if (window.deployWarbands) window.deployWarbands();
  });

  document.getElementById('btnExportJSON').addEventListener('click', () => {
    let newEntry = {
      name: txtWarbandName.value,
      faction: selFaction.value,
      subfaction: selSubfaction.value,
      spent: activeRoster.reduce((sum, m) => sum + m.totalCost, 0),
      roster: activeRoster
    };
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newEntry, null, 2));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${txtWarbandName.value.replace(/\s+/g, '_')}.tcwarband.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  updateSubfactionDropdown();
  renderCatalog();
  renderActiveRoster();
  renderVaultRosters();
});

  // GLOBAL BUTTON EVENT DELEGATION FOR DEPLOY & GENERATE MAP
  document.addEventListener('click', (e) => {
    let deployBtn = e.target ? e.target.closest('#btnDeployBoth') : null;
    if (deployBtn) {
      if (window.deployWarbands) window.deployWarbands();
    }

    let randomBtn = e.target ? e.target.closest('#btnRandomMap') : null;
    if (randomBtn) {
      let mapSel = document.getElementById('selMapPreset');
      if (mapSel) {
        let opts = Array.from(mapSel.options).map(o => o.value);
        if (opts.length > 0) {
          let randomVal = opts[Math.floor(Math.random() * opts.length)];
          mapSel.value = randomVal;
          if (window.loadMapPreset) window.loadMapPreset(randomVal);
        }
      }
    }
  });


  // ==================== COMMANDER AUTHENTICATION ENGINE ====================
  const btnOpenAuthModal = document.getElementById('btnOpenAuthModal');
  const btnCloseAuthModal = document.getElementById('btnCloseAuthModal');
  const authModalOverlay = document.getElementById('authModalOverlay');
  const btnTabLogin = document.getElementById('btnTabLogin');
  const btnTabRegister = document.getElementById('btnTabRegister');
  const avatarSelectRow = document.getElementById('avatarSelectRow');
  const btnAuthSubmit = document.getElementById('btnAuthSubmit');
  const authForm = document.getElementById('authForm');
  const authUsername = document.getElementById('authUsername');
  const authPassword = document.getElementById('authPassword');
  const authAvatar = document.getElementById('authAvatar');
  const authErrorMsg = document.getElementById('authErrorMsg');
  const txtHeaderProfileAvatar = document.getElementById('txtHeaderProfileAvatar');
  const txtHeaderProfileName = document.getElementById('txtHeaderProfileName');

  let currentAuthMode = 'login'; // 'login' or 'register'
  let currentUserToken = localStorage.getItem('tc_auth_token') || null;

  function setAuthMode(mode) {
    currentAuthMode = mode;
    if (mode === 'login') {
      btnTabLogin.style.background = 'var(--gold-glow)';
      btnTabLogin.style.color = '#000';
      btnTabRegister.style.background = '#1e2430';
      btnTabRegister.style.color = '#fff';
      avatarSelectRow.style.display = 'none';
      btnAuthSubmit.textContent = 'LOG IN TO COMMAND VAULT';
    } else {
      btnTabRegister.style.background = 'var(--gold-glow)';
      btnTabRegister.style.color = '#000';
      btnTabLogin.style.background = '#1e2430';
      btnTabLogin.style.color = '#fff';
      avatarSelectRow.style.display = 'block';
      btnAuthSubmit.textContent = 'REGISTER NEW COMMANDER ACCOUNT';
    }
    if (authErrorMsg) authErrorMsg.style.display = 'none';
  }

  if (btnTabLogin) btnTabLogin.addEventListener('click', () => setAuthMode('login'));
  if (btnTabRegister) btnTabRegister.addEventListener('click', () => setAuthMode('register'));

  if (btnOpenAuthModal) {
    btnOpenAuthModal.addEventListener('click', () => {
      if (currentUserToken) {
        if (confirm("Log out of current Commander session?")) {
          localStorage.removeItem('tc_auth_token');
          currentUserToken = null;
          txtHeaderProfileAvatar.textContent = "🎖️";
          txtHeaderProfileName.textContent = "LOG IN / REGISTER";
          alert("Logged out successfully.");
        }
      } else {
        if (authModalOverlay) authModalOverlay.classList.remove('hidden');
      }
    });
  }

  if (btnCloseAuthModal) {
    btnCloseAuthModal.addEventListener('click', () => {
      if (authModalOverlay) authModalOverlay.classList.add('hidden');
    });
  }

  async function checkAuthSession() {
    if (!currentUserToken) return;
    try {
      let res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${currentUserToken}` }
      });
      if (res.ok) {
        let data = await res.json();
        if (data.user) {
          txtHeaderProfileAvatar.textContent = data.user.avatar || '🎖️';
          txtHeaderProfileName.textContent = data.user.username.toUpperCase();
        }
      } else {
        localStorage.removeItem('tc_auth_token');
        currentUserToken = null;
      }
    } catch(err) {
      console.log("Auth session check offline or static server mode.");
    }
  }

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (authErrorMsg) authErrorMsg.style.display = 'none';

      let endpoint = currentAuthMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      let payload = {
        username: authUsername.value.trim(),
        password: authPassword.value.trim(),
        avatar: authAvatar ? authAvatar.value : '🎖️'
      };

      try {
        let res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        let data = await res.json();
        if (!res.ok) {
          if (authErrorMsg) {
            authErrorMsg.textContent = `⚠️ ${data.error || 'Authentication failed'}`;
            authErrorMsg.style.display = 'block';
          }
          return;
        }

        currentUserToken = data.token;
        localStorage.setItem('tc_auth_token', data.token);

        txtHeaderProfileAvatar.textContent = data.user.avatar || '🎖️';
        txtHeaderProfileName.textContent = data.user.username.toUpperCase();

        if (authModalOverlay) authModalOverlay.classList.add('hidden');
        alert(`☩ Welcome, Commander ${data.user.username}! Your Vault & Campaign data is now synced.`);
      } catch(err) {
        if (authErrorMsg) {
          authErrorMsg.textContent = `⚠️ Server offline or connection error. (${err.message})`;
          authErrorMsg.style.display = 'block';
        }
      }
    });
  }

  checkAuthSession();


  // PROFILE EDITING & MODULE NAVIGATION CONTROLLER
  const profileModalOverlay = document.getElementById('profileModalOverlay');
  const btnCloseProfileModal = document.getElementById('btnCloseProfileModal');
  const profileEditForm = document.getElementById('profileEditForm');
  const txtEditProfileName = document.getElementById('txtEditProfileName');
  const selEditProfileAvatar = document.getElementById('selEditProfileAvatar');
  const profNameDisplay = document.getElementById('profNameDisplay');
  const profAvatarDisplay = document.getElementById('profAvatarDisplay');
  const profileSaveMsg = document.getElementById('profileSaveMsg');
  const btnLogoutUser = document.getElementById('btnLogoutUser');

  function openProfileModal() {
    let user = currentUser || { username: "Commander", avatar: "🎖️" };
    if (txtEditProfileName) txtEditProfileName.value = user.username;
    if (selEditProfileAvatar) selEditProfileAvatar.value = user.avatar || "🎖️";
    if (profNameDisplay) profNameDisplay.textContent = user.username.toUpperCase();
    if (profAvatarDisplay) profAvatarDisplay.textContent = user.avatar || "🎖️";
    if (profileModalOverlay) profileModalOverlay.classList.remove('hidden');
  }

  if (btnOpenAuthModal) {
    btnOpenAuthModal.addEventListener('click', () => {
      let token = localStorage.getItem('tc_auth_token');
      if (token) {
        openProfileModal();
      } else {
        if (authModalOverlay) authModalOverlay.classList.remove('hidden');
      }
    });
  }

  if (btnCloseProfileModal) {
    btnCloseProfileModal.addEventListener('click', () => {
      if (profileModalOverlay) profileModalOverlay.classList.add('hidden');
    });
  }

  if (profileEditForm) {
    profileEditForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let newName = txtEditProfileName.value.trim();
      let newAvatar = selEditProfileAvatar.value;
      let token = localStorage.getItem('tc_auth_token');

      if (!token) return;

      try {
        let res = await fetch('/api/auth/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ username: newName, avatar: newAvatar })
        });
        let data = await res.json();

        if (res.ok && data.user) {
          userProfile.name = data.user.username;
          userProfile.avatar = data.user.avatar;
          renderUserProfile();
          if (profNameDisplay) profNameDisplay.textContent = data.user.username.toUpperCase();
          if (profAvatarDisplay) profAvatarDisplay.textContent = data.user.avatar;
          if (profileSaveMsg) {
            profileSaveMsg.style.display = 'block';
            setTimeout(() => { profileSaveMsg.style.display = 'none'; }, 2500);
          }
        }
      } catch (err) {
        console.error("Profile save error:", err);
      }
    });
  }

  if (btnLogoutUser) {
    btnLogoutUser.addEventListener('click', () => {
      localStorage.removeItem('tc_auth_token');
      currentUserToken = null;
      if (profileModalOverlay) profileModalOverlay.classList.add('hidden');
      if (txtHeaderProfileName) txtHeaderProfileName.textContent = 'LOG IN / REGISTER';
      if (txtHeaderProfileAvatar) txtHeaderProfileAvatar.textContent = '🎖️';
    });
  }

  // 3-STEP PRE-MATCH SETUP WIZARD LOGIC
  const btnWizardStep1 = document.getElementById('btnWizardStep1');
  const btnWizardStep2 = document.getElementById('btnWizardStep2');
  const btnWizardStep3 = document.getElementById('btnWizardStep3');

  const panelWizardStep1 = document.getElementById('panelWizardStep1');
  const panelWizardStep2 = document.getElementById('panelWizardStep2');
  const panelWizardStep3 = document.getElementById('panelWizardStep3');

  const btnNextToStep2 = document.getElementById('btnNextToStep2');
  const btnNextToStep3 = document.getElementById('btnNextToStep3');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const btnBackToStep2 = document.getElementById('btnBackToStep2');
  const btnStartWizardMatch = document.getElementById('btnStartWizardMatch');

  function switchWizardStep(stepNum) {
    if (panelWizardStep1) panelWizardStep1.style.display = stepNum === 1 ? 'block' : 'none';
    if (panelWizardStep2) panelWizardStep2.style.display = stepNum === 2 ? 'block' : 'none';
    if (panelWizardStep3) panelWizardStep3.style.display = stepNum === 3 ? 'block' : 'none';

    [btnWizardStep1, btnWizardStep2, btnWizardStep3].forEach((b, idx) => {
      if (b) {
        if (idx + 1 === stepNum) {
          b.classList.add('active');
          b.style.borderColor = 'var(--gold-glow)';
          b.style.background = 'rgba(229,193,88,0.2)';
          b.style.color = '#fff';
        } else {
          b.classList.remove('active');
          b.style.borderColor = '#333';
          b.style.background = '#000';
          b.style.color = '#aaa';
        }
      }
    });

    if (stepNum === 3) {
      updateWizardSummary();
    }
  }

  function updateWizardSummary() {
    const selP1 = document.getElementById('selWizardP1Warband');
    const selP2 = document.getElementById('selWizardP2Warband');
    const selDoc1 = document.getElementById('selWizardP1Doctrine');
    const selDoc2 = document.getElementById('selWizardP2Doctrine');
    const selScen = document.getElementById('selWizardScenario');
    const selMap = document.getElementById('selWizardMap');

    const txtTitle = document.getElementById('txtWizardSummaryTitle');
    const txtDetails = document.getElementById('txtWizardSummaryDetails');

    let p1Text = selP1 && selP1.options.length > 0 ? selP1.options[selP1.selectedIndex]?.text : 'Player 1 Force';
    let p2Text = selP2 && selP2.options.length > 0 ? selP2.options[selP2.selectedIndex]?.text : 'Player 2 Force';
    let doc1Text = selDoc1 ? selDoc1.options[selDoc1.selectedIndex]?.text : 'Standard';
    let doc2Text = selDoc2 ? selDoc2.options[selDoc2.selectedIndex]?.text : 'Standard';
    let scenText = selScen ? selScen.options[selScen.selectedIndex]?.text : 'Random';
    let mapText = selMap ? selMap.options[selMap.selectedIndex]?.text : 'Random';

    if (txtTitle) txtTitle.textContent = `⚔️ ${p1Text} VS ${p2Text}`;
    if (txtDetails) txtDetails.innerHTML = `<strong>SCENARIO:</strong> ${scenText} | <strong>MAP:</strong> ${mapText}<br><strong>P1 DOCTRINE:</strong> ${doc1Text} | <strong>P2 DOCTRINE:</strong> ${doc2Text}`;
  }

  if (btnWizardStep1) btnWizardStep1.addEventListener('click', () => switchWizardStep(1));
  if (btnWizardStep2) btnWizardStep2.addEventListener('click', () => switchWizardStep(2));
  if (btnWizardStep3) btnWizardStep3.addEventListener('click', () => switchWizardStep(3));

  if (btnNextToStep2) btnNextToStep2.addEventListener('click', () => switchWizardStep(2));
  if (btnNextToStep3) btnNextToStep3.addEventListener('click', () => switchWizardStep(3));
  if (btnBackToStep1) btnBackToStep1.addEventListener('click', () => switchWizardStep(1));
  if (btnBackToStep2) btnBackToStep2.addEventListener('click', () => switchWizardStep(2));

  if (btnStartWizardMatch) {
    btnStartWizardMatch.addEventListener('click', () => {
      const selWScen = document.getElementById('selWizardScenario');
      const selWMap = document.getElementById('selWizardMap');
      const selMainScen = document.getElementById('selScenario');
      const selMainMap = document.getElementById('selMapPack');

      if (selWScen && selMainScen) {
        if (selWScen.value === 'scen_random') {
          const scens = ['scen_1', 'scen_2', 'scen_3', 'scen_4', 'scen_5', 'scen_6'];
          selMainScen.value = scens[Math.floor(Math.random() * scens.length)];
        } else {
          selMainScen.value = selWScen.value;
        }
        selMainScen.dispatchEvent(new Event('change'));
      }

      if (selWMap && selMainMap) {
        if (selWMap.value === 'map_random') {
          const maps = ['map_1', 'map_2', 'map_3', 'map_4', 'map_5', 'map_6', 'map_7', 'map_8'];
          selMainMap.value = maps[Math.floor(Math.random() * maps.length)];
        } else {
          selMainMap.value = selWMap.value;
        }
        selMainMap.dispatchEvent(new Event('change'));
      }

      if (window.deployWarbands) window.deployWarbands();
    });
  }

  // GLOBAL KEYBOARD ACCESSIBILITY: ESCAPE TO CLOSE OPEN MODALS
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      const overlays = [authModalOverlay, profileModalOverlay, document.getElementById('codexModalOverlay'), document.getElementById('equipModalOverlay')];
      overlays.forEach(overlay => {
        if (overlay && !overlay.classList.contains('hidden')) {
          overlay.classList.add('hidden');
        }
      });
    }
  });
