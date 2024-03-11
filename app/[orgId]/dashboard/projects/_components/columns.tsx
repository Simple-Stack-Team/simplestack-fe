"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProjectsTable from "./ProjectTable";
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
      const period = row.original.period;

      return <div>{period}</div>;
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div>
          <ActionsTable name={project.name} projectId={project.id} />
        </div>
      );
    },
  },
];
