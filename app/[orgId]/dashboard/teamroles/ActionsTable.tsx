"use client";

import { MoreHorizontal } from "lucide-react";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useTeamRoleStore } from "@/lib/store";
import UpdateTeamRoles from "./UpdateTeamRoles";
import { Dialog } from "@/components/ui/dialog";
import { onDelete } from "@/lib/onDelete";
import DeleteModal from "@/components/DeleteModal";

interface Props {
  teamRoleId: string;
  name: string;
}

const ActionsTable = ({ teamRoleId, name }: Props) => {
  const { orgId } = useParams();
  const { data: session } = useSession();

  const token = session?.user?.access_token!;

  const deleteTeamRoles = useTeamRoleStore((state) => state.deleteTeamRoles);

  const handleDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/teamroles/${teamRoleId}`;

    try {
      const response = await onDelete(url, token!, teamRoleId);
      deleteTeamRoles(teamRoleId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"> 
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Dialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <UpdateTeamRoles name={name} teamRoleId={teamRoleId} />
          </DropdownMenuItem>
        </Dialog>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteModal handleDelete={handleDelete}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTable;
