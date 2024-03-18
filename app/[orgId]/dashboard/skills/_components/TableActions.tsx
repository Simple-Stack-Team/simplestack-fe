"use client";

import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Pencil, CircleEllipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteSkill from "@/app/[orgId]/dashboard/skills/_components/DeleteSkill";
import { AssignModal } from "@/app/[orgId]/dashboard/skills/_components/./AssignModal";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const id = session?.user?.user.sub;
  console.log(id);
  console.log(authorId);

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
          <AssignModal authorId={authorId} skillId={skillId} skill={name} />
        </DropdownMenuItem>
        {authorId === id && (
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
        )}
        {authorId === id && (
          <Dialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
              <DeleteSkill skillId={skillId} authorId={authorId} />
            </DropdownMenuItem>
          </Dialog>
        )}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`/${orgId}/dashboard/skills/${skillId}?des=${description}&authorId=${authorId}&name=${name}&frameworkid=${framework}&fname=${fname}`}
            className="flex items-center gap-2"
          >
            <CircleEllipsis size={16} />
            View details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
