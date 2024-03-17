"use client";

import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProjectDetail from "./components/project-detail";
import { Badge } from "@/components/ui/badge";
import { EmployeeProject } from "./team-view/types/team-view-types";

type TeamRole = {
  teamroleId: string;
  nrOfMembers: number;
};
type View = {
  projectsId: string;
  name: string;
  period: string;
  startDate: string;
  deadlineDate: string;
  status: string;
  description: string;
  members: EmployeeProject[]
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

  console.log(projectsDetails)

  return (
    <div>

      <div className="grid grid-cols-3 gap-5">
        <ProjectDetail label="Period" value={projectsDetails.period} />
        <ProjectDetail label="Start date" value={projectsDetails.startDate
          ? format(projectsDetails.startDate, "PPP")
          : "N/A"} />
        <ProjectDetail label="Deadline date" value={projectsDetails.deadlineDate
          ? format(new Date(projectsDetails.deadlineDate), "PPP")
          : "Project doesn't have a finish date because is ongoing"} />
        <ProjectDetail label="Status" value={projectsDetails.status} />
        <ProjectDetail label="Description" value={projectsDetails.description} />
        <div className="p-4 border border-1 rounded-lg">
          <p className="mb-2 text-lg font-semibold">Technology Stack:</p>
          <div className="flex gap-1 flex-wrap">
            {projectsDetails.technologyStack.map((tech, index) => (
              <Badge variant="outline" key={index}>{tech}</Badge>
            ))}
          </div>
        </div>
        <h1 className="mt-4 text-xl font-semibold">Members</h1>
      </div>
      <div className="flex gap-2 flex-wrap ">
        {projectsDetails.members.map((member) =>
          <div className="p-4 border border-1 rounded-lg" key={member.id}>
            <div className="text-xl font-semibold mb-2">
              {member.employee.name}
            </div>
            <Badge variant={member.endWork ? 'destructive' : 'default'}>{member.endWork ? 'Past member' : 'Active member'}</Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsView;
