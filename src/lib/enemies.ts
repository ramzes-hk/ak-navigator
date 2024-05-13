import {
  ApplyWay,
  DamageType,
  Enemy,
  LevelType,
  Motion,
  Race,
} from "./enemy_database_types";
import { getAllEnemies } from "./enemy_database";
import { getAllHandbookEnemies } from "./enemy_handbook_table";
import { HandbookEnemy } from "./enemy_handbook_table_types";

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
        const val = enemy.Value[0]?.enemyData;
        if (!val) {
          throw "No enemyData";
        }
        const handbook = hb[enemy.Key];
        if (!handbook) {
          throw "No handbook enemy";
        }
        return {
          enemyId: enemy.Key,
          enemyIndex: handbook.enemyIndex,
          name: val.name.m_value,
          levelType: val.levelType.m_value,
          motion: val.motion.m_value,
          enemyTags: val.enemyTags.m_value ? val.enemyTags.m_value : [],
          applyWay: val.applyWay.m_value,
          damageType: handbook.damageType,
        };
      }),
    route: "enemies",
  };
}

export function getEnemy(id: string): {
  enemy: Enemy | undefined;
  handbook: HandbookEnemy | undefined;
} {
  const db = getAllEnemies();
  const hb = getAllHandbookEnemies();
  const enemy = db.find((enemy) => enemy.Key === id);
  const prefabKey = enemy?.Value[0]?.enemyData.prefabKey.m_value ?? "";
  const handbook = hb[prefabKey];
  return {
    enemy: enemy,
    handbook: handbook,
  };
}
