"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { ToggleGroup, ToggleGroupItem } from "./toggle_group";

interface menuProps {
  ids: {
    id: string;
    name: string;
    rarity: string;
    profession: string;
    subProfessionId: string;
  }[];
}

const professions: { [key: string]: string } = {
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
const mapperTiers = tiers.reduce((obj: { [key: string]: string }, key, i) => {
  obj[key] = tierAllies[i];
  return obj;
}, {});

function Menu({ ids }: menuProps) {
  const pageSize = 25;
  const [search, setSearch] = useState<string>("");
  const [tier, setTier] = useState<string[]>([]);
  const [profession, setProfession] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
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
  const paginatedOperators = operators.filter(
    (_, i) => i < page * pageSize && i >= Math.max((page - 1) * pageSize, 0),
  );

  return (
    <div className="container w-full flex flex-col sm:flex-row item-start h-full">
      <div className="sm:w-1/6 h-svh">
        <aside className="sm:sticky sm:top-20 sm:block sm:z-40 w-full">
          <h2>Filters</h2>
          <form onSubmit={(e) => e.preventDefault()} onClick={() => setPage(1)}>
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
                className="flex flex-row flex-wrap"
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
                className="flex flex-row flex-wrap"
                onValueChange={(values) => setTier(values)}
                type="multiple"
              >
                {tiers.map((tier) => (
                  <ToggleGroupItem key={tier} value={tier}>
                    {mapperTiers[tier]}
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
      <main className="w-full sm:w-5/6">
        <div className="w-full sm:w-4/5 m-auto">
          <form className="w-full flex flex-row place-content-between">
            <Button
              onClick={(e) => {
                e.preventDefault();
                const nextPage = Math.max(page - 1, 1);
                setPage(nextPage);
              }}
            >
              Prev
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                const nextPage = Math.min(
                  page + 1,
                  Math.ceil(operators.length / pageSize),
                );
                setPage(nextPage);
              }}
            >
              Next
            </Button>
          </form>
          {operators.length !== 0 ? (
            <Table className="w-full h-1/2 table-fixed">
              <TableCaption>Operators</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Name</TableHead>
                  <TableHead className="w-1/4">Class</TableHead>
                  <TableHead className="w-1/4">Rarity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOperators.map((op) => {
                  return (
                    <TableRow className="h-8" key={`op-${op.id}`}>
                      <TableCell>
                        <Link
                          href={`operators/${op.id.replace(/char_/, "")}`}
                          type="button"
                        >
                          {op.name}
                        </Link>
                      </TableCell>
                      <TableCell>{professions[op.profession]}</TableCell>
                      <TableCell>
                        {
                          tierAllies[
                            parseInt(op.rarity.replace(/TIER_/, "")) - 1
                          ]
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <h2>No Operators Found</h2>
          )}
        </div>
      </main>
    </div>
  );
}

export default Menu;
