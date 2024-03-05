import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/types/Employee";
import DropdownMenuEmployee from "./DropdownMenuEmployee";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
                rounded-full
                border-[1.5px]
                px-2
                py-[1px]
                text-xs
                font-medium
                text-nowrap
              ${
                role === "ORGANIZATION_ADMIN"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : role === "PROJECT_MANAGER"
                  ? "bg-red-100 border-red-400 text-red-700"
                  : role === "DEPARTMENT_MANAGER"
                  ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                  : "bg-blue-100 border-blue-400 text-blue-700"
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

      return (
        <DropdownMenuEmployee employee={employee} />
      );
    },
  },
];
