/* Master Keyword Rules Codex Dictionary with Explicit PASSIVE vs ACTIVATED Classification across All Units, Subfactions, and Equipment */
const masterCodex = {

    "LEFT-HAND PATH": {
      cat: "Goetic Spell",
      desc: "GOETIC (2): When taking a Move, Charge, or Dash ACTION into terrain, spellcaster can teleport to any other terrain piece >1" from enemies.",
      impact: "Terrain Teleport Redeployment"
    },
    "SHADOW WALKER": {
      cat: "Goetic Spell",
      desc: "GOETIC (2): Cast before taking a Retreat ACTION. Prevents enemy free melee attacks during retreat.",
      impact: "Safe Retreat • No Free Enemy Hits"
    },
    "POISON STINGERS": {
      cat: "Locust Attack",
      desc: "Melee attack with CLEAVE 2 and SHRAPNEL keywords even when unarmed.",
      impact: "Cleave 2 & Shrapnel Melee Strike"
    },
    "INFERNAL IRON ARMOUR": {
      cat: "Demonic Armour",
      desc: "Applies a flat -2 penalty to all incoming Injury rolls, even against attacks that ignore armour.",
      impact: "Flat -2 Injury Penalty (Applies vs Armor Ignore)"
    },
    "AURA OF SLOTH": {
      cat: "Demonic Sin Aura",
      desc: "Enemy models within 8 inches treat Minor Hit results as Down results.",
      impact: "8" Aura: Minor Hits become Down Tokens"
    },

  // =========================================================================
  // ACTIVATED ABILITIES & ACTIONS (Costs 1 Action or Requires Manual Activation)
  // =========================================================================
  "COMMANDER": { type: "activated", cat: "Warband Leadership", desc: "Model is an official Warband Commander. Can spend 1 Action to issue a Command Order granting +1 Blessing or Aura boost to allies.", impact: "⚡ Activated: +1 Activation Die • Command Order Action" },
  "DEADEYE AIM": { type: "activated", cat: "Specialist Action", desc: "Spends 1 Action to perform a precision AIM action, granting +2 to hit rolls on the subsequent Ranged attack.", impact: "⚡ Activated: +2 Hit Modifier when Aiming (Costs 1 Action)" },
  "DIVINE GUIDANCE": { type: "activated", cat: "Miracle Ability", desc: "Spends 1 Action to invoke a holy miracle, granting +1 Blessing Marker or 1x Re-roll for your warband.", impact: "⚡ Activated: +1 Blessing Marker / Re-roll (Costs 1 Action)" },
  "FIELD SURGEON": { type: "activated", cat: "Medic Action", desc: "Spends 1 Action to perform Treat Wounds on an adjacent wounded or Down allied model.", impact: "⚡ Activated: Heal 1 Wound on 4+ (Costs 1 Action)" },
  "TREAT WOUNDS": { type: "activated", cat: "Medic Action", desc: "Spends 1 Action to heal 1 Wound on an adjacent allied model on a 4+ roll.", impact: "⚡ Activated: Heal 1 Wound on 4+ (Costs 1 Action)" },
  "INFILTRATOR": { type: "activated", cat: "Tactical Deployment", desc: "Special deployment action allowing forward positioning outside 9 inches of enemy deployment zones during battle setup.", impact: "⚡ Activated: Forward Deployment >9\"" },
  "DARK BLESSINGS": { type: "activated", cat: "Heretic Leadership", desc: "Spends 1 Action to channel unholy blessings from the Pit, adding +1 Blood Marker to your pool.", impact: "⚡ Activated: +1 Blood Marker Pool (Costs 1 Action)" },
  "PROPHECY OF DOOM": { type: "activated", cat: "Trench Pilgrim Miracle", desc: "Spends 1 Action to utter a terrifying prophecy, forcing an enemy model within 12\" to make an immediate Courage test.", impact: "⚡ Activated: Force Enemy Courage Test (Costs 1 Action)" },
  "ALCHEMY ELIXIR": { type: "activated", cat: "Sultanate Specialist", desc: "Spends 1 Action to brew a quick alchemical stimulant, granting +2 Movement to an adjacent model for 1 turn.", impact: "⚡ Activated: +2\" Speed Boost to Ally (Costs 1 Action)" },
  "DEMO CHARGE": { type: "activated", cat: "Explosive Action", desc: "Spends 1 Action to place or throw a heavy explosive charge destroying trench walls and bunker structures.", impact: "⚡ Activated: Demolish Terrain Feature (Costs 1 Action)" },

  // =========================================================================
  // PASSIVE RULES & TRAITS (Always Active / Automatic Effect)
  // =========================================================================
  "SNIPER": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Model automatically ignores long-range hit penalties beyond 12 inches when firing sniper rifles.", impact: "🛡️ Passive: Always Ignores Range Penalties" },
  "TRENCH RAID": { type: "passive", cat: "Elite Passive Trait", desc: "Passive Trait: Model automatically gains +1 Attack die when charging across trench walls or sandbags.", impact: "🛡️ Passive: +1 Attack Die on Trench Charge" },
  "SHOCK TROOPER": { type: "passive", cat: "Specialist Passive Trait", desc: "Passive Trait: Model automatically ignores movement penalties in mud, barbed wire, and trench sludge.", impact: "🛡️ Passive: Always Ignores Difficult Terrain" },
  "LINE INFANTRY": { type: "passive", cat: "Trooper Passive Rule", desc: "Passive Rule: Standard line unit. Automatically gains +1 Courage when within 3 inches of allied Line Infantry.", impact: "🛡️ Passive: +1 Courage near Line Allies" },
  "GRIM DISCIPLINE": { type: "passive", cat: "Trooper Passive Rule", desc: "Passive Rule: Automatically grants 1 free re-roll on a failed Morale check once per battle.", impact: "🛡️ Passive: 1x Automatic Morale Re-roll" },
  "HEAVY CONSTRUCT": { type: "passive", cat: "Monstrous Unit Trait", desc: "Passive Trait: Giant construct with increased Wound capacity. Automatically immune to Knockdown & Down status.", impact: "🛡️ Passive: Knockdown & Down Immunity" },
  "BLACK GRAIL PLAGUE": { type: "passive", cat: "Unholy Passive Hazard", desc: "Passive Trait: Melee hits automatically inflict Contagion markers causing end-of-turn damage to enemies.", impact: "🛡️ Passive: Automatic Contagion on Melee Hit" },
  "REGENERATION": { type: "passive", cat: "Monster Passive Ability", desc: "Passive Trait: Automatically rolls at the start of each turn to heal 1 Wound on a 4+ roll.", impact: "🛡️ Passive: Start of Turn 4+ Heal" },
  "MARTYR": { type: "passive", cat: "Pilgrim Passive Trait", desc: "Passive Trait: When this model is taken Out of Action, all adjacent allies automatically gain +1 Courage and +1 Blessing.", impact: "🛡️ Passive: Death Blessing to Adjacent Allies" },
  "AZAB WARRIOR": { type: "passive", cat: "Sultanate Passive Rule", desc: "Passive Trait: Gains +1 Armour rating when standing inside cover terrain.", impact: "🛡️ Passive: +1 Armour in Cover" },
  "HEAVY": { type: "passive", cat: "Equipment Passive Restriction", desc: "Passive Restriction: Model cannot Move and Shoot in the same activation turn without setting up.", impact: "🛡️ Passive: No Move & Shoot in Same Turn" },
  "2-HANDED": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon requires both hands to operate. Model cannot equip a shield.", impact: "🛡️ Passive: Requires 2 Hands • No Shield" },
  "1-HANDED": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon operates in one hand. Compatible with a shield or secondary pistol.", impact: "🛡️ Passive: 1 Handed • Compatible with Shield" },
  "PARRY": { type: "passive", cat: "Defensive Passive Trait", desc: "Passive Trait: When defending in melee combat, enemy attacker is automatically forced to re-roll their highest hit die.", impact: "🛡️ Passive: Enemy Re-rolls Highest Hit Die" },
  "CLEAVE 1": { type: "passive", cat: "Armour Piercing Passive", desc: "Passive Trait: Automatically reduces enemy target's Armour rating by 1 point on hits.", impact: "🛡️ Passive: -1 Enemy Armour Rating" },
  "CLEAVE 2": { type: "passive", cat: "Armour Piercing Passive", desc: "Passive Trait: Automatically reduces enemy target's Armour rating by 2 points on hits.", impact: "🛡️ Passive: -2 Enemy Armour Rating" },
  "AUTOMATIC 2": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon automatically fires 2 shots during a single Shoot action.", impact: "🛡️ Passive: 2 Shots per Shoot Action" },
  "AUTOMATIC 3": { type: "passive", cat: "Weapon Passive Trait", desc: "Passive Trait: Weapon automatically fires 3 shots during a single Shoot action.", impact: "🛡️ Passive: 3 Shots per Shoot Action" },
  "BLAST 3\"": { type: "passive", cat: "Area Hazard Trait", desc: "Passive Trait: Explosive attack hits all models within a 3-inch blast radius circle.", impact: "🛡️ Passive: 3\" Blast Radius Area Effect" },
  "BLAST 5\"": { type: "passive", cat: "Area Hazard Trait", desc: "Passive Trait: Explosive attack hits all models within a 5-inch blast radius circle.", impact: "🛡️ Passive: 5\" Blast Radius Area Effect" },
  "GAS HAZARD": { type: "passive", cat: "Toxic Hazard Trait", desc: "Passive Trait: Creates a persistent toxic gas cloud zone on the target impact location.", impact: "🛡️ Passive: Persistent Mustard Gas Cloud" },
  "ARMOUR +1": { type: "passive", cat: "Defensive Passive Bonus", desc: "Passive Bonus: Automatically increases model's base Armour rating by +1.", impact: "🛡️ Passive: +1 Base Armour Rating" },
  "ARMOUR +2": { type: "passive", cat: "Defensive Passive Bonus", desc: "Passive Bonus: Automatically increases model's base Armour rating by +2.", impact: "🛡️ Passive: +2 Base Armour Rating" },
  "SHIELD": { type: "passive", cat: "Defensive Passive Item", desc: "Passive Bonus: Grants +1 Armour rating against frontal ranged attacks.", impact: "🛡️ Passive: +1 Frontal Ranged Armour" },
  "GAS IMMUNE": { type: "passive", cat: "Protection Passive Trait", desc: "Passive Trait: Model is completely immune to toxic gas hazard damage on the board.", impact: "🛡️ Passive: Complete Gas Immunity" },
  "GAS MASK": { type: "passive", cat: "Protection Equipment", desc: "Passive Item: Grants complete immunity to mustard gas hazards.", impact: "🛡️ Passive: Mustard Gas Immunity" }
};
