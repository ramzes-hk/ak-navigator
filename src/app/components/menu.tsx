"use client";
import Link from "next/link";
import { AllOpNames } from "@/lib/operators";
import { useState } from "react";

interface menuProps {
  ids: AllOpNames;
}

function Menu({ ids }: menuProps) {
  const [search, setSearch] = useState<string>("");
  const operators =
    search === ""
      ? ids
      : ids.filter((op) => op.name.toLowerCase().includes(search));

  return (
    <>
      <h1>Menu</h1>
      <form>
        <input
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value.toLowerCase());
          }}
        ></input>
      </form>
      {operators && <p>{operators.length}</p>}
      {operators.map((id) => {
        return (
          <div key={id.id}>
            <button>
              <Link
                href={`operators/${id.id.replace(/char_/, "")}`}
                type="button"
              >
                {id.name}
              </Link>
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Menu;
