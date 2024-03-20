import { Toaster } from "@/components/ui/sonner";
import Assignment from "@/app/[orgId]/dashboard/proposals/Assignment";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { getData } from "@/lib/getFetch";

interface Props {
  params: { orgId: string };
}

const ProposalsPage = async ({ params: { orgId } }: Props) => {
  const session = await getServerSession(authOption);

  const managerId = session?.user.user.sub;
  const data = await getData(
    `/organizations/${orgId}/employees/${managerId}/employee`,
  );

  console.log(data);

  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Proposals</h1>
      <Separator className="mb-4 mt-[-4px]" />
      {data.managerAt === null ? (
        <div>You are not assigned to a department yet</div>
      ) : (
        <Assignment orgId={orgId} />
      )}
      <Toaster />
    </main>
  );
};

export default ProposalsPage;
