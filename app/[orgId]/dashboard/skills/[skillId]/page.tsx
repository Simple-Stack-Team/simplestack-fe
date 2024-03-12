"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  params: { orgId: string; skillId: string };
}

const SkillDetailPage = ({ params: { orgId, skillId } }: Props) => {
  const searchParams = useSearchParams();
  const skillName = searchParams.get("name");
  const description = searchParams.get("des");
  const authorId = searchParams.get("authorId");
  const frameworkId = searchParams.get("frameworkid");
  const fname = searchParams.get("fname");

  const skillDetails = [
    {
      label: "Organization ID",
      value: orgId,
    },
    {
      label: "Skill name",
      value: skillName,
    },
    {
      label: "Skill ID",
      value: skillId,
    },
    {
      label: "Skill description",
      value: description,
    },
    {
      label: "Author ID",
      value: authorId,
    },
    {
      label: "Category name",
      value: fname,
    },
    {
      label: "Category ID",
      value: frameworkId,
    },
  ];

  return (
    <div>
      {skillDetails.map((item) => (
        <div
          key={item.label}
          className="mb-2 flex flex-col rounded-xl bg-gray-100 p-4 lg:flex-row lg:justify-between"
        >
          <span>{item.label}: </span>
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default SkillDetailPage;
