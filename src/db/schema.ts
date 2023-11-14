import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const tiers = new Array(6).fill(null).map((_, i) => `TIER_${i}`) as [
  string,
  ...string[],
];
const positionEnum = pgEnum("position", ["MELEE", "RANGED"]);
const tierEnum = pgEnum("rarity", tiers);

export const operators = pgTable("operators", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  position: positionEnum("position"),
  rarity: tierEnum("rarity"),
  profession: varchar("profession", { length: 32 }),
  subProfessionId: varchar("sub_profession_id", { length: 32 }),
});

export const operatorTags = pgTable("operator_tags", {
  operatorId: varchar("operator_id").references(() => operators.id),
  tagId: varchar("tag_id").references(() => tags.id),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 256 }),
});
