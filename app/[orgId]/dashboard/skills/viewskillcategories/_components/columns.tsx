import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./TableActions";

interface Category {
  id: string;
  name: string;
  organizationId: string;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const categoryName = row.original.name;
      const categoryId = row.original.id;

      return (
        <TableActions categoryName={categoryName} categoryId={categoryId} />
      );
    },
  },
];
