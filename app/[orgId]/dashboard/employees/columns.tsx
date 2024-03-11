import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/types/Employee";
import DropdownMenuEmployee from "./DropdownMenuEmployee";
import { DataTableColumnHeader } from "./ColumnHeader";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const employee = row.original.roles;

      return (
        <div className="flex gap-1">
          {employee.map((role, index) => (
            <div
              key={index}
              className={`
                text-nowrap
                rounded-full
                border-[1.5px]
                px-2
                py-[1px]
                text-xs
                font-medium
              ${
                role === "ORGANIZATION_ADMIN"
                  ? "border-green-400 bg-green-100 text-green-700"
                  : role === "PROJECT_MANAGER"
                    ? "border-red-400 bg-red-100 text-red-700"
                    : role === "DEPARTMENT_MANAGER"
                      ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                      : "border-blue-400 bg-blue-100 text-blue-700"
              }`}
            >
              {role === "ORGANIZATION_ADMIN"
                ? "Admin"
                : role === "PROJECT_MANAGER"
                  ? "Project Manager"
                  : role === "DEPARTMENT_MANAGER"
                    ? "Department Manager"
                    : "Employee"}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return <DropdownMenuEmployee employee={employee} />;
    },
  },
];
