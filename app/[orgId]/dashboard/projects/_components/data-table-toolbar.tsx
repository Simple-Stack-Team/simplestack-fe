"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
export const period = [
  {
    value: "Fixed",
    label: "Fixed",
  },
  {
    value: "Ongoing",
    label: "Ongoing",
  },
];
export const statuss = [
  {
    value: "Not Started",
    label: "Not Started",
  },
  {
    value: "Starting",
    label: "Starting",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Closing",
    label: "Closing",
  },
  {
    value: "Closed",
    label: "Closed",
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: session } = useSession();
  const { projectId } = useParams();

  const isFiltered = table.getState().columnFilters.length > 0;

  //@ts-ignore
  const orgId = session?.user?.user.orgId;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `${apiKey}/organizations/${orgId}/projects/${projectId}`;

  //@ts-ignore
  const token = session?.user?.access_token;

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };

  return (
    <div className="mb-4 flex items-center justify-between overflow-auto">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={handleNameFilterChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("period") && (
          <DataTableFacetedFilter
            column={table.getColumn("period")}
            title="Period"
            options={period}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuss}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
