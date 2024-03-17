import DeallocationsList from '@/app/[orgId]/dashboard/projects/[projectId]/deallocation-proposals/components/deallocations-list'
import RoleCheck from '@/components/RoleCheck'
import { EMPLOYEE_ROLES } from '@/types/employee-types'

export default async function DeallocationsPage({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <div className="my-4">
        <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
          <DeallocationsList />
        </RoleCheck>
      </div>
    </div>
  )
}
