import {
  FavorKeyFrame,
  PotentialRank,
  Talent,
  Trait,
  Phase,
  Level,
} from "@/lib/operators";
import {
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

const tiers = new Array(6).fill(null).map((_, i) => `TIER_${i}`) as [
  string,
  ...string[],
];
const positionEnum = pgEnum("position", ["MELEE", "RANGED"]);
const tierEnum = pgEnum("rarity", tiers);

export const operators = pgTable("operators", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  position: positionEnum("position").notNull(),
  rarity: tierEnum("rarity").notNull(),
  profession: varchar("profession", { length: 32 }).notNull(),
  subProfessionId: varchar("sub_profession_id", { length: 32 }).notNull(),
  trait: json("trait").$type<Trait>(),
  phases: json("phases").$type<Phase[]>(),
  talents: json("talents").$type<Talent[]>(),
  potentialRanks: json("potential_ranks").$type<PotentialRank[]>(),
  favorKeyFrames: json("favor_key_frames").$type<FavorKeyFrame[]>(),
});

export const skills = pgTable("skills", {
  skillId: varchar("skill_id", { length: 32 }).primaryKey(),
  operatorId: varchar("operator_id").references(() => operators.id),
  levels: json("levels").$type<Level[]>(),
});

export const operatorTags = pgTable("operator_tags", {
  operatorId: varchar("operator_id").references(() => operators.id),
  tagId: integer("tag_id").references(() => tags.id),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 256 }),
});
