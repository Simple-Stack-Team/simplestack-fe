"use client";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ProjectDetail from "./components/project-detail";
import { Badge } from "@/components/ui/badge";
import { EmployeeProject } from "./team-view/types/team-view-types";
import { EMPLOYEE_ROLES } from "@/types/employee-types";
import RoleCheck from "@/components/RoleCheck";

type TeamRole = {
  teamroleId: string;
  nrOfMembers: number;
};

type View = {
  projectsId: string;
  name: string;
  period: string;
  startDate: Date;
  deadlineDate: string;
  status: string;
  description: string;
  members: EmployeeProject[];
  technologyStack: string[];
  teamRoles: TeamRole[];
};

const ProjectDetailsView: React.FC = () => {
  const { data: session } = useSession();
  const [projectsDetails, setProjectsDetails] = useState<View | null>(null);

  const { orgId, projectId } = useParams();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/${projectId}`;

  const token = session?.user?.access_token;

  useEffect(() => {
    async function getProjectsDetails() {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProjectsDetails(data);
      }
    }

    getProjectsDetails();
  }, [url, token]);

  if (!projectsDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectDetail label="Period" value={projectsDetails.period} />
        <ProjectDetail
          label="Start date"
          value={
            projectsDetails.startDate
              ? format(projectsDetails.startDate, "PPP")
              : "N/A"
          }
        />
        <ProjectDetail
          label="Deadline date"
          value={
            projectsDetails.deadlineDate
              ? format(new Date(projectsDetails.deadlineDate), "PPP")
              : "Project doesn't have a finish date because is ongoing"
          }
        />
        <ProjectDetail label="Status" value={projectsDetails.status} />
        <ProjectDetail
          label="Description"
          value={projectsDetails.description}
        />
        <div className="border-1 rounded-lg border p-4">
          <p className="mb-2 text-lg font-semibold">Technology Stack:</p>
          <div className="flex flex-wrap gap-1">
            {projectsDetails.technologyStack.map((tech, index) => (
              <Badge variant="outline" key={index}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <h1 className="mt-4 text-xl font-semibold">Members</h1>
      </div>
      <div className="flex flex-wrap gap-2 ">
        {projectsDetails.members.map((member) => (
          <div className="border-1 rounded-lg border p-4" key={member.id}>
            <div className="mb-2 text-xl font-semibold">
              {member.employee.name}
            </div>
            <Badge variant={member.endWork ? "destructive" : "default"}>
              {member.endWork ? "Past member" : "Active member"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailsView;
