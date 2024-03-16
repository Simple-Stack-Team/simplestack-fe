export interface ProjectsView {
  label: string,
  key: string
}

export const ProjectsViews: ProjectsView[] = [
  { label: 'Current projects', key: 'currentProjects' },
  { label: 'Past projects', key: 'pastProjects' },
]