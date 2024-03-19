"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Skills } from "@/types/skills-types";
import { Badge } from "@/components/ui/badge";
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
        <div>
          {departments.length === 0 ? (
            <Badge variant="destructive">No department</Badge>
          ) : (
            <div className="flex items-center gap-2">
              {departments.map((department, index) =>
                index <= 2 ? (
                  <div key={index}>
                    <Badge variant="outline" className="text-nowrap">
                      {department.name.toLowerCase()}
                    </Badge>
                  </div>
                ) : index === 3 ? (
                  <div key={index}>...</div>
                ) : null,
              )}
            </div>
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
