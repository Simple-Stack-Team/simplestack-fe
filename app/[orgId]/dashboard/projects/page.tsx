"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./_components/columns";
import SkeletonTable from "@/components/SkeletonTable";
import { Toaster } from "@/components/ui/sonner";
import useFetchProjects from "@/hooks/useFetchProjects";

type Props = {
  params: { orgId: string };
};

const ProjectsPage = ({ params: { orgId } }: Props) => {
  const { projectsFetch, isLoading, error } = useFetchProjects(orgId);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          {isLoading ? (
            <div className="space-y-2">
              {skeleton.map((item) => (
                <SkeletonTable key={item} />
              ))}
            </div>
          ) : (
            <>
              <DataTable columns={columns} data={projectsFetch} />
              <Toaster />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
