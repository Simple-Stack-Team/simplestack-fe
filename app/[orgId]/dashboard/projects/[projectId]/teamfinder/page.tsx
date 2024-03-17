import TeamFinder from '@/app/[orgId]/dashboard/projects/[projectId]/teamfinder/components/teamfinder'
import RoleCheck from '@/components/RoleCheck'
import { EMPLOYEE_ROLES } from '@/types/employee-types'

export default async function TeamFinderPage({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <div className="my-4">
        <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
          <TeamFinder />
        </RoleCheck>
      </div>
    </div>
  )
}
