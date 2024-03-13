"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import classNames from "classnames";

const ProjectTabs = () => {
  const { orgId, projectId } = useParams();
  const currentPath = usePathname();

  const links = [
    {
      href: `/${orgId}/dashboard/projects/${projectId}`,
      label: `Project details`,
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/teamfinder`,
      label: `Team finder`,
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/team-view`,
      label: `Team view`,
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/assignments-proposals`,
      label: `Assignments proposals`,
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/deallocation-proposals`,
      label: `Deallocations proposals`,
    },
  ];

  return (
    <div className="space-x-5">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={classNames({
            "text-slate-800": true,
            "border-b-2 border-b-slate-800 py-2 font-semibold":
              currentPath === href,
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default ProjectTabs;
