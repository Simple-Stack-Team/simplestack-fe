"use client";

import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteSkill from "./DeleteSkill";
import { AssignModal } from "./AssignModal";

type Props = {
  skillId: string;
  authorId: string;
  description: string;
  name: string;
  framework: string;
  fname: string;
};

const TableActions = ({
  skillId,
  authorId,
  description,
  name,
  framework,
  fname,
}: Props) => {
  const { orgId } = useParams();

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
        <Dialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <DeleteSkill skillId={skillId} authorId={authorId} />
          </DropdownMenuItem>
        </Dialog>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="space-x-2"
        >
          <Pencil size={16} />
          <Link
            href={`/${orgId}/dashboard/skills/${skillId}/updateskill?des=${description}&name=${name}&framework=${framework}`}
          >
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AssignModal authorId={authorId} skillId={skillId} skill={name} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`/${orgId}/dashboard/skills/${skillId}?des=${description}&authorId=${authorId}&name=${name}&frameworkid=${framework}&fname=${fname}`}
          >
            View details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
