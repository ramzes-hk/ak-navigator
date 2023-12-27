"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { ToggleGroup, ToggleGroupItem } from "./toggle_group";
import { columns } from "./columns";
import OpTable from "./op_list";

export interface menuProps {
  ids: {
    id: string;
    name: string;
    rarity: string;
    profession: string;
    subProfessionId: string;
  }[];
}

export const professions: { [key: string]: string } = {
  MEDIC: "Medic",
  TANK: "Defender",
  WARRIOR: "Guard",
  CASTER: "Caster",
  PIONEER: "Vanguard",
  SNIPER: "Sniper",
  SUPPORT: "Support",
  SPECIAL: "Specialist",
};

const tiers = new Array(6).fill(null).map((_, i) => `TIER_${i + 1}`);
const tierAllies = new Array(6)
  .fill(null)
  .map((_, i) => "\u2606".repeat(i + 1));
export const mappedTiers = tiers.reduce(
  (obj: { [key: string]: string }, key, i) => {
    obj[key] = tierAllies[i];
    return obj;
  },
  {},
);

function Menu({ ids }: menuProps) {
  const [search, setSearch] = useState<string>("");
  const [tier, setTier] = useState<string[]>([]);
  const [profession, setProfession] = useState<string[]>([]);
  let operators =
    search === ""
      ? ids
      : ids.filter((op) => op.name.toLowerCase().includes(search));
  operators =
    tier.length === 0
      ? operators
      : operators.filter((op) => tier.includes(op.rarity));
  operators =
    profession.length === 0
      ? operators
      : operators.filter((op) => profession.includes(op.profession));

  return (
    <div className="px-4 sm:container w-full flex flex-col sm:flex-row item-start">
      <div className="sm:w-1/6">
        <aside className="sm:sticky sm:top-20 sm:block sm:z-40 w-full">
          <h2 className="pb-2 text-xl">Filters</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value.toLowerCase());
              }}
            ></Input>
            <div className="py-4">
              <ToggleGroup
                value={profession}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setProfession(values)}
                type="multiple"
              >
                {Object.keys(professions).map((prof) => (
                  <ToggleGroupItem key={prof} value={prof}>
                    {professions[prof]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                value={tier}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setTier(values)}
                type="multiple"
              >
                {tiers.map((tier) => (
                  <ToggleGroupItem key={tier} value={tier}>
                    {mappedTiers[tier]}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Button
              type="reset"
              variant="destructive"
              onClick={() => {
                setProfession([]);
                setTier([]);
                setSearch("");
              }}
            >
              Reset
            </Button>
            {operators && <p>Hit(s) - {operators.length}</p>}
          </form>
        </aside>
      </div>
      <main className="w-full sm:w-5/6 sm:h-full">
        <div className="w-full sm:w-4/5 m-auto pb-4">
          <OpTable columns={columns} data={operators} />
        </div>
      </main>
    </div>
  );
}

export default Menu;
