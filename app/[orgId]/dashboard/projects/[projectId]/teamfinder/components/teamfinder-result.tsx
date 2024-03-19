'use client'

import { SuggestedEmployee } from "@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types"
import { SuggestedEmployeeCard } from "@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/suggested-employee"

interface Props {
  data: SuggestedEmployee[]
}

export default function TeamFinderResult({data}: Props) {
  return (
    <div>
      {data.length > 0 && <h1 className="text-2xl font-bold mb-4">Results</h1>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((user: SuggestedEmployee)=> <SuggestedEmployeeCard employee={user} key={user.id} /> )}
      </div>
    </div>
  )
}
