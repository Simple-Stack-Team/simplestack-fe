import { ColumnDef } from "@tanstack/react-table";
import ActionsTable from "./ActionsTable";

interface Departments {
  id: string;
  name: string;
  createdAt: string;
  managerId: string;
}

export const columns: ColumnDef<Departments>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "managerId",
    header: "Manager Id",
    cell: ({ row }) => {
      const hasManager = row.original.managerId;

      return (
        <div>{hasManager ? <div>{hasManager}</div> : <p>No Manager</p>}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formatedDate = date.toLocaleDateString();

      return <div>{formatedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;

      return (
        <div>
          <ActionsTable departmentId={department.id} name={department.name} />
        </div>
      );
    },
  },
];
