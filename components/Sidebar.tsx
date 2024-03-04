"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

import { sidebarLinks } from "@/lib/constants/sidebar-link";
import Profile from "@/components/Profile";
import RoleCheck from "@/components/RoleCheck";

const Sidebar = () => {
  const currentPath = usePathname();
  return (
    <div className="flex flex-col items-start mt-24">
      <div>
        {sidebarLinks.map((link) => (
          <RoleCheck roles={link.roles} key={link.label}>
            <div className="m-2" key={link.label}>
              <Link
                href={link.href}
                className={classNames({
                  "text-zinc-900": link.href === currentPath,
                  "text-zing-500": link.href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                <div
                  className={`flex items-center p-3 rounded-full relative hover:bg-blue-500 cursor-pointer `}
                >
                  {link.icon}
                  {link.label}
                </div>
              </Link>
            </div>
          </RoleCheck>
        ))}
      </div>
      <div className="mt-auto mb-6">
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
