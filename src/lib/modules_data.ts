import path from "path";
import fs from "fs";

interface UniEquip {
  uniEquipId: string;
  uniEquipName: string;
  uniEqipIcon: string;
  uniEquipDesc: string;
  typeIcon: string;
  typeName1: string;
  typeName2: string;
  charId: string;
  missionList: string[];
}

interface Mission {
  template: string;
  desc: string;
}

interface UniEquipTable {
  equipDict: {
    [key: string]: UniEquip;
  };
  missionList: {
    [key: string]: Mission;
  };
}

interface Blackboard {
  key: string;
  value: number;
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

interface BattleEquipTable {
  [key: string]: {
    phases: Phase[];
  };
}

function getParsedJSON<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "operators", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw) as T;
  return json;
}

function getCharName(id: string): string {
  const start = id.lastIndexOf("_");
  if (start === -1) {
    throw new Error(`No underscore in character id: ${id}`);
  }
  return id.substring(start + 1);
}

export interface Module {
  phases: Phase[] | null;
  equipDict: UniEquip;
  missions: Mission[] | null;
}

export async function getModules(id: string): Promise<Module[]> {
  const uniEquipTable = getParsedJSON<UniEquipTable>("uniequip_table.json");
  const battleEquipTable = getParsedJSON<BattleEquipTable>(
    "battle_equip_table.json",
  );

  const modules: Module[] = [];
  const charName = getCharName(id);
  for (let i = 1; i < 4; i++) {
    const moduleId = `uniequip_00${i}_${charName}`;
    if (uniEquipTable.equipDict[moduleId] === undefined) {
      continue;
    }
    const uniEquip = uniEquipTable.equipDict[moduleId];
    if (i === 1) {
      modules.push({ equipDict: uniEquip, phases: null, missions: null});
      continue;
    }
    const phases = battleEquipTable[moduleId].phases.map((phase) => ({
      ...phase,
      parts: phase.parts.filter((part) => !part.isToken),
    }));
    const missions: Mission[] = uniEquipTable.equipDict[
      moduleId
    ].missionList.map((missionId) => uniEquipTable.missionList[missionId]);
    modules.push({ phases: phases, equipDict: uniEquip, missions: missions });
  }
  return modules;
}
