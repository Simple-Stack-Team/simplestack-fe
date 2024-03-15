'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamViewSections, TeamViewSection } from "../constants/team-view-constants"
import { EmployeeSection } from "./employee-section";

interface Props {
  employees: any
}

export const EmployeeLists = ({ employees }: Props) => {
  return (
    <Tabs defaultValue={TeamViewSections[0].key} className="w-full">
      <TabsList>
        {TeamViewSections.map((section: TeamViewSection) =>
          <TabsTrigger value={section.key} key={section.key}>{section.label}</TabsTrigger>
        )}
      </TabsList>
      {TeamViewSections.map((section: TeamViewSection) => (
        <TabsContent value={section.key} key={section.key}>
          <EmployeeSection key={section.key} data={employees[`${section.key}`]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}