export interface ProposalTypes {
  id: string;
  projectId: string;
  employeeId: string;
  teamRoles: string[];
  workHours: number;
  comments: string;
  project: {
    name: string;
    period: string;
    startDate: string;
    deadlineDate: string;
    status: string;
    description: string;
    technologyStack: string[];
  };
  employee: {
    name: string;
    email: string;
    roles: string[];
  };
}