import { getEmployee } from "../departmentassign/getEmployee";
import DepartmentProjectsTable from "./projects/components/department-projects-table";


export default async function ProjectsPage() {
  const { departmentId } = await getEmployee();
  
  if(!departmentId) return <h1 className="mb-8 text-2xl font-semibold">Loading...</h1>

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold">My department</h1>
      <DepartmentProjectsTable depId={departmentId} />
    </div>
  );
};
