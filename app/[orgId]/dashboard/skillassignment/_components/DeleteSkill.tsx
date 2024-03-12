"use client";

import { useSession } from "next-auth/react";

import { toast } from "sonner";
import DeleteModal from "@/components/DeleteModal";
import { useRouter } from "next/navigation";

const DeleteSkill = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return;

  // @ts-ignore
  const orgId = session?.user.user.orgId;
  //@ts-ignore
  const empId = session?.user.user.sub;
  // @ts-ignore
  const token = session?.user?.access_token;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const onDelete = async () => {
    const res = await fetch(
      `${apiKey}/organizations/${orgId}/skills/delete-skill-from-employee/${id}/employee/${empId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );
    if (!res.ok) {
      toast("Error", {
        description: `Oops! Something went wrong while trying to delete the skill. Please try again later.`,
        duration: 2000,
      });
    }

    router.refresh();
  };

  return <DeleteModal handleDelete={onDelete} />;
};

export default DeleteSkill;
