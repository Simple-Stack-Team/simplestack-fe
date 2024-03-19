"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";

import RoleCheck from "@/components/RoleCheck";
import { sidebarLinks } from "@/constants/sidebar-link";
import Profile from "@/components/Profile";
import logo from "@/public/logoWhiteTheme.svg";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { data: session } = useSession();
  const orgId = session?.user?.user.orgId;
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <div className={`fixed flex w-full ${isOpen ? "overflow-hidden" : ""}`}>
      {isOpen && (
        <div className="fixed inset-0 m-auto w-[250px] md:hidden">
          <div className="mt-10 flex flex-col items-center gap-2 p-4">
            <div className="mb-2 flex w-full items-center gap-2">
              <Image priority src={logo} alt="Logo" width={32} />
              <span className="text-xl font-bold">Simple Stack</span>
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
          className={`top-24 hidden md:fixed md:inset-0 md:flex md:w-[250px] md:flex-col md:p-4 ${isOpen ? "md:hidden" : ""} `}
        >
          <div className="m-2 flex w-full items-center gap-2">
            <Image priority src={logo} alt="Logo" width={32} />
            <span className="text-xl font-bold">Simple Stack</span>
          </div>
          <div className="mt-4">
            {sidebarLinks.map((link) => (
              <RoleCheck roles={link.roles} key={link.label}>
                <div className="mb-1 w-full" key={link.label}>
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
                          "relative flex cursor-pointer items-center gap-2 rounded-lg p-2 pl-2.5 text-sm font-semibold text-[#686869]":
                            true,
                          "!font-bold !text-[#121212]":
                            activeLink === link.href,
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
