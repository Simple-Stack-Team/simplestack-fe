"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DeleteModal from "@/components/DeleteModal";

const DeleteSkill = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return;

  const orgId = session?.user.user.orgId;
  const empId = session?.user.user.sub;
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
