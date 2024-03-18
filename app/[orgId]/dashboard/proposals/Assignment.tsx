import { getServerSession } from "next-auth";
import { FC } from "react";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { ProposalTypes } from "@/app/[orgId]/dashboard/proposals/types/proposals-types";
import AssignmentProposal from "@/app/[orgId]/dashboard/proposals/_components/AssignmentProposal";
import DeallocationProposal from "@/app/[orgId]/dashboard/proposals/_components/DeallocationProposal";
import { getData } from "@/lib/getFetch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="deallocations">Deallocations</TabsTrigger>
        </TabsList>
        <TabsContent value="assignments">
          {proposals.assignments[0].length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {proposals.assignments[0].map((proposal: ProposalTypes) => (
                <AssignmentProposal
                  key={proposal.id}
                  proposal={proposal}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <Badge variant="outline">No assignments available</Badge>
            </div>
          )}
        </TabsContent>
        <TabsContent value="deallocations">
          {proposals.deallocations[0].length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {proposals.deallocations[0].map((proposal: ProposalTypes) => (
                <DeallocationProposal
                  key={proposal.id}
                  proposal={proposal}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <Badge variant="outline">No deallocations available</Badge>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assignment;
