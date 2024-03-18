import { Employee } from "@/types/Employee"

export interface SuggestedEmployee {
  id: string,
  name: string,
  personalSkills: PersonalSkill[]
  projects: EmployeeProject[]
  assignmentProposal: Assignment[]
}

export interface PersonalSkill {
  id: string,
  level: string,
  experience: string,
  employeeId: string,
  skill: Skill,
}

export type Skill = {
  name: string
  id: string
}

export interface TeamRole {
  id: string
  name: string
}

export interface EmployeeProject {
  id: string
  workHours: number
}

export interface Assignment {
  id: string;
  comments: string;
  workHours: string;
  teamRoles: string[];
  employee: Employee;
  employeeId: string
  project: Project;
}

export interface Deallocation {
  id: string;
  reason: string;
  employee: Employee;
  employeeId: string
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  period: string;
  startDate: string;
  deadlineDate: string;
  status: string;
}