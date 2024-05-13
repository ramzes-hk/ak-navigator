import fs from "fs";
import path from "path";
import { EnemyHandbookTable } from "./enemy_handbook_table_types";

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
