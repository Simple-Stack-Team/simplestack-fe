import { getServerSession } from "next-auth";
import { FC } from "react";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { ProposalTypes } from "./types/proposals-types";
import Proposal from "./_components/AssignmentProposal";
import { getData } from "@/lib/getFetch";
import { Divide } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  orgId: string;
}

interface ManagerDetail {
  departmentId: string;
}

const Assignment: FC<PageProps> = async ({ orgId }) => {
  const session = await getServerSession(authOption);

  if (!session) return;

  const managerId = session?.user?.user.sub;

  const { departmentId } = (await getData(
    `/organizations/${orgId}/employees/${managerId}/employee`,
  )) as ManagerDetail;

  const proposals = await getData(
    `/organizations/${orgId}/projects/department/${departmentId}/proposals`,
  );

  return (
    <div>
      {proposals.assignments[0].length > 0 && proposals.deallocations[0] > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {proposals.assignments[0].map((proposal: ProposalTypes) => (
            <Proposal
              key={proposal.id}
              proposal={proposal}
              type="Assignments"
            />
          ))}
          {/* {proposals.deallocations[0].map((proposal: ProposalTypes) => (
            <Proposal
              key={proposal.id}
              proposal={proposal}
              type="Deallocations"
            />
          ))} */}
        </div>
      ) : (
        <div className="mt-8 text-center">
          <Badge variant="outline">No proposals available</Badge>
        </div>
      )}
    </div>
  );
};

export default Assignment;

//PUT - Accept
///organizations/{orgId}/projects/deallocation-proposal/{deallocationId}
//DELETE - Reject
///organizations/{orgId}/projects/deallocation-proposal/{deallocationId}