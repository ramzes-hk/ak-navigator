"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
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

interface menuProps {
  ids: {
    id: string;
    name: string;
    rarity: string;
    profession: string;
    subProfessionId: string;
  }[];
}

const professions: {[key: string]: string} = {
  "MEDIC": "Medic",
  "TANK": "Defender",
  "WARRIOR": "Guard",
  "CASTER": "Caster",
  "PIONEER": "Vanguard",
  "SNIPER": "Sniper",
  "SUPPORT": "Support",
  "SPECIAL": "Specialist",
};

const tiers = new Array(6).fill(null).map((_, i) => `TIER_${i + 1}`);
const tierAllies = new Array(6)
  .fill(null)
  .map((_, i) => "\u2606".repeat(i + 1));

interface filterProps {
  setVal: (val: string[]) => void;
  initialVal: string[];
  names: string[];
  allias?: string[];
}

function Filter({ setVal, initialVal, names, allias }: filterProps) {
  return names.map((name, i) => (
    <div key={name}>
      <Checkbox
        id={name}
        onClick={() => {
          initialVal.includes(name)
            ? setVal(initialVal.filter((item) => item !== name))
            : setVal(initialVal.concat(name));
        }}
      />
      <label htmlFor={name}>{allias?.at(i) ?? name}</label>
    </div>
  ));
}

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
    <div className="w-full flex flex-initial flex-col sm:flex-row">
      <div className="w-1/6">
        <h2>Filters</h2>
        <form className="ml-2" onClick={() => setPage(1)}>
          <div>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value.toLowerCase());
              }}
            ></Input>
          </div>
          <div className="my-2 flex flex-col">
            <Filter
              setVal={setProfession}
              initialVal={profession}
              names={Object.keys(professions)}
            />
          </div>
          <div className="my-2 flex flex-col">
            <Filter
              setVal={setTier}
              initialVal={tier}
              names={tiers}
              allias={tierAllies}
            />{" "}
          </div>
          <div>
            <Button
              type="reset"
              variant="destructive"
              onClick={() => {
                setProfession([]);
                setTier([]);
              }}
            >
              Reset
            </Button>
          </div>
          {operators && <p>Hit(s) - {operators.length}</p>}
        </form>
      </div>
      <div className="w-3/4">
        <div className="w-4/5 lg:w-1/2 lg:ml-20 m-auto lg:m-0">
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
      </div>
    </div>
  );
}

export default Menu;
