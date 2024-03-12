"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import classNames from "classnames";

const Menubar = () => {
  const { orgId } = useParams();
  const currentPath = usePathname();

  const links = [
    {
      href: `/${orgId}/dashboard/skills`,
      label: `View`,
    },
    {
      href: `/${orgId}/dashboard/skills/viewskillcategories`,
      label: `Categories`,
    },
  ];

  return (
    <div className="mb-6 space-x-2">
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

export default Menubar;
