interface Term {
  termId: string;
  termName: string;
  description: string;
}

export function getTerms(): Record<string, Term> {
  const terms: Record<string, Term> = {
    "<\\$ba.sluggish>": {
      termId: "<\\$ba.sluggish",
      termName: "Slow",
      description: "-80% Movement Speed",
    },
    "<\\$ba.root>": {
      termId: "<\\$ba.root",
      termName: "Bind",
      description: "Unable to move",
    },
    "<\\$ba.stun>": {
      termId: "<\\$ba.stun",
      termName: "Stun",
      description: "Unable to move, block, attack, or use skills",
    },
    "<\\$ba.buffres>": {
      termId: "<\\$ba.buffres",
      termName: "Status Resistance",
      description:
        "Negative Status durations(<$ba.stun>Stun</>, <$ba.cold>Cold</>, <$ba.frozen>Freeze</>, etc.) halved (does not stack with the same effect)",
    },
    "<\\$ba.invisible>": {
      termId: "<\\$ba.invisible",
      termName: "Invisible",
      description:
        "Prevents being targeted by enemy attacks if the unit is not blocking",
    },
    "<\\$ba.camou>": {
      termId: "<\\$ba.camou",
      termName: "Camouflage",
      description:
        "Prevents being targeted by normal enemy attacks if the unit is not blocking (but will still take Splash damage)",
    },
    "<\\$ba.fragile>": {
      termId: "<\\$ba.fragile",
      termName: "Fragile",
      description:
        "Amplifies all Physical, Arts, and True damage taken by the corresponding amount (only the strongest effect of this type applies)",
    },
    "<\\$ba.shield>": {
      termId: "<\\$ba.shield",
      termName: "Shield",
      description: "Blocks 1 instance of damage per layer of Shield",
    },
    "<\\$ba.protect>": {
      termId: "<\\$ba.protect",
      termName: "Sanctuary",
      description:
        "Reduces incoming Physical and Arts damage by the corresponding amount (only the strongest effect of this type applies)",
    },
    "<\\$ba.cold>": {
      termId: "<\\$ba.cold",
      termName: "Cold",
      description:
        "Reduces ASPD by 30 and causes subsequent applications of the Cold status during the debuff duration to inflict <$ba.frozen>Frozen</>",
    },
    "<\\$ba.frozen>": {
      termId: "<\\$ba.frozen",
      termName: "Frozen",
      description:
        "Unable to move, attack, or use skills (inflicted through the <$ba.cold>Cold</> status); When enemies are frozen, RES -15",
    },
    "<\\$ba.sleep>": {
      termId: "<\\$ba.sleep",
      termName: "Sleep",
      description: "Invulnerable and unable to take any actions",
    },
    "<\\$ba.inspire>": {
      termId: "<\\$ba.inspire",
      termName: "Inspiration",
      description:
        "Increases base stats (only the strongest effect of this type applies for each stat)",
    },
    "<\\$ba.binding>": {
      termId: "<\\$ba.binding",
      termName: "Tied",
      description:
        "When the corresponding Tied unit is no longer on the battlefield, this unit's skill immediately ends, SP is set to 0, and SP can no longer be gained",
    },
    "<\\$ba.dt.neural>": {
      termId: "<\\$ba.dt.neural",
      termName: "Nervous Impairment",
      description:
        "After Nervous Impairment reaches 1000, the affected unit takes 1000 True damage and is <$ba.stun>Stunned</> for 10s",
    },
    "<\\$ba.charged>": {
      termId: "<\\$ba.charged",
      termName: "Charged",
      description:
        "Can continue recovering SP after reaching the maximum. When SP reaches double the maximum, enters Charged state. Skills have additional effects when activated in Charged state (All SP will be consumed whenever the skill is activated)",
    },
    "<\\$ba.strong>": {
      termId: "<\\$ba.strong",
      termName: "Vigor",
      description:
        "When HP is higher than a certain percentage, increases ATK by the effect percentage (only the highest ATK increase from effects of this type will be applied)",
    },
    "<\\$ba.dt.erosion>": {
      termId: "<\\$ba.dt.erosion",
      termName: "Corrosion Damage",
      description:
        "After Corrosion Damage reaches 1000, the affected unit has its DEF permanently reduced by 100 and takes 800 Physical damage",
    },
    "<\\$ba.dt.burning>": {
      termId: "<\\$ba.dt.burning",
      termName: "Burn Damage",
      description:
        "After Burn Damage reaches 1000, the affected unit has its RES reduced by 20 for 10 seconds and takes 1200 Arts damage",
    },
    "<\\$ba.float>": {
      termId: "<\\$ba.float",
      termName: "Low-Altitude Hovering",
      description: "Cannot be blocked or attacked by melee attacks",
    },
    "<\\$ba.refraction>": {
      termId: "<\\$ba.refraction",
      termName: "Refraction",
      description: "When in effect, RES +70",
    },
    "<\\$ba.dt.element>": {
      termId: "<\\$ba.dt.element",
      termName: "Elemental Damage",
      description:
        "Includes <$ba.dt.neural>Nervous Impairment</>, <$ba.dt.erosion>Corrosion Damage</>, <$ba.dt.burning>Burn Damage</>, and <$ba.dt.apoptosis>Necrosis Damage</>",
    },
    "<\\$ba.overdrive>": {
      termId: "<\\$ba.overdrive",
      termName: "Overload",
      description:
        "Skill duration has two gauges. Extra effect is triggered when skill duration is halfway complete.",
    },
    "<\\$ba.dt.apoptosis>": {
      termId: "<\\$ba.dt.apoptosis",
      termName: "Necrosis Damage",
      description:
        "After Necrosis Damage reaches 1000, the affected unit cannot use skills for 15 seconds and every second loses 1 SP and takes 100 Arts damage",
    },
    "<\\$ba.debuff>": {
      termId: "<\\$ba.debuff",
      termName: "Negative Status",
      description:
        "Includes <$ba.stun>Stun</>, <$ba.cold>Cold</>, <$ba.frozen>Freeze</>, etc.",
    },
    "<\\$ba.levitate>": {
      termId: "<\\$ba.levitate",
      termName: "Levitate",
      description:
        "Target becomes aerial and cannot move, attack, or use skills. Duration halved if Weight is greater than 3.",
    },
    "<\\$ba.physhield>": {
      termId: "<\\$ba.physhield",
      termName: "Physical Shield",
      description:
        "Blocks 1 instance of Physical damage per layer of Physical Shield",
    },
    "<\\$ba.magicfragile>": {
      termId: "<\\$ba.magicfragile",
      termName: "Arts Fragility",
      description:
        "Amplifies all Arts damage taken by the corresponding amount (only the strongest effect of this type applies)",
    },
    "<\\$ba.dying>": {
      termId: "<\\$ba.dying",
      termName: "Critically Wounded",
      description:
        "Movement Speed reduced, cannot be blocked, dies after 10s, restores SP to the attacker when defeated.",
    },
    "<\\$ba.barrier>": {
      termId: "<\\$ba.barrier",
      termName: "<\\$barrier",
      description: "Absorbs a certain amount of damage.",
    },
    "<\\$ba.weightless>": {
      termId: "<\\$ba.weightless",
      termName: "Weightless",
      description:
        "Weight reduced by 1 level (effects of the same name do not stack)",
    },
    "<\\$ba.berserk>": {
      termId: "<\\$ba.berserk",
      termName: "Tenacity",
      description:
        "Increases stats proportionally based on lost HP, reaching the maximum bonus once a certain percentage has been lost (only the strongest effect of this type applies)",
    },
    "<\\$ba.steal>": {
      termId: "<\\$ba.steal",
      termName: "Steal",
      description:
        "Reduces the target's base stats while increasing own. The reduction and increase in stats cannot exceed the specified upper limit (only the strongest effect of this type applies)",
    },
    "<\\$ba.weaken>": {
      termId: "<\\$ba.weaken",
      termName: "Enfeeble",
      description:
        "Reduces the target's ATK by the corresponding amount (only the strongest effect with this name applies)",
    },
    "<\\$ba.dt.apoptosis2>": {
      termId: "<\\$ba.dt.apoptosis2",
      termName: "Necrosis Damage - Player",
      description:
        "Explodes when at max (1000 for Normal and Elite, 2000 for Leaders), inflicting 50%<$ba.weaken>Enfeeble</> that gradually recovers, and dealing 800 Elemental Damage per second. 15s cooldown.",
    },
    "<\\$ba.epbarrier>": {
      termId: "<\\$ba.epbarrier",
      termName: "Protective Barrier",
      description:
        "Absorbs a certain amount of <$ba.dt.element>Elemental Damage</>.",
    },
    "<\\$cc.bd_A_1>": {
      termId: "<\\$cc.bd_A_1",
      termName: "Psychokinesis",
      description: "Operators with this skill\nRosmontis",
    },
    "<\\$cc.bd_A_2>": {
      termId: "<\\$cc.bd_A_2",
      termName: "Manifestation of Consciousness",
      description: "Operators with this skill\nRosmontis",
    },
    "<\\$cc.bd_B_1>": {
      termId: "<\\$cc.bd_B_1",
      termName: "Lingering Melody",
      description: "Operators with this skill\nEbenholz",
    },
    "<\\$cc.bd_B_2>": {
      termId: "<\\$cc.bd_B_2",
      termName: "Harmony Astray",
      description: "Operators with this skill\nEbenholz",
    },
    "<\\$cc.bd_A>": {
      termId: "<\\$cc.bd_A",
      termName: "Chain of Thought",
      description:
        "Affects skills related to <$cc.bd_A_1><@cc.rem>Psychokinesis</></> and <$cc.bd_A_2><@cc.rem>Manifestation of Consciousness</></>\nProvided by the following Operators' skills:\nRosmontis",
    },
    "<\\$cc.bd_B>": {
      termId: "<\\$cc.bd_B",
      termName: "Soundless Resonance",
      description:
        "Affects skills related to <$cc.bd_B_1><@cc.rem>Lingering Melody</></> and <$cc.bd_B_2><@cc.rem>Harmony Astray</></>\nProvided by the following Operator's skills:\nEbenholz",
    },
    "<\\$cc.bd_C>": {
      termId: "<\\$cc.bd_C",
      termName: "Witchcraft Crystal",
      description: "Operators with this skill\nJieyun",
    },
    "<\\$cc.bd_a1>": {
      termId: "<\\$cc.bd_a1",
      termName: "Perception Information",
      description:
        "Affects skills related to <$cc.bd_A><@cc.rem>Chain of Thought</></> and <$cc.bd_B><@cc.rem>Soundless Resonance</></>\nProvided by the following Operators' skills:\nRosmontis, Ebenholz, Dusk, Ling, Whisperain, Iris, Czerny",
    },
    "<\\$cc.bd_b1>": {
      termId: "<\\$cc.bd_b1",
      termName: "Worldly Plight",
      description:
        "Affects <$cc.bd_C><@cc.rem>Witchcraft Crystal</></> skills\nProvided by the following Operators' skills\nDusk, Ling, Chongyue, Mr. Nothing, Mulberry",
    },
    "<\\$cc.bd_ash>": {
      termId: "<\\$cc.bd_ash",
      termName: "Intelligence Reserve",
      description: "Provided by the following Operator's skills\nAsh",
    },
    "<\\$cc.bd_tachanka>": {
      termId: "<\\$cc.bd_tachanka",
      termName: "Ursus Specialty Beverage",
      description: "Provided by the following Operator's skills\nTachanka",
    },
    "<\\$cc.bd_malist>": {
      termId: "<\\$cc.bd_malist",
      termName: "Engineering Robot",
      description: "Provided by the following Operator's skills\nMinimalist",
    },
    "<\\$cc.bd_a1_a1>": {
      termId: "<\\$cc.bd_a1_a1",
      termName: "Memory Fragments",
      description:
        "Affects skills related to <$cc.bd_a1><@cc.rem>Perception Information</></>\nProvided by the following Operator's skills\nWhisperain",
    },
    "<\\$cc.bd_a1_a2>": {
      termId: "<\\$cc.bd_a1_a2",
      termName: "Dreamland",
      description:
        "Affects skills related to <$cc.bd_a1><@cc.rem>Perception Information</></>\nProvided by the following Operator's skills\nIris",
    },
    "<\\$cc.bd_a1_a3>": {
      termId: "<\\$cc.bd_a1_a3",
      termName: "Measure",
      description:
        "Affects skills related to <$cc.bd_a1><@cc.rem>Perception Information</></>\nProvided by the following Operator's skills\nCzerny",
    },
    "<\\$cc.bd.costdrop>": {
      termId: "<\\$cc.bd.costdrop",
      termName: "Morale Difference",
      description:
        "Difference between an Operator's max morale and current morale",
    },
    "<\\$cc.bd_felyne>": {
      termId: "<\\$cc.bd_felyne",
      termName: "Felvine",
      description:
        "Affects related skills <$cc.bd_felyne_1><@cc.rem>Lovable Felynes</></>, <$cc.bd_felyne_2><@cc.rem>Trusty Buddies</></>\nProvided by the following Operators' skills\nRathalos S Noir Corne, Kirin R Yato",
    },
    "<\\$cc.bd_felyne_1>": {
      termId: "<\\$cc.bd_felyne_1",
      termName: "Lovable Felynes",
      description: "Operator with this skill\nTerra Research Commission",
    },
    "<\\$cc.bd_felyne_2>": {
      termId: "<\\$cc.bd_felyne_2",
      termName: "Trusty Buddies",
      description: "Operator with this skill\nTerra Research Commission",
    },
    "<\\$cc.m.var1>": {
      termId: "<\\$cc.m.var1",
      termName: "Recycling",
      description: "Operators with this skill\nVermeil",
    },
    "<\\$cc.m.var2>": {
      termId: "<\\$cc.m.var2",
      termName: "Cooperative Will",
      description: "Operators with this skill\nWaai Fu",
    },
    "<\\$cc.t.snsant1>": {
      termId: "<\\$cc.t.snsant1",
      termName: "Heavenly Reward α",
      description: "Operators with this skill\nSnowsant",
    },
    "<\\$cc.t.snsant2>": {
      termId: "<\\$cc.t.snsant2",
      termName: "Heavenly Reward β",
      description: "Operators with this skill\nSnowsant",
    },
    "<\\$cc.g.lgd>": {
      termId: "<\\$cc.g.lgd",
      termName: "Lungmen Guard Department",
      description: "Includes the following Operators:\nCh'en, Hoshiguma, Swire",
    },
    "<\\$cc.g.lda>": {
      termId: "<\\$cc.g.lda",
      termName: "Lee's Detective Agency",
      description: "Includes the following Operators\nLee, Aak, Hung, Waai Fu",
    },
    "<\\$cc.g.ussg>": {
      termId: "<\\$cc.g.ussg",
      termName: "Ursus Student Self-Governing Group",
      description:
        "Includes the following Operators:\nRosa, Zima, Istina, Gummy",
    },
    "<\\$cc.g.R6>": {
      termId: "<\\$cc.g.R6",
      termName: "Team Rainbow",
      description:
        "Includes the following Operators:\nAsh, Tachanka, Blitz, Frost",
    },
    "<\\$cc.g.sp>": {
      termId: "<\\$cc.g.sp",
      termName: "Alternate",
      description: "Includes all Alternate Operators.",
    },
    "<\\$cc.g.abyssal>": {
      termId: "<\\$cc.g.abyssal",
      termName: "Abyssal Hunter",
      description:
        "Includes the following Operators:\nGladiia, Skadi, Specter, Andreana",
    },
    "<\\$cc.g.psk>": {
      termId: "<\\$cc.g.psk",
      termName: "Pinus Sylvestris",
      description:
        "Includes the following Operators: \nFlametail, Fartooth, Ashlock, Wild Mane, 'Justice Knight'",
    },
    "<\\$cc.g.karlan>": {
      termId: "<\\$cc.g.karlan",
      termName: "Karlan Trade",
      description:
        "Includes the following Operators\nSilverAsh, Gnosis, Pramanix, Cliffheart, Matterhorn, Courier, Kjera, Aurora",
    },
    "<\\$cc.g.sui>": {
      termId: "<\\$cc.g.sui",
      termName: "Sui",
      description:
        "Includes the following Operators\nNian, Dusk, Ling, Chongyue",
    },
    "<\\$cc.g.glasgow>": {
      termId: "<\\$cc.g.glasgow",
      termName: "Glasgow Gang",
      description:
        "Includes the following Operators:\nSiege, Morgan, Dagda, Indra",
    },
    "<\\$cc.g.rh>": {
      termId: "<\\$cc.g.rh",
      termName: "Rhine Lab",
      description:
        "Includes the following Operators:\nSilence, Ifrit, Saria, Ptilopsis, Mayer, Magallan, Dorothy, Astgenne, Muelsyse",
    },
    "<\\$cc.c.abyssal2_1>": {
      termId: "<\\$cc.c.abyssal2_1",
      termName: "Special Bonus",
      description:
        "For every <$cc.g.abyssal><@cc.kw>Abyssal Hunter</></> operator stationed in a Factory, the Control Center provides <@cc.vup>5%</> Productivity for every Factory with an <$cc.g.abyssal><@cc.kw>Abyssal Hunter</></> operator stationed within it, up to a maximum of <@cc.vup>45%</> Productivity",
    },
    "<\\$cc.c.abyssal2_2>": {
      termId: "<\\$cc.c.abyssal2_2",
      termName: "Special Bonus",
      description:
        "For every <$cc.g.abyssal><@cc.kw>Abyssal Hunter</></> operator stationed in a Factory, the Control Center provides <@cc.vup>10%</> Productivity for every Factory with an <$cc.g.abyssal><@cc.kw>Abyssal Hunter</></> operator stationed within it, up to a maximum of <@cc.vup>90%</> Productivity",
    },
    "<\\$cc.c.abyssal2_3>": {
      termId: "<\\$cc.c.abyssal2_3",
      termName: "Special Interaction Rules",
      description:
        "Takes priority over <$cc.m.var2><@cc.rem>Cooperative Will</></>, and does not stack\nDoes not stack with <$cc.m.pow1><@cc.rem>Automation α</></>, <$cc.m.pow2><@cc.rem>Automation β</></>, or <$cc.m.pow3><@cc.rem>Bionic Seadragon</></>, and the 'set to 0' effect will take priority",
    },
    "<\\$cc.c.room1>": {
      termId: "<\\$cc.c.room1",
      termName: "Certain Facilities",
      description:
        "Includes the following facilities: \nPower Plant, HR Office, Reception Room",
    },
    "<\\$cc.c.room2>": {
      termId: "<\\$cc.c.room2",
      termName: "Other Facilities",
      description:
        "Includes the following facilities: \nPower Plant, Factory, Trading Post, HR Office, Reception Room",
    },
    "<\\$cc.c.skill>": {
      termId: "<\\$cc.c.skill",
      termName: "Certain Skills",
      description:
        "Includes the following skills: \nCapable Assistance, S.W.E.E.P., Snack Network, Cleaning Agreement, Substitute, Necessary Responsibility, Guarding, Tiny Leader, Self-Absorbed",
    },
    "<\\$cc.t.strong2>": {
      termId: "<\\$cc.t.strong2",
      termName: "Special Interaction Rules",
      description:
        "Cannot stack with <$cc.t.snsant1><@cc.rem>Heavenly Reward α</></>, <$cc.t.snsant2><@cc.rem>Heavenly Reward β</></>, and will take precedence instead\nWhen <$cc.t.snsant1><@cc.rem>Heavenly Reward α</></>, <$cc.t.snsant2><@cc.rem>Heavenly Reward β</></> stacks with other skills, this skill will take effect on the resulting effect",
    },
    "<\\$cc.c.sui2_1>": {
      termId: "<\\$cc.c.sui2_1",
      termName: "Special comparison rules",
      description:
        "Compare hourly Morale recovery totals of <$cc.c.room2><@cc.kw>other buildings</></> provided by other Operator skills in the Control Center. The strongest effect applies.",
    },
    "<\\$cc.m.pow1>": {
      termId: "<\\$cc.m.pow1",
      termName: "Automation α",
      description:
        "Provided by the following Operator(s):\nWeedy, Eunectes, Passenger",
    },
    "<\\$cc.m.pow2>": {
      termId: "<\\$cc.m.pow2",
      termName: "Automation β",
      description: "Provided by the following Operator(s):\nEunectes",
    },
    "<\\$cc.m.pow3>": {
      termId: "<\\$cc.m.pow3",
      termName: "Bionic Seadragon",
      description: "Provided by the following Operator(s):\nWeedy",
    },
    "<\\$cc.t.flow_gold>": {
      termId: "<\\$cc.t.flow_gold",
      termName: "Pure Gold Production Line",
      description:
        "For <@cc.kw>every</> <@cc.kw>Factory</> producing <@cc.kw>Pure Gold</>, Pure Gold Production Line <@cc.kw>+1</>",
    },
    "<\\$cc.w.ncdeer1>": {
      termId: "<\\$cc.w.ncdeer1",
      termName: "Causality",
      description:
        "Whenever a recipe that consumes <@cc.kw>4</> or less Morale fails to produce a byproduct, gain <@cc.kw>1</> point of <@cc.kw>Causality</> for every <@cc.kw>1</> Morale consumed",
    },
    "<\\$cc.w.ncdeer2>": {
      termId: "<\\$cc.w.ncdeer2",
      termName: "Karma",
      description:
        "Whenever a recipe that consumes <@cc.kw>8</> Morale fails to produce a byproduct, gain <@cc.kw>1</> point of <@cc.kw>Karma</> for every <@cc.kw>1</> Morale consumed",
    },
    "<\\$cc.sk.manu1>": {
      termId: "<\\$cc.sk.manu1",
      termName: "Standardization Skills",
      description:
        "Include the following skills\nStandardization α, Standardization β",
    },
    "<\\$cc.sk.manu2>": {
      termId: "<\\$cc.sk.manu2",
      termName: "Rhine Tech-type Skill",
      description:
        "Includes the following skills:\nRhine Tech α, Rhine Tech β, Rhine Tech γ",
    },
    "<\\$cc.sk.manu3>": {
      termId: "<\\$cc.sk.manu3",
      termName: "Pinus Sylvestris Skills",
      description:
        "Includes the following skills: \nPinus Sylvestris α, Pinus Sylvestris β",
    },
    "<\\$cc.sk.manu4>": {
      termId: "<\\$cc.sk.manu4",
      termName: "Metalwork-type Skill",
      description: "Includes the following skills:\nMetalwork α, Metalwork β",
    },
    "<\\$cc.tag.op>": {
      termId: "<\\$cc.tag.op",
      termName: "Operation Platform",
      description:
        "Includes the following Operators:\nLancet-2, Castle-3, THRM-EX, Justice Knight, Friston-3",
    },
    "<\\$cc.tag.knight>": {
      termId: "<\\$cc.tag.knight",
      termName: "Knight",
      description:
        "Includes the following operators\nNearl the Radiant Knight, Nearl, Blemishine, Whislash, Flametail, Fartooth, Ashlock, Wild Mane, Justice Knight, Gravel",
    },
    "<\\$cc.tag.durin>": {
      termId: "<\\$cc.tag.durin",
      termName: "Durin",
      description:
        "Includes the following Operators:\nMinimalist, Myrtle, Chestnut, Durin",
    },
    "<\\$cc.tag.mh>": {
      termId: "<\\$cc.tag.mh",
      termName: "Monster Hunter Party",
      description:
        "Includes the following Operators:\nRathalos S Noir Corne, Kirin R Yato, Terra Research Commission",
    },
    "<\\$cc.gvial>": {
      termId: "<\\$cc.gvial",
      termName: "Gavial",
      description:
        "Includes the following Operators:\nGavial the Invincible, Gavial",
    },
  };
  return terms;
}
