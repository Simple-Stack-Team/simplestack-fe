"use client";

import { useSession } from "next-auth/react";

const useHasAccess = (roles: string[]) => {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) {
    return false;
  }

  const hasAccess =
    Array.isArray(roles) &&
    roles.some((role: string) => session.user?.user.roles.includes(role));

  return hasAccess;
};

export default useHasAccess;
