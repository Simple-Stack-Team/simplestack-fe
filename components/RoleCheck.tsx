"use client";

import useHasAccess from "@/hooks/useHasAccess";
import { EMPLOYEE_ROLES } from "@/types/employee-types";

const RoleCheck = ({
  roles,
  children,
}: {
  roles: EMPLOYEE_ROLES[];
  children: React.ReactNode;
}) => {
  const hasAccess = useHasAccess(roles);

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default RoleCheck;
