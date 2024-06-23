import { db } from "@/db/db";
import { activities, operators, stages, storyReview } from "@/db/schema";
import { eq, like, notLike } from "drizzle-orm";

export async function getOpName(id: string): Promise<string> {
  const result = await db
    .select({ name: operators.name })
    .from(operators)
    .where(like(operators.id, `%${id}`));
  const firstResult = result[0]?.name;
  if (!firstResult) {
    throw "No results";
  }
  return firstResult;
}

export async function getMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators)
    .where(like(operators.id, "%char%"));
  return result;
}

export async function getEntitiesMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators)
    .where(notLike(operators.id, "%char%"));
  return result;
}

export async function getStageName(stageId: string) {
  const result = await db
    .select({
      name: stages.name,
    })
    .from(stages)
    .where(eq(stages.id, stageId));
  return result;
}

export async function getStoryReview(id: string) {
  const result = await db
    .select()
    .from(storyReview)
    .where(eq(storyReview.id, id))
    .limit(1);
  return result[0];
}

export async function getActivityDB(id: string) {
  const result = await db
    .select()
    .from(activities)
    .where(eq(activities.id, id))
    .limit(1);
  return result[0];
}
