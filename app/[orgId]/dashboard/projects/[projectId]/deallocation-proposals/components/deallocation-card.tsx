import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"

import { Deallocation } from "@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types"
import { Card, CardHeader } from "@/components/ui/card"
import { UpdateDeallocation } from "@/app/[orgId]/dashboard/projects/[projectId]/deallocation-proposals/components/update-deallocation"
import { Button } from "@/components/ui/button"

interface Props {
  deallocation: Deallocation
}

export const DeallocationCard = ({ deallocation }: Props) => {
  const { orgId } = useParams()
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const { data: session } = useSession();

  //@ts-ignore
  const token = session?.user?.access_token;
  const deleteDeallocationUrl = `/organizations/${orgId}/projects/deallocation-proposal/${deallocation.id}`;
  
  const deleteProposal = async () => {
    await fetch(apiKey+deleteDeallocationUrl, {
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
          <h3 className="text-slate-800 font-semibold text-2xl">{deallocation.employee.name}</h3>
          <UpdateDeallocation deallocation={deallocation} />
          <Button variant="destructive" onClick={deleteProposal}>Revoke</Button>
        </div>
      </CardHeader>
    </Card>
  )
}