import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/types/Employee";
import DropdownMenuEmployee from "./DropdownMenuEmployee";
import { DataTableColumnHeader } from "./ColumnHeader";

const roleStyles = {
  ORGANIZATION_ADMIN: {
    className: "border-green-400 bg-green-100 text-green-700",
    label: "Admin",
  },
  PROJECT_MANAGER: {
    className: "border-red-400 bg-red-100 text-red-700",
    label: "Project Manager",
  },
  DEPARTMENT_MANAGER: {
    className: "border-yellow-400 bg-yellow-100 text-yellow-700",
    label: "Department Manager",
  },
  DEFAULT: {
    className: "border-blue-400 bg-blue-100 text-blue-700",
    label: "Employee",
  },
};

type RoleType = keyof typeof roleStyles;

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
      const employeeRoles = row.original.roles as RoleType[];

      return (
        <div className="flex gap-1">
          {employeeRoles.map((role, index) => {
            const { className, label } = roleStyles[role] || roleStyles.DEFAULT;
            return (
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
                  ${className}`}
              >
                {label}
              </div>
            );
          })}
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
