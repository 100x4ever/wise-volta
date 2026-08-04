/* Master Keyword Rules Codex Dictionary with Explicit PASSIVE vs ACTIVATED Classification across All Units, Subfactions, and Equipment */
const masterCodex = {

    "COMBINED ARMS": {
      cat: "New Antioch Line Force",
      desc: "Combined Arms tactic: Reroll 1 failed Initiative tie-breaker roll per battle.",
      impact: "Initiative Tie-Breaker Reroll"
    },
    "EMERALD SHARPSHOOTER": {
      cat: "Eire Rangers Trait",
      desc: "Ranged attacks ignore target cover bonuses beyond 12" distance.",
      impact: "Ignore Cover Beyond 12""
    },
    "HIGHLAND CHARGE": {
      cat: "Kingdom of Alba Trait",
      desc: "Highland Claymores and Greatswords deal +1 Injury roll modifier on Charge Actions.",
      impact: "+1 Injury Modifier on Charge"
    },
    "LION OF JUDAH": {
      cat: "Abyssinia Expedition Trait",
      desc: "Abyssinian Heavy Infantry gain +1 Wounds and heavy mechanized plate armor.",
      impact: "+1 Wounds • Heavy Plate Armor"
    },
    "RED BRIGADE ASSAULT": {
      cat: "The Red Brigade Trait",
      desc: "Shotguns and SMGs gain +1 to hit when firing at targets within 6" distance.",
      impact: "+1 Hit within 6" Range"
    },


    "MARKSMANSHIP OF THE IRON WALL": {
      cat: "Elevated Position Sniper Bonus",
      desc: "Models firing from an Elevated Position gain +2 DICE to Ranged Attack rolls (instead of +1).",
      impact: "+2 Ranged Dice on High Ground"
    },
    "SIEGE JEZZAIL TEAMS": {
      cat: "Paired Spotter Team",
      desc: "Siege Jezzails gain +1 DICE to hit when paired with a friendly spotter model within 1".",
      impact: "+1 Ranged Die with Spotter"
    },
    "SILAHDAR COMMANDER": {
      cat: "Iron Wall Commander",
      desc: "Personal bodyguard commander of the Sultan. Gains STRONG keyword, Alaybozan, and Anqā Guard plate.",
      impact: "STRONG Keyword • Alaybozan & Anqā Guard"
    },
    "SAPPER CORPS": {
      cat: "Double-Strength Demolition",
      desc: "Can include up to 4 Sultanate Sappers with demolition satchels and field artillery.",
      impact: "0-4 Sultanate Sappers"
    },


    "KAVASS GUARDIANS": {
      cat: "House of Wisdom Bodyguards",
      desc: "Up to 3 Azebs upgraded to Kavass Guardians (+5D each). Melee characteristic increases to +0 DICE.",
      impact: "+0 Melee Die • Sworn Library Bodyguards"
    },
    "TAKWIN HOMUNCULUS": {
      cat: "Alchemical Construct",
      desc: "1 Takwin Homunculus construct paired with each Jabirean Alchemist. Shares alchemical formulas and ignores Fear.",
      impact: "Paired Alchemist Construct"
    },
    "WEAPON COLLECTIONS": {
      cat: "Library Armory Access",
      desc: "Can purchase 1 item from New Antioch Armoury AND 1 item from Trench Pilgrims Armoury.",
      impact: "Cross-Faction Armoury Access (Antioch & Pilgrims)"
    },


    "KILLING SQUAD FIRETEAM": {
      cat: "Fidai Tactics",
      desc: "Assign 2 models to a Killing Squad Fireteam. Both models gain FIRETEAM keyword and perform synchronized activations.",
      impact: "2-Model Synchronized Fireteam"
    },
    "WHIRLING DERVISH": {
      cat: "Dervish Combat Dance",
      desc: "Dervish warrior monks ignore off-hand weapon penalties and gain +1 Attack die when dual-wielding curved scimitars.",
      impact: "Dual-Wield Dance • No Off-Hand Penalty"
    },
    "DERVISHES OF ALAMUT": {
      cat: "Subfaction Warrior Monks",
      desc: "Sworn to poverty and lethal blade combat. Fast skirmishers replacing heavy Janissaries.",
      impact: "0-4 Fast Dual-Wield Skirmishers"
    },


    "SILENT ASSASSINATION": {
      cat: "Fidai Assassin Trait",
      desc: "Fidai Master Assassins gain +2 to hit on all melee and ranged attack rolls targeting enemy LEADER models.",
      impact: "+2 Hit vs Enemy Leaders"
    },
    "TAKWIN CREATIONS": {
      cat: "House of Wisdom Trait",
      desc: "Golems, Homunculi, and Sipahi Automaton Cavalry ignore Pinning, Morale penalties, and FEAR.",
      impact: "Ignore Pinning & Fear"
    },
    "FORTRESS DISCIPLINE": {
      cat: "Iron Wall Defense",
      desc: "Sultanate Wall Guards, Sappers, and Heavy Riflemen gain +1 Armour rating while in Trench Cover.",
      impact: "+1 Armour in Cover"
    },
    "SULTAN'S FAVOR": {
      cat: "Sultanate Initiative",
      desc: "May reroll 1 failed Initiative tie-breaker roll per battle.",
      impact: "Initiative Tie-Breaker Reroll"
    },


    "SEMI-CORPOREAL": {
      cat: "Trench Ghost Trait",
      desc: "All Trench Ghost models suffer -1 INJURY DIE from incoming ranged attacks due to spectral incorporeality.",
      impact: "-1 Ranged Injury Die"
    },
    "UNDEAD HORROR": {
      cat: "Trench Ghost Traits",
      desc: "All models gain FEAR, NEGATE DIFFICULT TERRAIN, and NEGATE GAS keywords.",
      impact: "Fear Aura • Negate Gas • Negate Terrain"
    },
    "BARBED WIRE BANSHEE AURA": {
      cat: "Banshee Screech",
      desc: "Enemies within 8" of a Barbed Wire Banshee take +1 INJURY DICE to all damage rolls.",
      impact: "+1 Enemy Injury Die (8" Aura)"
    },
    "TANK PALANQUIN": {
      cat: "Heretic Priest Mount",
      desc: "Ghostly armored tank palanquin mount (+60D) granting heavy armor and explosive treads.",
      impact: "+60D Ghost Tank Mount"
    },
    "SARCOPHAGUS MINE": {
      cat: "Explosive Trap",
      desc: "Troopers encased in explosive mine armor detonate when enemies move within 2".",
      impact: "Proximity Explosive Armor"
    },


    "FAST AS LIGHTNING": {
      cat: "Naval Raider Trait",
      desc: "Add +1 DICE to Risky Success rolls for Dash Actions taken by Heretic Naval Raider models.",
      impact: "+1 Dash Risky Success Die"
    },
    "CLOSE ASSAULT WEAPONS": {
      cat: "Naval Raider Armory",
      desc: "Submachine Guns cost only 25 Ducats for Heretic Naval Raider warbands.",
      impact: "Discounted SMG Cost (25D)"
    },
    "LIGHT TROOPS": {
      cat: "Naval Raider Restriction",
      desc: "Naval Raider warbands cannot include more than 2 Anointed models or more than 1 Artillery Witch.",
      impact: "Max 2 Anointed • Max 1 Artillery Witch"
    },
    "LET SLEEPING DOGS LIE": {
      cat: "Naval Raider Restriction",
      desc: "Heretic Naval Raider warbands cannot include War Wolf Assault Beasts.",
      impact: "No War Wolf Assault Beasts"
    },


    "UNSEEN ADVANCE": {
      cat: "Naval Raider Stealth",
      desc: "Heretic Naval Raiders deploy in infiltration stealth and gain +1 to hit on Charge Actions with close assault weapons.",
      impact: "Infiltration Stealth • +1 Charge Hit"
    },
    "ETHEREAL TERROR": {
      cat: "Trench Ghost Trait",
      desc: "Trench Ghosts take 1 less physical damage and force target enemy models to take an immediate Morale Check on hit.",
      impact: "Semi-Corporeal Shield • Instant Morale Check"
    },
    "MAMMON'S CHOSEN": {
      cat: "Knights of Avarice Trait",
      desc: "Gilded armour ignores the first Blood Marker penalty each turn and grants +50 starting Ducats.",
      impact: "Ignore 1st Blood Marker • +50 Ducats"
    },
    "BARBED WIRE BANSHEE": {
      cat: "Trench Ghost Specialist",
      desc: "Ethereal spirit wrapped in rusted wire that entangles and slashes enemy units within 3".",
      impact: "3" Entangling Wire Aura"
    },


    "ETERNAL APPETENCE": {
      cat: "Great Hunger Stance",
      desc: "At start of Turn, choose Famine (+1 Move & +1 Melee die) or Consumption (Heal 1 Wound/Marker when enemy dies within 6").",
      impact: "Dynamic Turn Stance: Famine vs Consumption"
    },
    "THE GREAT MAW": {
      cat: "Monstrous Cannibal",
      desc: "Loping cannibal giant available at 1000D warband cost. Devours enemy models in close combat.",
      impact: "Devouring Monstrous Melee Giant"
    },
    "BUTCHER KNIGHTS": {
      cat: "Hunger Knight Upgrade",
      desc: "Plague Knights in a Great Hunger warband gain +1 Attack die on Charge Actions.",
      impact: "+1 Melee Die on Charge"
    },


    "THE BEREAVED": {
      cat: "Dirge Subfaction Rule",
      desc: "Thralls in a Dirge warband are The Bereaved (Cost: 30D, Ranged +0 DICE). Can equip Ranged Weapons, Grenades, Musical Instruments, and Troop Flags.",
      impact: "+0 Ranged Die • Full Armory Access"
    },
    "THE LOST": {
      cat: "Dirge Restriction",
      desc: "Dirge warbands are restricted to 0-2 Hounds of the Black Grail and 0-2 Heralds of Beelzebub.",
      impact: "Max 2 Hounds • Max 2 Heralds"
    },
    "DISHONOURED": {
      cat: "Dirge Passive Aura",
      desc: "The mournful paeans of weeping Plague Knights inflict -1 DICE to all opponent Morale Checks.",
      impact: "-1 Enemy Morale Die Aura"
    },


    "INFECTION MARKERS": {
      cat: "Plague Weapon Keyword",
      desc: "Black Grail attacks place Infection Markers on targets. Infection Markers grow and stack up to 6, dealing end-of-turn damage if untreated.",
      impact: "Stacking Contagion Damage • Max 6 Markers"
    },
    "GRAIL MORALE RESILIENCE": {
      cat: "Faction Morale Penalty",
      desc: "Opponents suffer -1 DICE on all Morale Checks when fighting Cult of the Black Grail (unless Court of Seven or Black Grail).",
      impact: "-1 Enemy Morale Die"
    },
    "THE EXECUTOR": {
      cat: "Subfaction Commander",
      desc: "Dirge of the Great Hegemon commander. Uses Plague Knight profile with +1 Ranged DICE and TOUGH keyword (Cost: 80D).",
      impact: "+1 Ranged Die • TOUGH Keyword"
    },
    "THE ORDER OF THE FLY": {
      cat: "Warband Rule",
      desc: "Choose warband leader: Lord of Tumors (0-1 Lord + 0-2 Plague Knights) or Plague Knight Leader (0-3 Plague Knights).",
      impact: "Flexible Order Leadership Structure"
    },


    "LAW OF HELL": {
      cat: "Warband Rule",
      desc: "If a Wretched takes an enemy ELITE model Out of Action, it gains freedom! Immediately removed from game and no longer counts for Morale casualties.",
      impact: "Wretched Freedom on Elite Kill • Morale Immunity"
    },
    "BLESSINGS OF THE SERPENT MOON": {
      cat: "Goetic Spell",
      desc: "GOETIC (2/4/6) Spell: Cast before Injury Roll. Add -1 Injury Modifier for every 2 Blood Markers spent.",
      impact: "-1 Injury Penalty per 2 Blood Markers"
    },
    "SEARING FLAMES": {
      cat: "Crown of Hellfire",
      desc: "When ending Activation, place 1 Blood Marker next to every enemy model within 1" (unless Negate Fire).",
      impact: "1" End-of-Turn Blood Marker Aura"
    },
    "SUCKED DRY": {
      cat: "Armour of the Fly",
      desc: "After Fight Action, make extra Melee Attack with +1 DICE. If hit, place 1 Blood Marker on target.",
      impact: "Extra Melee Attack • Inflicts Blood Marker"
    },
    "SINISTER WHISPERS": {
      cat: "Urn of Bitter Ashes",
      desc: "Ranged attacks targeting this model (or allies within 3") suffer -1 DICE to hit.",
      impact: "-1 Ranged Hit Die Aura (3")"
    },
    "DARK BLESSING": {
      cat: "Wretched Sacrifice",
      desc: "When a Wretched is taken Out of Action, place 1 Blessing Marker next to the nearest friendly Elite model.",
      impact: "Grants Blessing Marker to Nearby Elite"
    },


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
