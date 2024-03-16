export interface Projects {
  id: string,
  name: string,
  period: string,
  startDate: string,
  deadlineDate: string,
  status: string,
  description: string,
  technologyStack: string[],
  teamRoles: [
    {
      teamroleId: string,
      nrOfMembers: 0,
    },
  ],
}