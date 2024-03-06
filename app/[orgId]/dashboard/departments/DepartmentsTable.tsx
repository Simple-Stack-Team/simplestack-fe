"use client";

import { columns } from "@/app/[orgId]/dashboard/departments/columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";
import { useDepartmentStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const DepartmentsTable = () => {
  const { orgId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const url = `/organizations/${orgId}/departments`;

  const { data, error } = useFetch({ apiKey, url });

  const setDepartments = useDepartmentStore((state) => state.setDepartments);
  const departments = useDepartmentStore((state) => state.departments);

  useEffect(() => {
    if (data) {
      setDepartments(data);
    }
  }, [data, setDepartments]);

  return (
    <div>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <DataTable columns={columns} data={departments} />
        </div>
      )}
    </div>
  );
};

export const dynamin = "force-dynamic";

export default DepartmentsTable;
