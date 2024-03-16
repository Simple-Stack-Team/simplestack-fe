"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useEmployeeStore } from "@/lib/store";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";

const EmployeesList = () => {
  const { orgId } = useParams();
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
    <>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={employee} />
        </div>
      )}
    </>
  );
};

export default EmployeesList;
