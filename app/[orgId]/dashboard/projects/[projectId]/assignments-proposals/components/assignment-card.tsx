import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"

import { Assignment } from "@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types"
import { Card, CardHeader } from "@/components/ui/card"
import { UpdateProposal } from "@/app/[orgId]/dashboard/projects/[projectId]/assignments-proposals/components/update-proposal"
import { Button } from "@/components/ui/button"

interface Props {
  assignment: Assignment
}

export const AssignmentCard = ({ assignment }: Props) => {
  const { orgId, projectId } = useParams()
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const { data: session } = useSession();

  //@ts-ignore
  const token = session?.user?.access_token;
  const deleteAssignmentUrl = `/organizations/${orgId}/projects/assignment-proposal/${assignment.id}`;
  
  const deleteProposal = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL!+deleteAssignmentUrl, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    }).then(()=> window.location.reload())
  }
  
  return (
    <Card className="shadow-none">
      <CardHeader className="p-4">
        <div className="flex flex-col lg:flex-row md:justify-between align-middle gap-2">
          <h3 className="text-slate-800 font-semibold text-2xl">{assignment.employee.name}</h3>
          <UpdateProposal assignment={assignment} />
          <Button variant="destructive" onClick={deleteProposal}>Revoke</Button>
        </div>
      </CardHeader>
    </Card>
  )
}