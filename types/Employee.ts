import { EMPLOYEE_ROLES } from "./employee-types";

export type Employee = {
  departmentId: string;
  email: string;
  id: string;
  name: string;
  organizationId: string;
  roles: EMPLOYEE_ROLES[];
}