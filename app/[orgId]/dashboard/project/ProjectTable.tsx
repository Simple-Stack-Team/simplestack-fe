"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";
import { useProjectStore } from "@/lib/store";
import { columns } from "./columns";

const ProjectsTable = () => {
  const { orgId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const url = `/organizations/${orgId}/projects`;

  const { data, error } = useFetch({ apiKey, url });

  const setProjects = useProjectStore((state) => state.setProjects);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, setProjects]);

  return (
    <div>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={projects} />
        </div>
      )}
    </div>
  );
};

export const dynamin = "force-dynamic";

export default ProjectsTable;
