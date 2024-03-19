import { Toaster } from "@/components/ui/sonner";
import Assignment from "@/app/[orgId]/dashboard/proposals/Assignment";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { orgId: string };
}

const ProposalsPage = ({ params: { orgId } }: Props) => {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Proposals</h1>
      <Separator className="mb-4 mt-[-4px]" />
      <Assignment orgId={orgId} />
      <Toaster />
    </main>
  );
};

export default ProposalsPage;
