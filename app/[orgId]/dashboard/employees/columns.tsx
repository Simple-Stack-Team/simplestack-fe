"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, UserRoundPlus, UserRound, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SelectEmployeeRoles } from "./SelectEmployeeRoles";
import { Employee } from "@/types/Employee";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
    // header: () => {}
    // cell: () => {}
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
        <div className="flex gap-2">
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
              {role.toLowerCase()}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <UserRound size={16} />
                View profile
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Pencil size={16} />
                Edit employee
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              // onClick={() => }
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center gap-2">
                    <UserRoundPlus size={16} />
                    Assign a role
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Assign roles to this user</DialogTitle>
                    <DialogDescription>
                      Select one or multiple roles to assign to this user.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <SelectEmployeeRoles employeeId={employee.id} employeeRoles={employee.roles} />
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
