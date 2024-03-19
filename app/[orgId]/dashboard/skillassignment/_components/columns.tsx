"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Skills } from "@/types/skills-types";
import TableRowActions from "@/app/[orgId]/dashboard/skillassignment/_components/TableRowActions";

export const skillassignmentcolumns: ColumnDef<Skills>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div>{row.original.category.name}</div>;
    },
  },
  {
    accessorKey: "departments",
    header: "Departments",
    cell: ({ row }) => {
      const departments = row.original.departments;

      return (
        <div className="flex items-center gap-2">
          {departments.map((department, index) =>
            index <= 2 ? (
              <div key={index}>
                <div>{department.name.toLowerCase()}</div>
              </div>
            ) : index === 3 ? (
              <div>...</div>
            ) : null,
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const skillId = row.original.id;
      const skillname = row.original.name;

      return <TableRowActions skillId={skillId} skillname={skillname} />;
    },
  },
];
