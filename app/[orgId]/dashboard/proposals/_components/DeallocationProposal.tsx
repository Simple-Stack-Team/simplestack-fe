import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { ProposalTypes } from "../types/proposals-types";
import AcceptDeallocation from "./AcceptDeallocation";
import RejectDeallocation from "./RejectDeallocation";

const DeallocationProposal = ({ proposal }: { proposal: ProposalTypes }) => {
  const startDate = new Date(proposal.project.startDate).toLocaleDateString();
  const deadlineDate = new Date(
    proposal.project.deadlineDate,
  ).toLocaleDateString();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">{proposal.project.name}</h2>
          </div>
          Deallocation
        </CardTitle>
        <Separator />
        <div>
          <h2 className="mb-1 mt-2 text-sm font-semibold text-slate-900">
            Project details
          </h2>
          <div className="flex h-5 items-center space-x-2 text-sm text-slate-900">
            <p>{proposal.project.status}</p>
            <Separator orientation="vertical" />
            <p>{startDate}</p>
            <Separator orientation="vertical" />
            <p>{deadlineDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 mt-[-12px]">
          <h2 className="mb-1 text-sm font-semibold">Employee details</h2>
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold">{proposal.employee.name}</h2>
            <p className="text-xs text-gray-500">{proposal.employee.email}</p>
          </div>
        </div>
        <h2 className="mt-4 text-sm font-semibold">Reason</h2>
        <Textarea readOnly>{proposal.reason}</Textarea>
      </CardContent>
      <CardFooter className="space-x-2">
        <AcceptDeallocation
          deallocationId={proposal.id}
          empProjectId={proposal.employeeProjectId}
        />
        <RejectDeallocation deallocationId={proposal.id} />
      </CardFooter>
    </Card>
  );
};

export default DeallocationProposal;
