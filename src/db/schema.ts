import { Enemy } from "@/lib/enemy_database";
import {
  FavorKeyFrame,
  PotentialRank,
  Talent,
  Trait,
  Phase,
  Level,
} from "@/lib/operators";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const operators = sqliteTable("operators", {
  id: text("id", { length: 32 }).primaryKey(),
  name: text("name", { length: 256 }).notNull(),
  description: text("description", { length: 256 }),
  position: text("position").notNull(),
  rarity: text("rarity").notNull(),
  profession: text("profession", { length: 32 }).notNull(),
  subProfessionId: text("sub_profession_id", { length: 32 }).notNull(),
  trait: text("trait").$type<Trait>(),
  phases: text("phases").$type<Phase[]>(),
  talents: text("talents").$type<Talent[]>(),
  potentialRanks: text("potential_ranks").$type<PotentialRank[]>(),
  favorKeyFrames: text("favor_key_frames").$type<FavorKeyFrame[]>(),
});

export const skills = sqliteTable("skills", {
  skillId: text("skill_id", { length: 32 }).primaryKey(),
  operatorId: text("operator_id").references(() => operators.id),
  levels: text("levels").$type<Level[]>(),
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
  values: text("values").$type<Enemy["Value"]>(),
});
