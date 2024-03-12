import { getServerSession } from "next-auth";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { DataTable } from "@/components/data-table";
import { columns } from "./_components/unassignedMemberColumns";
import { assignMembersColumns } from "./_components/assignedMemberColumns";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmployee } from "./getEmployee";

async function getData(url: string) {
  const session = await getServerSession(authOption);
  if (!session) return null;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  // @ts-ignore
  const token = session?.user?.access_token;

  const res = await fetch(`${apiKey}${url}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {
  params: { orgId: string };
}

export default async function Page({ params: { orgId } }: Props) {
  const urlUE = `/organizations/${orgId}/employees/unassigned-employees`;

  const { departmentId } = await getEmployee();
  const urlAE = `/organizations/${orgId}/departments/${departmentId}/members`;

  const unassignedEmployees = await getData(urlUE);
  const assignedEmployees = await getData(urlAE);
  const { members } = assignedEmployees;

  return (
    <>
      <Tabs defaultValue="unassigned" className="w-full">
        <TabsList>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
        </TabsList>
        <TabsContent value="unassigned">
          <DataTable columns={columns} data={unassignedEmployees} />
        </TabsContent>
        <TabsContent value="assigned">
          <DataTable columns={assignMembersColumns} data={members} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
}
