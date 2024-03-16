'use client'

import { useParams } from 'next/navigation'

import useFetch from '@/hooks/useFetch'
import { Assignment } from '@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types'
import { AssignmentCard } from '@/app/[orgId]/dashboard/projects/[projectId]/assignments-proposals/components/assignment-card'

export default function AssignmentsList() {
  const { orgId, projectId } = useParams()
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/projects/${projectId}/assignments-proposals`;

  const { data: assignments, loading, error } = useFetch({ apiKey, url });
  
  if(loading) return <h1 className="text-2xl font-bold">Loading assignments...</h1>

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3">
        {assignments.map((assignment: Assignment)=> <AssignmentCard key={assignment.id} assignment={assignment} /> )}
      </div>
    </div>
  )
}
