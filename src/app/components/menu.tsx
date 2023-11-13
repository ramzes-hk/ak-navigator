"use client";
import Link from "next/link";
import { AllOpNames } from "@/lib/operators";
import { useEffect, useState } from "react";
function Menu() {
  const [search, setSearch] = useState<string>("");
  const [ids, setIds] = useState<AllOpNames>([]);
  const operators = search === "" ? ids : ids.filter((op) => op.name.toLowerCase().includes(search));
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("api/oplist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIds(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

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
