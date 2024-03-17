"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import classNames from "classnames";
import { EMPLOYEE_ROLES } from "@/types/employee-types";
import RoleCheck from "@/components/RoleCheck";

const ProjectTabs = () => {
  const { orgId, projectId } = useParams();
  const currentPath = usePathname();

  const links = [
    {
      href: `/${orgId}/dashboard/projects/${projectId}`,
      label: `Project details`,
      roles: [EMPLOYEE_ROLES.EMPLOYEE, EMPLOYEE_ROLES.DEPARTMENT_MANAGER, EMPLOYEE_ROLES.PROJECT_MANAGER]
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/teamfinder`,
      label: `Team finder`,
      roles: [EMPLOYEE_ROLES.PROJECT_MANAGER]
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/team-view`,
      label: `Team view`,
      roles: [EMPLOYEE_ROLES.PROJECT_MANAGER]
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/assignments-proposals`,
      label: `Assignments proposals`,
      roles: [EMPLOYEE_ROLES.PROJECT_MANAGER]
    },
    {
      href: `/${orgId}/dashboard/projects/${projectId}/deallocation-proposals`,
      label: `Deallocations proposals`,
      roles: [EMPLOYEE_ROLES.PROJECT_MANAGER]
    },
  ];

  return (
    <div className="space-x-5">
      {links.map(({ href, label, roles }) => (
        <RoleCheck key={href} roles={roles}>
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
        </RoleCheck>
      ))}
    </div>
  );
};

export default ProjectTabs;
