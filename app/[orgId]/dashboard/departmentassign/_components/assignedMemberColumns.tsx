"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DepartmentMembers } from "@/types/department-assign-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteMemberFromDepartment from "./DeleteMemberFromDepartment";

export const assignMembersColumns: ColumnDef<DepartmentMembers>[] = [
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
      const roles = row.original.roles;

      return (
        <div className="flex gap-1">
          {roles.map((role, index) => (
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
    accessorKey: "createdAt",
    header: "Create at",
    id: "createat",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);

      return <div>{createdAt.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const empId = row.original.id;
      const depId = row.original.departmentId;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DeleteMemberFromDepartment empId={empId} depId={depId} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete member from your department</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
