"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { columns } from "@/app/[orgId]/dashboard/departments/columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";
import { useDepartmentStore } from "@/lib/store";
import SkeletonTable from "@/components/SkeletonTable";

const DepartmentsTable = () => {
  const { orgId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  const url = `/organizations/${orgId}/departments`;

  const { data, error, loading } = useFetch({ apiKey, url });

  const setDepartments = useDepartmentStore((state) => state.setDepartments);
  const departments = useDepartmentStore((state) => state.departments);

  useEffect(() => {
    if (data) {
      setDepartments(data);
    }
  }, [data, setDepartments]);

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
            <DataTable columns={columns} data={departments} />
          )}
        </div>
      )}
    </div>
  );
};

export const dynamin = "force-dynamic";

export default DepartmentsTable;
