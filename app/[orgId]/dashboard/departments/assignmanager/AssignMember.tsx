"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useFetch from "@/hooks/useFetch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Employees = {
  id: string;
  roles: string[];
  email: string;
  managerAt: string | null;
};

type Department = {
  id: string;
  name: string;
  createdAt: string;
  organizationId: string;
  managerId: string;
  skillIds: string[];
  manager: {
    name: string;
  };
};

const AssignMember = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [department, setDepartment] = useState<Department>();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { orgId } = useParams();
  const router = useRouter();

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const departmentId = searchParams.get("depId");

  let url = `/organizations/${orgId}/employees`;
  const { data } = useFetch({ apiKey, url });

  const token = session?.user?.access_token;

  useEffect(() => {
    if (!session) return;

    const url = `${apiKey}/organizations/${orgId}/departments/${departmentId}`;
    async function fetchData() {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setDepartment(data);
      }
    }

    fetchData();
  }, [departmentId, orgId, apiKey, token, session]);

  console.log(department);

  const departmentManagers: Employees[] = data.filter(
    (user: Employees) =>
      user.roles.includes("DEPARTMENT_MANAGER") && user.managerAt === null,
  );

  const createAt = new Date(department?.createdAt!);

  const handleSumbit = async () => {
    if (!value) return null;

    const res = await fetch(
      `${apiKey}/organizations/${orgId}/departments/${departmentId}/assign-manager/${value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );

    if (res.ok) {
      router.back();
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <Card className="max-w-[500px] flex-1">
        <CardHeader>
          <CardTitle className="text-xl">
            Department: {department?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Created On: {createAt.toLocaleDateString()}</p>
          <div className="mt-4">
            {department?.managerId === null ? (
              <p className="rounded-lg bg-red-200 px-2 py-1 text-sm">
                No manager assigned yet
              </p>
            ) : (
              <p>Manager name: {department?.manager.name}</p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="">
        <h1 className="mb-4">
          Assign a member to{" "}
          <span className="font-bold">{department?.name}</span> department
        </h1>
        <div className="space-x-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? departmentManagers.find((manager) => manager.id === value)
                      ?.email
                  : "Assign manager"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search managers..."
                  className="h-9"
                />
                <CommandEmpty>No manager found.</CommandEmpty>
                <CommandGroup>
                  {departmentManagers.map((manager) => (
                    <CommandItem
                      key={manager.id}
                      value={manager.id}
                      onSelect={(currentValue: string) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {manager.email}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === manager.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Button onClick={handleSumbit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignMember;
