"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const Profile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const logOut = (event: any) => {
    event.preventDefault();
    signOut({
      redirect: true,
      callbackUrl: "/auth/signin"
    });
  };
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <div className="flex items-center justify-between relative m-3">
          <CgProfile className="size-8 mr-2 text-gray-500" />
          <div className="flex flex-col items-start">
            <p className="text-xl">
              {
                //@ts-ignore
                session?.user!.user.name
              }
            </p>
            <p className="text-gray-400">
              {
                //@ts-ignore
                session?.user!.user.email
              }
            </p>
          </div>
          <div className="relative">
            <div className="cursor-pointer" onClick={toggleOptions}>
              <CiLogout className="size-5 ml-4 text-gray-500 size-19" />
            </div>
            {showOptions && (
              <div className="absolute  bg-white p-1 rounded shadow">
                <Link href="/">
                  <Button onClick={logOut}>Sign Out</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
