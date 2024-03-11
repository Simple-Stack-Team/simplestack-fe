"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { statuses } from "./data";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

interface Category {
  name: string;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { status, data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);

  const isFiltered = table.getState().columnFilters.length > 0;

  //@ts-ignore
  const orgId = session?.user?.user.orgId;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `${apiKey}/organizations/${orgId}/skills/skill-categories`;

  //@ts-ignore
  const token = session?.user?.access_token;

  useEffect(() => {
    async function getCategories() {
      if (status === "loading") return;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) return null;
      const data = await res.json();
      setCategories(data);
    }

    getCategories();
  }, [orgId, token, status, url]);

  const categoriesList = [];

  for (let i = 0; i < categories.length; i++) {
    let currentObject = categories[i];
    let newValueLabelObject = {
      value: currentObject.name,
      label: currentObject.name,
    };
    categoriesList.push(newValueLabelObject);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={categoriesList}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
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