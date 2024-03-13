import React from "react";

import { getProject } from "./getProject";
import ProjectTabs from "./components/project-tabs";

export default async function ProjectsPageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { projectId: string };
}>) {
  const project = await getProject(params.projectId)
  
  if (!project) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Project {project.name}</h1>
      </div>
      <ProjectTabs />
      <div className="mt-8">{children}</div>
    </div>
  );
}
