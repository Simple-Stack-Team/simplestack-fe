"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTeamRoleStore } from "@/lib/store";
import UpdateTeamRoles from "./UpdateTeamRoles";
import { Dialog } from "@/components/ui/dialog";

interface Props {
  teamRoleId: string;
  name: string;
}

const ActionsTable = ({ teamRoleId, name }: Props) => {
  const { orgId } = useParams();
  const { data: session } = useSession();

  // @ts-ignore
  const token = session?.user?.access_token;

  const deleteTeamRoles = useTeamRoleStore((state) => state.deleteTeamRoles);

  const onDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/teamroles/${teamRoleId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: teamRoleId,
      }),
    });

    if (res.ok) {
      deleteTeamRoles(teamRoleId);
    }
  };

  return (
    <DropdownMenu>
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
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex items-center gap-2 text-red-500">
                <Trash2 size={16} />
                Delete
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTable;
