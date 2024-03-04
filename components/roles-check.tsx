"use client";
import useHasAccess from "@/lib/hooks/useHasAccess";

const RoleCheck = ({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) => {
  const hasAccess = useHasAccess(roles);

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default RoleCheck;
