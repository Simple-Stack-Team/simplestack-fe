import { Projects } from "@/types/projects-types";
import { SuggestedEmployee } from "../../types/teamfinder-types";

export interface EmployeeProject {
  id: string,
  employee: SuggestedEmployee,
  employeeRoles: string[]
  project: Projects
  workHours: number
  startWork: Date | string
  endWork: Date | string | null
}

export interface EmployeeProjectResponse {
  proposedMembers: EmployeeProject[]
  activeMembers: EmployeeProject[]
  pastMembers: EmployeeProject[]
}