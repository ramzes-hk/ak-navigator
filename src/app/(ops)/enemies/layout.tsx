import "./../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ComboboxDemo } from "@/components/combobox";
import { getMenuEnemies } from "@/lib/enemies";
import { OpName } from "@/lib/operators_types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AK-Navigator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let className = inter.className;
  className += " dark min-h-screen";
  const names: OpName[] = getMenuEnemies().ids.map(val => { return {id: val.enemyId, name: val.name}})
  return (
    <html lang="en">
      <body className={className}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar>
            <ComboboxDemo itemName="enemy" names={names} />
          </Navbar>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
