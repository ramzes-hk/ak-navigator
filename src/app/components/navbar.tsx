import Link from "next/link";

function Navbar() {
  return (
    <div className="mt-2 absolute left-0 top-0 z-10">
      <Link
        className="border p-2 border-black rounded-lg hover:bg-stone-400"
        prefetch={false}
        href="/"
      >
        Menu
      </Link>
    </div>
  );
}

export default Navbar;
