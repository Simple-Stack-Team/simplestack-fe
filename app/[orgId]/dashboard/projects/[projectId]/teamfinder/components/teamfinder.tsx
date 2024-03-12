'use client'

import { useState } from 'react'
import { TeamFinderForm } from './teamfinder-form'
import TeamFinderResult from './teamfinder-result'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function TeamFinder() {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { orgId, projectId } = useParams()
  const { data: session } = useSession()
  
  //@ts-ignore
  const token = session?.user?.access_token;

  
  const onSubmit = async (values: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/projects/${projectId}/teamfinder?includePartiallyAvailable=${values.includePartiallyAvailable}?includeCloseToFinish=${values.includeCloseToFinish}?includeUnavailable=${values.includeUnavailable}?includePastProjects=${values.includePastProjects}?deadlineWeeks=${values.deadlineWeeks}`;
    setLoading(true)
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    const data = await res.json()
    setLoading(false);
    setData(data)
  }

  return (
    <div>
      <TeamFinderForm onSubmit={onSubmit} />
      <div className="mt-6">
        {
          loading ? <h1 className="text-2xl font-bold">Loading suggested team...</h1> : <TeamFinderResult data={data}/>
        }
      </div>
    </div>
  )
}
