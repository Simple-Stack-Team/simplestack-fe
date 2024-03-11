"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import DeleteModal from "@/components/DeleteModal";
import { onDelete } from "@/lib/onDelete";

const DeleteCategory = ({ categoryId }: { categoryId: string }) => {
  const { data: session } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  // @ts-ignore
  const token = session?.user?.access_token;

  const handleDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/skills/skill-category/delete/${categoryId}`;

    try {
      const res = await onDelete(url, token, categoryId);

      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return <DeleteModal handleDelete={handleDelete} />;
};

export default DeleteCategory;
