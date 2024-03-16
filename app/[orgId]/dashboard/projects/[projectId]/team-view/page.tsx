import { getData } from "@/lib/getFetch";
import { EmployeeLists } from "./components/employee-lists";


export default async function TeamView({params}: {params: {projectId: string, orgId: string}}) {
  const {orgId, projectId} = params;
  const teamView = await getData(`/organizations/${orgId}/projects/${projectId}/team`)
  
  if(!teamView) return <h1>Loading team view...</h1>
  return (
    <div>
      <EmployeeLists employees={teamView} />
    </div>
  )
}
