"use client";

import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import useFetch from "@/lib/hooks/useFetch";

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

const getData = () => {
  return payments;
};

interface Props {
  params: { orgId: string };
}

const Employees = ({ params: { orgId } }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL || '';
  const path = orgId + '/' + 'employee'

  // const { data, loading, error } = useFetch({apiKey, path});
  const Data = getData();
  const error = false;

  return (
    <div>
      <h1>Employees</h1>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div className="mx-auto mt-8">
          <DataTable columns={columns} data={Data} />
        </div>
      )}
    </div>
  );
};

export default Employees;
