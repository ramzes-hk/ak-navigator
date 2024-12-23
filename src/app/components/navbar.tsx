import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";
import Image from "next/image";

function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="md:sticky md:top-0 md:z-50 w-full border-b backdrop-blur-sm">
      <div className="container md:h-14 flex items-center flex-col md:flex-row pb-4 md:pb-0">
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
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/tags"
        >
          Recruitment
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/stages"
        >
          Stages
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/story"
        >
          Story
        </Link>
        <Link
          className={buttonVariants({ variant: "link" })}
          prefetch={false}
          href="/about"
        >
          About
        </Link>
        <div className="flex flex-1 justify-end">{children}</div>
        <Link
          prefetch={false}
          href="https://github.com/ramzes-hk/ak-navigator"
          className="pl-2"
        >
          <Image
            src="/github-mark-white.png"
            width={30}
            height={30}
            alt="github"
          />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
