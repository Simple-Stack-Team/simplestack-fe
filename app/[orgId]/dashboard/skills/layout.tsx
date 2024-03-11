import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

export default function SkillPageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { orgId: string };
}>) {
  const { orgId } = params;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Skills</h1>
        <Button asChild>
          <Link href={`/${orgId}/dashboard/skills/new`}>New skill</Link>
        </Button>
      </div>
      <div className="mb-8 space-x-4">
        <Link href={`/${orgId}/dashboard/skills/`}>View</Link>
        <Link href={`/${orgId}/dashboard/skills/viewskillcategories`}>
          Categories
        </Link>
      </div>
      {children}
    </div>
  );
}
