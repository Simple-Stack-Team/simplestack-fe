"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";

import { Button } from "@/components/ui/button";

const Profile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const logOut = (event: any) => {
    event.preventDefault();
    signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  };
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <div className="relative flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2">
          {/* <LuUserSquare2 className="size-16 mr-2 text-gray-400" /> */}
          <div className="flex flex-col items-start gap-0">
            <p className="text-md font-bold text-[#252525]">
              {session?.user!.user.name}
            </p>
            <p className="max-w-[150px] overflow-hidden text-ellipsis text-sm text-[#7b7b7b]">
              {session?.user!.user.email}
            </p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={logOut}>
              <LuLogOut className="size-19 size-5 text-gray-500" />
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
