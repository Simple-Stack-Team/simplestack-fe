"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface View {
  projectsId: string;
  name: string;
  period: string;
  startDate: string;
  deadlineDate: string;
  status: string;
  description: string;
  technologyStack: string;
  teamroleId: string;
  nrOfMembers: string;
}
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
    <div>
      <h1>Name: {projectsDetails.name}</h1>
      <p>Period: {projectsDetails.period}</p>
      <p>Start Date: {projectsDetails.startDate}</p>
      <p>Deadline Date: {projectsDetails.deadlineDate}</p>
      <p>Status: {projectsDetails.status}</p>
      <p>Description: {projectsDetails.description}</p>
      <p>Technology Stack: {projectsDetails.technologyStack}</p>
      <p>Team Role ID: {projectsDetails.teamroleId}</p>
      <p>Number of Members: {projectsDetails.nrOfMembers}</p>
    </div>
  );
};

export default ProjectDetailsView;
