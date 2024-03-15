import { Toaster } from "@/components/ui/sonner";
import Assignment from "./Assignment";

interface Props {
  params: { orgId: string };
}

const ProposalsPage = ({ params: { orgId } }: Props) => {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">Proposals</h1>
      <Assignment orgId={orgId} />
      <Toaster />
    </main>
  );
};

export default ProposalsPage;
