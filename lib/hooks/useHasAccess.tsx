"use client";

import { useSession } from "next-auth/react";

const useHasAccess = (roles: string) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return false;
  }

  if (!session) {
    return false;
  }
  // @ts-ignore
  if (session.user?.user.roles.includes(roles)) {
    return true;
  }

  return false;
};

export default useHasAccess;
