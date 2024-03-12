"use client";

import {useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { LuSearchCode } from "react-icons/lu";

import RoleCheck from "@/components/RoleCheck";
import { sidebarLinks } from "@/constants/sidebar-link";
import Profile from "@/components/Profile";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { data: session } = useSession();
  //@ts-ignore
  const orgId = session?.user?.user.orgId;
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <div className={`fixed flex w-full ${isOpen ? "overflow-hidden" : ""}`}>
      {isOpen && (
        <div className="fixed inset-0 m-auto w-[250px] md:hidden">
          <div className="mt-20 flex flex-col items-center gap-2 p-4">
            <div className="flex w-full items-center gap-2 ">
              <LuSearchCode className="mr-2" size={35} />
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
                        "bg-[#f1f1f1]": activeLink === link.href,
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
          className={`top-24  hidden md:fixed md:inset-0 md:flex md:w-[250px] md:flex-col md:p-4 ${isOpen ? "md:hidden" : ""} `}
        >
          <div className="m-2 flex w-full items-center gap-2">
            <LuSearchCode className="mr-2 text-white bg-black p-1.5 rounded-md" size={35} />
            <span className="text-2xl font-extrabold font-mono">Team Finder</span>
          </div>
          <div className="mt-10">
            {sidebarLinks.map((link) => (
              <RoleCheck roles={link.roles} key={link.label}>
                <div className="w-full mb-1" key={link.label}>
                  <Link href={`/${orgId}${link.href}`}>
                    <div
                      className={classNames({
                        "flex cursor-pointer items-center rounded-md": true,
                        "hover:bg-[#f1f1f1]": true,
                        "bg-[#f1f1f1]": activeLink === link.href,
                      })}
                      onClick={() => {
                        setActiveLink(link.href);
                      }}
                    >
                      <div
                        className={classNames({
                          "relative flex cursor-pointer items-center gap-2 rounded-lg p-2 pl-2.5 text-[#686869] text-sm font-semibold": true,
                          "!text-[#121212] !font-bold": activeLink === link.href,
                        })}
                      >
                        <div>{link.icon}</div>
                        <div className="pl-1">{link.label}</div>
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
