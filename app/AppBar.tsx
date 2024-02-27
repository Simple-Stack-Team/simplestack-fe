"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AppBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between p-4">
      <div className="flex gap-2">
        <h1>Logo</h1>
        <p>Simple Team</p>
      </div>
      <div className="space-x-2">
        {status === "loading" && <div>Loading...</div>}
        {session?.user ? (
          <>
            <p>{session.user.user.email}</p>
            <button onClick={() => signOut()}>Sign Out</button>
            <Link href={"/employee/signupEmployee"}>
              <Button>Sign Up Employee</Button>
            </Link>
          </>
        ) : (
          <>
            <Button onClick={() => signIn()} variant="outline">
              Sign In
            </Button>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
