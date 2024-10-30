"use client";

import { ReactElement, useState } from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle_group";
import { professions } from "@/lib/professions";
import { tags } from "@/lib/operators_types";
import { TaggedOperator } from "@/lib/recruitment_list";
import { Badge } from "./badge";
import Link from "next/link";
import { Button, buttonVariants } from "./button";

interface recruitmentTableProps {
  operators: TaggedOperator[];
}

interface OpsByTags {
  ops: TaggedOperator[];
  tags: string[];
  weight: number;
}

function RecruitmentTable({ operators }: recruitmentTableProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagCombos, setTagCombos] = useState<string[][]>([]);
  const [opsByTags, setOpsByTags] = useState<OpsByTags[]>([]);

  const handleChange = (newTags: string[]) => {
    let newCombinations: string[][] = [];
    if (newTags.length > selectedTags.length) {
      const addedTag = newTags.find((t) => !selectedTags.includes(t));
      if (!addedTag) return;
      if (tagCombos.length === 0) {
        newCombinations = [[addedTag]];
      } else {
        newCombinations = [
          ...tagCombos,
          ...tagCombos.map((s) => [...s, addedTag]),
          [addedTag],
        ];
      }
    } else {
      const removedTag = selectedTags.find((t) => !newTags.includes(t));
      if (!removedTag) return;
      newCombinations = tagCombos.filter((s) => !s.includes(removedTag));
    }
    const validCombinations: string[][] = [];
    const newOpsByTags: OpsByTags[] = [];
    for (let combo of newCombinations) {
      const matchingOps = operators.filter((op) => {
        if (op.tags.includes("Top Operator") && !combo.includes("Top Operator"))
          return false;
        return combo.every((c) => op.tags.includes(c));
      });
      if (matchingOps.length === 0) continue;
      validCombinations.push(combo);
      newOpsByTags.push({
        ops: matchingOps,
        tags: combo,
        weight: minOpWeight(matchingOps),
      });
    }
    setOpsByTags(newOpsByTags);
    setTagCombos(validCombinations);
    setSelectedTags(newTags);
  };

  const opList = opsByTags
    .toSorted((a, b) => b.weight - a.weight)
    .map((t, i) => (
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
    <div className="container w-full">
      <ToggleGroup
        className="flex flex-col items-stretch py-4 px-2 border divide-y-2 my-2"
        value={selectedTags}
        onValueChange={handleChange}
        type="multiple"
      >
        <div>
          <TagHeader>Position</TagHeader>
          {Object.keys(positions).map((r) => (
            <ToggleGroupItem key={r} value={r}>
              {positions[r]}
            </ToggleGroupItem>
          ))}
        </div>
        <div>
          <TagHeader>Rarity</TagHeader>
          {Object.keys(rarities).map((r) => (
            <ToggleGroupItem key={r} value={r}>
              {r}
            </ToggleGroupItem>
          ))}
        </div>
        <div>
          <TagHeader>Class</TagHeader>
          {Object.keys(professions)
            .filter((p) => p !== "TRAP" && p !== "TOKEN")
            .map((p) => (
              <ToggleGroupItem key={p} value={p}>
                {professions[p]}
              </ToggleGroupItem>
            ))}
        </div>
        <div>
          <TagHeader>Tag</TagHeader>
          {tags.map((p) => (
            <ToggleGroupItem key={p} value={p}>
              {p}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>
      <Button
        type="reset"
        variant="destructive"
        onClick={() => {
          setSelectedTags([]);
          setTagCombos([]);
          setOpsByTags([]);
        }}
      >
        Reset
      </Button>
      <div>{opList}</div>
    </div>
  );
}

function TagHeader({
  className,
  children,
}: {
  className?: string;
  children?: ReactElement | string;
}) {
  return (
    <span className={"font-bold px-2 border-r-4 " + className}>{children}</span>
  );
}

function minOpWeight(ops: TaggedOperator[]): number {
  let l = 6;
  for (let i = 0; i < ops.length; i++) {
    const w = parseInt(ops[i]!.rarity.split("_")[1]!);
    if (w < l) l = w;
  }
  return l;
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
