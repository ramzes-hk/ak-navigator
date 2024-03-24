import fs from "fs";
import path from "path";
import { EnemyDatabase } from "./enemy_database_types";

export function getAllEnemies(): EnemyDatabase["enemies"] {
  const fileName = path.join(process.cwd(), "operators", "enemy_database.json");
  const raw = fs.readFileSync(fileName, "utf-8");
  const content = JSON.parse(raw) as EnemyDatabase;
  return content.enemies;
}
