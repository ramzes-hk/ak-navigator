import { getAllOpData } from "@/lib/operators";
import { db } from "./db";
import { operators } from "./schema";
import { getAllEnemies } from "@/lib/enemy_database";
import { enemies } from "./schema";
import { getAllHandbookEnemies } from "@/lib/enemy_handbook_table";

async function populate_operators() {
  const opData = await getAllOpData(undefined);
  for (const op of opData) {
    await db.insert(operators).values({
      id: op.id ?? op.name,
      name: op.name,
      description: op.description,
      position: op.position,
      rarity: op.rarity,
      profession: op.profession,
      subProfessionId: op.subProfessionId,
    });
  }
}

async function populate_enemies() {
  const es = getAllEnemies();
  const hand = getAllHandbookEnemies();
  for (const e of es) {
    await db.insert(enemies).values({
      id: e.Key,
      name: e.Value[0]?.enemyData.name.m_value ?? e.Key,
      values: e.Value,
      handbook: hand[e.Key],
    });
  }
}

populate_enemies();
