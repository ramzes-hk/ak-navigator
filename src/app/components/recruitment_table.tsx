"use client";

import { useState } from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle_group";
import { professions } from "@/lib/professions";
import { tags } from "@/lib/operators_types";
import { TaggedOperator } from "@/lib/recruitment_list";

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
        if (op.tags.includes("Top Operator") && !tag.includes("Top Operator")) {
          return false;
        }
        return tag.every((f) => op.tags.includes(f));
      }),
    )
    .map((ops, i) => {
      return {
        names: ops.map((op) => op.name).join(" "),
        tag: allTags[i].map(tag => positionsAndProfessions[tag] ?? tag).join(" "),
      };
    })
    .filter((t) => t.names !== "");

  return (
    <div>
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
      <ul>
        {opsByTags.map((t, i) => (
          <li key={i}>
            {t.tag} - {t.names}
          </li>
        ))}
      </ul>
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

const positionsAndProfessions = {...positions, ...professions};

export default RecruitmentTable;
