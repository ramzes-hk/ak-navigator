import fs from "fs";
import path from "path";
import { DamageType } from "./enemy_database_types";

interface EnemyHandbookTable {
  levelInfoList: LevelInfo[];
  enemyData: Record<string, HandbookEnemy>;
  raceData: Record<string, Race>;
}

export interface HandbookEnemy {
  enemyId: string;
  enemyIndex: string;
  enemyTags: null;
  sortId: number;
  name: string;
  enemyLevel: string;
  description: string;
  attackType: null;
  ability: null;
  isInvalidKilled: boolean;
  overrideKillCntInfos: {};
  hideInHandbook: boolean;
  abilityList: Ability[];
  linkEnemies: string[];
  damageType: DamageType[];
  invisibleDetail: boolean;
}

interface Ability {
  text: string;
  textFormat: "NORMAL" | "TITLE" | "SILENCE";
}

interface LevelInfo {
  classLevel: string;
  attack: AttributeRange;
  def: AttributeRange;
  magicRes: AttributeRange;
  maxHP: AttributeRange;
  moveSpeed: AttributeRange;
  attackSpeed: AttributeRange;
  enemyDamageRes: AttributeRange;
  enemyRes: AttributeRange;
}

interface AttributeRange {
  min: number;
  max: number;
}

interface Race {
  id: string;
  raceName: string;
  sortId: number;
}

export function getAllHandbookEnemies(): EnemyHandbookTable["enemyData"] {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "enemy_handbook_table.json",
  );
  const raw = fs.readFileSync(fileName, "utf8");
  const content = JSON.parse(raw) as EnemyHandbookTable;
  return content.enemyData;
}
