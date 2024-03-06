"use client";

import React, { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

import { sidebarLinks } from "@/lib/constants/sidebar-link";
import Profile from "@/components/Profile";
import RoleCheck from "@/components/RoleCheck";
import { useSession } from "next-auth/react";
import { TbWorldCode } from "react-icons/tb";

const Sidebar = () => {
  const { data: session, status } = useSession();
  //@ts-ignore
  const orgId = session?.user!.user.orgId;
  const [activeLink, setActiveLink] = useState("");

  return (
    <div className="flex flex-col items-start   text-black min-w-[240px]">
      <div className="flex items-center ml-4 mt-10">
        <TbWorldCode className="size-10 mr-2" />
        <span className="text-xl">TeamFinder</span>
      </div>
      <div className="ml-4 mt-24">Menu</div>
      <div className="mt-4">
        {sidebarLinks.map((link) => (
          <RoleCheck roles={link.roles} key={link.label}>
            <div className="m-4" key={link.label}>
              <Link href={`/${orgId}${link.href}`}>
                <div
                  className={classNames({
                    "flex items-center  rounded relative cursor-pointer": true,
                    "hover:bg-gray-200": true,
                    "bg-gray-200": activeLink === link.href,
                  })}
                  onClick={() => setActiveLink(link.href)}
                >
                  <div
                    className={`flex items-center p-3 rounded relative hover:bg-gray-200 cursor-pointer `}
                  >
                    <div className="mr-2">{link.icon}</div>
                    <div className=" w-40">{link.label}</div>
                  </div>
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
