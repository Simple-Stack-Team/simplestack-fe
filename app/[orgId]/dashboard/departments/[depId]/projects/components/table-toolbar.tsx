"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";

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

export function DepartmentProjectsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
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
