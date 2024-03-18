'use client'

import { EmployeeProject } from "../types/team-view-types";
import { EmployeeCard } from "./employee-card"

interface Props {
  data: EmployeeProject[];
}

export const EmployeeSection = ({data}: Props) => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {data.length > 0 ? data.map((employeeProject: EmployeeProject) => (
          <EmployeeCard key={employeeProject.id} employeeProject={employeeProject} />
        )) : (<h1 className="text-2xl font-semibold">No members</h1>)}
      </div>
    </div>
  )
}