export interface DepartmentMembers {
  id: string;
  name: string;
  email: string;
  organizationId: string;
  roles: string[];
  createdAt: string;
  departmentId: string | null;
}

