"use client";

import useFetchSkills from "@/hooks/useFetchSkills";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/[orgId]/dashboard/skills/_components/columns";
import SkeletonTable from "@/components/SkeletonTable";
import { Toaster } from "@/components/ui/sonner"

type Props = {
  params: { orgId: string };
};

const SkillsPage = ({ params: { orgId } }: Props) => {
  const { skillsFetch, isLoading, error } = useFetchSkills(orgId);
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
              <DataTable
                columns={columns}
                data={skillsFetch}
                showToolbar={true}
              />
              <Toaster />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
