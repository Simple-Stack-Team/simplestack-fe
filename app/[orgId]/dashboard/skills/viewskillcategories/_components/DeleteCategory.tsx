"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import DeleteModal from "@/components/DeleteModal";
import { onDelete } from "@/lib/onDelete";
import { toast } from "sonner";

const DeleteCategory = ({ categoryId }: { categoryId: string }) => {
  const { data: session } = useSession();
  const { orgId } = useParams();

  const token = session?.user.access_token!;

  const handleDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/skills/skill-category/delete/${categoryId}`;

    const res = await onDelete(url, token, categoryId);

    if (res.ok) {
      toast("Success", {
        description: "Category has been successfuly deleted",
      });

      location.reload();
    }
  };

  return <DeleteModal handleDelete={handleDelete} />;
};

export default DeleteCategory;
