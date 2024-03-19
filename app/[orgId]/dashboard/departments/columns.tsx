import { ColumnDef } from "@tanstack/react-table";
import ActionsTable from "@/app/[orgId]/dashboard/departments/ActionsTable";

interface Departments {
  id: string;
  name: string;
  createdAt: string;
  managerId: string;
}

export const columns: ColumnDef<Departments>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
      console.log(department);

      return (
        <div>
          <ActionsTable departmentId={department.id} name={department.name} />
        </div>
      );
    },
  },
];
