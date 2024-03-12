import TeamFinder from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/teamfinder'
import { getProject } from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/getProject'

export default async function TeamFinderPage({ params }: { params: { projectId: string } }) {
  const project = await getProject(params.projectId)
  console.log(project)
  return (
    <div>
      Find members for project: {project.name}
      <div className="my-4">
        <TeamFinder />
      </div>
    </div>
  )
}
