"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
import { useDepartmentStore } from "@/lib/store";
import UpdateDepartment from "./UpdateDepartment";
import { Dialog } from "@/components/ui/dialog";

interface Props {
  departmentId: string;
  name: string;
}

const ActionsTable = ({ departmentId, name }: Props) => {
  const router = useRouter();
  const { orgId } = useParams();
  const { data: session } = useSession();

  // @ts-ignore
  const token = session?.user?.access_token;

  const deleteDepartment = useDepartmentStore(
    (state) => state.deleteDepartment,
  );

  const onDelete = async () => {
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

    if (res.ok) {
      deleteDepartment(departmentId);
    }
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
        <Dialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <UpdateDepartment name={name} departmentId={departmentId} />
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
