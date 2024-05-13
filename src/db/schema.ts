import { Enemy } from "@/lib/enemy_database_types";
import { HandbookEnemy } from "@/lib/enemy_handbook_table_types";
import {
  FavorKeyFrame,
  PotentialRank,
  Talent,
  Trait,
  Phase,
  Level,
} from "@/lib/operators_types";
import { Stage } from "@/lib/stage_table_types";
import { StoryTableEntry } from "@/lib/story_table_types";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const operators = sqliteTable("operators", {
  id: text("id", { length: 32 }).primaryKey(),
  name: text("name", { length: 256 }).notNull(),
  description: text("description", { length: 256 }),
  position: text("position").notNull(),
  rarity: text("rarity").notNull(),
  profession: text("profession", { length: 32 }).notNull(),
  subProfessionId: text("sub_profession_id", { length: 32 }).notNull(),
  trait: text("trait", { mode: "json" }).$type<Trait>(),
  phases: text("phases", { mode: "json" }).$type<Phase[]>(),
  talents: text("talents", { mode: "json" }).$type<Talent[]>(),
  potentialRanks: text("potential_ranks", { mode: "json" }).$type<
    PotentialRank[]
  >(),
  favorKeyFrames: text("favor_key_frames", { mode: "json" }).$type<
    FavorKeyFrame[]
  >(),
});

export const skills = sqliteTable("skills", {
  skillId: text("skill_id", { length: 32 }).primaryKey(),
  operatorId: text("operator_id").references(() => operators.id),
  levels: text("levels", { mode: "json" }).$type<Level[]>(),
});

export const operatorTags = sqliteTable("operator_tags", {
  operatorId: text("operator_id").references(() => operators.id),
  tagId: integer("tag_id").references(() => tags.id),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  tag: text("tag", { length: 256 }),
});

export const enemies = sqliteTable("enemies", {
  id: text("id", { length: 16 }).primaryKey(),
  name: text("name", { length: 32 }).notNull(),
  values: text("values", { mode: "json" }).$type<Enemy["Value"]>(),
  handbook: text("handbook", { mode: "json" }).$type<HandbookEnemy>(),
});

export const stages = sqliteTable("stages", {
  id: text("id", { length: 32 }).primaryKey(),
  name: text("name", { length: 64 }),
  stageType: text("stage_type", { length: 16 }),
  difficulty: text("difficulty", { length: 16 }),
  diffGroup: text("diff_group", { length: 16 }),
  levelId: text("level_id", { length: 64 }),
  zoneId: text("zone_id", { length: 16 }),
  code: text("code", { length: 8 }),
  description: text("description"),
  dangerLevel: text("danger_level", { length: 8 }),
  apCost: integer("ap_cost"),
  bossMark: integer("boss_mark", { mode: "boolean" }),
  stage: text("stage", { mode: "json" }).$type<Stage>(),
});

export const story = sqliteTable("story" , {
  id: text("id", {length: 64}).primaryKey(),
  triggerType: text("trigger_type", {length: 32}),
  story: text("story", {mode: 'json'}).$type<StoryTableEntry>(),
})
