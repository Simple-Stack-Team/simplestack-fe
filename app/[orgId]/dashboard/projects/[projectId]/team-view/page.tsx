import { getData } from "@/lib/getFetch";
import { EmployeeLists } from "./components/employee-lists";
import RoleCheck from "@/components/RoleCheck";
import { EMPLOYEE_ROLES } from "@/types/employee-types";


export default async function TeamView({params}: {params: {projectId: string, orgId: string}}) {
  const {orgId, projectId} = params;
  const teamView = await getData(`/organizations/${orgId}/projects/${projectId}/team`)
  
  if(!teamView) return <h1>Loading team view...</h1>
  return (
    <div>
      <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
        <EmployeeLists employees={teamView} />
      </RoleCheck>
    </div>
  )
}
