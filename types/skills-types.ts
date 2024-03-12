export interface Skills {
  organizationId: string,
  id: string;
  name: string;
  description: string,
  categoryId: string,
  authorId: string,
  departmentIds: string[],
  category: {
    id: string;
    name: string;
    organizationId: string;
  };
}
