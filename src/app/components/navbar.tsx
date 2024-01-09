import Link from "next/link";
import React from "react";

function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="flex container flex items-center h-14 justify-between">
        <Link className="text-2xl" prefetch={false} href="/">
          AK-NAVIGATOR
        </Link>
        <div>{children}</div>
      </div>
    </header>
  );
}

export default Navbar;
