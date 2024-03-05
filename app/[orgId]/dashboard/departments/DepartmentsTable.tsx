import { useParams } from "next/navigation";

import { columns } from "@/app/[orgId]/dashboard/departments/columns";
import { DataTable } from "@/components/data-table";
import useFetch from "@/hooks/useFetch";

const DepartmentsTable = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const { orgId } = useParams();

  const url = `/organizations/${orgId}/departments`;

  const { data, error } = useFetch({ apiKey, url });

  return (
    <div>
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

export default DepartmentsTable;
