import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { ProposalTypes } from "../types/proposals-types";
import AcceptProposal from "./AcceptProposal";
import RejectProposal from "./RejectProposal";

const Proposal = ({ proposal, type }: { proposal: ProposalTypes, type: string }) => {
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
            <Badge variant={"outline"}>
              {proposal.workHours} {proposal.workHours > 1 ? "hours" : "hour"}
            </Badge>
          </div>
          {type}
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
            <p className="text-xs text-gray-500">
              Work hours:{" "}
              <span className="font-semibold text-slate-900">
                {proposal.workHours}
              </span>
            </p>
          </div>
        </div>
        <h2 className="mb-1 text-sm font-semibold">Team roles</h2>
        <div className="flex flex-wrap gap-1">
          {proposal.teamRoles.map((role, index) => (
            <Badge key={index}>{role}</Badge>
          ))}
        </div>
        <h2 className="mt-4 text-sm font-semibold">Comments</h2>
        <Textarea className="" readOnly>
          {proposal.comments}
        </Textarea>
      </CardContent>
      <CardFooter className="space-x-2">
        <AcceptProposal assignmentId={proposal.id} />
        <RejectProposal
          assignmentId={proposal.id}
        />
      </CardFooter>
    </Card>
  );
};

export default Proposal;
