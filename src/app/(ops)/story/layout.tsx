import "./../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ComboboxDemo } from "@/components/combobox";
import { getAllOpNames } from "@/lib/operators";

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
  const names = getAllOpNames("char");

  return (
    <html lang="en">
      <body className={className}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar>
            <ComboboxDemo names={names} />
          </Navbar>
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
