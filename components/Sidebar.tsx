"use client";
import React from "react";
import { sidebarLinks } from "@/constants/sidebar-link";
import Link from "next/link";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start mt-24">
      <div>
        {sidebarLinks.map(({ href, label, icon }) => (
          <div className="m-2" key={label}>
            <Link href={href}>
              <div
                className={`flex items-center relative hover:bg-fuchsia-400 cursor-pointer`}
              >
                {icon}
                {label}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-auto mb-6">
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
