import { getProject } from '@/app/[orgId]/dashboard/projects/[projectId]/getProject'
import AssignmentsList from '@/app/[orgId]/dashboard/projects/[projectId]/assignments-proposals/components/assignments-list'

export default async function AssignmentsPage({ params }: { params: { projectId: string } }) {
  const project = await getProject(params.projectId)

  return (
    <div>
      <div className="my-4">
        <AssignmentsList />
      </div>
    </div>
  )
}
