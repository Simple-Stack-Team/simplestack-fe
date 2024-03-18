"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { DonutChart, BarChart, Legend } from "@tremor/react";

import useFetch from "@/hooks/useFetch";

interface SkillLevel {
  number: number;
  percent: number;
}

interface SkillObject {
  skillName: string;
  [key: string]: SkillLevel | string | number;
}

const SkillsStatistics = ({ departmentId }: { departmentId: string }) => {
  const { orgId } = useParams();

  const { data: session } = useSession();
  const managerId = session?.user.user.sub;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/skills/department/${departmentId}/manager/${managerId}`;
  let { data } = useFetch({ apiKey, url });

  const skillsData = data.map(
    ({
      skillName,
      nrOfEmployees,
      percentOfEmployees,
    }: {
      skillName: string;
      nrOfEmployees: number;
      percentOfEmployees: number;
    }) => ({
      skillName,
      nrOfEmployees,
      percentOfEmployees,
    }),
  );

  const legend = skillsData.map(
    ({ skillName }: { skillName: string }) => skillName,
  );

  data = data.map(function (obiect: any) {
    const niveluri: { [key: string]: number } = {};
    Object.keys(obiect).forEach(function (key) {
      if (key.startsWith("level")) {
        const levelKey = key as keyof SkillObject;
        niveluri[levelKey] = (obiect[levelKey] as SkillLevel).number;
      }
    });
    return {
      skillName: obiect.skillName,
      ...niveluri,
    };
  });

  const valueFormatterPerEmp = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <div>
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <h1 className="font-semibold">Skills Distribution</h1>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <DonutChart
            variant="donut"
            data={skillsData}
            category="nrOfEmployees"
            index="skillName"
            className="h-48 w-48"
          />
          <Legend categories={legend} className="max-w-xs" />
        </div>
      </div>
      <div className="mt-4 rounded-lg border p-4">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-lg font-medium">
          The distribution of skills by level
        </h3>
        <BarChart
          enableLegendSlider
          className="mt-6"
          data={data}
          index="skillName"
          categories={["level1", "level2", "level3", "level4", "level5"]}
        />
      </div>
      <div className="mt-4 w-fit rounded-lg border p-4">
        <div className="mb-4">
          <h1 className="font-semibold">Skill Level Breakdown</h1>
        </div>
        <div>
          <DonutChart
            variant="pie"
            data={skillsData}
            category="percentOfEmployees"
            index="skillName"
            className="h-48 w-48"
            valueFormatter={valueFormatterPerEmp}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsStatistics;
