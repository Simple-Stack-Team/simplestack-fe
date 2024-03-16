'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsView, ProjectsViews } from "../constants/myprojects-constants"
import { ProjectSection } from "./project-section";

interface Props {
  projects: any
}

export const ProjectsLists = ({ projects }: Props) => {
  return (
    <Tabs defaultValue={ProjectsViews[0].key} className="w-full">
      <TabsList>
        {ProjectsViews.map((section: ProjectsView) =>
          <TabsTrigger value={section.key} key={section.key}>{section.label}</TabsTrigger>
        )}
      </TabsList>
      {ProjectsViews.map((section: ProjectsView) => (
        <TabsContent value={section.key} key={section.key}>
          <ProjectSection key={section.key} data={projects[`${section.key}`]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}