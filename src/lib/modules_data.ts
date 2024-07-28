import path from "path";
import fs from "fs";
import {
  UniEquipTable,
  Phase,
  UniEquip,
  Mission,
  BattleEquipTable,
} from "./modules_data_types";

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

let uniequip: UniEquipTable | undefined = undefined;
export function getUniequip(): UniEquipTable {
  if (uniequip) {
    return uniequip;
  }
  uniequip = getParsedJSON<UniEquipTable>("uniequip_table.json");
  return uniequip;
}

export async function getModules(id: string): Promise<Module[]> {
  const uniEquipTable = getUniequip();
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
    if (!uniEquip) {
      throw "No uniEquip found";
    }
    if (i === 1) {
      modules.push({ equipDict: uniEquip, phases: null, missions: null });
      continue;
    }
    const mod = battleEquipTable[moduleId];
    if (!mod) {
      throw "No module found";
    }
    const phases = mod.phases.map((phase) => ({
      ...phase,
      parts: phase.parts.filter((part) => !part.isToken),
    }));
    const missions: Mission[] = uniEquip.missionList.map((missionId) => {
      const mission = uniEquipTable.missionList[missionId];
      if (!mission) {
        throw "No mission found";
      }
      return mission;
    });
    modules.push({ phases: phases, equipDict: uniEquip, missions: missions });
  }
  return modules;
}
