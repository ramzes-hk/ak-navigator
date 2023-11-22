"use client";
import Link from "next/link";
import React, { useState } from "react";

interface menuProps {
  ids: {
    id: string;
    name: string;
    rarity: string;
    profession: string;
    subProfessionId: string;
  }[];
}

const professions = [
  "MEDIC",
  "TANK",
  "WARRIOR",
  "CASTER",
  "PIONEER",
  "SNIPER",
  "SUPPORT",
  "SPECIAL",
];

const tiers = new Array(6).fill(null).map((_, i) => `TIER_${i + 1}`);

interface filterProps {
  setVal: (val: string[]) => void;
  initialVal: string[];
  names: string[];
}

function Filter({ setVal, initialVal, names }: filterProps) {
  return names.map((name) => (
    <div key={name}>
      <input
        id={name}
        type="checkbox"
        onClick={() => {
          initialVal.includes(name)
            ? setVal(initialVal.filter((item) => item !== name))
            : setVal(initialVal.concat(name));
        }}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  ));
}

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
    <div className="flex flex-initial">
      <div>
        <h2>Filters</h2>
        <form className="ml-2">
          <div className="my-2 flex flex-col">
            <Filter
              setVal={setProfession}
              initialVal={profession}
              names={professions}
            />
          </div>
          <div className="my-2 flex flex-col">
            <Filter setVal={setTier} initialVal={tier} names={tiers} />{" "}
          </div>
          <div>
            <input
              type="search"
              className="border border-black p-1 m-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value.toLowerCase());
              }}
            ></input>
          </div>
          <div>
            <button
              type="reset"
              onClick={() => {
                setProfession([]);
                setTier([]);
              }}
            >
              Reset
            </button>
          </div>
          {operators && <p>Hit(s) - {operators.length}</p>}
        </form>
      </div>
      <table className="ml-2 w-1/2 h-1/2 border border-black table-fixed grow-0">
        <caption>Operators</caption>
        <thead>
          <tr className="divide-x divide-y divide-black">
            <th className="border border-black">Name</th>
            <th>Class</th>
            <th>Rarity</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((op) => {
            return (
              <tr
                key={`op-${op.id}`}
                className="divide-x divide-y divide-black max-h-8"
              >
                <td className="border border-black max-h-8">
                  <Link
                    href={`operators/${op.id.replace(/char_/, "")}`}
                    type="button"
                  >
                    {op.name}
                  </Link>
                </td>
                <td>{op.profession}</td>
                <td>{op.rarity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
