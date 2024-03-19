import React from "react";

export default function ProjectsPageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { orgId: string };
}>) {
  return <div>{children}</div>;
}
