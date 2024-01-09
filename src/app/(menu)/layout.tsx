import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

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
  return (
    <html lang="en">
      <body className={className}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
