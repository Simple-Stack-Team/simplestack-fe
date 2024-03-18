import { EMPLOYEE_ROLES } from "@/types/employee-types";

export interface Employee {
  id: string;
  roles: EMPLOYEE_ROLES[];
}