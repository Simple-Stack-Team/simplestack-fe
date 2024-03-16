"use client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

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

  technologyStack: string[];
  teamRoles: TeamRole[];
};
const formSchema = z.object({
  name: z.string().min(2).max(50),
  period: z.string().min(1),
  startDate: z.date({
    required_error: "Required.",
  }),
  deadlineDate: z
    .date({
      required_error: "Required.",
    })
    .optional(),
  status: z.string().min(1),
  description: z.string().min(2).max(200),
  technologyStack: z.object({ technology: z.string() }).array(),
  teamRoles: z
    .object({ teamroleId: z.string(), nrOfMembers: z.coerce.number() })
    .array(),
});

const ProjectDetailsView: React.FC = () => {
  const { data: session } = useSession();
  const [projectsDetails, setProjectsDetails] = useState<View | null>(null);

  const { orgId, projectId } = useParams();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/${projectId}`;

  //@ts-ignore
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
  console.log(projectsDetails);
  if (!projectsDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Name: {projectsDetails.name}</h1>
      <p className="mb-2">Period: {projectsDetails.period}</p>
      <p className="mb-2">
        Start Date:{" "}
        {projectsDetails.startDate
          ? format(projectsDetails.startDate, "PPP")
          : "N/A"}
      </p>
      <p className="mb-2">
        Deadline Date:{" "}
        {projectsDetails.deadlineDate
          ? format(new Date(projectsDetails.deadlineDate), "PPP")
          : "Project don't have a finish date because is ongoing"}
      </p>
      <p className="mb-2">Status: {projectsDetails.status}</p>
      <p className="mb-2">Description: {projectsDetails.description}</p>
      <p className="mb-2">Technology Stack:</p>
      <ul className="mb-2 list-disc pl-6">
        {projectsDetails.technologyStack.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
      <p className="mb-2">Team Roles:</p>
      <ul className="mb-2 list-disc pl-6">
        {projectsDetails.teamRoles.map((role, index) => (
          <li key={index}>
            <p>Team Role ID: {role.teamroleId}</p>
            <p>Number of Members: {role.nrOfMembers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetailsView;
