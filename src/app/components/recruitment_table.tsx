"use client";

import { useState } from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle_group";
import { professions } from "@/lib/professions";
import { Operator, tags } from "@/lib/operators_types";

interface recruitmentTableProps {
  operators: Operator[];
}

function RecruitmentTable({ operators }: recruitmentTableProps) {
  const [position, setPosition] = useState<string[]>([]);
  const [rarity, setRarity] = useState<string[]>([]);
  const [operatorClass, setOperatorClass] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  return (
    <div>
      <ToggleGroup onValueChange={(val) => setRarity(val)} type="multiple">
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
        {operators.map((op) => (
          <li key={op.id}>{op.name}</li>
        ))}
      </ul>
    </div>
  );
}

const positions: Record<string, string> = {
  MELEE: "Melee",
  RANGED: "Ranged",
};
const rarities = { Starter: 2, "Senior Operator": 5, "Top Operator": 6 };

export default RecruitmentTable;
