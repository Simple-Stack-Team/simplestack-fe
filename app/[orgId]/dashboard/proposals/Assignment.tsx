import { getServerSession } from "next-auth";
import { FC } from "react";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { getData } from "@/lib/getFetch";
import Proposal from "./_components/Proposal";

interface PageProps {
  orgId: string;
}

interface ManagerDetail {
  departmentId: string;
}

const Assignment: FC<PageProps> = async ({ orgId }) => {
  const session = await getServerSession(authOption);

  if (!session) return;
  // @ts-ignore
  const managerId = session?.user?.user.sub;

  const { departmentId } = (await getData(
    `/organizations/${orgId}/employees/${managerId}/employee`,
  )) as ManagerDetail;

  const proposals = await getData(
    `/organizations/${orgId}/projects/department/${departmentId}/proposals`,
  );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Proposal />
      <Proposal />
      <Proposal />
      <Proposal />
      <Proposal />
      <Proposal />
      <Proposal />
    </div>
  );
};

export default Assignment;
