import { getAllOpData } from "@/lib/operators";
import { db } from "./db";
import { operators, enemies, stages, story } from "./schema";
import { getAllEnemies } from "@/lib/enemy_database";
import { getAllHandbookEnemies } from "@/lib/enemy_handbook_table";
import { getStages } from "@/lib/stage_table";
import { getStoryTable } from "@/lib/story_table";

async function updateOperators() {
  const ops = await getAllOpData(undefined);
  for (const op of ops) {
    try {
      await db
        .insert(operators)
        .values({
          id: op.id!,
          name: op.name,
          description: op.description,
          position: op.position,
          rarity: op.rarity,
          profession: op.profession,
          subProfessionId: op.subProfessionId,
        })
        .onConflictDoNothing();
    } catch (e) {
      console.log(e, op.id, op.name);
    }
  }
}

async function updateEnemies() {
  const es = getAllEnemies();
  const hand = getAllHandbookEnemies();
  for (const e of es) {
    try {
      await db
        .insert(enemies)
        .values({
          id: e.Key,
          name: e.Value[0]?.enemyData.name.m_value ?? e.Key,
          values: e.Value,
          handbook: hand[e.Key],
        })
        .onConflictDoNothing();
    } catch (err) {
      console.log(e.Key);
    }
  }
}

async function updateStages() {
  const stagesData = getStages();
  for (const entry of Object.entries(stagesData)) {
    const id = entry[0];
    const stage = entry[1];
    try {
      await db
        .insert(stages)
        .values({
          id: id,
          name: stage.name,
          stageType: stage.stageType,
          difficulty: stage.difficulty,
          diffGroup: stage.diffGroup,
          levelId: stage.levelId,
          zoneId: stage.zoneId,
          code: stage.code,
          description: stage.description,
          apCost: stage.apCost,
          bossMark: stage.bossMark,
          stage: stage,
        })
        .onConflictDoNothing();
    } catch (e) {
      console.log(id, e);
    }
  }
}

async function updateStory() {
  const stories = getStoryTable();
  for (const entry of Object.values(stories)) {
    await db
      .insert(story)
      .values({
        story: entry,
        id: entry.id,
        triggerType: entry.trigger.type,
      })
      .onConflictDoUpdate({
        target: story.id,
        set: { triggerType: entry.trigger.type },
      });
  }
}
updateOperators();
updateEnemies();
updateStages();
updateStory();
