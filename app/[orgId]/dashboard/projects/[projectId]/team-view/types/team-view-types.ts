import { SuggestedEmployee } from "../../types/teamfinder-types";

export interface EmployeeProject {
  id: string,
  employee: SuggestedEmployee,
  employeeRoles: string[]
}