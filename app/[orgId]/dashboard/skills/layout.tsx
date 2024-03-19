import Link from "next/link";

import { Button } from "@/components/ui/button";
import Menubar from "@/app/[orgId]/dashboard/skills/_components/Menubar";

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
      <Menubar />
      {children}
    </div>
  );
}
