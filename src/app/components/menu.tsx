import Link from "next/link";
import { getAllOpNames } from "../../lib/operators";

async function Menu() {
  const ids = await getAllOpNames();
  return (
    <>
      <h1>Menu</h1>
      <p>{ids.length}</p>
      {ids.map((id) => {
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
