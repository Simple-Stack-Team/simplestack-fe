'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { TeamFinderForm } from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/teamfinder-form'
import TeamFinderResult from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/teamfinder-result'
import { GptTeamFinderForm } from './gpt-teamfinder'
import { SuggestedEmployee } from '../../types/teamfinder-types'

export default function TeamFinder() {
  const [data, setData] = useState<SuggestedEmployee[]>([])
  const [loading, setLoading] = useState(false)
  const { orgId, projectId } = useParams()
  const { data: session } = useSession()
  
  const token = session?.user?.access_token;

  const onSubmit = async (values: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/projects/${projectId}/teamfinder?includePartiallyAvailable=${values.includePartiallyAvailable}&includeCloseToFinish=${values.includeCloseToFinish}&includeUnavailable=${values.includeUnavailable}&includePastProjects=${values.includePastProjects}&deadlineWeeks=${values.deadlineWeeks}`;
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

  const onSubmitGPT = async (values: {prompt: string}) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/projects/${projectId}/teamfinder/gpt`;
    setLoading(true)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log('GPT DATA: ', data)
    setLoading(false);
    setData(data)
  }

  return (
    <div>
      <TeamFinderForm onSubmit={onSubmit} />
      <h3 className="font-semibold text-xl mb-4 mt-12">Or... let AI find a team that fits your requirements</h3>
      <GptTeamFinderForm onSubmit={onSubmitGPT} />
      <div className="mt-6">
        {
          loading ? <h1 className="text-2xl font-bold">Loading suggested team...</h1> : <TeamFinderResult data={data}/>
        }
      </div>
    </div>
  )
}
