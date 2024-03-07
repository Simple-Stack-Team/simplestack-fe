"use client";

import { useEmployeeStore } from "@/lib/store";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

interface Props {
  params: { orgId: string };
}

const Employees = ({ params: { orgId } }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/employees`;

  const { data, error } = useFetch({ apiKey, url });
  const setEmployees = useEmployeeStore((state) => state.setEmployees);
  const employee = useEmployeeStore((state) => state.employees);

  useEffect(() => {
    if (data) {
      setEmployees(data);
    }
  }, [data, setEmployees]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Employees</h1>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={employee} />
        </div>
      )}
    </div>
  );
};

export default Employees;
