import { ColumnDef } from "@tanstack/react-table";

import TableActions from "./TableActions";
import { Skills } from "@/types/skills-types";

export const columns: ColumnDef<Skills>[] = [
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
    filterFn: (row, id, value) => {
      return value.includes(row.original.category.name);
    },
  },
  {
    accessorKey: "departmentIds",
    header: "",
    cell: () => {
      return <></>;
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "authorId",
    header: "",
    cell: () => {
      return <></>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.authorId);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const skill = row.original;

      return (
        <TableActions
          skillId={skill.id}
          authorId={skill.authorId}
          description={skill.description}
          name={skill.name}
          framework={skill.categoryId}
          fname={skill.category.name}
        />
      );
    },
  },
];
