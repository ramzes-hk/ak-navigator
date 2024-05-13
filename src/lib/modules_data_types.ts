import { Blackboard, LvlUpCost } from "./operators_types";

export interface UniEquip {
  uniEquipId: string;
  uniEquipName: string;
  uniEqipIcon: string;
  uniEquipDesc: string;
  typeIcon: string;
  typeName1: string;
  typeName2: string;
  charId: string;
  missionList: string[];
  itemCost: Record<string, LvlUpCost[]> | null;
}

export interface Mission {
  template: string;
  desc: string;
}

interface SubProf {
  subProfessionId: string;
  subProfessionName: string;
  subProfessionCatagory: number;
}

export interface UniEquipTable {
  equipDict: Record<string, UniEquip>;
  missionList: Record<string, Mission>;
  subProfDict: Record<string, SubProf>;
  charEquip: Record<string, string[]>;
}

interface Candidate {
  additionalDescription?: string | null;
  upgradeDescription?: string | null;
  unlockCondition: {
    phase: number;
    level: number;
  };
  requiredPotentialRank: number;
  blackboard: Blackboard[];
  rangeId: string | null;
  name?: string;
  talentIndex?: string;
  overrideDescripton?: string | null;
}

interface Part {
  target: string;
  isToken: boolean;
  overrideTraitDataBundle: {
    candidates: Candidate[] | null;
  };
  addOrOverrideTalentDataBundle: {
    candidates: Candidate[] | null;
  };
}
export interface Phase {
  equipLevel: number;
  parts: Part[];
  attributeBlackboard: Blackboard[];
}

export interface BattleEquipTable {
  [key: string]: {
    phases: Phase[];
  };
}
