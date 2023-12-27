"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { menuProps, professions, mappedTiers } from "./menu";

export const columns: ColumnDef<menuProps["ids"][number]>[] = [
  {
    accessorKey: "id",
    header: "Name",
    cell: (props) => (
      <Link
        className="hover:text-underline underline-offset-4"
        href={`operators/${props.row.original.id.replace(/char_/, "")}`}
        type="button"
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
