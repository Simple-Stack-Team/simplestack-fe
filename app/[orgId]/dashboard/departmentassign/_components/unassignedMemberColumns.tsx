"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DepartmentMembers } from "@/types/department-assign-types";
import AssignMemberToDepartment from "@/app/[orgId]/dashboard/departmentassign/_components/AssignMemberToDepartment";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<DepartmentMembers>[] = [
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
              className="text-nowrap rounded-full border border-slate-300 px-2"
            >
              {role === "ORGANIZATION_ADMIN" ? (
                <div className="flex items-center gap-[6px]">
                  <div className="aspect-square h-2 rounded-full bg-green-400"></div>
                  <span>Admin</span>
                </div>
              ) : role === "DEPARTMENT_MANAGER" ? (
                <div className="flex items-center gap-[6px]">
                  <div className="aspect-square h-2 rounded-full bg-blue-400"></div>
                  <span>Department manager</span>
                </div>
              ) : role === "PROJECT_MANAGER" ? (
                <div className="flex items-center gap-[6px]">
                  <div className="aspect-square h-2 rounded-full bg-red-400"></div>
                  <span>Project manager</span>
                </div>
              ) : (
                <div className="flex items-center gap-[6px]">
                  <div className="aspect-square h-2 rounded-full bg-gray-400"></div>
                  <span>Employee</span>
                </div>
              )}
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

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <AssignMemberToDepartment empId={empId} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-center">
                Assign member to
                <br />
                your department
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
