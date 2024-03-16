export interface ProposalTypes {
  id: string;
  projectId: string;
  employeeId: string;
  reason?: string;
  teamRoles?: string[];
  workHours?: number;
  comments?: string;
  employeeProjectId: string;
  project: {
    name: string;
    period: string;
    startDate: string;
    deadlineDate: string;
    status: string;
    description: string;
    technologyStack: string[];
    authorId: string;
  };
  employee: {
    name: string;
    email: string;
    roles: string[];
  };
}
