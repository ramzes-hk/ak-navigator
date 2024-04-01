"use client";

import { useMemo, useState } from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle_group";
import { professions } from "@/lib/professions";
import { tags } from "@/lib/operators_types";
import { TaggedOperator } from "@/lib/recruitment_list";
import { Badge } from "./badge";
import Link from "next/link";
import { buttonVariants } from "./button";

interface recruitmentTableProps {
  operators: TaggedOperator[];
}

function RecruitmentTable({ operators }: recruitmentTableProps) {
  const [tag, setTag] = useState<string[]>([]);
  const [allSets, setAllSets] = useState<string[][]>([[]]);

  const opsByTags: {
    ops: TaggedOperator[];
    tags: string[];
  }[] = useMemo(
    () =>
      allSets
        .slice(1)
        .map((tags) => {
          return {
            ops: operators.filter((op) => {
              if (
                op.tags.includes("Top Operator") &&
                !tags.includes("Top Operator")
              ) {
                return false;
              }
              return tags.every((f) => op.tags.includes(f));
            }),
            tags: tags,
          };
        })
        .filter((val) => val.ops.length > 0),
    [allSets, operators],
  );
  const opList = opsByTags.map((t, i) => (
    <div key={i} className="flex flex-row items-center gap-2 py-4">
      <div className="flex-none">
        {t.tags.map((tag) => (
          <Badge key={tag}>{positionsAndProfessions[tag] ?? tag}</Badge>
        ))}
      </div>
      <div className="flex flex-row flex-wrap">
        {t.ops.map((op) => (
          <Link
            key={op.id}
            href={`operators/${op.id}`}
            prefetch={false}
            className={buttonVariants({ variant: "outline", size: "sm" })}
            style={{
              color:
                op.rarity[5] === "6"
                  ? "orange"
                  : op.rarity[5] === "5"
                  ? "yellow"
                  : op.rarity[5] === "4"
                  ? "aqua"
                  : "",
            }}
          >
            {op.name}
          </Link>
        ))}
      </div>
    </div>
  ));
  return (
    <div className="container">
      <ToggleGroup
        className="flex flex-row flex-wrap"
        onValueChange={(val) => {
          if (val.length > tag.length) {
            const diff = val.find((v) => !tag.includes(v));
            if (!diff) {
              return;
            }
            setAllSets(incPowerSet(diff, allSets));
          } else {
            const diff = tag.find((v) => !val.includes(v));
            if (!diff) {
              return;
            }
            setAllSets(decPowerSet(diff, allSets));
          }
          setTag(val);
        }}
        type="multiple"
      >
        {Object.keys(positions).map((r) => (
          <ToggleGroupItem key={r} value={r}>
            {positions[r]}
          </ToggleGroupItem>
        ))}
        {Object.keys(rarities).map((r) => (
          <ToggleGroupItem
            key={r}
            value={r}
            className={
              rarities[r] === 6
                ? "text-orange"
                : rarities[r] === 5
                ? "text-yellow"
                : ""
            }
          >
            {r}
          </ToggleGroupItem>
        ))}
        {Object.keys(professions)
          .filter((p) => p !== "TRAP" && p !== "TOKEN")
          .map((p) => (
            <ToggleGroupItem key={p} value={p}>
              {professions[p]}
            </ToggleGroupItem>
          ))}
        {tags.map((p) => (
          <ToggleGroupItem key={p} value={p}>
            {p}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div>{opList}</div>
    </div>
  );
}

function incPowerSet(diff: string, set: string[][]): string[][] {
  return set.concat(set.map((s) => [...s, diff]));
}

function decPowerSet(diff: string, set: string[][]): string[][] {
  return set.filter((s) => !s.includes(diff));
}

const positions: Record<string, string> = {
  MELEE: "Melee",
  RANGED: "Ranged",
};
const rarities: Record<string, number> = {
  Starter: 2,
  "Senior Operator": 5,
  "Top Operator": 6,
};

const positionsAndProfessions = { ...positions, ...professions };

export default RecruitmentTable;
