import { getProject } from '@/app/[orgId]/dashboard/projects/[projectId]/getProject'
import AssignmentsList from '@/app/[orgId]/dashboard/projects/[projectId]/assignments-proposals/components/assignments-list'
import RoleCheck from '@/components/RoleCheck'
import { EMPLOYEE_ROLES } from '@/types/employee-types'

export default async function AssignmentsPage({ params }: { params: { projectId: string } }) {
  const project = await getProject(params.projectId)

  return (
    <div>
      <div className="my-4">
        <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
          <AssignmentsList />
        </RoleCheck>
      </div>
    </div>
  )
}
