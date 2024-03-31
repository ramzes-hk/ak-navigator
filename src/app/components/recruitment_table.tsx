"use client";

import { useState } from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle_group";
import { professions } from "@/lib/professions";
import { tags } from "@/lib/operators_types";
import { TaggedOperator } from "@/lib/recruitment_list";
import { Badge } from "./badge";
import { Button } from "./button";
import Link from "next/link";
import { buttonVariants } from "./button";

interface recruitmentTableProps {
  operators: TaggedOperator[];
}

function RecruitmentTable({ operators }: recruitmentTableProps) {
  const [position, setPosition] = useState<string[]>([]);
  const [rarity, setRarity] = useState<string[]>([]);
  const [operatorClass, setOperatorClass] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const allTags = powerSet([position, rarity, operatorClass, tag].flat());
  const opsByTags = allTags
    .map((tag) =>
      operators.filter((op) => {
        if (op.tags.includes("Top") && !tag.includes("Top")) {
          return false;
        }
        return tag.every((f) => op.tags.includes(f));
      }),
    )
    .map((ops, i) => {
      return {
        names: ops.map((op) => (
          <span key={op.id}>
            <Link
              href={`operators/${op.id}`}
              prefetch={false}
              className={
                buttonVariants({ variant: "outline", size: "sm" }) + ""
              }
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
            </Link>{" "}
          </span>
        )),
        tag: allTags[i].map((tag) => (
          <Badge key={tag}>{positionsAndProfessions[tag] ?? tag}</Badge>
        )),
      };
    })
    .filter((t) => t.names.length > 0);

  return (
    <div className="container">
      <ToggleGroup onValueChange={(val) => setPosition(val)} type="multiple">
        {Object.keys(positions).map((r) => (
          <ToggleGroupItem key={r} value={r}>
            {positions[r]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup onValueChange={(val) => setRarity(val)} type="multiple">
        {Object.keys(rarities).map((r) => (
          <ToggleGroupItem key={r} value={r}>
            {r}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup
        onValueChange={(val) => setOperatorClass(val)}
        type="multiple"
      >
        {Object.keys(professions)
          .filter((p) => p !== "TRAP" && p !== "TOKEN")
          .map((p) => (
            <ToggleGroupItem key={p} value={p}>
              {professions[p]}
            </ToggleGroupItem>
          ))}
      </ToggleGroup>
      <ToggleGroup onValueChange={(val) => setTag(val)} type="multiple">
        {tags.map((p) => (
          <ToggleGroupItem key={p} value={p}>
            {p}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div>
        {opsByTags.map((t, i) => (
          <div key={i} className="flex flex-row items-center gap-2 py-4">
            <div className="flex-none">{t.tag}</div>
            <div className="flex flex-row flex-wrap">{t.names}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function powerSet(tags: string[]): string[][] {
  const out: string[][] = [];
  const powerSetN = Math.pow(2, tags.length);
  for (let i = 0; i < powerSetN; i++) {
    const sub: string[] = [];
    for (let j = 0; j < tags.length; j++) {
      if (i & (1 << j)) {
        sub.push(tags[j]);
      }
    }
    out.push(sub);
  }
  out.shift();
  return out;
}

const positions: Record<string, string> = {
  MELEE: "Melee",
  RANGED: "Ranged",
};
const rarities = { Starter: 2, "Senior Operator": 5, "Top Operator": 6 };

const positionsAndProfessions = { ...positions, ...professions };

export default RecruitmentTable;
