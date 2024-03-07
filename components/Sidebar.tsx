"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import Profile from "@/components/Profile";
import RoleCheck from "@/components/RoleCheck";
import { sidebarLinks } from "@/constants/sidebar-link";
import { TbWorldCode } from "react-icons/tb";

const Sidebar = () => {
  const { data: session, status } = useSession();
  //@ts-ignore
  const orgId = session?.user!.user.orgId;
  const [activeLink, setActiveLink] = useState("");

  return (
    <div className="fixed inset-0 flex w-[240px] flex-col justify-between p-4">
      <div>
        <div className="flex w-full items-center gap-2">
          <TbWorldCode className="mr-2" size={35} />
          <span className="text-xl">TeamFinder</span>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2 ">
          {sidebarLinks.map((link) => (
            <RoleCheck roles={link.roles} key={link.label}>
              <div className="w-full" key={link.label}>
                <Link href={`/${orgId}${link.href}`}>
                  <div
                    className={classNames({
                      "flex cursor-pointer items-center rounded-lg": true,
                      "hover:bg-gray-200": true,
                      "bg-gray-200": activeLink === link.href,
                    })}
                    onClick={() => setActiveLink(link.href)}
                  >
                    <div
                      className={classNames(
                        "relative flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200 ",
                        {
                          "font-bold-black": activeLink === link.href,
                        },
                      )}
                    >
                      <div>{link.icon}</div>
                      <div>{link.label}</div>
                    </div>
                  </div>
                </Link>
              </div>
            </RoleCheck>
          ))}
        </div>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
