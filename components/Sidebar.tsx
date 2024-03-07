"use client";

import React, { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

import { sidebarLinks } from "@/constants/sidebar-link";
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
    <div className="flex flex-col justify-between fixed inset-0 w-[240px] p-4">
      <div>
        <div className="flex gap-2 items-center w-full">
          <TbWorldCode className="mr-2" size={35} />
          <span className="text-xl">TeamFinder</span>
        </div>
        <div className="mt-4 w-full flex flex-col gap-2 ">
          {sidebarLinks.map((link) => (
            <RoleCheck roles={link.roles} key={link.label}>
              <div className="w-full" key={link.label}>
                <Link href={`/${orgId}${link.href}`}>
                  <div
                    className={classNames({
                      "flex items-center cursor-pointer rounded-lg": true,
                      "hover:bg-gray-200": true,
                      "bg-gray-200": activeLink === link.href,
                    })}
                    onClick={() => setActiveLink(link.href)}
                  >
                    <div
                      className={classNames(
                        "flex gap-2 items-center p-2 rounded relative hover:bg-gray-200 cursor-pointer ",
                        {
                          "font-bold-black": activeLink === link.href,
                        }
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
