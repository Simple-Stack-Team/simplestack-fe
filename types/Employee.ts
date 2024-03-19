import { EMPLOYEE_ROLES } from "./employee-types";

interface PersonalSkills {
  id: string;
  level: number;
  experience: string;
  employeeId: string;
  skill: {
    id: string;
    name: string;
    description: string;
  };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  roles: EMPLOYEE_ROLES[];
  createdAt: string;
  departmentId: string;
  organization: {
    orgName: string;
    headquarterAdress: string;
  };
  organizationId: string;

  personalSkills: PersonalSkills[];
}
