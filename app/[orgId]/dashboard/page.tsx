import RoleCheck from "@/components/RoleCheck";
import { EMPLOYEE_ROLES } from "@/types/employee-types";

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>ACCEPTED</RoleCheck>
    </>
  );
}
