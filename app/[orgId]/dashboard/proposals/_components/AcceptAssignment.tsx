"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { fetchAcceptProposal } from "@/app/[orgId]/dashboard/proposals/fetchAcceptProposal";
import { Button } from "@/components/ui/button";

const AcceptAssignment = ({ assignmentId }: { assignmentId: string }) => {
  const { data: session } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  if (!session) return;
  const token = session?.user.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/assign-employee/${assignmentId}`;

  const acceptProposal = async () => {
    const res = await fetchAcceptProposal(url, token);

    if (res.ok) {
      toast("Success", {
        description: "The employee has been successfully made.",
      });

      router.refresh();
    } else {
      toast("Failed", {
        description: "Sorry! Try again later.",
      });
    }
  };

  return <Button onClick={acceptProposal}>Accept</Button>;
};

export default AcceptAssignment;
