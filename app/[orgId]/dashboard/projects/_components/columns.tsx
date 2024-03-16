"use client";
import { ColumnDef } from "@tanstack/react-table";
import ActionsTable from "./ActionsTable";

interface Projects {
  id: string;
  name: string;
  period: string;
  startDate: string;
  deadlineDate: string;
  status: string;
}

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => {
      const periodTable = row.original.period;

      return <div>{periodTable}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.period);
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = new Date(row.original.startDate);
      const date = startDate.toLocaleDateString();
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "deadlineDate",
    header: "Deadline Date",
    cell: ({ row }) => {
      const deadlineDate = new Date(row.original.deadlineDate);
      const year = deadlineDate.getFullYear();
      if (year < 2022) {
        return null; // Nu afișa nimic dacă anul este mai mic decât 2000
      }
      const formatedDate = deadlineDate.toLocaleDateString();
      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <div>{status}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <ActionsTable
          name={project.name}
          projectId={project.id}
          period={project.period}
          status={project.status}
        />
      );
    },
  },
];
