"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { fetchAcceptProposal } from "@/app/[orgId]/dashboard/proposals/fetchAcceptProposal";
import { Button } from "@/components/ui/button";

interface Props {
  deallocationId: string;
  empProjectId: string;
}

const AcceptDeallocation = ({ deallocationId, empProjectId }: Props) => {
  const { data: session } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  if (!session) return;
  const token = session?.user.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL}//organizations/${orgId}/projects/deallocate-employee/${deallocationId}/employee-project/${empProjectId}`;

  const acceptProposal = async () => {
    const res = await fetchAcceptProposal(url, token);

    if (res.ok) {
      toast("Success", {
        description: "The employee has been successfully deallocated.",
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

export default AcceptDeallocation;
