"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { fetchRejectProposal } from "../fetchRejectProposal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  deallocationId: string;
}

const RejectDeallocation = ({ deallocationId }: Props) => {
  const { data: session } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  if (!session) return;
  const token = session?.user.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/deallocation-proposal/${deallocationId}`;

  const rejectProposal = async () => {
    const res = await fetchRejectProposal(url, token);

    if (res.ok) {
      toast("Success", {
        description: "The employee has been successfully reject.",
      });

      router.refresh();
    } else {
      toast("Failed", {
        description: "Sorry! Try again later.",
      });
    }
  };

  return (
    <Button onClick={rejectProposal} variant="outline_reject">
      Reject
    </Button>
  );
};

export default RejectDeallocation;
