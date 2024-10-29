export interface OpName {
  id: string;
  name: string;
}

export interface Blackboard {
  key: string;
  value: number;
  valueStr: string | null;
}

export interface Trait {
  candidates: {
    blackboard: Blackboard[];
    unlockCondition: UnlockCond;
    overrideDescripton: string;
  }[];
}

interface UnlockCond {
  phase: string;
  level: number;
}

export interface LvlUpCost {
  id: string;
  count: number;
  type: string;
}

export interface Operator {
  id?: string;
  name: string;
  description: string | null;
  potentialItemId: string | null;
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  displayNumber: string | null;
  appellation: string;
  position: "MELEE" | "RANGED" | "ALL" | "NONE";
  tagList: string[] | null;
  itemUsage: string | null;
  itemDesc: string | null;
  itemObtainApproach: string | null;
  isNotObtainable: boolean;
  maxPotentialLevel: number;
  isSpChar: boolean;
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  phases: Phase[];
  skills: SkillIds[];
  displayTokenDict: Record<string, boolean> | null;
  talents: Talent[] | null;
  potentialRanks: PotentialRank[];
  favorKeyFrames: FavorKeyFrame[] | null;
  allSkillLvlup: {
    unlockCond: UnlockCond;
    lvlUpCost: LvlUpCost[] | null;
  }[];
}

export interface SkillIds {
  skillId: string | null;
  levelUpCostCond: {
    unlockCond: UnlockCond;
    lvlUpTime: number;
    levelUpCost: LvlUpCost[] | null;
  }[];
overrideTokenKey: string | null;
}

export interface Skills {
  [skillId: string]: {
    skillId: string;
    levels: Level[];
  };
}

export interface Level {
  name: string;
  rangeId: string | null;
  description: string | null;
  skillType: string;
  durationType: string;
  spData: {
    spType: string | number;
    spCost: string;
    initSp: string;
  };
  duration: number;
  blackboard: Blackboard[];
}

export interface Phase {
  rangeId: string | null;
  attributesKeyFrames: AttributesKeyFrame[];
  evolveCost: LvlUpCost[] | null;
}

export interface AttributesKeyFrame {
  level: number;
  data: Data;
}

export interface Talent {
  candidates:
    | {
        unlockCondition: UnlockCond;
        requiredPotentialRank: number;
        prefabKey: string;
        name: string | null;
        description: string | null;
        rangeId: string | null;
        blackboard: Blackboard[];
        tokenKey: string | null;
      }[]
    | null;
}

export interface PotentialRank {
  description: string;
}

export interface FavorKeyFrame {
  data: Data;
}

export interface Data {
  maxHp: number;
  atk: number;
  def: number;
  magicResistance: number;
  cost: number;
  blockCnt: number;
  baseAttackTime: number;
  respawnTime: number;
}

export const tags = [
  "Elemental",
  "DP-Recovery",
  "Summon",
  "AoE",
  "Healing",
  "Nuker",
  "Defense",
  "DPS",
  "Fast-Redeploy",
  "Shift",
  "Survival",
  "Slow",
  "Debuff",
  "Robot",
  "Crowd-Control",
  "Support",
];
