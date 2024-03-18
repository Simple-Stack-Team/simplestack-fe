"use client";

import { DonutChart, Legend } from "@tremor/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { SkillsStatisticsTypes } from "@/types/skills-statistics-types";

interface Props {
  id: string;
  title: string;
  description: string;
  departmentId: string;
}

const SkillsCard = ({ title, description, id, departmentId }: Props) => {
  const { orgId } = useParams();

  const { data: session } = useSession();
  const managerId = session?.user.user.sub;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/skills/department/${departmentId}/manager/${managerId}`;
  const { data } = useFetch({ apiKey, url });

  if (!data) return;

  const skillFilter: SkillsStatisticsTypes[] = data.filter(
    (skill: SkillsStatisticsTypes) => skill.skillId === id,
  );

  if (skillFilter.length === 0) {
    return null;
  }

  const skill = skillFilter[0];

  const skillList = [
    {
      name: "Level 1",
      percent: skill.level1?.percent,
    },
    {
      name: "Level 2",
      percent: skill.level2?.percent,
    },
    {
      name: "Level 3",
      percent: skill.level3?.percent,
    },
    {
      name: "Level 4",
      percent: skill.level4?.percent,
    },
    {
      name: "Level 5",
      percent: skill.level5?.percent,
    },
  ];

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row">
      <div className="flex-1">
        <Label htmlFor="title">Name</Label>
        <h2 id="title" className="font-semibold">
          {title}
        </h2>
        <div className="mt-2">
          <Label htmlFor="message">Description</Label>
          <Textarea id="message" readOnly>
            {description}
          </Textarea>
        </div>
      </div>
      <div>
        <DonutChart
          variant="pie"
          data={skillList}
          category="percent"
          index="name"
          className="h-32 w-32"
          valueFormatter={valueFormatter}
          noDataText="No Data Available"
        />
      </div>
    </div>
  );
};

export default SkillsCard;
