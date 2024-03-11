"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Trash2 } from "lucide-react";

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
import { toast } from "sonner";

interface Props {
  skillId: string;
  authorId: string;
}
const now = new Date();

const DeleteSkill = ({ skillId, authorId }: Props) => {
  const { data: session, status } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  const onDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL!;
    const url = `${apiKey}/organizations/${orgId}/skills/delete-skill/${skillId}/author/${authorId}`;

    if (status === "loading") return;

    //@ts-ignore
    const token = session?.user?.access_token;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: skillId,
      }),
    });

    if (res.ok) {
      router.refresh();
      toast("The skill was successfully deleted", {
        description: now.toTimeString(),
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full rounded-sm px-2 py-1 hover:bg-slate-100">
        <div className="flex w-full items-center gap-2 text-red-500">
          <Trash2 size={16} />
          <span className="text-sm">Delete</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSkill;
