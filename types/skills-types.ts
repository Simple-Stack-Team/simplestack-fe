export interface Skills {
  organizationId: string,
  id: string;
  name: string;
  description: string,
  categoryId: string,
  authorId: string,
  departments: string[],
  category: {
    id: string;
    name: string;
    organizationId: string;
  };
}