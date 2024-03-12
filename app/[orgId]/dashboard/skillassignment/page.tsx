import { getServerSession } from "next-auth";

import { getData } from "@/lib/getFetch";
import { DataTable } from "@/components/data-table";
import { skillassignmentcolumns } from "./_components/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { ownskillassignmentcolumns } from "./_components/ownskillscolumns";
import { Toaster } from "sonner";

interface Props {
  params: { orgId: string };
}

export default async function SkillAssignmentPage({
  params: { orgId },
}: Props) {
  const url = `/organizations/${orgId}/skills`;
  const data = await getData(url);
  console.log(data)

  const session = await getServerSession(authOption);

  if (!session) return;

  //@ts-ignore
  const empId = session?.user?.user.sub;

  const userSkills = await getData(
    `/organizations/${orgId}/employees/${empId}/employee`,
  );

  const { personalSkills } = userSkills;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Skill Assignment</h1>
      <Tabs defaultValue="allSkills" className="w-full">
        <TabsList>
          <TabsTrigger value="allSkills">All skills</TabsTrigger>
          <TabsTrigger value="userSkills">My skills</TabsTrigger>
        </TabsList>
        <TabsContent value="allSkills">
          <DataTable columns={skillassignmentcolumns} data={data} />
        </TabsContent>
        <TabsContent value="userSkills">
          <DataTable
            columns={ownskillassignmentcolumns}
            data={personalSkills}
          />
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
}
