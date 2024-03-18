"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const DeleteMemberFromDepartment = ({
  empId,
  depId,
}: {
  empId: string;
  depId: string | null;
}) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  const orgId = session?.user?.user.orgId;
  const currentEmployee = session?.user?.user.sub;

  if (status === "loading") return;
  const token = session?.user?.access_token;

  const assignMember = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/departments/${depId}/delete-member/${empId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) return;

    toast("Success", {
      description: `The employee with ID ${empId} has been successfully deleted from your department.`,
      duration: 2000,
    });

    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={assignMember}
      disabled={currentEmployee === empId}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteMemberFromDepartment;
