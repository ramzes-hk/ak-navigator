import {
  ApplyWay,
  DamageType,
  Enemy,
  LevelType,
  Motion,
  Race,
} from "./enemy_database_types";
import { getAllEnemies } from "./enemy_database";
import { HandbookEnemy, getAllHandbookEnemies } from "./enemy_handbook_table";

export interface enemyMenuProps {
  ids: {
    enemyId: string;
    enemyIndex: string;
    name: string;
    levelType: LevelType;
    motion: Motion;
    enemyTags: Race[];
    applyWay: ApplyWay;
    damageType: DamageType[];
  }[];
  route: string;
}

export function getMenuEnemies(): enemyMenuProps {
  const db = getAllEnemies();
  const hb = getAllHandbookEnemies();
  return {
    ids: db
      .filter((enemy) => hb[enemy.Key])
      .map((enemy) => {
        const val = enemy.Value[0].enemyData;
        return {
          enemyId: enemy.Key,
          enemyIndex: hb[enemy.Key].enemyIndex,
          name: val.name.m_value,
          levelType: val.levelType.m_value,
          motion: val.motion.m_value,
          enemyTags: val.enemyTags.m_value ? val.enemyTags.m_value : [],
          applyWay: val.applyWay.m_value,
          damageType: hb[enemy.Key].damageType,
        };
      }),
    route: "enemies",
  };
}

export function getEnemy(id: string): {
  enemy: Enemy;
  handbook: HandbookEnemy;
} {
  const db = getAllEnemies();
  const hb = getAllHandbookEnemies();
  const enemy = db.find((enemy) => enemy.Key === id);
  const handbook = hb[id];
  if (!enemy || !handbook) {
    throw "Enemy Data not found";
  }
  return {
    enemy: enemy,
    handbook: handbook,
  };
}
