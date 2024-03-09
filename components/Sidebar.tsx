"use client";
// components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { TbWorldCode } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import RoleCheck from "@/components/RoleCheck";
import { sidebarLinks } from "@/constants/sidebar-link";
import Profile from "./Profile";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { data: session } = useSession();
  //@ts-ignore
  const orgId = session?.user?.user.orgId;
  const [activeLink, setActiveLink] = React.useState("");

  return (
    <div className={`fixed flex w-full ${isOpen ? "overflow-hidden" : ""}`}>
      {isOpen && (
        <div className="fixed inset-0 m-auto w-[240px] md:hidden">
          <div className="mt-20 flex flex-col items-center gap-2 p-4">
            <div className="flex w-full items-center gap-2 ">
              <TbWorldCode className="mr-2" size={35} />
              <span className="text-xl">TeamFinder</span>
            </div>
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
                      onClick={() => {
                        setActiveLink(link.href);
                        toggleSidebar();
                        // Close the sidebar when a link is clicked
                      }}
                    >
                      <div
                        className={classNames(
                          "relative flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200",
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
          <div>
            <Profile />
          </div>
        </div>
      )}

      <div
        className={`top-24 hidden sm:fixed sm:inset-0 sm:flex sm:w-[190px] sm:flex-col sm:p-4 ${isOpen ? "sm:hidden" : ""}`}
      >
        <div
          className={`top-24  hidden md:fixed md:inset-0 md:flex md:w-[240px] md:flex-col md:p-4 ${isOpen ? "md:hidden" : ""} `}
        >
          <div className="flex w-full items-center gap-2">
            <TbWorldCode className="mr-2" size={35} />
            <span className="text-xl">TeamFinder</span>
          </div>
          <div className="mt-10">
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
                      onClick={() => {
                        setActiveLink(link.href);
                      }}
                    >
                      <div
                        className={classNames(
                          "relative flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-200",
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
          <div className="mt-auto">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
