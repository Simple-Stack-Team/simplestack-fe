"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { UserRound } from "lucide-react";

import { DepartmentMembers } from "@/types/department-assign-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteMemberFromDepartment from "@/app/[orgId]/dashboard/departmentassign/_components/DeleteMemberFromDepartment";
import { Button } from "@/components/ui/button";

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
      const depId = row.original.departmentId;

      return (
        <div className="text-nowrap">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size={"icon"}>
                  <DeleteMemberFromDepartment empId={empId} depId={depId} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-center">
                  Delete member from
                  <br /> your department
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" asChild size={"icon"}>
                  <Link
                    href={`/${row.original.organizationId}/dashboard/employeeprofile?empId=${empId}`}
                  >
                    <UserRound size={16} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-center">View profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
