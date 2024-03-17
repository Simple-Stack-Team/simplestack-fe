'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmployeeProject } from "@/app/[orgId]/dashboard/projects/[projectId]/team-view/types/team-view-types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  employeeProject: EmployeeProject
}

export const ProjectCard = ({employeeProject}: Props) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="p-4">
        <div className="flex justify-between align-middle">
          <h3 className="text-slate-800 font-bold text-2xl">{employeeProject.project.name}</h3>
          <Link href={`./${employeeProject.project.id}`}>
            <Button variant="outline">See project <ChevronRight size={20} className="ml-2" /></Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="px-4">
        <h1 className="text-md font-semibold text-slate-600">Roles</h1>
        <div className="flex flex-wrap gap-1 mb-3 mt-1">
          {employeeProject.employeeRoles && employeeProject.employeeRoles.map((role: string) => 
            <Badge className="p-0.5 px-1" variant="outline" key={role}>{role}</Badge>
          )}
        </div>
        <h1 className="text-md font-semibold text-slate-600">Technology stack</h1>
        <div className="flex flex-wrap gap-1 mt-1">
          {employeeProject.project.technologyStack && employeeProject.project.technologyStack.map((stack: string) => 
            <Badge className="p-0.5 px-1" variant="outline" key={stack}>{stack}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}