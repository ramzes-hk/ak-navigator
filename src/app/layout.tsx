import "./globals.css";
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
  className += " bg-slate-400";
  return (
    <html lang="en">
      <body className={className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
