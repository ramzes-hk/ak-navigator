"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { menuProps, mappedTiers } from "./menu";
import { professions } from "@/lib/professions";
import { enemyMenuProps } from "@/lib/enemies";
import { subProfDict } from "@/lib/subProfDict";

export function getOpColumns(route: string) {
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
      accessorKey: "subProfessionId",
      header: "Subclass",
      cell: (props) =>
        subProfDict[props.row.original.subProfessionId]?.subProfessionName,
    },
    {
      accessorKey: "rarity",
      header: "Rarity",
      cell: (props) => mappedTiers[props.row.original.rarity],
    },
  ];
  return columns;
}

export function getEnemyColumns(route: string) {
  const columns: ColumnDef<enemyMenuProps["ids"][number]>[] = [
    {
      accessorKey: "id",
      header: "Name",
      cell: (props) => (
        <Link
          className="hover:text-underline underline-offset-4"
          href={`${route}/${props.row.original.enemyId}`}
          type="button"
          prefetch={false}
        >
          {props.row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "levelType",
      header: "Enemy Type",
      cell: (props) => props.row.original.levelType,
    },
    {
      accessorKey: "enemyIndex",
      header: "Index",
      cell: (props) => props.row.original.enemyIndex,
    },
  ];
  return columns;
}
