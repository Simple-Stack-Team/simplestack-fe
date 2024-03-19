"use client";

import { useParams } from "next/navigation";

import { columns } from "@/app/[orgId]/dashboard/mydepartment/projects/components/columns";
import { DataTable } from "@/app/[orgId]/dashboard/mydepartment/projects/components/data-table";
import useFetch from "@/hooks/useFetch";

interface Props {
  depId: string;
}

const DepartmentProjectsTable = ({ depId }: Props) => {
  const { orgId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const url = `/organizations/${orgId}/projects/department/${depId}`;

  const { data, error, loading } = useFetch({ apiKey, url });

  if (loading)
    return (
      <h1 className="mb-4 text-xl font-semibold">
        Loading department projects...
      </h1>
    );
  console.log(data);

  return (
    <div>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={data} showToolbar />
        </div>
      )}
    </div>
  );
};

export const dynamin = "force-dynamic";

export default DepartmentProjectsTable;
