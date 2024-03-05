"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const deleteDepartment = async (
  orgId: string,
  departmentId: string,
  token: string
) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiKey}/organizations/${orgId}/departments/${departmentId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      id: departmentId,
    }),
  });

  console.log(res);
};

const ActionsTable = ({ departmentId }: string) => {
  const { orgId } = useParams();
  const { data: session } = useSession();

  // @ts-ignore
  const token = session?.user?.access_token;

  const onDelete = () => {
    deleteDepartment(orgId, departmentId, token);
  };

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
        <DropdownMenuItem onClick={() => console.log("ge")}>
          <div className="flex items-center gap-2">
            <Pencil size={16} />
            Update
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2 text-red-500" onClick={onDelete}>
            <Trash2 size={16} />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTable;
