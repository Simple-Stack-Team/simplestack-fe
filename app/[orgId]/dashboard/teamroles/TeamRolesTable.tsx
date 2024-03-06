"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { columns } from "@/app/[orgId]/dashboard/teamroles/columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";
import { useTeamRoleStore } from "@/lib/store";
import SkeletonTable from "@/components/SkeletonTable";

const TeamRolesTable = () => {
  const { orgId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const url = `/organizations/${orgId}/teamroles`;

  const { data, loading, error } = useFetch({ apiKey, url });

  const setTeamRole = useTeamRoleStore((state) => state.setTeamRoles);
  const teamRoles = useTeamRoleStore((state) => state.teamRoles);

  useEffect(() => {
    if (data.teamRoles) {
      setTeamRole(data.teamRoles);
    }
  }, [data.teamRoles, setTeamRole]);

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          {loading ? (
            <div className="space-y-2">
              {skeleton.map((item) => (
                <SkeletonTable key={item} />
              ))}
            </div>
          ) : (
            <DataTable columns={columns} data={teamRoles} />
          )}
        </div>
      )}
    </div>
  );
};

export const dynamin = "force-dynamic";

export default TeamRolesTable;
