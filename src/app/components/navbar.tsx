import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";

function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container h-14 flex items-center">
        <Link className="text-2xl" prefetch={false} href="/">
          AK-NAVIGATOR
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/"
        >
          Operators
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/entities"
        >
          Entities
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/enemies"
        >
          Enemies
        </Link>

        <div className="flex flex-1 justify-end">{children}</div>
      </div>
    </header>
  );
}

export default Navbar;
