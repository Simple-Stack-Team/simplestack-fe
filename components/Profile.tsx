"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CgProfile } from "react-icons/cg";
import { RiExpandUpDownLine } from "react-icons/ri";
import Link from "next/link";

const Profile = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const logOut = (event: any) => {
    event.preventDefault();
    signOut();
  };
  const { data: session } = useSession();
  return (
    <div>
      <div className="">
        {session?.user ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-between relative m-3">
              <CgProfile />
              <div className="flex flex-col items-center pl-2 gap-1">
                <p>
                  {
                    //@ts-ignore
                    session?.user!.user.name
                  }
                </p>
                <p>
                  {
                    //@ts-ignore
                    session?.user!.user.email
                  }
                </p>
              </div>
              <div className="relative">
                <div className="cursor-pointer" onClick={toggleOptions}>
                  <RiExpandUpDownLine />
                </div>
                {showOptions && (
                  <div className="absolute top-0  left-1 mt-4 bg-white p-2 rounded shadow">
                    <Link href="/">
                      <Button onClick={logOut}>Sign Out</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Profile;
