import { getEmployee } from "../departmentassign/getEmployee";
import DepartmentProjectsTable from "./projects/components/department-projects-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsStatistics from "./SkillsStatistics";
import { getData } from "@/lib/getFetch";
import SkillsCard from "./SkillsCard";

interface Skill {
  id: string;
  name: string;
  description: string;
}

interface Props {
  params: { orgId: string };
}

export default async function ProjectsPage({ params: { orgId } }: Props) {
  const { departmentId } = await getEmployee();

  if (!departmentId)
    return <h1 className="mb-8 text-2xl font-semibold">Loading...</h1>;

  const data = await getData(
    `/organizations/${orgId}/departments/${departmentId}`,
  );

  const { skills } = data;

  return (
    <Tabs defaultValue="projects">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <DepartmentProjectsTable depId={departmentId} />
      </TabsContent>
      <TabsContent value="skills">
        <div className="space-y-4">
          {skills.map((skill: Skill) => (
            <SkillsCard
              key={skill.id}
              id={skill.id}
              title={skill.name}
              description={skill.description}
              departmentId={departmentId}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="statistics">
        <SkillsStatistics departmentId={departmentId} />
      </TabsContent>
    </Tabs>
  );
}
