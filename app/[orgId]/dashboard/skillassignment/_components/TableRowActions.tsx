"use client";

import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface PageProps {
  skillId: string;
  skillname: string;
}

const TableRowActions: FC<PageProps> = ({ skillId, skillname }) => {
  const { data: session } = useSession();

  const empId = session?.user.user.sub;
  const { orgId } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`/${orgId}/dashboard/skillassignment/${skillId}`}
            className="w-full"
          >
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`/${orgId}/dashboard/skillassignment/${skillId}/assignskill?empId=${empId}&skillname=${skillname}`}
            className="w-full"
          >
            Assign skill
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableRowActions;
