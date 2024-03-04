"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import useFetch from "@/hooks/useFetch";

interface Props {
  params: { orgId: string };
}

const Employees = ({ params: { orgId } }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/employees`;

  const { data, loading, error } = useFetch({ apiKey, url });
  console.log(data);

  return (
    <div className="border-[1.5px] border-gray-300 p-4 rounded-lg">
      <h1 className="mb-4 text-xl font-semibold">Employees</h1>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default Employees;
