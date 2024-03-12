export interface Skills {
  organizationId: string;
  id: string;
  name: string;
  description: string;
  categoryId: string;
  authorId: string;
  departmentIds: string[];
  departmentNames: string[];
  category: {
    id: string;
    name: string;
    organizationId: string;
  };
  departments: {
    name: string;
  }[];
}

interface Author {
  id: string;
  name: string;
  email: string;
  password: string;
  organizationId: string;
  roles: string[];
  createdAt: string;
  departmentId: string;
}

interface Department {
  id: string;
  name: string;
  createdAt: string;
  organizationId: string;
  managerId: string;
  skillIds: string[];
}

interface Category {
  id: string;
  name: string;
  organizationId: string;
}

interface Organization {
  id: string;
  orgName: string;
  headquarterAdress: string;
  createdAt: string;
}

export interface SkillC {
  organizationId: string;
  id: string;
  name: string;
  description: string;
  categoryId: string;
  authorId: string;
  departmentIds: string[];
  departmentNames: string[];
  author: Author;
  departments: Department[];
  category: Category;
  organization: Organization;
}
