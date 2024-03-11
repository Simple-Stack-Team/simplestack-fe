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

  return (
    <div>
      <div>Organization ID: {orgId}</div>
      <div>Skill name: {skillName}</div>
      <div>Skill ID: {skillId}</div>
      <div>Skill description: {description}</div>
      <div>Autor ID: {authorId}</div>
      <div>Category name: {fname}</div>
      <div>Category ID: {frameworkId}</div>
    </div>
  );
};

export default SkillDetailPage;
