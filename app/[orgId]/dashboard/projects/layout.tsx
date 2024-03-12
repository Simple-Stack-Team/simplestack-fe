import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ProjectsPageLayout({
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
        <h1 className="text-xl font-semibold">Projects</h1>
        <Button asChild>
          <Link href={`/${orgId}/dashboard/projects/new`}>New project</Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
