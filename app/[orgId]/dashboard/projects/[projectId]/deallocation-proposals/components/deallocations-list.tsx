'use client'

import { useParams } from 'next/navigation'

import useFetch from '@/hooks/useFetch'
import { Deallocation } from '@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types'
import { DeallocationCard } from '@/app/[orgId]/dashboard/projects/[projectId]/deallocation-proposals/components/deallocation-card'

export default function DeallocationsList() {
  const { orgId, projectId } = useParams()
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/projects/${projectId}/deallocations-proposals`;

  const { data: deallocations, loading } = useFetch({ apiKey, url });
  
  if(loading) return <h1 className="text-2xl font-bold">Loading deallocations...</h1>

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3">
        {deallocations.map((deallocation: Deallocation)=> <DeallocationCard key={deallocation.id} deallocation={deallocation} /> )}
      </div>
    </div>
  )
}
