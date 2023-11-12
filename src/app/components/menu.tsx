"use client";
import Link from "next/link";
import { AllOpNames } from "@/lib/operators";
import { useEffect, useState } from "react"; 
function Menu() {
  const [search, setSearch] = useState<string>("");
  const [ids, setIds] = useState<AllOpNames>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('api/oplist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({ name: search}),
        });
        const data = await response.json();
        setIds(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();   
  }, [search]);

  
  return (
    <>
      <h1>Menu</h1>
      <form>
        <input value={search} onChange={(e) => {
          e.preventDefault()
          setSearch(e.target.value);
        }}>
        </input>
      </form>
      {ids && <p>{ids.length}</p>}
      {ids.map((id) => {
        return (
          <div key={id.id}>
            <button type="button" role="button">
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
