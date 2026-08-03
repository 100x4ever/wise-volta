/* Trench Crusade - Official Rules Dice Roller & Marker Prompt Engine v1.0.2 */

document.addEventListener('DOMContentLoaded', () => {
  // State Management
  let currentMode = 'success'; // 'success', 'injury', 'bloodbath', 'morale', 'd3'
  let plusDice = 0;
  let minusDice = 0;
  let flatMod = 0;
  let armourRating = 0;
  
  // Marker Prompt State
  let spentBlessing = 0;
  let spentBlood = 0;

  // DOM Elements
  const tabBtns = document.querySelectorAll('.tab-btn');
  const modeInfo = document.getElementById('modeInfo');
  
  // Preset Selectors
  const selAttackerStat = document.getElementById('selAttackerStat');
  const selCover = document.getElementById('selCover');
  const selPosition = document.getElementById('selPosition');
  const auditLines = document.getElementById('auditLines');

  const valPlusDice = document.getElementById('valPlusDice');
  const valMinusDice = document.getElementById('valMinusDice');
  const valFlatMod = document.getElementById('valFlatMod');
  const valArmour = document.getElementById('valArmour');
  const netDiceText = document.getElementById('netDiceText');
  
  const btnIncPlus = document.getElementById('btnIncPlus');
  const btnDecPlus = document.getElementById('btnDecPlus');
  const btnIncMinus = document.getElementById('btnIncMinus');
  const btnDecMinus = document.getElementById('btnDecMinus');
  const btnIncFlat = document.getElementById('btnIncFlat');
  const btnDecFlat = document.getElementById('btnDecFlat');
  const btnIncArmour = document.getElementById('btnIncArmour');
  const btnDecArmour = document.getElementById('btnDecArmour');
  
  const dicePoolGroup = document.getElementById('dicePoolGroup');
  const flatModGroup = document.getElementById('flatModGroup');
  const armourGroup = document.getElementById('armourGroup');
  
  const riskyToggle = document.getElementById('riskyToggle');
  const deadlyToggle = document.getElementById('deadlyToggle');
  const targetDownToggle = document.getElementById('targetDownToggle');
  
  const chkRisky = document.getElementById('chkRisky');
  const chkDeadly = document.getElementById('chkDeadly');
  const chkTargetDown = document.getElementById('chkTargetDown');
  
  const btnOpenMarkerPrompt = document.getElementById('btnOpenMarkerPrompt');
  const btnRollText = document.getElementById('btnRollText');
  const btnResetControls = document.getElementById('btnResetControls');
  
  const diceArena = document.getElementById('diceArena');
  const resultBanner = document.getElementById('resultBanner');
  const resultTitle = document.getElementById('resultTitle');
  const resultBreakdown = document.getElementById('resultBreakdown');
  const resultDetails = document.getElementById('resultDetails');
  
  const historyList = document.getElementById('historyList');
  const btnClearHistory = document.getElementById('btnClearHistory');

  // Modal Elements
  const markerModalOverlay = document.getElementById('markerModalOverlay');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const valSpentBlessing = document.getElementById('valSpentBlessing');
  const valSpentBlood = document.getElementById('valSpentBlood');
  const btnIncBlessing = document.getElementById('btnIncBlessing');
  const btnDecBlessing = document.getElementById('btnDecBlessing');
  const btnIncBlood = document.getElementById('btnIncBlood');
  const btnDecBlood = document.getElementById('btnDecBlood');
  const markerNetText = document.getElementById('markerNetText');
  const markerFinalPoolText = document.getElementById('markerFinalPoolText');
  const btnConfirmAndRoll = document.getElementById('btnConfirmAndRoll');
  const bloodMarkerTitle = document.getElementById('bloodMarkerTitle');
  const bloodMarkerDesc = document.getElementById('bloodMarkerDesc');

  // Mode Configurations
  const modeDescriptions = {
    success: {
      title: "Standard / Risky Success Roll",
      desc: "Roll 2D6 + Dice Modifiers vs Target Number 7+ for Ranged Hits, Melee Hits, Spells, and Actions.",
      btnText: "INITIATE ROLL & SPEND MARKERS"
    },
    injury: {
      title: "Injury Roll",
      desc: "Roll 2D6 + Injury Dice vs Injury Table (1 or less: No Effect, 2-6: Down, 7+: Out of Action).",
      btnText: "INITIATE INJURY & SPEND MARKERS"
    },
    bloodbath: {
      title: "Bloodbath Roll (Spend 6 Blood Markers / 3 if Down)",
      desc: "Roll 3D6 (or 4D6 for DEADLY weapons) and SUM ALL DICE together vs Injury Table!",
      btnText: "INITIATE BLOODBATH & SPEND MARKERS"
    },
    morale: {
      title: "Warband Morale Check",
      desc: "Roll 2D6 vs 7+ when half or more of Warband is Down or Out of Action. Failure makes Warband SHAKEN.",
      btnText: "EXECUTE MORALE CHECK"
    },
    d3: {
      title: "D3 / Initiative Roll-Off",
      desc: "Roll 1D6 halved (D3) or perform a 1D6 Roll-Off tiebreaker.",
      btnText: "EXECUTE D3 ROLL"
    }
  };

  // Mode Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      updateModeUI();
    });
  });

  function updateModeUI() {
    const config = modeDescriptions[currentMode];
    modeInfo.innerHTML = `<h3>${config.title}</h3><p>${config.desc}</p>`;
    btnRollText.textContent = config.btnText;

    if (currentMode === 'd3') {
      dicePoolGroup.classList.add('hidden');
      flatModGroup.classList.add('hidden');
      armourGroup.classList.add('hidden');
      riskyToggle.classList.add('hidden');
      deadlyToggle.classList.add('hidden');
      targetDownToggle.classList.add('hidden');
    } else {
      dicePoolGroup.classList.remove('hidden');
      flatModGroup.classList.remove('hidden');

      if (currentMode === 'success') {
        armourGroup.classList.add('hidden');
        riskyToggle.classList.remove('hidden');
        deadlyToggle.classList.add('hidden');
        targetDownToggle.classList.add('hidden');
      } else if (currentMode === 'injury') {
        armourGroup.classList.remove('hidden');
        riskyToggle.classList.add('hidden');
        deadlyToggle.classList.add('hidden');
        targetDownToggle.classList.remove('hidden');
      } else if (currentMode === 'bloodbath') {
        armourGroup.classList.remove('hidden');
        riskyToggle.classList.add('hidden');
        deadlyToggle.classList.remove('hidden');
        targetDownToggle.classList.remove('hidden');
      } else if (currentMode === 'morale') {
        armourGroup.classList.add('hidden');
        riskyToggle.classList.add('hidden');
        deadlyToggle.classList.add('hidden');
        targetDownToggle.classList.add('hidden');
      }
    }

    calculateAutoModifiers();
  }

  // Preset Auto-Calculator Engine
  selAttackerStat.addEventListener('change', calculateAutoModifiers);
  selCover.addEventListener('change', calculateAutoModifiers);
  selPosition.addEventListener('change', calculateAutoModifiers);
  chkDeadly.addEventListener('change', calculateAutoModifiers);
  chkTargetDown.addEventListener('change', calculateAutoModifiers);

  function calculateAutoModifiers() {
    let statVal = parseInt(selAttackerStat.value);
    let coverVal = parseInt(selCover.value);
    let posVal = parseInt(selPosition.value);

    let auditHtml = `<div>• Base Dice Pool: <strong>2D6</strong></div>`;
    if (statVal !== 0) auditHtml += `<div>• Attacker Stat: <strong>${statVal > 0 ? '+' + statVal : statVal} DICE</strong></div>`;
    if (coverVal !== 0) auditHtml += `<div>• Target Cover: <strong>${coverVal} DICE</strong></div>`;
    if (posVal !== 0) auditHtml += `<div>• Range / Position: <strong>${posVal > 0 ? '+' + posVal : posVal} DICE</strong></div>`;

    // Target Down preset for melee injury
    let targetDownBonus = (currentMode === 'injury' && chkTargetDown.checked) ? 1 : 0;
    if (targetDownBonus > 0) auditHtml += `<div>• Target Down (Melee): <strong>+1 INJURY DICE</strong></div>`;

    let totalPresetDices = statVal + coverVal + posVal + targetDownBonus;
    let netDice = totalPresetDices + plusDice - minusDice;

    let baseCount = (currentMode === 'bloodbath') ? (chkDeadly.checked ? 4 : 3) : 2;
    let poolDesc = "";
    if (netDice > 0) {
      poolDesc = `${baseCount + netDice}D6 (Pick ${baseCount} Highest)`;
    } else if (netDice < 0) {
      poolDesc = `${baseCount + Math.abs(netDice)}D6 (Pick ${baseCount} Lowest)`;
    } else {
      poolDesc = `${baseCount}D6 (Standard Pool)`;
    }

    auditHtml += `<div class="audit-highlight">• Total Calculated Pool: <strong>${poolDesc}</strong></div>`;
    auditLines.innerHTML = auditHtml;

    netDiceText.textContent = poolDesc.toUpperCase();
    return { netDice, baseCount, poolDesc };
  }

  // Counter Handlers
  btnIncPlus.addEventListener('click', () => { plusDice++; updateCounters(); });
  btnDecPlus.addEventListener('click', () => { if (plusDice > 0) plusDice--; updateCounters(); });
  
  btnIncMinus.addEventListener('click', () => { minusDice++; updateCounters(); });
  btnDecMinus.addEventListener('click', () => { if (minusDice > 0) minusDice--; updateCounters(); });
  
  btnIncFlat.addEventListener('click', () => { flatMod++; updateCounters(); });
  btnDecFlat.addEventListener('click', () => { flatMod--; updateCounters(); });
  
  btnIncArmour.addEventListener('click', () => { armourRating++; updateCounters(); });
  btnDecArmour.addEventListener('click', () => { if (armourRating > 0) armourRating--; updateCounters(); });

  btnResetControls.addEventListener('click', () => {
    plusDice = 0;
    minusDice = 0;
    flatMod = 0;
    armourRating = 0;
    spentBlessing = 0;
    spentBlood = 0;
    selAttackerStat.value = "2";
    selCover.value = "-1";
    selPosition.value = "0";
    chkRisky.checked = false;
    chkDeadly.checked = false;
    chkTargetDown.checked = false;
    updateCounters();
  });

  function updateCounters() {
    valPlusDice.textContent = plusDice;
    valMinusDice.textContent = minusDice;
    valFlatMod.textContent = (flatMod >= 0 ? '+' : '') + flatMod;
    valArmour.textContent = armourRating;
    calculateAutoModifiers();
  }

  // Marker Prompt Modal Controls
  btnOpenMarkerPrompt.addEventListener('click', () => {
    if (currentMode === 'd3') {
      executeRoll();
      return;
    }
    openMarkerModal();
  });

  btnCloseModal.addEventListener('click', closeMarkerModal);

  function openMarkerModal() {
    spentBlessing = 0;
    spentBlood = 0;
    updateMarkerModalUI();
    markerModalOverlay.classList.remove('hidden');
  }

  function closeMarkerModal() {
    markerModalOverlay.classList.add('hidden');
  }

  btnIncBlessing.addEventListener('click', () => { spentBlessing++; updateMarkerModalUI(); });
  btnDecBlessing.addEventListener('click', () => { if (spentBlessing > 0) spentBlessing--; updateMarkerModalUI(); });
  btnIncBlood.addEventListener('click', () => { spentBlood++; updateMarkerModalUI(); });
  btnDecBlood.addEventListener('click', () => { if (spentBlood > 0) spentBlood--; updateMarkerModalUI(); });

  function updateMarkerModalUI() {
    valSpentBlessing.textContent = spentBlessing;
    valSpentBlood.textContent = spentBlood;

    if (currentMode === 'injury' || currentMode === 'bloodbath') {
      bloodMarkerTitle.textContent = "TARGET BLOOD MARKERS (SPENT FOR +1 INJURY)";
      bloodMarkerDesc.textContent = "Attacker spends target's Blood Markers for +1 INJURY DICE per marker spent.";
    } else {
      bloodMarkerTitle.textContent = "OPPONENT SPENT BLOOD MARKERS (ON ATTACKER)";
      bloodMarkerDesc.textContent = "Opponent spends Blood Marker on attacker to inflict -1 DICE penalty on Success Roll.";
    }

    let markerNet = 0;
    if (currentMode === 'injury' || currentMode === 'bloodbath') {
      markerNet = spentBlessing + spentBlood; // Both add +DICE to injury
    } else {
      markerNet = spentBlessing - spentBlood; // Blessing adds +1 DICE, Opponent Blood subtracts -1 DICE
    }

    markerNetText.textContent = (markerNet >= 0 ? '+' : '') + markerNet + " DICE";

    let currentCalculated = calculateAutoModifiers();
    let finalNet = currentCalculated.netDice + markerNet;
    let baseCount = currentCalculated.baseCount;

    let finalDesc = "";
    if (finalNet > 0) {
      finalDesc = `${baseCount + finalNet}D6 (Pick ${baseCount} Highest)`;
    } else if (finalNet < 0) {
      finalDesc = `${baseCount + Math.abs(finalNet)}D6 (Pick ${baseCount} Lowest)`;
    } else {
      finalDesc = `${baseCount}D6 (Standard Pool)`;
    }

    markerFinalPoolText.textContent = finalDesc.toUpperCase();
  }

  btnConfirmAndRoll.addEventListener('click', () => {
    closeMarkerModal();
    executeRoll();
  });

  // Roll Execution Engine
  function executeRoll() {
    diceArena.innerHTML = '';
    resultBanner.classList.add('hidden');

    if (currentMode === 'd3') {
      let d6Val = Math.floor(Math.random() * 6) + 1;
      let d3Val = Math.ceil(d6Val / 2);
      renderDiceVisual([d6Val], [0], 0);
      
      showResultBanner({
        status: 'success',
        title: `D3 ROLL RESULT: ${d3Val}`,
        breakdown: `Rolled D6: ${d6Val} → D3 Value: ${d3Val}`,
        details: `Calculated as Math.ceil(${d6Val} / 2)`
      });

      addHistoryRecord("D3 Roll", `D3: ${d3Val} (D6: ${d6Val})`, "success");
      return;
    }

    let calculated = calculateAutoModifiers();
    let markerNet = (currentMode === 'injury' || currentMode === 'bloodbath') ? (spentBlessing + spentBlood) : (spentBlessing - spentBlood);
    let finalNetDice = calculated.netDice + markerNet;
    let baseCount = calculated.baseCount;

    let diceToRoll = [];
    let totalPoolSize = baseCount + Math.abs(finalNetDice);
    for (let i = 0; i < totalPoolSize; i++) {
      diceToRoll.push(Math.floor(Math.random() * 6) + 1);
    }

    let indexedDice = diceToRoll.map((val, idx) => ({ val, idx }));
    let pickedIndices = [];

    if (finalNetDice > 0) {
      indexedDice.sort((a, b) => b.val - a.val);
      pickedIndices = indexedDice.slice(0, baseCount).map(item => item.idx);
    } else if (finalNetDice < 0) {
      indexedDice.sort((a, b) => a.val - b.val);
      pickedIndices = indexedDice.slice(0, baseCount).map(item => item.idx);
    } else {
      pickedIndices = indexedDice.map(item => item.idx);
    }

    renderDiceVisual(diceToRoll, pickedIndices, finalNetDice);

    let sumPicked = pickedIndices.reduce((acc, idx) => acc + diceToRoll[idx], 0);
    let finalTotal = sumPicked + flatMod - armourRating;
    let isNaturalCritical = (diceToRoll.length >= 2 && diceToRoll.filter(v => v === 6).length >= 2);

    if (currentMode === 'success') {
      let isRisky = chkRisky.checked;
      let status = 'failure';
      let title = 'FAILURE';
      let details = 'The roll failed to reach target number 7.';

      if (isNaturalCritical || finalTotal >= 12) {
        status = 'critical';
        title = 'CRITICAL SUCCESS!';
        details = 'Critical Success achieved! Target hit & +1 INJURY DICE added to Injury Roll.';
      } else if (finalTotal >= 7) {
        status = 'success';
        title = 'SUCCESS!';
        details = 'Task Succeeded (Target Number 7+ reached). Target Hit!';
      } else {
        status = 'failure';
        title = isRisky ? 'RISKY FAILURE (ACTIVATION ENDS)' : 'FAILURE';
        details = isRisky ? 'Risky Success Roll failed! Model Activation ENDS IMMEDIATELY.' : 'Shot/Action missed.';
      }

      showResultBanner({
        status,
        title,
        breakdown: `Final Total: ${finalTotal} (Picked Dice: ${sumPicked} ${flatMod >= 0 ? '+' : ''}${flatMod})`,
        details
      });

      addHistoryRecord(`Success (${isRisky ? 'Risky' : 'Std'})`, `Total: ${finalTotal} - ${title}`, status);

    } else if (currentMode === 'injury' || currentMode === 'bloodbath') {
      let status = 'failure';
      let title = 'NO EFFECT';
      let details = 'The model is unharmed and the injury has no effect.';

      if (finalTotal >= 7) {
        status = 'critical';
        title = 'OUT OF ACTION!';
        details = 'The model is incapacitated or killed and removed from play!';
      } else if (finalTotal >= 2) {
        status = 'success';
        title = 'DOWN!';
        details = 'Model knocked DOWN! Activation ends if active, 1/2 move on stand up, -1 DICE on rolls.';
      } else {
        status = 'failure';
        title = 'NO EFFECT';
        details = 'Model is unharmed by the attack/fall.';
      }

      showResultBanner({
        status,
        title,
        breakdown: `Injury Score: ${finalTotal} (Dice: ${sumPicked} ${flatMod >= 0 ? '+' : ''}${flatMod} ${armourRating > 0 ? '- Armour ' + armourRating : ''})`,
        details
      });

      addHistoryRecord(currentMode === 'bloodbath' ? 'Bloodbath' : 'Injury', `Score: ${finalTotal} → ${title}`, status);

    } else if (currentMode === 'morale') {
      let status = 'failure';
      let title = 'WARBAND SHAKEN!';
      let details = 'Morale Check failed! Warband is now SHAKEN (all rolls become Risky).';

      if (finalTotal >= 7) {
        status = 'success';
        title = 'MORALE HELD!';
        details = 'Morale Check succeeded! Warband maintains discipline.';
      }

      showResultBanner({
        status,
        title,
        breakdown: `Morale Total: ${finalTotal} (Picked Dice: ${sumPicked})`,
        details
      });

      addHistoryRecord("Morale Check", `Total: ${finalTotal} - ${title}`, status);
    }
  }

  function renderDiceVisual(diceValues, pickedIndices, netDice) {
    diceArena.innerHTML = '';
    diceValues.forEach((val, idx) => {
      let dieEl = document.createElement('div');
      dieEl.className = 'die rolling';
      dieEl.textContent = val;
      
      setTimeout(() => {
        dieEl.classList.remove('rolling');
        if (pickedIndices.includes(idx)) {
          if (netDice > 0) dieEl.classList.add('picked-highest');
          else if (netDice < 0) dieEl.classList.add('picked-lowest');
          else dieEl.classList.add('picked-highest');
        } else {
          dieEl.classList.add('dropped');
        }
      }, 300);

      diceArena.appendChild(dieEl);
    });
  }

  function showResultBanner({ status, title, breakdown, details }) {
    resultBanner.className = `result-banner banner-${status}`;
    resultTitle.textContent = title;
    resultBreakdown.textContent = breakdown;
    resultDetails.textContent = details;
    resultBanner.classList.remove('hidden');
  }

  function addHistoryRecord(modeLabel, summary, statusClass) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <span class="history-item-mode">[${timeStr}] ${modeLabel}</span>
      <span class="history-item-result ${statusClass}">${summary}</span>
    `;

    if (historyList.querySelector('.empty-history')) {
      historyList.innerHTML = '';
    }
    historyList.insertBefore(item, historyList.firstChild);
  }

  btnClearHistory.addEventListener('click', () => {
    historyList.innerHTML = '<div class="empty-history">NO ENGAGEMENTS RECORDED IN CURRENT SESSION.</div>';
  });

  // Initial UI Render
  updateCounters();
  updateModeUI();
});
