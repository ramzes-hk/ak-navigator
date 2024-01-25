"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { menuProps, mappedTiers } from "./menu";
import { professions } from "@/lib/professions";

export function getColumns(route: string) {
  const columns: ColumnDef<menuProps["ids"][number]>[] = [
    {
      accessorKey: "id",
      header: "Name",
      cell: (props) => (
        <Link
          className="hover:text-underline underline-offset-4"
          href={`${route}/${props.row.original.id}`}
          type="button"
          prefetch={false}
        >
          {props.row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "profession",
      header: "Class",
      cell: (props) => professions[props.row.original.profession],
    },
    {
      accessorKey: "rarity",
      header: "Rarity",
      cell: (props) => mappedTiers[props.row.original.rarity],
    },
  ];
  return columns;
}
