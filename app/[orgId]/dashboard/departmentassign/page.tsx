import { DataTable } from "@/components/data-table";
import { columns } from "@/app/[orgId]/dashboard/departmentassign/_components/unassignedMemberColumns";
import { assignMembersColumns } from "@/app/[orgId]/dashboard/departmentassign/_components/assignedMemberColumns";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmployee } from "@/app/[orgId]/dashboard/departmentassign/getEmployee";
import { getData } from "@/lib/getFetch";

interface Props {
  params: { orgId: string };
}

export default async function Page({ params: { orgId } }: Props) {
  const urlUE = `/organizations/${orgId}/employees/unassigned-employees`;

  const { departmentId } = await getEmployee();
  
  if(!departmentId) return <h1>No assigned department manager yet...</h1>
  
  const urlAE = `/organizations/${orgId}/departments/${departmentId}/members`;

  const unassignedEmployees = await getData(urlUE);
  const assignedEmployees = await getData(urlAE);
  
  if(!unassignedEmployees || !assignedEmployees) return <h1>Loading...</h1>
  
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
