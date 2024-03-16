'use client'

import { EmployeeProject } from "@/app/[orgId]/dashboard/projects/[projectId]/team-view/types/team-view-types";
import { ProjectCard } from "./project-card";

interface Props {
  data: EmployeeProject[];
}

export const ProjectSection = ({data}: Props) => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {data.length > 0 ? data.map((employeeProject: EmployeeProject) => (
          <ProjectCard key={employeeProject.id} employeeProject={employeeProject} />
        )) : (<h1 className="text-2xl font-semibold">No projects</h1>)}
      </div>
    </div>
  )
}