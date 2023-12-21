import Link from "next/link";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="flex container flex items-center h-14">
        <Link className="text-2xl" prefetch={false} href="/">
          AK-NAVIGATOR
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
