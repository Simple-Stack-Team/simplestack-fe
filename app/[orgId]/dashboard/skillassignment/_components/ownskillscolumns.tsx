"use client";

import { ColumnDef } from "@tanstack/react-table";

import DeleteSkill from "./DeleteSkill";

interface Skills {
  id: string;
  level: number;
  experience: string;
  employeeId: string;
  skillId: string;
  skill: {
    name: string;
  }
}

export const ownskillassignmentcolumns: ColumnDef<Skills>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.original.skill.name}</div>;
    },
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "experience",
    header: "Experience",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return <DeleteSkill id={id} />;
    },
  },
];
