/* Trench Crusade - Full Art Warband Builder & Keyword Codex Engine v1.0.2 */

document.addEventListener('DOMContentLoaded', () => {
  // Master Keyword Rules Codex Dictionary
  window.masterCodex = window.masterCodex || {};
  Object.assign(window.masterCodex, {
    "COMMANDER": {
      cat: "Warband Leadership",
      desc: "Model is an official Warband Commander. Grants an additional Activation Die to your warband pool at the start of each turn and enables a command aura radius.",
      impact: "+1 Warband Activation Die • Command Aura"
    },
    "INHERENT LEADERSHIP": {
      cat: "Leader Ability",
      desc: "Allows model to execute Rally Warband action, removing Down tokens from nearby allies within 8 inches.",
      impact: "Rally Action • Remove Down Tokens"
    },
    "DEADEYE AIM": {
      cat: "Specialist Ability",
      desc: "When performing an AIM action, model gains +2 to hit rolls instead of the standard +1 modifier.",
      impact: "+2 Hit Modifier when Aiming"
    },
    "DIVINE GUIDANCE": {
      cat: "Miracle Ability",
      desc: "Once per battle, model can re-roll a failed Success Roll or Risky Activation Test.",
      impact: "1x Re-roll per battle"
    },
    "SNIPER": {
      cat: "Weapon Trait",
      desc: "Ignores long-range hit penalties beyond 12 inches. May target specific enemy models regardless of target priority rules.",
      impact: "Ignore Range Penalties • Precise Targeting"
    },
    "TRENCH RAID": {
      cat: "Elite Trait",
      desc: "Model gains +1 Attack die when charging across trench walls or barricades into close combat.",
      impact: "+1 Attack Die on Trench Charge"
    },
    "SHOCK TROOPER": {
      cat: "Specialist Trait",
      desc: "Model ignores movement penalties when moving through mud, barbed wire, and difficult trench terrain.",
      impact: "Ignore Difficult Terrain Penalties"
    },
    "LINE INFANTRY": {
      cat: "Trooper Rule",
      desc: "Standard line unit forming the backbone of the warband. Gains +1 Courage when within 3 inches of another Line Infantry model.",
      impact: "+1 Courage near Line Allies"
    },
    "GRIM DISCIPLINE": {
      cat: "Trooper Rule",
      desc: "Model may re-roll a failed Morale check once per battle.",
      impact: "1x Morale Re-roll"
    },
    "FIELD SURGEON": {
      cat: "Medic Ability",
      desc: "Model can perform Treat Wounds action on adjacent wounded or Down allies to restore Wounds.",
      impact: "Treat Wounds Action • Heal Allies"
    },
    "TREAT WOUNDS": {
      cat: "Special Action",
      desc: "Action: Remove 1 Down token or heal 1 Wound on an adjacent allied model on a 4+ roll.",
      impact: "Heal 1 Wound on 4+"
    },
    "MEDIC": {
      cat: "Support Role",
      desc: "Carries medical supplies to heal wounded personnel in combat.",
      impact: "Enables Medic Actions"
    },
    "HOLY FERVOUR": {
      cat: "Miracle Aura",
      desc: "Allied models within 6 inches gain +1 to Courage checks and immunity to Fear.",
      impact: "+1 Courage Aura • Fear Immunity"
    },
    "ZEALOT": {
      cat: "Trooper Ability",
      desc: "Gains +1 Courage on Morale checks while contesting objective markers.",
      impact: "+1 Courage near Objectives"
    },
    "HEAVY CONSTRUCT": {
      cat: "Monstrous Unit",
      desc: "Giant construct with increased Wound capacity. Immune to normal Knockdown effects from small arms.",
      impact: "Knockdown Immunity • Heavy Unit"
    },
    "MONSTROUS STRENGTH": {
      cat: "Monster Ability",
      desc: "Deals +1 extra Injury roll modifier on successful melee hits.",
      impact: "+1 Melee Injury Modifier"
    },
    "BLOOD SACRIFICE": {
      cat: "Blood Rite",
      desc: "When model suffers a Wound, warband gains +1 Blood Marker to spend on dice roll auto-calculators.",
      impact: "+1 Blood Marker on Wound"
    },
    "FANATIC": {
      cat: "Trooper Trait",
      desc: "Ignores Pinning and Down test penalties when charging.",
      impact: "Ignore Pinning on Charge"
    },
    "MARTYRDOM": {
      cat: "Pilgrim Trait",
      desc: "When model is taken Out of Action, adjacent allies gain +1 Courage for remainder of game.",
      impact: "Allied Courage Bonus on Death"
    },
    "SUICIDE BLAST": {
      cat: "Penitent Trait",
      desc: "When model perishes or triggers its explosive cross, it explodes dealing 4D6 Bloodbath damage to all models within 3 inches.",
      impact: "4D6 Explosive Blast on Death"
    },
    "UNFLINCHING": {
      cat: "Mental Discipline",
      desc: "Model never retreats or flees from enemy charges.",
      impact: "Never Flees"
    },
    "PENITENT": {
      cat: "Faction Category",
      desc: "Penitent squad member undergoing holy ritual flagellation.",
      impact: "Penitent Status"
    },
    "FIRE IMMUNE": {
      cat: "Alchemical Resistance",
      desc: "Model takes 0 damage from flamethrower attacks, incendiary hazards, and fire effects.",
      impact: "Zero Incendiary Damage"
    },
    "ALCHEMY MASTER": {
      cat: "Alchemist Ability",
      desc: "Can modify flamethrower blast ranges by +2 inches.",
      impact: "+2 Inch Flamethrower Range"
    },
    "CLOCKWORK CONSTRUCT": {
      cat: "Automaton Trait",
      desc: "Automaton model is completely immune to Morale checks, Fear, and Gas hazards.",
      impact: "Morale & Gas Immunity"
    },
    "RAZOR CLAWS": {
      cat: "Beast Melee",
      desc: "Melee strikes have CLEAVE 1 armor-piercing trait.",
      impact: "Cleave 1 Melee Attack"
    },
    "TERROR": {
      cat: "Psychological Trait",
      desc: "Enemy models charging this unit must pass a Courage test or freeze in place.",
      impact: "Requires Courage Test to Charge"
    },
    "IRON DISCIPLINE": {
      cat: "Sultanate Trait",
      desc: "Gains +1 Armour rating while in full cover.",
      impact: "+1 Armour in Cover"
    },
    "MARKSMAN": {
      cat: "Shooting Ability",
      desc: "May re-roll 1 failed hit die per shooting action.",
      impact: "1x Hit Re-roll on Shoot"
    },
    "ARMOUR-CLAD": {
      cat: "Defensive Trait",
      desc: "Model wears heavy plate armor reducing incoming damage.",
      impact: "Heavy Armor Rating"
    },
    "DARK BLESSINGS": {
      cat: "Heretic Miracle",
      desc: "Can bestow unholy blessings on allied units granting +1 Attack die.",
      impact: "+1 Attack Blessing Aura"
    },
    "SACRIFICIAL RITE": {
      cat: "Heretic Spell",
      desc: "Sacrifices an adjacent friendly trooper model to immediately heal 2 Wounds.",
      impact: "Sacrifice Ally to Heal 2 Wounding"
    },
    "INFILTRATOR": {
      cat: "Tactical Deployment",
      desc: "Model may deploy anywhere on the battlefield outside 9 inches of enemy deployment zones.",
      impact: "Forward Deployment anywhere >9\""
    },
    "STEALTH": {
      cat: "Infiltrator Trait",
      desc: "Enemies cannot target this model beyond 12 inches unless illuminated.",
      impact: "Stealth >12\" Target Immunity"
    },
    "POISON BLADES": {
      cat: "Melee Trait",
      desc: "Melee hits inflict Poison status causing 1 extra Wound on end of turn on a 4+.",
      impact: "Inflicts End-of-Turn Poison"
    },
    "BLACK GRAIL PLAGUE": {
      cat: "Unholy Hazard",
      desc: "Enemy models taking wounds in close combat gain Contagion markers that inflict end-of-turn damage.",
      impact: "Contagion Wounds in Combat"
    },
    "REGENERATION": {
      cat: "Plague Monster Ability",
      desc: "Heals 1 Wound at the start of each turn on a 4+ roll.",
      impact: "Heal 1 Wound on 4+ Turn Start"
    },
    "DISEASE AURA": {
      cat: "Plague Aura",
      desc: "All models ending turn within 2 inches must roll a 5+ or take 1 Gas Wound.",
      impact: "2\" Toxic Gas Aura"
    },
    "HEAVY": {
      cat: "Equipment Restriction",
      desc: "Model cannot Move and Shoot in the same activation without a setup action.",
      impact: "No Move & Shoot in same turn"
    },
    "GOETIC SORCERY": {
      cat: "Sorcerer Spell",
      desc: "Can cast offensive hellfire spells targeting enemies within 18 inches.",
      impact: "18\" Hellfire Magic Blast"
    },
    "VENOMOUS": {
      cat: "Serpent Trait",
      desc: "Attacks ignore armor on critical 6 rolls.",
      impact: "Ignores Armor on Crit 6"
    },
    "FLIGHT": {
      cat: "Movement Trait",
      desc: "Model flies over intervening models and terrain features without penalty.",
      impact: "Fly over Terrain & Units"
    },
    "RENDING LIMBS": {
      cat: "Monster Melee",
      desc: "Melee attacks have CLEAVE 2 armor piercing.",
      impact: "Cleave 2 Melee Piercing"
    },
    "POISON STINGER": {
      cat: "Beast Attack",
      desc: "Ranged attack targeting single unit dealing 1 Wound with no armor roll.",
      impact: "Direct Armor-Ignoring Sting"
    },
    "BEAST": {
      cat: "Support Unit",
      desc: "Non-humanoid animal helper. Cannot hold objectives or operate complex wargear.",
      impact: "Cannot Hold Objectives"
    },
    "FIRST AID": {
      cat: "Medic Trait",
      desc: "Can stabilize 1 Down allied model per turn.",
      impact: "Stabilize Down Model"
    },
    "TRENCH MEDIC": {
      cat: "Support Skill",
      desc: "Grants adjacent allies +1 to injury recovery rolls.",
      impact: "+1 Injury Recovery Bonus"
    },
    "2-HANDED": {
      cat: "Weapon Trait",
      desc: "Requires both hands to operate. Cannot be paired with a shield or secondary melee weapon.",
      impact: "Requires 2 Hands • No Shield"
    },
    "1-HANDED": {
      cat: "Weapon Trait",
      desc: "Operated using one hand. Can be paired with a shield or secondary weapon.",
      impact: "1 Handed • Compatible with Shield"
    },
    "RANGED 24\"": {
      cat: "Range Characteristic",
      desc: "Maximum effective shooting range of 24 inches.",
      impact: "24 Inch Shoot Range"
    },
    "RANGED 36\"": {
      cat: "Range Characteristic",
      desc: "Maximum effective shooting range of 36 inches.",
      impact: "36 Inch Shoot Range"
    },
    "MELEE STRIKE": {
      cat: "Melee Characteristic",
      desc: "Standard melee weapon strike in close combat.",
      impact: "Close Combat Strike"
    },
    "PARRY": {
      cat: "Defensive Trait",
      desc: "When defending in close combat, enemy model must re-roll their highest successful hit die.",
      impact: "Enemy Re-rolls Highest Hit Die"
    },
    "CLEAVE 1": {
      cat: "Armour Piercing",
      desc: "Reduces enemy model's Armour rating by 1 when calculating injury rolls.",
      impact: "-1 Enemy Armour Rating"
    },
    "AUTOMATIC 2": {
      cat: "Weapon Trait",
      desc: "Fires 2 shots during a single Shoot action.",
      impact: "2 Shots per Shoot Action"
    },
    "AUTOMATIC 3": {
      cat: "Weapon Trait",
      desc: "Fires 3 shots during a single Shoot action.",
      impact: "3 Shots per Shoot Action"
    },
    "ASSAULT": {
      cat: "Weapon Trait",
      desc: "Model may Move and Shoot this weapon with no hit penalty.",
      impact: "No Penalty on Move & Shoot"
    },
    "CLOSE-QUARTERS": {
      cat: "Weapon Trait",
      desc: "Gains +1 to hit rolls when shooting targets within 6 inches.",
      impact: "+1 Hit <=6 Inches"
    },
    "SPREAD SHOT": {
      cat: "Shotgun Trait",
      desc: "Gains +1 extra die when targeting groups of models.",
      impact: "+1 Die vs Clustered Targets"
    },
    "SUPPRESSIVE": {
      cat: "Heavy Weapon Trait",
      desc: "Target unit must take a Pinning check when hit.",
      impact: "Forces Enemy Pinning Check"
    },
    "BLAST 3": {
      cat: "Explosive Trait",
      desc: "Creates a 3-inch blast area of effect. All models under template take hit.",
      impact: "3\" Blast Area Template"
    },
    "BLAST 4": {
      cat: "Explosive Trait",
      desc: "Creates a 4-inch blast area of effect. All models under template take hit.",
      impact: "4\" Blast Area Template"
    },
    "INCENDIARY": {
      cat: "Elemental Hazard",
      desc: "Targets hit gain Burning markers and take continuous damage at the start of each activation.",
      impact: "Inflicts Burning Markers"
    },
    "FIRE HAZARD": {
      cat: "Environmental Hazard",
      desc: "Ignites terrain in a 3-inch area, dealing fire damage to any unit entering.",
      impact: "Ignites 3\" Terrain Area"
    },
    "GAS HAZARD": {
      cat: "Toxic Hazard",
      desc: "Creates a poisonous gas cloud. Unprotected models take automatic hits ignoring armor.",
      impact: "Poison Gas Area • Ignores Armor"
    },
    "IGNORE COVER": {
      cat: "Shooting Trait",
      desc: "Target receives no Cover armor bonus against this attack.",
      impact: "Ignores Target Cover Bonus"
    },
    "BLOODBATH 4D6": {
      cat: "Explosive Trait",
      desc: "Rolls 4D6 sum-all for damage calculation instead of standard 2D6.",
      impact: "4D6 Massive Damage Roll"
    },
    "GAS IMMUNE": {
      cat: "Protection Trait",
      desc: "Model wears protective gear or has altered physiology rendering it completely immune to gas hazards.",
      impact: "Complete Gas Immunity"
    },
    "ARMOUR +1": {
      cat: "Defensive Bonus",
      desc: "Increases model's base Armour rating by +1, reducing incoming injury roll damage.",
      impact: "+1 Armour Rating"
    },
    "ARMOUR +2": {
      cat: "Defensive Bonus",
      desc: "Increases model's base Armour rating by +2, reducing incoming injury roll damage.",
      impact: "+2 Armour Rating"
    },
    "SHIELD": {
      cat: "Defensive Gear",
      desc: "Provides +1 Armour rating against frontal attacks and enables Parry action.",
      impact: "+1 Frontal Armour & Parry"
    },
    "FRONTAL ARMOUR +1": {
      cat: "Defensive Gear",
      desc: "Adds +1 Armour rating against frontal attacks.",
      impact: "+1 Frontal Armour"
    }
  });
  const masterCodex = window.masterCodex;

  // Master Unit Database Catalog
  
  // Official Subfactions & Faction Special Rules Registry
  
  // Official Subfactions & Faction Special Rules Registry
  
  // Official Subfactions & Faction Special Rules Registry
  const masterSubfactions = {
  "new_antioch": [
  {
    "id": "na_standard",
    "name": "Principality Line Force (Combined Arms)",
    "rule": "Combined Arms: Reroll 1 failed Initiative tie-breaker per battle."
  },
  {
    "id": "na_papal",
    "name": "Papal States Intervention Force",
    "rule": "Holy Order: Papal Guards gain +1 Courage near Officers. Access to Swiss Guard and Supreme Blessing."
  },
  {
    "id": "na_eire",
    "name": "Eire Rangers",
    "rule": "Emerald Sharpshooters: Ranged attacks ignore target cover bonuses beyond 12\". Led by Eire Lieutenant."
  },
  {
    "id": "na_prussia",
    "name": "Stosstruppen of Prussia",
    "rule": "Infiltration Tactics: Stosstruppen gain +1 Attack die on Trench Charges."
  },
  {
    "id": "na_alba",
    "name": "Kingdom of Alba Assault Detatchment",
    "rule": "Highland Charge: Greatswords deal +1 Injury roll modifier on Charges. Led by Highland Lieutenant."
  },
  {
    "id": "na_abyssinia",
    "name": "Expeditionary Forces of Abyssinia",
    "rule": "Lion of Judah: Abyssinian Mechanized Infantry gain +1 Wounds and heavy plate."
  },
  {
    "id": "na_red_brigade",
    "name": "The Red Brigade",
    "rule": "Close Quarters Blood Assault: Shotguns and SMGs gain +1 to hit within 6\"."
  }
],
  "trench_pilgrims": [
  {
    "id": "tp_standard",
    "name": "Trench Pilgrims Standard Procession",
    "rule": "Martyrdom & Iron Capirote: +1 Courage when a friendly model dies. Iron capirote ignores Fear."
  },
  {
    "id": "tp_sacred_affliction",
    "name": "Procession of the Sacred Affliction",
    "rule": "Reliquary Armoury & Punishing Millstones: Holy Icon Shields & Armour cost 20D/30D without ELITE restriction. Ecclesiastic Prisoners tethered to heavy millstones for crushing charge impact."
  },
  {
    "id": "tp_tenth_plague",
    "name": "Cavalcade of the Tenth Plague",
    "rule": "Swarm of Locusts: Communicant Anti-Tank Hunters and Plague Scourges."
  },
  {
    "id": "tp_saint_methodius",
    "name": "War Pilgrimage of Saint Methodius",
    "rule": "Order of Saint Methodius: Anchorite Shrines & Stigmatic Nuns with holy iron flails."
  }
],
  "iron_sultanate": [
  {
    "id": "is_standard",
    "name": "Iron Sultanate Standard Force",
    "rule": "Sultan's Favor: Reroll 1 failed Initiative tie-breaker. Access to Jabirean Alchemists, Janissaries & Azebs."
  },
  {
    "id": "is_fidai",
    "name": "Fidai of Alamut (Cabal of Assassins)",
    "rule": "Silent Assassination: Must be led by Master Assassin (+2 hit vs Leaders, TOUGH). Azebs upgraded to Infiltrator Acolytes."
  },
  {
    "id": "is_wisdom",
    "name": "House of Wisdom",
    "rule": "Takwin Mechanical Marvels: Golems, Homunculi, Brazen Bulls, and Sipahi Automaton Cavalry ignore Pinning & Fear."
  },
  {
    "id": "is_defenders",
    "name": "Defenders of the Iron Wall",
    "rule": "Fortress Discipline: Sappers, Wall Guards, and Janissaries gain +1 Armour while in Trench Cover. Access to Siege Jezails."
  }
],
  "heretic_legions": [
  {
    "id": "UNIT_HL_PRIEST",
    "name": "Heretic Priest",
    "cat": "Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/heretic_priest.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "INFERNAL ZEAL",
      "DARK GOSPEL"
    ],
    "equip": [
      "Heretic Pistol",
      "Trench Sword"
    ]
  },
  {
    "id": "UNIT_HL_RAIDER_CAPT",
    "name": "Naval Raider High Captain",
    "cat": "Subfaction Leader",
    "cost": 80,
    "max": 1,
    "isLeader": true,
    "img": "images/heretic_naval_raider.jpg",
    "fullStats": "MOVE: 7\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "UNSEEN ADVANCE",
      "BOARDING TACTICS"
    ],
    "equip": [
      "Boarding Shotgun",
      "Cutlass"
    ]
  },
  {
    "id": "UNIT_HL_WARLOCK",
    "name": "Goetic Warlock",
    "cat": "Specialist Caster",
    "cost": 65,
    "max": 2,
    "isLeader": false,
    "img": "images/goetic_warlock.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "HELLFIRE WAND"
    ],
    "equip": [
      "Hellfire Wand",
      "Demon Talisman"
    ]
  },
  {
    "id": "UNIT_HL_ANOINTED",
    "name": "Anointed Champion / Heavy Trooper",
    "cat": "Elite Heavy",
    "cost": 80,
    "max": 3,
    "isLeader": false,
    "img": "images/anointed_champion.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "HEAVY PLATE",
      "STRONG",
      "PARRY"
    ],
    "equip": [
      "Heavy Greatsword",
      "Hell Plate"
    ]
  },
  {
    "id": "UNIT_HL_KNIGHT_AVARICE",
    "name": "Knight of Avarice",
    "cat": "Subfaction Elite",
    "cost": 75,
    "max": 2,
    "isLeader": false,
    "img": "images/knight_of_avarice.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "MAMMON'S CHOSEN",
      "PARRY",
      "GILDED ARMOUR"
    ],
    "equip": [
      "Gilded Heavy Shotgun",
      "Coin Hammer"
    ]
  },
  {
    "id": "UNIT_HL_TRENCH_GHOST",
    "name": "Trench Ghost",
    "cat": "Subfaction Elite",
    "cost": 65,
    "max": 3,
    "isLeader": false,
    "img": "images/trench_ghost.jpg",
    "fullStats": "MOVE: 7\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 9+",
    "baseKeywords": [
      "ETHEREAL TERROR",
      "TRENCH RAID",
      "UNDEAD"
    ],
    "equip": [
      "Ghost Cutlass",
      "Gas Mask"
    ]
  },
  {
    "id": "UNIT_HL_BANSHEE",
    "name": "Barped Wire Banshee",
    "cat": "Subfaction Specialist",
    "cost": 60,
    "max": 1,
    "isLeader": false,
    "img": "images/barbed_wire_banshee.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +0 | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 9+",
    "baseKeywords": [
      "BARBED WIRE BANSHEE",
      "ETHEREAL TERROR"
    ],
    "equip": [
      "Entangling Barbed Wire"
    ]
  },
  {
    "id": "UNIT_HL_TROOPER",
    "name": "Heretic Trooper",
    "cat": "Trooper",
    "cost": 30,
    "max": 12,
    "isLeader": false,
    "img": "images/heretic_trooper.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "LINE INFANTRY",
      "FANATIC"
    ],
    "equip": [
      "Bolt-Action Rifle",
      "Trench Knife"
    ]
  },
  {
    "id": "UNIT_HL_YOKE_FIEND",
    "name": "Yoke Fiend",
    "cat": "Beast",
    "cost": 40,
    "max": 3,
    "isLeader": false,
    "img": "images/yoke_fiend.jpg",
    "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "RENDING LIMBS"
    ],
    "equip": [
      "Barbed Chains"
    ]
  },
  {
    "id": "UNIT_HL_HOUND_ABADDON",
    "name": "Hound of Abaddon",
    "cat": "Beast",
    "cost": 35,
    "max": 4,
    "isLeader": false,
    "img": "images/hound_of_abaddon.jpg",
    "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "HELLFIRE BITE"
    ],
    "equip": [
      "Hellfire Fangs"
    ]
  },
  {
    "id": "UNIT_HL_THRALL",
    "name": "Wretched Thrall",
    "cat": "Chaff Trooper",
    "cost": 15,
    "max": 20,
    "isLeader": false,
    "img": "images/wretched_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
    "baseKeywords": [
      "LINE INFANTRY"
    ],
    "equip": [
      "Rusty Blade"
    ]
  }
],
  "cult_black_grail": [
  {
    "id": "UNIT_CBG_LORD_TUMORS",
    "name": "Lord of Tumors",
    "cat": "Leader",
    "cost": 85,
    "max": 1,
    "isLeader": true,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "BLACK GRAIL PLAGUE",
      "REGENERATION",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Scythe of Pestilence"
    ]
  },
  {
    "id": "UNIT_CBG_EXECUTOR",
    "name": "The Executor (Dirge Commander)",
    "cat": "Subfaction Leader",
    "cost": 80,
    "max": 1,
    "isLeader": true,
    "img": "images/plague_knight.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "TOUGH",
      "THE EXECUTOR",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Executioner Greatsword",
      "Plague Pistol"
    ]
  },
  {
    "id": "UNIT_CBG_GREAT_MAW",
    "name": "Great Maw (Hunger Commander)",
    "cat": "Subfaction Leader",
    "cost": 90,
    "max": 1,
    "isLeader": true,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "RAVENOUS CHARGE",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Great Maw Jaws"
    ]
  },
  {
    "id": "UNIT_CBG_HERALD",
    "name": "Herald of Beelzebub",
    "cat": "Specialist Caster",
    "cost": 75,
    "max": 1,
    "isLeader": false,
    "img": "images/herald_of_beelzebub.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "FLIGHT",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Herald Horn of Pestilence"
    ]
  },
  {
    "id": "UNIT_CBG_PLAGUE_KNIGHT",
    "name": "Plague Knight",
    "cat": "Elite",
    "cost": 70,
    "max": 3,
    "isLeader": false,
    "img": "images/plague_knight.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "ORDER OF THE FLY",
      "ARMOUR +2",
      "REGENERATION"
    ],
    "equip": [
      "Plague Greatsword"
    ]
  },
  {
    "id": "UNIT_CBG_CORPSE_GUARD",
    "name": "Corpse Guard",
    "cat": "Elite Guard",
    "cost": 65,
    "max": 4,
    "isLeader": false,
    "img": "images/corpse_guard.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "ARMOUR +2",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Plague Shield",
      "Corpse Halberd"
    ]
  },
  {
    "id": "UNIT_CBG_GRAIL_THRALL",
    "name": "Grail Thrall",
    "cat": "Trooper",
    "cost": 20,
    "max": 15,
    "isLeader": false,
    "img": "images/grail_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "INFECTION MARKERS",
      "PLAGUE CONTAINER"
    ],
    "equip": [
      "Rotting Cleaver"
    ]
  },
  {
    "id": "UNIT_CBG_HOUNDS",
    "name": "Hounds of the Black Grail",
    "cat": "Beast",
    "cost": 30,
    "max": 4,
    "isLeader": false,
    "img": "images/trench_dog.jpg",
    "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Contagion Fangs"
    ]
  },
  {
    "id": "UNIT_CBG_HELL_TICK",
    "name": "Hell Tick",
    "cat": "Swarm Beast",
    "cost": 25,
    "max": 6,
    "isLeader": false,
    "img": "images/yoke_fiend.jpg",
    "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "BEAST",
      "PARASITIC INFECTION"
    ],
    "equip": [
      "Parasitic Mandibles"
    ]
  },
  {
    "id": "UNIT_CBG_BEAST_NOMAN",
    "name": "Beast of No Man's Land",
    "cat": "Heavy Monster",
    "cost": 115,
    "max": 1,
    "isLeader": false,
    "img": "images/beast_of_no_mans_land.jpg",
    "fullStats": "MOVE: 6\" | RANGED: -1 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 9+",
    "baseKeywords": [
      "HEAVY CONSTRUCT",
      "MONSTROUS STRENGTH",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Rending Plague Claws"
    ]
  },
  {
    "id": "UNIT_CBG_GREGORI_GULA",
    "name": "Gregori Gula",
    "cat": "Specialist Glutton",
    "cost": 65,
    "max": 1,
    "isLeader": false,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "REGENERATION",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Gluttonous Cleaver"
    ]
  }
],
  "court_serpent": [
  {
    "id": "UNIT_CS_PRAETOR",
    "name": "Praetor (Archdevil Commander)",
    "cat": "Leader",
    "cost": 85,
    "max": 1,
    "isLeader": true,
    "img": "images/praetor.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+",
    "baseKeywords": [
      "COMMANDER",
      "INFERNAL WAR COUNCIL",
      "AURA OF SIN"
    ],
    "equip": [
      "Archdevil Blade",
      "Hellfire Pistol"
    ]
  },
  {
    "id": "UNIT_CS_HELL_KNIGHT",
    "name": "Hell Knight",
    "cat": "Elite",
    "cost": 75,
    "max": 3,
    "isLeader": false,
    "img": "images/hell_knight.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "INFERNAL IRON ARMOUR",
      "PARRY",
      "STRONG"
    ],
    "equip": [
      "Hellish Greatsword",
      "Infernal Iron Armour"
    ]
  },
  {
    "id": "UNIT_CS_HUNTER_LEFT_HAND",
    "name": "Hunter of the Left-Hand Path",
    "cat": "Specialist Stalker",
    "cost": 70,
    "max": 2,
    "isLeader": false,
    "img": "images/hunter_left_hand.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "LEFT-HAND PATH",
      "SHADOW WALKER",
      "DEADEYE AIM"
    ],
    "equip": [
      "Bow of Lethe",
      "Stalker Dagger"
    ]
  },
  {
    "id": "UNIT_CS_SORCERER",
    "name": "Sorcerer",
    "cat": "Specialist Caster",
    "cost": 65,
    "max": 2,
    "isLeader": false,
    "img": "images/serpent_sorcerer.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "FLIGHT",
      "DIVINE GUIDANCE"
    ],
    "equip": [
      "Goetic Magic Staff"
    ]
  },
  {
    "id": "UNIT_CS_PIT_LOCUST",
    "name": "Pit Locust",
    "cat": "Flyer Beast",
    "cost": 50,
    "max": 3,
    "isLeader": false,
    "img": "images/pit_locust.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +0 | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FLIGHT",
      "POISON STINGERS",
      "CLEAVE 2"
    ],
    "equip": [
      "Crown of Hellfire",
      "Chitinous Stingers"
    ]
  },
  {
    "id": "UNIT_CS_DESECRATED_SAINT",
    "name": "Desecrated Saint",
    "cat": "Relic Heavy Monster",
    "cost": 105,
    "max": 1,
    "isLeader": false,
    "img": "images/desecrated_saint.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 10+",
    "baseKeywords": [
      "HEAVY CONSTRUCT",
      "AURA OF SLOTH",
      "MULTI-ARMED"
    ],
    "equip": [
      "Three 1-Handed Scythes"
    ]
  },
  {
    "id": "UNIT_CS_BIOLOGIST",
    "name": "Combat Biologist",
    "cat": "Specialist",
    "cost": 55,
    "max": 2,
    "isLeader": false,
    "img": "images/combat_biologist.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FIELD SURGEON",
      "GAS HAZARD"
    ],
    "equip": [
      "Vivisector",
      "Gas Mask",
      "Gas Grenades"
    ]
  },
  {
    "id": "UNIT_CS_WRETCHED",
    "name": "Wretched",
    "cat": "Trooper",
    "cost": 20,
    "max": 15,
    "isLeader": false,
    "img": "images/wretched_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
    "baseKeywords": [
      "LINE INFANTRY"
    ],
    "equip": [
      "Improvised Weapons"
    ]
  }
]
};

  const masterUnits = {
  "new_antioch": [
  {
    "id": "UNIT_NA_LIEUTENANT",
    "name": "Lieutenant of New Antioch",
    "cat": "Leader",
    "cost": 70,
    "max": 1,
    "isLeader": true,
    "img": "images/lieutenant_new_antioch.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "COMMANDER",
      "INHERENT LEADERSHIP"
    ],
    "equip": [
      "Automatic Pistol",
      "Trench Sword",
      "Body Armour"
    ]
  },
  {
    "id": "UNIT_NA_EIRE_LT",
    "name": "Eire Lieutenant",
    "cat": "Subfaction Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/eire_ranger.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "COMMANDER",
      "EMERALD SHARPSHOOTER"
    ],
    "equip": [
      "Scoped Rifle",
      "Trench Sword"
    ]
  },
  {
    "id": "UNIT_NA_ALBA_LT",
    "name": "Highland Lieutenant",
    "cat": "Subfaction Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/stosstruppen_veteran.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "HIGHLAND CHARGE"
    ],
    "equip": [
      "Highland Greatsword",
      "Pistol"
    ]
  },
  {
    "id": "UNIT_NA_SNIPER_PRIEST",
    "name": "Sniper Priest",
    "cat": "Specialist",
    "cost": 50,
    "max": 2,
    "isLeader": false,
    "img": "images/sniper_priest.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: -1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "DEADEYE AIM",
      "DIVINE GUIDANCE",
      "SNIPER"
    ],
    "equip": [
      "Bolt-Action Sniper Rifle"
    ]
  },
  {
    "id": "UNIT_NA_STOSSTRUPPEN",
    "name": "Stosstruppen of Prussia",
    "cat": "Elite",
    "cost": 60,
    "max": 4,
    "isLeader": false,
    "img": "images/stosstruppen_veteran.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "TRENCH RAID",
      "SHOCK TROOPER"
    ],
    "equip": [
      "Submachine Gun",
      "Trench Knife"
    ]
  },
  {
    "id": "UNIT_NA_ALBA_SHOCK",
    "name": "Highland Shocktrooper",
    "cat": "Elite",
    "cost": 65,
    "max": 4,
    "isLeader": false,
    "img": "images/stosstruppen_veteran.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +3 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "TRENCH RAID",
      "HIGHLAND CHARGE"
    ],
    "equip": [
      "Highland Claymore",
      "Trench Axe"
    ]
  },
  {
    "id": "UNIT_NA_ABYSSINIA_MECH",
    "name": "Abyssinian Mechanized Infantry",
    "cat": "Heavy Elite",
    "cost": 80,
    "max": 3,
    "isLeader": false,
    "img": "images/mechanized_infantry.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +2 | MELEE: +1 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 8+",
    "baseKeywords": [
      "HEAVY",
      "LION OF JUDAH",
      "ARMOUR +2"
    ],
    "equip": [
      "Abyssinian Heavy Rifle",
      "Heavy Plate"
    ]
  },
  {
    "id": "UNIT_NA_PAPAL_GUARD",
    "name": "Papal States Guard",
    "cat": "Elite Guard",
    "cost": 65,
    "max": 3,
    "isLeader": false,
    "img": "images/papal_states_guard.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 9+",
    "baseKeywords": [
      "SHIELD",
      "PARRY",
      "ARMOUR +2"
    ],
    "equip": [
      "Papal Halberd",
      "Trench Shield"
    ]
  },
  {
    "id": "UNIT_NA_ENGINEER",
    "name": "Combat Engineer",
    "cat": "Specialist",
    "cost": 50,
    "max": 2,
    "isLeader": false,
    "img": "images/combat_engineer.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "DEMOLITION",
      "WIRE CUTTER",
      "FLAMETHROWER"
    ],
    "equip": [
      "Trench Flamethrower",
      "Wire Cutters"
    ]
  },
  {
    "id": "UNIT_NA_TROOPER",
    "name": "Trench Trooper",
    "cat": "Trooper",
    "cost": 35,
    "max": 12,
    "isLeader": false,
    "img": "images/trench_trooper.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "LINE INFANTRY",
      "GRIM DISCIPLINE"
    ],
    "equip": [
      "Bolt-Action Rifle",
      "Trench Knife"
    ]
  },
  {
    "id": "UNIT_NA_DOCTOR",
    "name": "Trench Doctor (Medic)",
    "cat": "Specialist",
    "cost": 45,
    "max": 2,
    "isLeader": false,
    "img": "images/trench_doctor.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FIELD SURGEON",
      "TREAT WOUNDS",
      "MEDIC"
    ],
    "equip": [
      "Field Surgeon Kit"
    ]
  }
],
      "equip": [
        "Automatic Pistol",
        "Trench Sword",
        "Body Armour"
      ]
    },
    {
      "id": "UNIT_NA_EIRE_LT",
      "name": "Eire Lieutenant",
      "cat": "Subfaction Leader",
      "cost": 75,
      "max": 1,
      "isLeader": true,
      "img": "images/eire_ranger.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "COMMANDER",
        "EMERALD SHARPSHOOTER"
      ],
      "equip": [
        "Scoped Rifle",
        "Trench Sword"
      ]
    },
    {
      "id": "UNIT_NA_ALBA_LT",
      "name": "Highland Lieutenant",
      "cat": "Subfaction Leader",
      "cost": 75,
      "max": 1,
      "isLeader": true,
      "img": "images/stosstruppen_veteran.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
      "baseKeywords": [
        "COMMANDER",
        "HIGHLAND CHARGE"
      ],
      "equip": [
        "Highland Greatsword",
        "Pistol"
      ]
    },
    {
      "id": "UNIT_NA_SNIPER_PRIEST",
      "name": "Sniper Priest",
      "cat": "Specialist",
      "cost": 50,
      "max": 2,
      "isLeader": false,
      "img": "images/sniper_priest.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: -1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "DEADEYE AIM",
        "DIVINE GUIDANCE",
        "SNIPER"
      ],
      "equip": [
        "Bolt-Action Sniper Rifle"
      ]
    },
    {
      "id": "UNIT_NA_STOSSTRUPPEN",
      "name": "Stosstruppen of Prussia",
      "cat": "Elite",
      "cost": 60,
      "max": 4,
      "isLeader": false,
      "img": "images/stosstruppen_veteran.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
      "baseKeywords": [
        "TRENCH RAID",
        "SHOCK TROOPER"
      ],
      "equip": [
        "Submachine Gun",
        "Trench Knife"
      ]
    },
    {
      "id": "UNIT_NA_ALBA_SHOCK",
      "name": "Highland Shocktrooper",
      "cat": "Elite",
      "cost": 65,
      "max": 4,
      "isLeader": false,
      "img": "images/stosstruppen_veteran.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +3 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
      "baseKeywords": [
        "TRENCH RAID",
        "HIGHLAND CHARGE"
      ],
      "equip": [
        "Highland Claymore",
        "Trench Axe"
      ]
    },
    {
      "id": "UNIT_NA_ABYSSINIA_MECH",
      "name": "Abyssinian Mechanized Infantry",
      "cat": "Heavy Elite",
      "cost": 80,
      "max": 3,
      "isLeader": false,
      "img": "images/mechanized_infantry.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +2 | MELEE: +1 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 8+",
      "baseKeywords": [
        "HEAVY",
        "ARMOUR +2"
      ],
      "equip": [
        "Abyssinian Heavy Rifle",
        "Heavy Plate"
      ]
    },
    {
      "id": "UNIT_NA_PAPAL_GUARD",
      "name": "Papal States Guard",
      "cat": "Elite Guard",
      "cost": 65,
      "max": 3,
      "isLeader": false,
      "img": "images/papal_states_guard.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 9+",
      "baseKeywords": [
        "SHIELD",
        "PARRY",
        "ARMOUR +2"
      ],
      "equip": [
        "Papal Halberd",
        "Trench Shield"
      ]
    },
    {
      "id": "UNIT_NA_TROOPER",
      "name": "Trench Trooper",
      "cat": "Trooper",
      "cost": 35,
      "max": 12,
      "isLeader": false,
      "img": "images/trench_trooper.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "LINE INFANTRY",
        "GRIM DISCIPLINE"
      ],
      "equip": [
        "Bolt-Action Rifle",
        "Trench Knife"
      ]
    },
    {
      "id": "UNIT_NA_DOCTOR",
      "name": "Trench Doctor (Medic)",
      "cat": "Specialist",
      "cost": 45,
      "max": 2,
      "isLeader": false,
      "img": "images/combat_biologist.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "FIELD SURGEON",
        "TREAT WOUNDS",
        "MEDIC"
      ],
      "equip": [
        "Field Surgeon Kit"
      ]
    }
  ],
  "trench_pilgrims": [
  {
    "id": "UNIT_TP_WAR_PROPHET",
    "name": "War Prophet / Prophetess",
    "cat": "Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/war_prophet.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "DIVINE VISIONS",
      "HOLY INSPIRATION"
    ],
    "equip": [
      "Heavy War Cross",
      "Pistol"
    ]
  },
  {
    "id": "UNIT_TP_COMMUNICANT",
    "name": "Communicant Giant",
    "cat": "Monstrous Elite",
    "cost": 115,
    "max": 2,
    "isLeader": false,
    "img": "images/communicant_giant.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 9+",
    "baseKeywords": [
      "MONSTROUS",
      "HOLY BREAD RAGE",
      "UNSTOPPABLE"
    ],
    "equip": [
      "Giant Flail",
      "Sacred Chains"
    ]
  },
  {
    "id": "UNIT_TP_ANCHORITE",
    "name": "Anchorite Shrine",
    "cat": "Heavy Armor Construct",
    "cost": 130,
    "max": 1,
    "isLeader": false,
    "img": "images/anchorite_shrine.jpg",
    "fullStats": "MOVE: 4\" | RANGED: +2 | MELEE: +2 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+",
    "baseKeywords": [
      "WALKING SHRINE",
      "ARMOUR +3",
      "RELIC CANNON"
    ],
    "equip": [
      "Heavy Trench Gun",
      "Iron Relic Plate"
    ]
  },
  {
    "id": "UNIT_TP_MARTYR",
    "name": "Martyr-Penitent",
    "cat": "Specialist",
    "cost": 45,
    "max": 3,
    "isLeader": false,
    "img": "images/martyr_penitent.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 10+",
    "baseKeywords": [
      "UNDEAD ZEALOT",
      "NO PAIN",
      "EXPLOSIVE VEST"
    ],
    "equip": [
      "Penitent Scourge",
      "Explosive Harness"
    ]
  },
  {
    "id": "UNIT_TP_STIGMATIC_NUN",
    "name": "Stigmatic Nun",
    "cat": "Elite",
    "cost": 55,
    "max": 3,
    "isLeader": false,
    "img": "images/martyr_penitent.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "STIGMATA BLESSING",
      "HOLY RAGE"
    ],
    "equip": [
      "Blessed Sword",
      "Trench Pistol"
    ]
  },
  {
    "id": "UNIT_TP_CASTIGATOR",
    "name": "Castigator",
    "cat": "Specialist",
    "cost": 50,
    "max": 2,
    "isLeader": false,
    "img": "images/castigator.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "WHIP OF GOD",
      "INSTILL FEAR"
    ],
    "equip": [
      "Barbed Scourge",
      "Heavy Pistol"
    ]
  },
  {
    "id": "UNIT_TP_PRISONER",
    "name": "Ecclesiastic Prisoner",
    "cat": "Trooper",
    "cost": 25,
    "max": 6,
    "isLeader": false,
    "img": "images/martyr_penitent.jpg",
    "fullStats": "MOVE: 5\" | RANGED: - | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "EXPENDABLE",
      "PUNISHING MILLSTONES"
    ],
    "equip": [
      "Iron Chains",
      "Stone Millstone"
    ]
  },
  {
    "id": "UNIT_TP_PILGRIM",
    "name": "Trench Pilgrim",
    "cat": "Trooper",
    "cost": 30,
    "max": 12,
    "isLeader": false,
    "img": "images/trench_trooper.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "LINE INFANTRY",
      "IRON CAPIROTE"
    ],
    "equip": [
      "Musket",
      "Club"
    ]
  }
],
      "equip": [
        "Trench Shotgun"
      ]
    },
    {
      "id": "UNIT_TP_METHODIUS_PROPHET",
      "name": "War Prophet of Saint Methodius",
      "cat": "Subfaction Leader",
      "cost": 75,
      "max": 1,
      "isLeader": true,
      "img": "images/war_prophet.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 10+",
      "baseKeywords": [
        "COMMANDER",
        "METHODIUS BLESSING"
      ],
      "equip": [
        "Methodius Mace"
      ]
    },
    {
      "id": "UNIT_TP_STIGMATIC_NUN",
      "name": "Stigmatic Nun",
      "cat": "Subfaction Specialist",
      "cost": 50,
      "max": 3,
      "isLeader": false,
      "img": "images/martyr_penitent.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 9+",
      "baseKeywords": [
        "HOLY STIGMATA",
        "DIVINE GUIDANCE"
      ],
      "equip": [
        "Flagellant Whip"
      ]
    },
    {
      "id": "UNIT_TP_ANCHORITE_SHRINE",
      "name": "Anchorite Shrine",
      "cat": "Subfaction Heavy",
      "cost": 110,
      "max": 1,
      "isLeader": false,
      "img": "images/anchorite_shrine.jpg",
      "fullStats": "MOVE: 4\" | RANGED: +1 | MELEE: +3 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "METHODIUS BLESSING"
      ],
      "equip": [
        "Shrine Cannon"
      ]
    },
    {
      "id": "UNIT_TP_COMMUNICANT",
      "name": "Communicant Giant",
      "cat": "Heavy Elite",
      "cost": 100,
      "max": 1,
      "isLeader": false,
      "img": "images/communicant_giant.jpg",
      "fullStats": "MOVE: 6\" | RANGED: -1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 8+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "MONSTROUS STRENGTH"
      ],
      "equip": [
        "Greatsword"
      ]
    },
    {
      "id": "UNIT_TP_MARTYR",
      "name": "Martyr Penitent",
      "cat": "Trooper",
      "cost": 30,
      "max": 6,
      "isLeader": false,
      "img": "images/martyr_penitent.jpg",
      "fullStats": "MOVE: 6\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 10+",
      "baseKeywords": [
        "BLOOD SACRIFICE",
        "MARTYRDOM"
      ],
      "equip": [
        "Demo Charge"
      ]
    },
    {
      "id": "UNIT_TP_PILGRIM",
      "name": "Trench Pilgrim",
      "cat": "Trooper",
      "cost": 25,
      "max": 15,
      "isLeader": false,
      "img": "images/trench_pilgrim.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "ZEALOT",
        "LINE INFANTRY"
      ],
      "equip": [
        "Bolt-Action Rifle"
      ]
    }
  ],
  "iron_sultanate": [
  {
    "id": "UNIT_IS_ALCHEMIST",
    "name": "Jabirean Alchemist",
    "cat": "Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/jabirean_alchemist.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "COMMANDER",
      "GAS HAZARD",
      "GAS IMMUNE"
    ],
    "equip": [
      "Alchemical Flamethrower"
    ]
  },
  {
    "id": "UNIT_IS_YUZBASI",
    "name": "Yuzbasi Captain",
    "cat": "Leader",
    "cost": 80,
    "max": 1,
    "isLeader": true,
    "img": "images/yuzbasi_captain.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "SULTAN'S FAVOR",
      "TACTICAL COMMAND"
    ],
    "equip": [
      "Damascus Shamshir",
      "Heavy Pistol"
    ]
  },
  {
    "id": "UNIT_IS_FIDAI_MASTER",
    "name": "Master Assassin of Alamut",
    "cat": "Subfaction Leader",
    "cost": 95,
    "max": 1,
    "isLeader": true,
    "img": "images/fidai_assassin.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +2 | MELEE: +4 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "TOUGH",
      "SILENT ASSASSINATION"
    ],
    "equip": [
      "Dual Poison Daggers",
      "Throwing Blades"
    ]
  },
  {
    "id": "UNIT_IS_KAVASS"  { "id": "UNIT_IS_KAVASS", "name": "Kavass Guardian", "cat": "Subfaction Guard", "cost": 35, "max": 3, "isLeader": false, "img": "images/kavass_guardian.jpg", "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", "baseKeywords": ["KAVASS GUARDIANS", "ALCHEMICAL SHIELD"], "equip": ["Alchemical Halberd", "Brass Body Armour"] },
  { "id": "UNIT_IS_DERVISH"  { "id": "UNIT_IS_KAVASS"  { "id": "UNIT_IS_KAVASS", "name": "Kavass Guardian", "cat": "Subfaction Guard", "cost": 35, "max": 3, "isLeader": false, "img": "images/kavass_guardian.jpg", "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", "baseKeywords": ["KAVASS GUARDIANS", "ALCHEMICAL SHIELD"], "equip": ["Alchemical Halberd", "Brass Body Armour"] },
  { "id": "UNIT_IS_DERVISH", "name": "Isma'ili Dervish Monk", "cat": "Subfaction Skirmisher", "cost": 55, "max": 4, "isLeader": false, "img": "images/dervish_monk.jpg", "fullStats": "MOVE: 7\" | RANGED: +0 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 9+", "baseKeywords": ["WHIRLING DERVISH", "IGNORE OFF-HAND WEAPON"], "equip": ["Dual Curved Scimitars"] },
  { "id": "UNIT_IS_FIDAI_ACOLYTE",
    "name": "Fidai Assassin Acolyte",
    "cat": "Subfaction Elite",
    "cost": 65,
    "max": 3,
    "isLeader": false,
    "img": "images/fidai_assassin.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +1 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "INFILTRATOR",
      "SHOCK TROOPER",
      "VENOMOUS"
    ],
    "equip": [
      "Poison Dagger"
    ]
  },
  {
    "id": "UNIT_IS_SIPAHI",
    "name": "Sipahi Automaton Cavalry",
    "cat": "Subfaction Construct",
    "cost": 90,
    "max": 2,
    "isLeader": false,
    "img": "images/sipahi_automaton.jpg",
    "fullStats": "MOVE: 9\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+",
    "baseKeywords": [
      "TAKWIN CREATIONS",
      "HEAVY CONSTRUCT",
      "CHARGE BONUS"
    ],
    "equip": [
      "Cavalry Lance",
      "Brass Clockwork Mount"
    ]
  },
  {
    "id": "UNIT_IS_GOLEM",
    "name": "House of Wisdom Golem / Homunculus",
    "cat": "Subfaction Construct",
    "cost": 95,
    "max": 2,
    "isLeader": false,
    "img": "images/hydra_construct.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+",
    "baseKeywords": [
      "TAKWIN CREATIONS",
      "HEAVY CONSTRUCT"
    ],
    "equip": [
      "Clockwork Fists"
    ]
  },
  {
    "id": "UNIT_IS_BRAZEN_BULL",
    "name": "Brazen Bull Alchemical Engine",
    "cat": "Monstrous Construct",
    "cost": 120,
    "max": 1,
    "isLeader": false,
    "img": "images/brazen_bull.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +4 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+",
    "baseKeywords": [
      "TAKWIN CREATIONS",
      "HEAVY CONSTRUCT",
      "MONSTROUS STRENGTH"
    ],
    "equip": [
      "Alchemical Horns"
    ]
  },
  {
    "id": "UNIT_IS_LION_JABIR",
    "name": "Lion of Jabir",
    "cat": "Alchemical Beast",
    "cost": 45,
    "max": 3,
    "isLeader": false,
    "img": "images/lion_of_jabir.jpg",
    "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +3 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "BEAST",
      "RENDING CLAWS"
    ],
    "equip": [
      "Alchemical Fangs"
    ]
  },
  {
    "id": "UNIT_IS_JANISSARY",
    "name": "Janissary Heavy Rifleman",
    "cat": "Elite",
    "cost": 55,
    "max": 4,
    "isLeader": false,
    "img": "images/janissary.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "SNIPER",
      "FORTRESS DISCIPLINE"
    ],
    "equip": [
      "Heavy Rifle",
      "Bayonet"
    ]
  },
  {
    "id": "UNIT_IS_AZAB",
    "name": "Azab Warrior",
    "cat": "Trooper",
    "cost": 30,
    "max": 12,
    "isLeader": false,
    "img": "images/azab_warrior.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "LINE INFANTRY"
    ],
    "equip": [
      "Musket"
    ]
  },
  {
    "id": "UNIT_IS_SAPPER",
    "name": "Wall Guard Sapper",
    "cat": "Specialist",
    "cost": 45,
    "max": 2,
    "isLeader": false,
    "img": "images/wall_guard_sapper.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FORTRESS DISCIPLINE",
      "IGNORE COVER",
      "BLAST 4"
    ],
    "equip": [
      "Demolition Satchel",
      "Siege Jezail"
    ]
  }
],
      "equip": [
        "Alchemical Flamethrower"
      ]
    },
    {
      "id": "UNIT_IS_FIDAI_MASTER",
      "name": "Master Assassin of Alamut",
      "cat": "Subfaction Leader",
      "cost": 85,
      "max": 1,
      "isLeader": true,
      "img": "images/fidai_assassin.jpg",
      "fullStats": "MOVE: 8\" | RANGED: +2 | MELEE: +4 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
      "baseKeywords": [
        "COMMANDER",
        "SILENT ASSASSINATION"
      ],
      "equip": [
        "Dual Poison Daggers"
      ]
    },
    {
      "id": "UNIT_IS_KAVASS"  { "id": "UNIT_IS_KAVASS", "name": "Kavass Guardian", "cat": "Subfaction Guard", "cost": 35, "max": 3, "isLeader": false, "img": "images/kavass_guardian.jpg", "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", "baseKeywords": ["KAVASS GUARDIANS", "ALCHEMICAL SHIELD"], "equip": ["Alchemical Halberd", "Brass Body Armour"] },
  { "id": "UNIT_IS_DERVISH"  { "id": "UNIT_IS_KAVASS"  { "id": "UNIT_IS_KAVASS", "name": "Kavass Guardian", "cat": "Subfaction Guard", "cost": 35, "max": 3, "isLeader": false, "img": "images/kavass_guardian.jpg", "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", "baseKeywords": ["KAVASS GUARDIANS", "ALCHEMICAL SHIELD"], "equip": ["Alchemical Halberd", "Brass Body Armour"] },
  { "id": "UNIT_IS_DERVISH", "name": "Isma'ili Dervish Monk", "cat": "Subfaction Skirmisher", "cost": 55, "max": 4, "isLeader": false, "img": "images/dervish_monk.jpg", "fullStats": "MOVE: 7\" | RANGED: +0 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 9+", "baseKeywords": ["WHIRLING DERVISH", "IGNORE OFF-HAND WEAPON"], "equip": ["Dual Curved Scimitars"] },
  { "id": "UNIT_IS_FIDAI_ACOLYTE",
      "name": "Fidai Assassin Acolyte",
      "cat": "Subfaction Elite",
      "cost": 65,
      "max": 3,
      "isLeader": false,
      "img": "images/fidai_assassin.jpg",
      "fullStats": "MOVE: 8\" | RANGED: +1 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 8+",
      "baseKeywords": [
        "SHOCK TROOPER",
        "VENOMOUS"
      ],
      "equip": [
        "Poison Dagger"
      ]
    },
    {
      "id": "UNIT_IS_GOLEM",
      "name": "House of Wisdom Golem / Homunculus",
      "cat": "Subfaction Construct",
      "cost": 95,
      "max": 2,
      "isLeader": false,
      "img": "images/hydra_construct.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "MECHANICAL MASTERY"
      ],
      "equip": [
        "Clockwork Fists"
      ]
    },
    {
      "id": "UNIT_IS_BRAZEN_BULL",
      "name": "Brazen Bull Alchemical Engine",
      "cat": "Monstrous Construct",
      "cost": 120,
      "max": 1,
      "isLeader": false,
      "img": "images/brazen_bull.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +4 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "MONSTROUS STRENGTH"
      ],
      "equip": [
        "Alchemical Horns"
      ]
    },
    {
      "id": "UNIT_IS_JANISSARY",
      "name": "Janissary Heavy Rifleman",
      "cat": "Elite",
      "cost": 55,
      "max": 4,
      "isLeader": false,
      "img": "images/janissary.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+",
      "baseKeywords": [
        "SNIPER",
        "LINE INFANTRY"
      ],
      "equip": [
        "Heavy Rifle"
      ]
    },
    {
      "id": "UNIT_IS_AZAB",
      "name": "Azab Warrior",
      "cat": "Trooper",
      "cost": 30,
      "max": 12,
      "isLeader": false,
      "img": "images/azab_warrior.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "LINE INFANTRY"
      ],
      "equip": [
        "Musket"
      ]
    },
    {
      "id": "UNIT_IS_SAPPER",
      "name": "Wall Guard Sapper",
      "cat": "Specialist",
      "cost": 45,
      "max": 2,
      "isLeader": false,
      "img": "images/wall_guard_sapper.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "IGNORE COVER",
        "BLAST 4"
      ],
      "equip": [
        "Demolition Satchel"
      ]
    }
  ],
  "heretic_legions": [
  {
    "id": "UNIT_HL_PRIEST",
    "name": "Heretic Priest",
    "cat": "Leader",
    "cost": 75,
    "max": 1,
    "isLeader": true,
    "img": "images/heretic_priest.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "INFERNAL ZEAL",
      "DARK GOSPEL"
    ],
    "equip": [
      "Heretic Pistol",
      "Trench Sword"
    ]
  },
  {
    "id": "UNIT_HL_RAIDER_CAPT",
    "name": "Naval Raider High Captain",
    "cat": "Subfaction Leader",
    "cost": 80,
    "max": 1,
    "isLeader": true,
    "img": "images/heretic_naval_raider.jpg",
    "fullStats": "MOVE: 7\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "UNSEEN ADVANCE",
      "BOARDING TACTICS"
    ],
    "equip": [
      "Boarding Shotgun",
      "Cutlass"
    ]
  },
  {
    "id": "UNIT_HL_WARLOCK",
    "name": "Goetic Warlock",
    "cat": "Specialist Caster",
    "cost": 65,
    "max": 2,
    "isLeader": false,
    "img": "images/goetic_warlock.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "HELLFIRE WAND"
    ],
    "equip": [
      "Hellfire Wand",
      "Demon Talisman"
    ]
  },
  {
    "id": "UNIT_HL_ANOINTED",
    "name": "Anointed Champion / Heavy Trooper",
    "cat": "Elite Heavy",
    "cost": 80,
    "max": 3,
    "isLeader": false,
    "img": "images/anointed_champion.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "HEAVY PLATE",
      "STRONG",
      "PARRY"
    ],
    "equip": [
      "Heavy Greatsword",
      "Hell Plate"
    ]
  },
  {
    "id": "UNIT_HL_KNIGHT_AVARICE",
    "name": "Knight of Avarice",
    "cat": "Subfaction Elite",
    "cost": 75,
    "max": 2,
    "isLeader": false,
    "img": "images/knight_of_avarice.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "MAMMON'S CHOSEN",
      "PARRY",
      "GILDED ARMOUR"
    ],
    "equip": [
      "Gilded Heavy Shotgun",
      "Coin Hammer"
    ]
  },
  {
    "id": "UNIT_HL_TRENCH_GHOST",
    "name": "Trench Ghost",
    "cat": "Subfaction Elite",
    "cost": 65,
    "max": 3,
    "isLeader": false,
    "img": "images/trench_ghost.jpg",
    "fullStats": "MOVE: 7\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 9+",
    "baseKeywords": [
      "ETHEREAL TERROR",
      "TRENCH RAID",
      "UNDEAD"
    ],
    "equip": [
      "Ghost Cutlass",
      "Gas Mask"
    ]
  },
  {
    "id": "UNIT_HL_BANSHEE",
    "name": "Barped Wire Banshee",
    "cat": "Subfaction Specialist",
    "cost": 60,
    "max": 1,
    "isLeader": false,
    "img": "images/barbed_wire_banshee.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +0 | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 9+",
    "baseKeywords": [
      "BARBED WIRE BANSHEE",
      "ETHEREAL TERROR"
    ],
    "equip": [
      "Entangling Barbed Wire"
    ]
  },
  {
    "id": "UNIT_HL_TROOPER",
    "name": "Heretic Trooper",
    "cat": "Trooper",
    "cost": 30,
    "max": 12,
    "isLeader": false,
    "img": "images/heretic_trooper.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "LINE INFANTRY",
      "FANATIC"
    ],
    "equip": [
      "Bolt-Action Rifle",
      "Trench Knife"
    ]
  },
  {
    "id": "UNIT_HL_YOKE_FIEND",
    "name": "Yoke Fiend",
    "cat": "Beast",
    "cost": 40,
    "max": 3,
    "isLeader": false,
    "img": "images/yoke_fiend.jpg",
    "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "RENDING LIMBS"
    ],
    "equip": [
      "Barbed Chains"
    ]
  },
  {
    "id": "UNIT_HL_HOUND_ABADDON",
    "name": "Hound of Abaddon",
    "cat": "Beast",
    "cost": 35,
    "max": 4,
    "isLeader": false,
    "img": "images/hound_of_abaddon.jpg",
    "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "HELLFIRE BITE"
    ],
    "equip": [
      "Hellfire Fangs"
    ]
  },
  {
    "id": "UNIT_HL_THRALL",
    "name": "Wretched Thrall",
    "cat": "Chaff Trooper",
    "cost": 15,
    "max": 20,
    "isLeader": false,
    "img": "images/wretched_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
    "baseKeywords": [
      "LINE INFANTRY"
    ],
    "equip": [
      "Rusty Blade"
    ]
  }
],
      "equip": [
        "Cleaver of Tumours"
      ]
    },
    {
      "id": "UNIT_HL_WARLOCK",
      "name": "Goetic Warlock",
      "cat": "Specialist",
      "cost": 65,
      "max": 2,
      "isLeader": false,
      "img": "images/goetic_warlock.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "GOETIC SORCERY",
        "DIVINE GUIDANCE"
      ],
      "equip": [
        "Hellfire Wand"
      ]
    },
    {
      "id": "UNIT_HL_PLAGUE_KNIGHT",
      "name": "Black Grail Plague Knight",
      "cat": "Elite",
      "cost": 70,
      "max": 3,
      "isLeader": false,
      "img": "images/plague_knight.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "DISEASE AURA",
        "ARMOUR +2",
        "REGENERATION"
      ],
      "equip": [
        "Plague Greatsword"
      ]
    },
    {
      "id": "UNIT_HL_KNIGHT_AVARICE",
      "name": "Knight of Avarice",
      "cat": "Subfaction Elite",
      "cost": 75,
      "max": 2,
      "isLeader": false,
      "img": "images/knight_of_avarice.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "ARMOUR +2",
        "PARRY"
      ],
      "equip": [
        "Gilded Heavy Shotgun"
      ]
    },
    {
      "id": "UNIT_HL_TRENCH_GHOST",
      "name": "Trench Ghost",
      "cat": "Subfaction Elite",
      "cost": 65,
      "max": 3,
      "isLeader": false,
      "img": "images/trench_ghost.jpg",
      "fullStats": "MOVE: 7\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 9+",
      "baseKeywords": [
        "ETHEREAL TERROR",
        "TRENCH RAID"
      ],
      "equip": [
        "Ghost Cutlass"
      ]
    },
    {
      "id": "UNIT_HL_TROOPER",
      "name": "Heretic Trooper",
      "cat": "Trooper",
      "cost": 30,
      "max": 12,
      "isLeader": false,
      "img": "images/heretic_trooper.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
      "baseKeywords": [
        "LINE INFANTRY",
        "FANATIC"
      ],
      "equip": [
        "Bolt-Action Rifle"
      ]
    },
    {
      "id": "UNIT_HL_YOKE_FIEND",
      "name": "Yoke Fiend",
      "cat": "Beast",
      "cost": 40,
      "max": 3,
      "isLeader": false,
      "img": "images/yoke_fiend.jpg",
      "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "BEAST",
        "RENDING LIMBS"
      ],
      "equip": [
        "Barbed Chains"
      ]
    },
    {
      "id": "UNIT_HL_THRALL",
      "name": "Wretched Thrall",
      "cat": "Chaff Trooper",
      "cost": 15,
      "max": 20,
      "isLeader": false,
      "img": "images/wretched_thrall.jpg",
      "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
      "baseKeywords": [
        "LINE INFANTRY"
      ],
      "equip": [
        "Rusty Blade"
      ]
    }
  ],
  "cult_black_grail": [
  {
    "id": "UNIT_CBG_LORD_TUMORS",
    "name": "Lord of Tumors",
    "cat": "Leader",
    "cost": 85,
    "max": 1,
    "isLeader": true,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "BLACK GRAIL PLAGUE",
      "REGENERATION",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Scythe of Pestilence"
    ]
  },
  {
    "id": "UNIT_CBG_EXECUTOR",
    "name": "The Executor (Dirge Commander)",
    "cat": "Subfaction Leader",
    "cost": 80,
    "max": 1,
    "isLeader": true,
    "img": "images/plague_knight.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "TOUGH",
      "THE EXECUTOR",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Executioner Greatsword",
      "Plague Pistol"
    ]
  },
  {
    "id": "UNIT_CBG_GREAT_MAW",
    "name": "Great Maw (Hunger Commander)",
    "cat": "Subfaction Leader",
    "cost": 90,
    "max": 1,
    "isLeader": true,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+",
    "baseKeywords": [
      "COMMANDER",
      "RAVENOUS CHARGE",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Great Maw Jaws"
    ]
  },
  {
    "id": "UNIT_CBG_HERALD",
    "name": "Herald of Beelzebub",
    "cat": "Specialist Caster",
    "cost": 75,
    "max": 1,
    "isLeader": false,
    "img": "images/herald_of_beelzebub.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "FLIGHT",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Herald Horn of Pestilence"
    ]
  },
  {
    "id": "UNIT_CBG_PLAGUE_KNIGHT",
    "name": "Plague Knight",
    "cat": "Elite",
    "cost": 70,
    "max": 3,
    "isLeader": false,
    "img": "images/plague_knight.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "ORDER OF THE FLY",
      "ARMOUR +2",
      "REGENERATION"
    ],
    "equip": [
      "Plague Greatsword"
    ]
  },
  {
    "id": "UNIT_CBG_CORPSE_GUARD",
    "name": "Corpse Guard",
    "cat": "Elite Guard",
    "cost": 65,
    "max": 4,
    "isLeader": false,
    "img": "images/corpse_guard.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 8+",
    "baseKeywords": [
      "ARMOUR +2",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Plague Shield",
      "Corpse Halberd"
    ]
  },
  {
    "id": "UNIT_CBG_GRAIL_THRALL",
    "name": "Grail Thrall",
    "cat": "Trooper",
    "cost": 20,
    "max": 15,
    "isLeader": false,
    "img": "images/grail_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "INFECTION MARKERS",
      "PLAGUE CONTAINER"
    ],
    "equip": [
      "Rotting Cleaver"
    ]
  },
  {
    "id": "UNIT_CBG_HOUNDS",
    "name": "Hounds of the Black Grail",
    "cat": "Beast",
    "cost": 30,
    "max": 4,
    "isLeader": false,
    "img": "images/trench_dog.jpg",
    "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "BEAST",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Contagion Fangs"
    ]
  },
  {
    "id": "UNIT_CBG_HELL_TICK",
    "name": "Hell Tick",
    "cat": "Swarm Beast",
    "cost": 25,
    "max": 6,
    "isLeader": false,
    "img": "images/yoke_fiend.jpg",
    "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
    "baseKeywords": [
      "BEAST",
      "PARASITIC INFECTION"
    ],
    "equip": [
      "Parasitic Mandibles"
    ]
  },
  {
    "id": "UNIT_CBG_BEAST_NOMAN",
    "name": "Beast of No Man's Land",
    "cat": "Heavy Monster",
    "cost": 115,
    "max": 1,
    "isLeader": false,
    "img": "images/beast_of_no_mans_land.jpg",
    "fullStats": "MOVE: 6\" | RANGED: -1 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 9+",
    "baseKeywords": [
      "HEAVY CONSTRUCT",
      "MONSTROUS STRENGTH",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Rending Plague Claws"
    ]
  },
  {
    "id": "UNIT_CBG_GREGORI_GULA",
    "name": "Gregori Gula",
    "cat": "Specialist Glutton",
    "cost": 65,
    "max": 1,
    "isLeader": false,
    "img": "images/lord_of_tumours.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "REGENERATION",
      "INFECTION MARKERS"
    ],
    "equip": [
      "Gluttonous Cleaver"
    ]
  }
],
      "equip": [
        "Scythe of Pestilence"
      ]
    },
    {
      "id": "UNIT_CBG_HERALD",
      "name": "Herald of Beelzebub",
      "cat": "Specialist",
      "cost": 75,
      "max": 1,
      "isLeader": false,
      "img": "images/artillery_witch.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "GOETIC SORCERY",
        "DISEASE AURA"
      ],
      "equip": [
        "Herald Staff"
      ]
    },
    {
      "id": "UNIT_CBG_PLAGUE_KNIGHT",
      "name": "Plague Knight",
      "cat": "Elite",
      "cost": 70,
      "max": 3,
      "isLeader": false,
      "img": "images/plague_knight.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "DISEASE AURA",
        "ARMOUR +2",
        "REGENERATION"
      ],
      "equip": [
        "Plague Greatsword"
      ]
    },
    {
      "id": "UNIT_CBG_CORPSE_GUARD",
      "name": "Corpse Guard",
      "cat": "Elite Guard",
      "cost": 65,
      "max": 4,
      "isLeader": false,
      "img": "images/corpseguard.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 8+",
      "baseKeywords": [
        "ARMOUR +2",
        "BLACK GRAIL PLAGUE"
      ],
      "equip": [
        "Plague Shield",
        "Corpse Halberd"
      ]
    },
    {
      "id": "UNIT_CBG_GRAIL_THRALL",
      "name": "Grail Thrall",
      "cat": "Trooper",
      "cost": 20,
      "max": 15,
      "isLeader": false,
      "img": "images/grail_thrall.jpg",
      "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
      "baseKeywords": [
        "BLACK GRAIL PLAGUE"
      ],
      "equip": [
        "Rotting Cleaver"
      ]
    },
    {
      "id": "UNIT_CBG_HOUNDS",
      "name": "Hounds of the Black Grail",
      "cat": "Beast",
      "cost": 30,
      "max": 4,
      "isLeader": false,
      "img": "images/trench_dog.jpg",
      "fullStats": "MOVE: 8\" | RANGED: - | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "BEAST",
        "DISEASE AURA"
      ],
      "equip": [
        "Contagion Fangs"
      ]
    },
    {
      "id": "UNIT_CBG_HELL_TICK",
      "name": "Hell Tick",
      "cat": "Swarm Beast",
      "cost": 25,
      "max": 6,
      "isLeader": false,
      "img": "images/yoke_fiend.jpg",
      "fullStats": "MOVE: 7\" | RANGED: - | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+",
      "baseKeywords": [
        "BEAST",
        "BLACK GRAIL PLAGUE"
      ],
      "equip": [
        "Parasitic Mandibles"
      ]
    },
    {
      "id": "UNIT_CBG_BEAST_NOMAN",
      "name": "Beast of No Man's Land",
      "cat": "Heavy Monster",
      "cost": 115,
      "max": 1,
      "isLeader": false,
      "img": "images/communicant_giant.jpg",
      "fullStats": "MOVE: 6\" | RANGED: -1 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 9+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "MONSTROUS STRENGTH"
      ],
      "equip": [
        "Rending Plague Claws"
      ]
    },
    {
      "id": "UNIT_CBG_GREGORI_GULA",
      "name": "Gregori Gula",
      "cat": "Specialist",
      "cost": 65,
      "max": 1,
      "isLeader": false,
      "img": "images/lord_of_tumours.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "REGENERATION",
        "BLACK GRAIL PLAGUE"
      ],
      "equip": [
        "Gluttonous Cleaver"
      ]
    }
  ],
  "court_serpent": [
  {
    "id": "UNIT_CS_PRAETOR",
    "name": "Praetor (Archdevil Commander)",
    "cat": "Leader",
    "cost": 85,
    "max": 1,
    "isLeader": true,
    "img": "images/praetor.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+",
    "baseKeywords": [
      "COMMANDER",
      "INFERNAL WAR COUNCIL",
      "AURA OF SIN"
    ],
    "equip": [
      "Archdevil Blade",
      "Hellfire Pistol"
    ]
  },
  {
    "id": "UNIT_CS_HELL_KNIGHT",
    "name": "Hell Knight",
    "cat": "Elite",
    "cost": 75,
    "max": 3,
    "isLeader": false,
    "img": "images/hell_knight.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
    "baseKeywords": [
      "INFERNAL IRON ARMOUR",
      "PARRY",
      "STRONG"
    ],
    "equip": [
      "Hellish Greatsword",
      "Infernal Iron Armour"
    ]
  },
  {
    "id": "UNIT_CS_HUNTER_LEFT_HAND",
    "name": "Hunter of the Left-Hand Path",
    "cat": "Specialist Stalker",
    "cost": 70,
    "max": 2,
    "isLeader": false,
    "img": "images/hunter_left_hand.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "LEFT-HAND PATH",
      "SHADOW WALKER",
      "DEADEYE AIM"
    ],
    "equip": [
      "Bow of Lethe",
      "Stalker Dagger"
    ]
  },
  {
    "id": "UNIT_CS_SORCERER",
    "name": "Sorcerer",
    "cat": "Specialist Caster",
    "cost": 65,
    "max": 2,
    "isLeader": false,
    "img": "images/serpent_sorcerer.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
    "baseKeywords": [
      "GOETIC SORCERY",
      "FLIGHT",
      "DIVINE GUIDANCE"
    ],
    "equip": [
      "Goetic Magic Staff"
    ]
  },
  {
    "id": "UNIT_CS_PIT_LOCUST",
    "name": "Pit Locust",
    "cat": "Flyer Beast",
    "cost": 50,
    "max": 3,
    "isLeader": false,
    "img": "images/pit_locust.jpg",
    "fullStats": "MOVE: 8\" | RANGED: +0 | MELEE: +2 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FLIGHT",
      "POISON STINGERS",
      "CLEAVE 2"
    ],
    "equip": [
      "Crown of Hellfire",
      "Chitinous Stingers"
    ]
  },
  {
    "id": "UNIT_CS_DESECRATED_SAINT",
    "name": "Desecrated Saint",
    "cat": "Relic Heavy Monster",
    "cost": 105,
    "max": 1,
    "isLeader": false,
    "img": "images/desecrated_saint.jpg",
    "fullStats": "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 10+",
    "baseKeywords": [
      "HEAVY CONSTRUCT",
      "AURA OF SLOTH",
      "MULTI-ARMED"
    ],
    "equip": [
      "Three 1-Handed Scythes"
    ]
  },
  {
    "id": "UNIT_CS_BIOLOGIST",
    "name": "Combat Biologist",
    "cat": "Specialist",
    "cost": 55,
    "max": 2,
    "isLeader": false,
    "img": "images/combat_biologist.jpg",
    "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
    "baseKeywords": [
      "FIELD SURGEON",
      "GAS HAZARD"
    ],
    "equip": [
      "Vivisector",
      "Gas Mask",
      "Gas Grenades"
    ]
  },
  {
    "id": "UNIT_CS_WRETCHED",
    "name": "Wretched",
    "cat": "Trooper",
    "cost": 20,
    "max": 15,
    "isLeader": false,
    "img": "images/wretched_thrall.jpg",
    "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
    "baseKeywords": [
      "LINE INFANTRY"
    ],
    "equip": [
      "Improvised Weapons"
    ]
  }
],
      "equip": [
        "Archdevil Blade",
        "Hellfire Pistol"
      ]
    },
    {
      "id": "UNIT_CS_HELL_KNIGHT",
      "name": "Hell Knight",
      "cat": "Elite",
      "cost": 75,
      "max": 3,
      "isLeader": false,
      "img": "images/hell_knight.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+",
      "baseKeywords": [
        "ARMOUR +2",
        "PARRY"
      ],
      "equip": [
        "Hellish Greatsword",
        "Hell Plate"
      ]
    },
    {
      "id": "UNIT_CS_HUNTER_LEFT_HAND",
      "name": "Hunter of the Left-Hand Path",
      "cat": "Specialist Stalker",
      "cost": 70,
      "max": 2,
      "isLeader": false,
      "img": "images/hunter_left_hand.jpg",
      "fullStats": "MOVE: 7\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "SHOCK TROOPER",
        "DEADEYE AIM"
      ],
      "equip": [
        "Infernal Crossbow",
        "Stalker Dagger"
      ]
    },
    {
      "id": "UNIT_CS_SORCERER",
      "name": "Sorcerer",
      "cat": "Specialist Caster",
      "cost": 65,
      "max": 2,
      "isLeader": false,
      "img": "images/serpent_sorcerer.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+",
      "baseKeywords": [
        "GOETIC SORCERY",
        "DIVINE GUIDANCE"
      ],
      "equip": [
        "Goetic Magic Staff"
      ]
    },
    {
      "id": "UNIT_CS_PIT_LOCUST",
      "name": "Pit Locust",
      "cat": "Flyer Beast",
      "cost": 50,
      "max": 3,
      "isLeader": false,
      "img": "images/pit_locust.jpg",
      "fullStats": "MOVE: 10\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "FLIGHT",
        "POISON STINGER"
      ],
      "equip": [
        "Chitinous Stingers"
      ]
    },
    {
      "id": "UNIT_CS_DESECRATED_SAINT",
      "name": "Desecrated Saint",
      "cat": "Relic Heavy Monster",
      "cost": 105,
      "max": 1,
      "isLeader": false,
      "img": "images/desecrated_saint.jpg",
      "fullStats": "MOVE: 5\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 10+",
      "baseKeywords": [
        "HEAVY CONSTRUCT",
        "MONSTROUS STRENGTH"
      ],
      "equip": [
        "Corrupted Relic Scythe"
      ]
    },
    {
      "id": "UNIT_CS_BIOLOGIST",
      "name": "Combat Biologist",
      "cat": "Specialist",
      "cost": 55,
      "max": 2,
      "isLeader": false,
      "img": "images/combat_biologist.jpg",
      "fullStats": "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+",
      "baseKeywords": [
        "FIELD SURGEON",
        "GAS HAZARD"
      ],
      "equip": [
        "Toxic Syringe",
        "Chemical Sprayer"
      ]
    },
    {
      "id": "UNIT_CS_WRETCHED",
      "name": "Wretched",
      "cat": "Trooper",
      "cost": 20,
      "max": 15,
      "isLeader": false,
      "img": "images/wretched_thrall.jpg",
      "fullStats": "MOVE: 5\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+",
      "baseKeywords": [
        "LINE INFANTRY"
      ],
      "equip": [
        "Improvised Weapons"
      ]
    }
  ]
};


  // Sub-Faction & Doctrine Mapping across all 6 Official Trench Companion Factions
  const subfactionsDict = {
    new_antioch: [
      { id: "na_standard", name: "Principality of New Antioch (Line Force)" },
      { id: "na_papal", name: "Papal States Intervention Force" },
      { id: "na_eire", name: "Eire Rangers" },
      { id: "na_stosstruppen", name: "Stoßtruppen of the Free State of Prussia" },
      { id: "na_alba", name: "Kingdom of Alba Assault Detachment" },
      { id: "na_abyssinia", name: "Expeditionary Forces of Abyssinia" },
      { id: "na_red_brigade", name: "The Red Brigade" }
    ],
    trench_pilgrims: [
      { id: "tp_standard", name: "Processions of the Trench Pilgrims (Standard)" },
      { id: "tp_sacred_affliction", name: "Procession of the Sacred Affliction" },
      { id: "tp_tenth_plague", name: "Cavalcade of the Tenth Plague" },
      { id: "tp_saint_methodius", name: "War Pilgrimage of Saint Methodius" }
    ],
    heretic_legions: [
      { id: "hl_standard", name: "Heretic Legion (Standard Force)" },
      { id: "hl_naval_raiders", name: "Heretic Naval Raiders" },
      { id: "hl_trench_ghosts", name: "Trench Ghosts" },
      { id: "hl_knights_avarice", name: "Knights of Avarice" }
    ],
    black_grail: [
      { id: "bg_standard", name: "Cult of the Black Grail (Standard)" },
      { id: "bg_hegemon", name: "Dirge of the Great Hegemon" },
      { id: "bg_great_hunger", name: "The Great Hunger" }
    ],
    iron_sultanate: [
      { id: "is_standard", name: "The Iron Sultanate (Standard Wall-Guard)" },
      { id: "is_fidai", name: "Fidai of Alamut - Cabal of Assassins" },
      { id: "is_house_wisdom", name: "House of Wisdom" },
      { id: "is_iron_wall", name: "Defenders of the Iron Wall" }
    ],
    serpent_court: [
      { id: "cs_standard", name: "Court of the Seven-Headed Serpent" }
    ]
  };

  // Comprehensive Master Unit Catalog across all 6 Factions and 17 Doctrines
  const masterUnits = {
    new_antioch: [
      { id: "UNIT_NA_LIEUTENANT", name: "Lieutenant of New Antioch", cat: "Leader", cost: 70, max: 1, isLeader: true, img: "images/lieutenant_new_antioch.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["COMMANDER", "INHERENT LEADERSHIP"], equip: ["Automatic Pistol", "Trench Sword", "Body Armour"] },
      { id: "UNIT_NA_PALADIN", name: "Paladin of the Sacred Heart", cat: "Elite Paladin", cost: 90, max: 2, isLeader: false, img: "images/anointed_champion.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 9+", baseKeywords: ["DIVINE GUIDANCE", "CLEAVE 2", "HOLY ARMOUR"], equip: ["Greatsword", "Rotting Carapace"] },
      { id: "UNIT_NA_LAZARUS", name: "Saint Lazarus Resurrected", cat: "Relic Leader", cost: 110, max: 1, isLeader: true, img: "images/martyr_penitent.jpg", fullStats: "MOVE: 6\" | RANGED: +0 | MELEE: +4 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 10+", baseKeywords: ["COMMANDER", "DIVINE GUIDANCE", "REGENERATION"], equip: ["Eviscerator Greatsword", "Blessed Plate"] },
      { id: "UNIT_NA_WITCHBURNER", name: "Inquisitorial Witchburner", cat: "Specialist Inquisitor", cost: 55, max: 2, isLeader: false, img: "images/trench_chaplain.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["PURIFYING FIRE", "WITCH HUNTER"], equip: ["Heavy Flamethrower", "Executioner Axe"] },
      { id: "UNIT_NA_SNIPER_PRIEST", name: "Sniper Priest", cat: "Specialist", cost: 50, max: 2, isLeader: false, img: "images/sniper_priest.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: -1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["DEADEYE AIM", "DIVINE GUIDANCE", "SNIPER"], equip: ["Bolt-Action Sniper Rifle"] },
      { id: "UNIT_NA_STOSSTRUPPEN_VETERAN", name: "Prussian Stosstruppen Veteran", cat: "Elite", cost: 60, max: 4, isLeader: false, img: "images/stosstruppen_veteran.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["TRENCH RAID", "SHOCK TROOPER"], equip: ["Submachine Gun", "Trench Knife", "Body Armour"] },
      { id: "UNIT_NA_TRENCH_TROOPER", name: "Trench Trooper", cat: "Trooper", cost: 35, max: 12, isLeader: false, img: "images/trench_trooper.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["LINE INFANTRY", "GRIM DISCIPLINE"], equip: ["Bolt-Action Rifle", "Trench Knife"] },
      { id: "UNIT_NA_TRENCH_DOCTOR", name: "Trench Doctor (Medic)", cat: "Specialist", cost: 45, max: 2, isLeader: false, img: "images/trench_doctor.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["FIELD SURGEON", "TREAT WOUNDS", "MEDIC"], equip: ["Field Surgeon Kit", "Service Pistol"] },
      { id: "UNIT_NA_MECHANIZED", name: "Mechanized Heavy Infantry", cat: "Heavy Elite", cost: 75, max: 3, isLeader: false, img: "images/mechanized_infantry.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +1 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["HEAVY", "ARMOUR +2"], equip: ["Heavy Machine Gun", "Heavy Plate"] },
      { id: "UNIT_NA_CHAPLAIN", name: "Trench Chaplain", cat: "Specialist", cost: 55, max: 1, isLeader: false, img: "images/trench_chaplain.jpg", fullStats: "MOVE: 6\" | RANGED: +0 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["HOLY FERVOUR", "DIVINE GUIDANCE"], equip: ["Trench Shotgun", "Mace of Antioch"] },
      { id: "UNIT_NA_PAPAL_GUARD", name: "Papal States Guard", cat: "Elite Guard", cost: 65, max: 3, isLeader: false, img: "images/papal_states_guard.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 1 | COURAGE: 9+", baseKeywords: ["SHIELD", "PARRY", "ARMOUR +2"], equip: ["Papal Halberd", "Trench Shield", "Heavy Armor"] }
    ],
    trench_pilgrims: [
      { id: "UNIT_TP_WAR_PROPHET", name: "Trench Pilgrim War Prophet", cat: "Leader", cost: 70, max: 1, isLeader: true, img: "images/war_prophet.jpg", fullStats: "MOVE: 6\" | RANGED: +0 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+", baseKeywords: ["COMMANDER", "HOLY FERVOUR", "ZEALOT"], equip: ["Trench Shotgun", "Trench Club"] },
      { id: "UNIT_TP_STIGMATIC_NUN", name: "Stigmatic Nun", cat: "Elite Penitent", cost: 60, max: 4, isLeader: false, img: "images/martyr_penitent.jpg", fullStats: "MOVE: 6\" | RANGED: -1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 9+", baseKeywords: ["STIGMATA BLEED", "HOLY FLAIL", "ZEALOT"], equip: ["Holy Iron Flail", "Heavy Chains"] },
      { id: "UNIT_TP_WITCHBURNER", name: "Inquisitorial Witchburner", cat: "Specialist Inquisitor", cost: 55, max: 2, isLeader: false, img: "images/trench_chaplain.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["PURIFYING FIRE", "WITCH HUNTER"], equip: ["Heavy Flamethrower", "Executioner Axe"] },
      { id: "UNIT_TP_ANCHORITE", name: "Anchorite Shrine", cat: "Monstrous Shrine", cost: 140, max: 1, isLeader: false, img: "images/anchorite_shrine.jpg", fullStats: "MOVE: 6\" | RANGED: 0D | MELEE: +2D | ARMOUR: -3 | WOUNDS: 3 | COURAGE: 10+", baseKeywords: ["NEGATE SHRAPNEL", "FEAR", "STRONG", "NEGATE HEAVY", "TOUGH", "PILGRIM", "BROKEN ON THE WHEEL"], equip: ["Catherine Wheel", "Bonebreaker Mace"] },
      { id: "UNIT_TP_PRISONER", name: "Ecclesiastic Prisoner", cat: "Chaff / Sacrificial", cost: 25, max: 5, isLeader: false, img: "images/wretched_thrall.jpg", fullStats: "MOVE: 5\" | RANGED: -1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+", baseKeywords: ["SACRIFICIAL VICTIM", "LINE INFANTRY"], equip: ["Heavy Chains"] },
      { id: "UNIT_TP_COMMUNICANT", name: "Communicant Giant", cat: "Heavy Elite", cost: 100, max: 1, isLeader: false, img: "images/communicant_giant.jpg", fullStats: "MOVE: 6\" | RANGED: -1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 8+", baseKeywords: ["HEAVY CONSTRUCT", "MONSTROUS STRENGTH"], equip: ["Greatsword", "Body Armour"] },
      { id: "UNIT_TP_MARTYR", name: "Martyr Penitent", cat: "Trooper", cost: 30, max: 6, isLeader: false, img: "images/martyr_penitent.jpg", fullStats: "MOVE: 6\" | RANGED: -1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 10+", baseKeywords: ["BLOOD SACRIFICE", "FANATIC", "MARTYRDOM"], equip: ["Demo Charge", "Flagellant Flail"] },
      { id: "UNIT_TP_PILGRIM", name: "Trench Pilgrim", cat: "Trooper", cost: 25, max: 15, isLeader: false, img: "images/trench_pilgrim.jpg", fullStats: "MOVE: 6\" | RANGED: +0 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["ZEALOT", "LINE INFANTRY"], equip: ["Bolt-Action Rifle", "Club"] },
      { id: "UNIT_TP_TRENCH_DOG", name: "War Hound / Trench Dog", cat: "Beast Support", cost: 20, max: 4, isLeader: false, img: "images/trench_dog.jpg", fullStats: "MOVE: 8\" | RANGED: - | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+", baseKeywords: ["BEAST", "TRENCH RAID"], equip: ["Vicious Biting Fangs"] },
      { id: "UNIT_TP_SAINT", name: "Desecrated Relic Saint", cat: "Relic Construct", cost: 85, max: 1, isLeader: false, img: "images/desecrated_saint.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 10+", baseKeywords: ["HOLY FERVOUR", "ARMOUR +2"], equip: ["Relic Sword", "Gothic Banner"] }
    ],
    heretic_legions: [
      { id: "UNIT_HL_LORD_TUMOURS", name: "Heretic Lord of Tumours", cat: "Leader", cost: 80, max: 1, isLeader: true, img: "images/lord_of_tumours.jpg", fullStats: "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+", baseKeywords: ["COMMANDER", "BLACK GRAIL PLAGUE", "REGENERATION"], equip: ["Cleaver of Tumours", "Plague Carapace"] },
      { id: "UNIT_HL_BRAZEN_BULL", name: "Brazen Bull Siege Engine", cat: "Monstrous Construct", cost: 120, max: 1, isLeader: false, img: "images/brazen_bull.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +4 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+", baseKeywords: ["HEAVY CONSTRUCT", "MONSTROUS STRENGTH", "GOETIC PACT"], equip: ["Molten Furnace Horns"] },
      { id: "UNIT_HL_WARLOCK", name: "Goetic Warlock", cat: "Specialist", cost: 65, max: 2, isLeader: false, img: "images/goetic_warlock.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["GOETIC SORCERY", "DIVINE GUIDANCE"], equip: ["Hellfire Wand", "Ritual Dagger"] },
      { id: "UNIT_HL_PLAGUE_KNIGHT", name: "Black Grail Plague Knight", cat: "Elite", cost: 70, max: 3, isLeader: false, img: "images/plague_knight.jpg", fullStats: "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["DISEASE AURA", "ARMOUR +2", "REGENERATION"], equip: ["Plague Greatsword", "Heavy Plate"] },
      { id: "UNIT_HL_KNIGHT_AVARICE", name: "Knight of Avarice", cat: "Elite", cost: 75, max: 2, isLeader: false, img: "images/knight_of_avarice.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["ARMOUR +2", "PARRY"], equip: ["Gilded Heavy Shotgun", "Gilded Mace"] },
      { id: "UNIT_HL_HERETIC_TROOPER", name: "Heretic Trooper", cat: "Trooper", cost: 30, max: 12, isLeader: false, img: "images/heretic_trooper.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+", baseKeywords: ["LINE INFANTRY", "FANATIC"], equip: ["Bolt-Action Rifle", "Bayonet"] },
      { id: "UNIT_HL_YOKE_FIEND", name: "Yoke Fiend", cat: "Beast Beast", cost: 40, max: 3, isLeader: false, img: "images/yoke_fiend.jpg", fullStats: "MOVE: 7\" | RANGED: - | MELEE: +2 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["BEAST", "RENDING LIMBS"], equip: ["Barbed Chains"] },
      { id: "UNIT_HL_THRALL", name: "Wretched Thrall", cat: "Chaff Trooper", cost: 15, max: 20, isLeader: false, img: "images/wretched_thrall.jpg", fullStats: "MOVE: 5\" | RANGED: -1 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 5+", baseKeywords: ["LINE INFANTRY"], equip: ["Rusty Blade"] }
    ],
    black_grail: [
      { id: "UNIT_BG_CHOREGUS", name: "Choregus of the Black Grail", cat: "Leader", cost: 85, max: 1, isLeader: true, img: "images/lord_of_tumours.jpg", fullStats: "MOVE: 5\" | RANGED: +0 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+", baseKeywords: ["COMMANDER", "BLACK GRAIL PLAGUE", "DIRGE OF HEGEMON"], equip: ["Plague Scythe", "Blighted Bell"] },
      { id: "UNIT_BG_PIT_LOCUST", name: "Pit Locust Swarm", cat: "Flyer Specialist", cost: 95, max: 2, isLeader: false, img: "images/pit_locust.jpg", fullStats: "MOVE: 10\" | RANGED: +1 | MELEE: +2 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["FLIGHT", "POISON STINGER", "FLYING HORROR"], equip: ["Chitinous Stingers", "Corrosive Vomit"] },
      { id: "UNIT_BG_HERALD", name: "Herald of Beelzebub", cat: "Specialist", cost: 75, max: 2, isLeader: false, img: "images/goetic_warlock.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["GOETIC SORCERY", "FLYING HORROR"], equip: ["Blight Staff", "Plague Dagger"] },
      { id: "UNIT_BG_PLAGUE_KNIGHT", name: "Black Grail Plague Knight", cat: "Elite", cost: 70, max: 3, isLeader: false, img: "images/plague_knight.jpg", fullStats: "MOVE: 5\" | RANGED: +0 | MELEE: +2 | ARMOUR: 2 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["DISEASE AURA", "ARMOUR +2", "REGENERATION"], equip: ["Plague Greatsword", "Heavy Plate"] },
      { id: "UNIT_BG_PUTRID_WARRIOR", name: "Putrid Warrior (Plague Trooper)", cat: "Trooper", cost: 35, max: 12, isLeader: false, img: "images/heretic_trooper.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 6+", baseKeywords: ["LINE INFANTRY", "INFECTED", "PUTRID ROT"], equip: ["Blight Rifle", "Rusty Bayonet"] }
    ],
    iron_sultanate: [
      { id: "UNIT_IS_ALCHEMIST", name: "Jabirean Alchemist", cat: "Leader", cost: 75, max: 1, isLeader: true, img: "images/jabirean_alchemist.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["COMMANDER", "GAS HAZARD", "GAS IMMUNE"], equip: ["Alchemical Flamethrower", "Scimitar", "Gas Mask"] },
      { id: "UNIT_IS_LION", name: "Lion of Jabir", cat: "Heavy Beast", cost: 90, max: 1, isLeader: false, img: "images/lion_of_jabir.jpg", fullStats: "MOVE: 7\" | RANGED: - | MELEE: +3 | ARMOUR: 2 | WOUNDS: 3 | COURAGE: 9+", baseKeywords: ["MONSTROUS STRENGTH", "ARMOUR +2"], equip: ["Alchemical Claws"] },
      { id: "UNIT_IS_JANISSARY", name: "Janissary Heavy Rifleman", cat: "Elite", cost: 55, max: 4, isLeader: false, img: "images/janissary.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["SNIPER", "LINE INFANTRY"], equip: ["Heavy Rifle", "Kilij Sword"] },
      { id: "UNIT_IS_AZAB", name: "Azab Warrior", cat: "Trooper", cost: 30, max: 12, isLeader: false, img: "images/azab_warrior.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["LINE INFANTRY"], equip: ["Musket", "Dagger"] },
      { id: "UNIT_IS_TAKUBA", name: "Takuba Swordsman", cat: "Elite Melee", cost: 50, max: 4, isLeader: false, img: "images/takuba_swordsman.jpg", fullStats: "MOVE: 7\" | RANGED: - | MELEE: +3 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["TRENCH RAID", "PARRY"], equip: ["Takuba Broadsword"] },
      { id: "UNIT_IS_SAPPER", name: "Wall Guard Sapper", cat: "Specialist", cost: 45, max: 2, isLeader: false, img: "images/wall_guard_sapper.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +1 | ARMOUR: 1 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["IGNORE COVER", "BLAST 4"], equip: ["Demolition Satchel", "Sapper Shield"] }
    ],
    serpent_court: [
      { id: "UNIT_CS_AMBASSADOR", name: "Serpent Ambassador", cat: "Leader", cost: 80, max: 1, isLeader: true, img: "images/serpent_ambassador.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 1 | WOUNDS: 2 | COURAGE: 9+", baseKeywords: ["COMMANDER", "VENOMOUS"], equip: ["Poisoned Rapier", "Serpent Pistol"] },
      { id: "UNIT_CS_SORCERER", name: "Sorcerer of the Serpent", cat: "Specialist Sorcerer", cost: 60, max: 2, isLeader: false, img: "images/serpent_sorcerer.jpg", fullStats: "MOVE: 6\" | RANGED: +2 | MELEE: +0 | ARMOUR: 0 | WOUNDS: 2 | COURAGE: 8+", baseKeywords: ["GOETIC SORCERY", "SERPENT MAGIC"], equip: ["Serpent Magic Staff", "Ritual Dagger"] },
      { id: "UNIT_CS_ASSASSIN", name: "Fidai Assassin", cat: "Elite Assassin", cost: 65, max: 2, isLeader: false, img: "images/fidai_assassin.jpg", fullStats: "MOVE: 8\" | RANGED: +1 | MELEE: +3 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 8+", baseKeywords: ["SHOCK TROOPER", "VENOMOUS"], equip: ["Dual Poison Daggers"] },
      { id: "UNIT_CS_BULL", name: "Brazen Bull Siege Engine", cat: "Monstrous Construct", cost: 120, max: 1, isLeader: false, img: "images/brazen_bull.jpg", fullStats: "MOVE: 5\" | RANGED: +1 | MELEE: +4 | ARMOUR: 3 | WOUNDS: 4 | COURAGE: 10+", baseKeywords: ["HEAVY CONSTRUCT", "MONSTROUS STRENGTH"], equip: ["Molten Furnace Horns"] },
      { id: "UNIT_CS_HYDRA", name: "Hydra Construct", cat: "Heavy Monster", cost: 110, max: 1, isLeader: false, img: "images/hydra_construct.jpg", fullStats: "MOVE: 6\" | RANGED: +1 | MELEE: +3 | ARMOUR: 2 | WOUNDS: 4 | COURAGE: 9+", baseKeywords: ["HEAVY CONSTRUCT", "RENDING LIMBS"], equip: ["Hydra Melee Heads"] },
      { id: "UNIT_CS_LOCUST", name: "Pit Locust Swarm", cat: "Flyer Specialist", cost: 50, max: 3, isLeader: false, img: "images/pit_locust.jpg", fullStats: "MOVE: 10\" | RANGED: +1 | MELEE: +1 | ARMOUR: 0 | WOUNDS: 1 | COURAGE: 7+", baseKeywords: ["FLIGHT", "POISON STINGER"], equip: ["Chitinous Stingers"] }
    ]
  };


  // Master Battlekit Equipment Registry
  const masterBattlekit = {
    ranged: [
      { id: "WP_RNG_BOLT_ACTION_RIFLE", name: "Bolt-Action Rifle", cost: 15, cat: "ranged", desc: "Ranged 24\", 2-Handed", kw: ["2-HANDED", "RANGED 24\""] },
      { id: "WP_RNG_SNIPER_RIFLE", name: "Sniper Rifle", cost: 35, cat: "ranged", desc: "Ranged 36\", Ignore Long Range", kw: ["2-HANDED", "RANGED 36\"", "SNIPER"] },
      { id: "WP_RNG_SUBMACHINE_GUN", name: "Submachine Gun", cost: 25, cat: "ranged", desc: "AUTOMATIC 2, ASSAULT", kw: ["AUTOMATIC 2", "ASSAULT", "CLOSE-QUARTERS"] },
      { id: "WP_RNG_TRENCH_SHOTGUN", name: "Trench Shotgun", cost: 20, cat: "ranged", desc: "ASSAULT, +1 DICE <=6\"", kw: ["ASSAULT", "SPREAD SHOT"] },
      { id: "WP_RNG_HEAVY_MACHINE_GUN", name: "Heavy Machine Gun", cost: 45, cat: "ranged", desc: "HEAVY, AUTOMATIC 3", kw: ["HEAVY", "AUTOMATIC 3", "SUPPRESSIVE"] },
      { id: "WP_RNG_FLAMETHROWER", name: "Alchemical Flamethrower", cost: 50, cat: "ranged", desc: "BLAST 3, INCENDIARY", kw: ["BLAST 3", "INCENDIARY", "FIRE HAZARD"] }
    ],
    melee: [
      { id: "WP_MEL_TRENCH_KNIFE", name: "Trench Knife", cost: 5, cat: "melee", desc: "1-Handed, Melee Strike", kw: ["1-HANDED", "MELEE STRIKE"] },
      { id: "WP_MEL_TRENCH_SWORD", name: "Trench Sword", cost: 10, cat: "melee", desc: "1-Handed, PARRY", kw: ["PARRY", "1-HANDED"] },
      { id: "WP_MEL_TRENCH_AXE", name: "Trench Axe", cost: 12, cat: "melee", desc: "1-Handed, CLEAVE 1", kw: ["CLEAVE 1"] },
      { id: "WP_MEL_GREATSWORD", name: "Two-Handed Greatsword", cost: 25, cat: "melee", desc: "2-Handed, CLEAVE 1, DEADLY", kw: ["2-HANDED", "CLEAVE 1"] }
    ],
    armour: [
      { id: "AR_BODY_ARMOUR", name: "Body Armour", cost: 15, cat: "armour", desc: "Armour +1 rating", kw: ["ARMOUR +1"] },
      { id: "AR_PLATE_ARMOUR", name: "Heavy Plate Armour", cost: 35, cat: "armour", desc: "Armour +2 rating", kw: ["ARMOUR +2"] }
    ],
    shields: [
      { id: "AR_TRENCH_SHIELD", name: "Trench Shield", cost: 15, cat: "shields", desc: "Shield, PARRY, Frontal Armour +1", kw: ["SHIELD", "PARRY", "FRONTAL ARMOUR +1"] }
    ],
    grenades: [
      { id: "EX_GAS_GRENADE", name: "Mustard Gas Grenade", cost: 15, cat: "grenades", desc: "BLAST 3, GAS, IGNORE COVER", kw: ["BLAST 3", "GAS HAZARD", "IGNORE COVER"] },
      { id: "EX_DEMO_CHARGE", name: "Demolition Charge", cost: 30, cat: "grenades", desc: "BLAST 4, DEADLY, 4D6 BLOODBATH", kw: ["BLAST 4", "BLOODBATH 4D6"] }
    ],
    equipment: [
      { id: "EQ_GAS_MASK", name: "Trench Gas Mask", cost: 5, cat: "equipment", desc: "IMMUNE TO GAS HAZARDS", kw: ["GAS IMMUNE"] },
      { id: "EQ_MEDIC_KIT", name: "Field Surgeon Kit", cost: 20, cat: "equipment", desc: "Treat Wounds Action", kw: ["FIELD MEDIC", "TREAT WOUNDS"] }
    ]
  };

  // State
  let activeRoster = [];
  let savedVault = JSON.parse(localStorage.getItem('tc_warband_vault') || '[]');
  let activeTargetSlotUnitId = null;
  let activeTargetSlotCat = 'ranged';

  // DOM Elements
  const txtWarbandName = document.getElementById('txtWarbandName');
  const selFaction = document.getElementById('selFaction');
  const selSubfaction = document.getElementById('selSubfaction');
  const selBudget = document.getElementById('selBudget');
  
  const budgetBadge = document.getElementById('budgetBadge');
  const modelCountBadge = document.getElementById('modelCountBadge');
  const auditBudget = document.getElementById('auditBudget');
  const auditSpent = document.getElementById('auditSpent');
  const auditRemaining = document.getElementById('auditRemaining');
  const auditModels = document.getElementById('auditModels');
  const auditLeader = document.getElementById('auditLeader');
  
  const unitCatalog = document.getElementById('unitCatalog');
  const activeRosterList = document.getElementById('activeRosterList');
  
  const btnSaveRoster = document.getElementById('btnSaveRoster');
  const btnExportJSON = document.getElementById('btnExportJSON');
  const btnClearRoster = document.getElementById('btnClearRoster');
  
  const btnNavBuilder = document.getElementById('btnNavBuilder');
  const btnNavVault = document.getElementById('btnNavVault');
  const builderSection = document.getElementById('builderSection');
  const vaultSection = document.getElementById('vaultSection');
  const vaultGrid = document.getElementById('vaultGrid');
  const vaultCount = document.getElementById('vaultCount');

  // Modal Elements
  const equipModalOverlay = document.getElementById('equipModalOverlay');
  const btnCloseEquipModal = document.getElementById('btnCloseEquipModal');
  const btnCloseModalBtn = document.getElementById('btnCloseModalBtn');
  const equipModalTitle = document.getElementById('equipModalTitle');
  const equipModalSubtitle = document.getElementById('equipModalSubtitle');
  const equipSelectionList = document.getElementById('equipSelectionList');
  const equipAccBtns = document.querySelectorAll('.equip-acc-btn');

  // Codex Modal Elements
  const codexModalOverlay = document.getElementById('codexModalOverlay');
  const btnCloseCodexModal = document.getElementById('btnCloseCodexModal');
  const btnCloseCodexBtn = document.getElementById('btnCloseCodexBtn');
  const codexKwName = document.getElementById('codexKwName');
  const codexCategory = document.getElementById('codexCategory');
  const codexDescription = document.getElementById('codexDescription');
  const codexImpact = document.getElementById('codexImpact');

  // Nav Handlers
  btnNavBuilder.addEventListener('click', () => {
    btnNavBuilder.classList.add('active');
    btnNavVault.classList.remove('active');
    builderSection.classList.remove('hidden');
    vaultSection.classList.add('hidden');
  });

  btnNavVault.addEventListener('click', () => {
    btnNavVault.classList.add('active');
    btnNavBuilder.classList.remove('active');
    vaultSection.classList.remove('hidden');
    builderSection.classList.add('hidden');
    renderVault();
  });

  function updateSubfactionOptions() {
    if (!selFaction || !selSubfaction) return;
    let fKey = selFaction.value;
    let subs = subfactionsDict[fKey] || [];
    selSubfaction.innerHTML = subs.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    renderCatalog();
  }

  if (selFaction) selFaction.addEventListener('change', updateSubfactionOptions);
  if (selSubfaction) selSubfaction.addEventListener('change', renderCatalog);
  if (selBudget) selBudget.addEventListener('change', updateRosterAudit);

  // Open Codex Modal Function
  function openCodex(kwName) {
    let entry = masterCodex[kwName.toUpperCase()] || {
      cat: "System Trait",
      desc: `Official Trench Crusade rule mechanic for ${kwName}. Refer to rulebook section for details.`,
      impact: `${kwName} active modifier`
    };

    codexKwName.textContent = kwName.toUpperCase();
    codexCategory.textContent = entry.cat.toUpperCase();
    codexDescription.textContent = entry.desc;
    codexImpact.textContent = entry.impact;

    codexModalOverlay.classList.remove('hidden');
  }

  function closeCodex() {
    codexModalOverlay.classList.add('hidden');
  }

  btnCloseCodexModal.addEventListener('click', closeCodex);
  btnCloseCodexBtn.addEventListener('click', closeCodex);

  // Render Full-Art Catalogue Grid
  function renderCatalog() {
    let factionKey = selFaction.value;
    let units = masterUnits[factionKey] || [];
    unitCatalog.innerHTML = '';

    units.forEach(u => {
      let card = document.createElement('div');
      card.className = 'full-art-card';
      card.style.backgroundImage = `url('${u.img}')`;
      
      let baseKwBadges = u.baseKeywords.map(k => `<span class="kw-pill base-kw" data-kw="${k}">${k}</span>`).join(' ');

      card.innerHTML = `
        <div class="card-top-bar">
          <div class="card-title-row">
            <span class="card-unit-name">${u.name}</span>
            <span class="card-cost-badge">${u.cost} D</span>
          </div>
          <div class="card-meta-line">${u.cat} • Max: ${u.max}</div>
        </div>

        <div class="card-bottom-bar">
          <div class="card-stats-strip">${u.fullStats}</div>
          <div class="card-kw-container">${baseKwBadges}</div>
          <button type="button" class="btn-full-art-recruit" data-id="${u.id}">+ RECRUIT TO ROSTER</button>
        </div>
      `;

      card.querySelectorAll('.kw-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          openCodex(pill.dataset.kw);
        });
      });

      card.querySelector('.btn-full-art-recruit').addEventListener('click', () => {
        recruitUnit(u);
      });

      unitCatalog.appendChild(card);
    });
  }

  // Recruit Unit into Roster
  function recruitUnit(unit) {
    let maxBudget = parseInt(selBudget.value);
    let totalSpent = activeRoster.reduce((sum, item) => sum + item.totalCost, 0);

    if (activeRoster.length >= 12) {
      alert("FIELD LIMIT REACHED: Maximum 12 models per Warband!");
      return;
    }

    if (totalSpent + unit.cost > maxBudget) {
      alert(`DUCAT BUDGET EXCEEDED: ${unit.name} costs ${unit.cost} Ducats, but only ${maxBudget - totalSpent} Ducats remain!`);
      return;
    }

    let countInRoster = activeRoster.filter(item => item.id === unit.id).length;
    if (countInRoster >= unit.max) {
      alert(`UNIT LIMIT REACHED: Maximum ${unit.max} of ${unit.name} allowed per Warband!`);
      return;
    }

    let newInst = {
      instanceId: 'inst_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      baseCost: unit.cost,
      totalCost: unit.cost,
      equippedSlots: {
        ranged: null,
        melee: null,
        armour: null,
        shields: null,
        grenades: null,
        equipment: null
      },
      ...unit
    };

    activeRoster.push(newInst);
    renderRoster();

    setTimeout(() => {
      let newCard = document.querySelector(`[data-card-inst="${newInst.instanceId}"]`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        newCard.classList.add('highlight-recruit');
        setTimeout(() => newCard.classList.remove('highlight-recruit'), 1500);
      }
    }, 100);
  }

  // Duplicate / Copy Base Model
  function duplicateUnit(instanceId) {
    let target = activeRoster.find(u => u.instanceId === instanceId);
    if (!target) return;

    let maxBudget = parseInt(selBudget.value);
    let totalSpent = activeRoster.reduce((sum, item) => sum + item.totalCost, 0);

    if (activeRoster.length >= 12) {
      alert("FIELD LIMIT REACHED: Maximum 12 models per Warband!");
      return;
    }

    if (totalSpent + target.totalCost > maxBudget) {
      alert(`DUCAT BUDGET EXCEEDED: Duplicating ${target.name} (+${target.totalCost}D) exceeds remaining warband budget!`);
      return;
    }

    let countInRoster = activeRoster.filter(item => item.id === target.id).length;
    if (countInRoster >= target.max) {
      alert(`UNIT LIMIT REACHED: Maximum ${target.max} of ${target.name} allowed per Warband!`);
      return;
    }

    let clonedSlots = JSON.parse(JSON.stringify(target.equippedSlots));
    let dupInst = {
      ...target,
      instanceId: 'inst_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      equippedSlots: clonedSlots
    };

    activeRoster.push(dupInst);
    renderRoster();

    setTimeout(() => {
      let newCard = document.querySelector(`[data-card-inst="${dupInst.instanceId}"]`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        newCard.classList.add('highlight-recruit');
        setTimeout(() => newCard.classList.remove('highlight-recruit'), 1500);
      }
    }, 100);
  }

  // Render Full-Art Roster Cards with Glassmorphism Overlay Equipment Slots & Interactive Keywords
  function renderRoster() {
    activeRosterList.innerHTML = '';

    if (activeRoster.length === 0) {
      activeRosterList.innerHTML = `<div class="empty-roster-msg">NO UNITS RECRUITED YET. SELECT UNITS FROM THE FULL-ART CATALOGUE ABOVE.</div>`;
    } else {
      activeRoster.forEach((u, idx) => {
        let card = document.createElement('div');
        card.className = 'full-art-roster-card';
        card.setAttribute('data-card-inst', u.instanceId);
        card.style.backgroundImage = `url('${u.img}')`;

        let slotRangedName = u.equippedSlots.ranged ? u.equippedSlots.ranged.name : 'Empty Slot';
        let slotMeleeName = u.equippedSlots.melee ? u.equippedSlots.melee.name : 'Empty Slot';
        let slotArmourName = u.equippedSlots.armour ? u.equippedSlots.armour.name : 'Empty Slot';
        let slotShieldsName = u.equippedSlots.shields ? u.equippedSlots.shields.name : 'Empty Slot';
        let slotGrenadesName = u.equippedSlots.grenades ? u.equippedSlots.grenades.name : 'Empty Slot';
        let slotEquipmentName = u.equippedSlots.equipment ? u.equippedSlots.equipment.name : 'Empty Slot';

        // Compute Combined Keywords (Model Base + Equipped Wargear Keywords)
        let activeKeywords = [...u.baseKeywords];
        Object.values(u.equippedSlots).forEach(item => {
          if (item && item.kw) {
            item.kw.forEach(k => {
              if (!activeKeywords.includes(k)) activeKeywords.push(k);
            });
          }
        });

        let kwPillsHTML = activeKeywords.map(k => {
          let isEquipKw = !u.baseKeywords.includes(k);
          return `<span class="kw-pill ${isEquipKw ? 'equip-kw' : 'base-kw'}" data-kw="${k}">${k}</span>`;
        }).join(' ');

        card.innerHTML = `
          <!-- Header Glass Overlay -->
          <div class="card-top-overlay">
            <div class="card-title-row">
              <span class="card-unit-name">#${idx + 1} ${u.name} ${u.isLeader ? '⭐' : ''}</span>
              <span class="card-cost-badge">${u.totalCost} D</span>
            </div>
            <div class="card-meta-line">${u.cat} • (${u.baseCost} Base + ${u.totalCost - u.baseCost} Gear)</div>
          </div>

          <!-- Middle Stats & Equipment Slots Overlay Layered DIRECTLY on Artwork -->
          <div class="card-mid-overlay">
            <div class="card-stats-strip">${u.fullStats}</div>
            
            <div class="card-slots-overlay-grid">
              <div class="card-slot-pill ${u.equippedSlots.ranged ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="ranged">
                <span class="slot-pill-header">🔫 Ranged:</span>
                <span class="slot-pill-title">${slotRangedName}</span>
              </div>

              <div class="card-slot-pill ${u.equippedSlots.melee ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="melee">
                <span class="slot-pill-header">🗡️ Melee:</span>
                <span class="slot-pill-title">${slotMeleeName}</span>
              </div>

              <div class="card-slot-pill ${u.equippedSlots.armour ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="armour">
                <span class="slot-pill-header">🛡️ Armour:</span>
                <span class="slot-pill-title">${slotArmourName}</span>
              </div>

              <div class="card-slot-pill ${u.equippedSlots.shields ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="shields">
                <span class="slot-pill-header">🛡️ Shield:</span>
                <span class="slot-pill-title">${slotShieldsName}</span>
              </div>

              <div class="card-slot-pill ${u.equippedSlots.grenades ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="grenades">
                <span class="slot-pill-header">💣 Grenade:</span>
                <span class="slot-pill-title">${slotGrenadesName}</span>
              </div>

              <div class="card-slot-pill ${u.equippedSlots.equipment ? 'has-item' : ''}" data-inst="${u.instanceId}" data-cat="equipment">
                <span class="slot-pill-header">🪖 Gear:</span>
                <span class="slot-pill-title">${slotEquipmentName}</span>
              </div>
            </div>

            <!-- Model Abilities & Special Keywords Section BELOW Equip Slots -->
            <div class="card-keywords-overlay">
              <div class="kw-overlay-label">MODEL ABILITIES & KEYWORDS (CLICK TO READ RULE):</div>
              <div class="kw-overlay-badges-box">${kwPillsHTML}</div>
            </div>
          </div>

          <!-- Bottom Action Bar -->
          <div class="card-bottom-bar-actions">
            <button type="button" class="btn-card-copy" data-inst="${u.instanceId}">📋 COPY MODEL</button>
            <button type="button" class="btn-card-remove" data-inst="${u.instanceId}">🗑️ REMOVE</button>
          </div>
        `;

        card.querySelectorAll('.card-slot-pill').forEach(slot => {
          slot.addEventListener('click', () => {
            openEquipDrawer(slot.dataset.inst, slot.dataset.cat);
          });
        });

        card.querySelectorAll('.kw-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            e.stopPropagation();
            openCodex(pill.dataset.kw);
          });
        });

        card.querySelector('.btn-card-copy').addEventListener('click', () => {
          duplicateUnit(u.instanceId);
        });

        card.querySelector('.btn-card-remove').addEventListener('click', () => {
          removeUnit(u.instanceId);
        });

        activeRosterList.appendChild(card);
      });
    }

    updateRosterAudit();
  }

  function removeUnit(instanceId) {
    activeRoster = activeRoster.filter(u => u.instanceId !== instanceId);
    renderRoster();
  }

  function updateRosterAudit() {
    let budget = parseInt(selBudget.value);
    let spent = activeRoster.reduce((sum, u) => sum + u.totalCost, 0);
    let remaining = budget - spent;
    let hasLeader = activeRoster.some(u => u.isLeader);

    budgetBadge.textContent = `BUDGET: ${spent} / ${budget} D`;
    modelCountBadge.textContent = `MODELS: ${activeRoster.length} / 12`;
    
    auditBudget.textContent = `${budget} Ducats`;
    auditSpent.textContent = `${spent} Ducats`;
    auditRemaining.textContent = `${remaining} Ducats`;
    auditModels.textContent = `${activeRoster.length} / 12 Models`;

    if (hasLeader) {
      auditLeader.textContent = "COMMANDER ASSIGNED (OK)";
      auditLeader.className = "status-ok";
    } else {
      auditLeader.textContent = "NO LEADER (REQUIRED)";
      auditLeader.className = "status-warning";
    }
  }

  // Equipment Drawer Engine
  equipAccBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      equipAccBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTargetSlotCat = btn.dataset.cat;
      renderEquipSelectionList();
    });
  });

  function openEquipDrawer(instanceId, category) {
    activeTargetSlotUnitId = instanceId;
    activeTargetSlotCat = category;

    equipAccBtns.forEach(b => {
      if (b.dataset.cat === category) b.classList.add('active');
      else b.classList.remove('active');
    });

    let unit = activeRoster.find(u => u.instanceId === instanceId);
    if (!unit) return;

    equipModalTitle.textContent = `SELECT EQUIPMENT: ${unit.name.toUpperCase()}`;
    equipModalSubtitle.textContent = `Choose an item for the [${category.toUpperCase()}] slot. Click an equipped item to unequip it.`;
    
    renderEquipSelectionList();
    equipModalOverlay.classList.remove('hidden');
  }

  function closeEquipDrawer() {
    equipModalOverlay.classList.add('hidden');
    activeTargetSlotUnitId = null;
    renderRoster();
  }

  btnCloseEquipModal.addEventListener('click', closeEquipDrawer);
  btnCloseModalBtn.addEventListener('click', closeEquipDrawer);

  function renderEquipSelectionList() {
    let unit = activeRoster.find(u => u.instanceId === activeTargetSlotUnitId);
    if (!unit) return;

    let items = masterBattlekit[activeTargetSlotCat] || [];
    let currentlyEquipped = unit.equippedSlots[activeTargetSlotCat];
    equipSelectionList.innerHTML = '';

    // None / Unequip Option
    let noneRow = document.createElement('div');
    noneRow.className = `equip-option-row ${!currentlyEquipped ? 'equipped-option' : ''}`;
    noneRow.innerHTML = `
      <div class="equip-opt-info">
        <h4>[EMPTY SLOT / UNEQUIP]</h4>
        <p>Do not equip an item in this slot.</p>
      </div>
      <div class="equip-opt-cost">0 D</div>
    `;
    noneRow.addEventListener('click', () => {
      setSlotItem(unit, activeTargetSlotCat, null);
    });
    equipSelectionList.appendChild(noneRow);

    items.forEach(eq => {
      let isEquipped = currentlyEquipped && currentlyEquipped.id === eq.id;
      let row = document.createElement('div');
      row.className = `equip-option-row ${isEquipped ? 'equipped-option' : ''}`;
      row.innerHTML = `
        <div class="equip-opt-info">
          <h4>${eq.name} ${isEquipped ? '✓ (EQUIPPED)' : ''}</h4>
          <p>${eq.desc} • Key: ${eq.kw.join(', ')}</p>
        </div>
        <div class="equip-opt-cost">+${eq.cost} D</div>
      `;

      row.addEventListener('click', () => {
        if (isEquipped) {
          setSlotItem(unit, activeTargetSlotCat, null);
        } else {
          setSlotItem(unit, activeTargetSlotCat, eq);
        }
      });

      equipSelectionList.appendChild(row);
    });
  }

  function setSlotItem(unit, category, item) {
    let oldItem = unit.equippedSlots[category];
    let oldCost = oldItem ? oldItem.cost : 0;
    let newCost = item ? item.cost : 0;
    let diff = newCost - oldCost;

    let maxBudget = parseInt(selBudget.value);
    let totalSpent = activeRoster.reduce((sum, u) => sum + u.totalCost, 0);

    if (diff > 0 && totalSpent + diff > maxBudget) {
      alert(`DUCAT BUDGET EXCEEDED: Equipping ${item.name} (+${item.cost}D) exceeds remaining warband budget!`);
      return;
    }

    unit.equippedSlots[category] = item;
    unit.totalCost += diff;

    closeEquipDrawer();
  }

  btnClearRoster.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the active combat roster?")) {
      activeRoster = [];
      renderRoster();
    }
  });

  // Save Roster to Local Storage Vault
  btnSaveRoster.addEventListener('click', () => {
    let name = txtWarbandName.value.trim() || "Unnamed Warband";
    if (activeRoster.length === 0) {
      alert("Cannot save an empty roster! Recruit units first.");
      return;
    }

    let hasLeader = activeRoster.some(u => u.isLeader);
    if (!hasLeader) {
      alert("VALIDATION ERROR: A Warband MUST contain at least 1 Leader model!");
      return;
    }

    let record = {
      vaultId: 'v_' + Date.now(),
      name,
      faction: selFaction.options[selFaction.selectedIndex].text,
      budget: selBudget.value,
      spent: activeRoster.reduce((sum, u) => sum + u.totalCost, 0),
      modelsCount: activeRoster.length,
      roster: [...activeRoster],
      savedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    savedVault.unshift(record);
    localStorage.setItem('tc_warband_vault', JSON.stringify(savedVault));
    alert(`WARBAND SAVED TO VAULT: "${name}" (${record.spent} Ducats, ${record.modelsCount} Models)`);
    updateVaultCount();
  });

  // Export JSON
  btnExportJSON.addEventListener('click', () => {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeRoster, null, 2));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${txtWarbandName.value.replace(/\s+/g, '_')}_roster.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Render Saved Vault
  function renderVault() {
    updateVaultCount();
    vaultGrid.innerHTML = '';

    if (savedVault.length === 0) {
      vaultGrid.innerHTML = `<div class="empty-vault-msg">NO SAVED ROSTERS IN VAULT YET. BUILD A WARBAND AND CLICK "SAVE ROSTER TO VAULT".</div>`;
      return;
    }

    savedVault.forEach((v) => {
      let card = document.createElement('div');
      card.className = 'vault-card-item';
      card.innerHTML = `
        <h3>${v.name}</h3>
        <div class="vault-meta">• Faction: ${v.faction}</div>
        <div class="vault-meta">• Spent: <strong>${v.spent} / ${v.budget} Ducats</strong></div>
        <div class="vault-meta">• Models: <strong>${v.modelsCount} / 12</strong></div>
        <div class="vault-meta">• Saved: ${v.savedAt}</div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button type="button" class="btn-primary" style="flex:1; font-size:0.75rem;" data-load="${v.vaultId}">LOAD ROSTER</button>
          <button type="button" class="btn-danger" style="font-size:0.75rem;" data-del="${v.vaultId}">DELETE</button>
        </div>
      `;

      card.querySelector('[data-load]').addEventListener('click', () => {
        loadVaultRecord(v);
      });

      card.querySelector('[data-del]').addEventListener('click', () => {
        deleteVaultRecord(v.vaultId);
      });

      vaultGrid.appendChild(card);
    });
  }

  function loadVaultRecord(v) {
    txtWarbandName.value = v.name;
    activeRoster = [...v.roster];
    btnNavBuilder.click();
    renderRoster();
    alert(`LOADED ROSTER: "${v.name}"`);
  }

  function deleteVaultRecord(vaultId) {
    if (confirm("Delete this saved warband from vault?")) {
      savedVault = savedVault.filter(v => v.vaultId !== vaultId);
      localStorage.setItem('tc_warband_vault', JSON.stringify(savedVault));
      renderVault();
    }
  }

  function updateVaultCount() {
    vaultCount.textContent = savedVault.length;
  }

  // Initial Render
  renderCatalog();
  renderRoster();
  updateVaultCount();
});


  // 7 DEADLY SINS PLEDGE CONTROLLER
  const groupSinPledge = document.getElementById('groupSinPledge');
  const selSinPledge = document.getElementById('selSinPledge');
  const txtSinPledgeRule = document.getElementById('txtSinPledgeRule');

  const sinRulesDict = {
    "wrath": "🩸 WRATH: All Court models gain +1 Attack die when performing a Charge Action into close combat.",
    "envy": "👁️ ENVY: Enemy players CANNOT spend Blood Markers to modify dice rolls against your Court units.",
    "lust": "💋 LUST: Enemy models attempting a Charge Action against your Court units must pass a Courage Check or fail the charge.",
    "pride": "👑 PRIDE: All allied Court models gain a passive +1 Courage bonus while Praetor is on the battlefield.",
    "sloth": "😴 SLOTH: Enemy models ending activation within 8" treat Minor Hit results as Down status tokens.",
    "gluttony": "🍖 GLUTTONY: You may re-roll 1 failed Injury roll per turn during close combat attacks.",
    "greed": "💰 GREED: Your warband automatically generates +1 extra Blood Marker at the start of each turn."
  };

  function updateSinPledgeVisibility() {
    if (!selFaction || !groupSinPledge) return;
    if (selFaction.value === 'court_serpent') {
      groupSinPledge.style.display = 'block';
      if (selSinPledge && txtSinPledgeRule) {
        txtSinPledgeRule.textContent = sinRulesDict[selSinPledge.value] || '';
      }
    } else {
      groupSinPledge.style.display = 'none';
    }
  }

  if (selFaction) {
    selFaction.addEventListener('change', () => {
      updateSinPledgeVisibility();
    });
  }

  if (selSinPledge) {
    selSinPledge.addEventListener('change', () => {
      if (txtSinPledgeRule) {
        txtSinPledgeRule.textContent = sinRulesDict[selSinPledge.value] || '';
      }
    });
  }

  updateSinPledgeVisibility();
  if (typeof updateSubfactionOptions === 'function') updateSubfactionOptions();
});
