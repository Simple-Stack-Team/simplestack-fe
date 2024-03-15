'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateDeallocation } from "../../deallocation-proposals/components/create-deallocation"
import { EmployeeProject } from "../types/team-view-types"

interface Props {
  employeeProject: EmployeeProject
}

export const EmployeeCard = ({employeeProject}: Props) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="p-4">
        <div className="flex justify-between align-middle">
          <h3 className="text-slate-800 font-semibold text-2xl">{employeeProject.employee.name}</h3>
          {employeeProject.employeeRoles &&<CreateDeallocation employee={employeeProject.employee} />}
        </div>
      </CardHeader>
      
      <CardContent className="px-4">
        <div className="flex flex-wrap gap-1">
          {employeeProject.employeeRoles && employeeProject.employeeRoles.map((role: string) => 
            <Badge className="p-0.5 px-1" variant="outline" key={role}>{role}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}