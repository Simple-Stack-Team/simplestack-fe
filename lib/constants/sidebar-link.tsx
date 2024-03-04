import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import classNames from "classnames";

import { EMPLOYEE_ROLES } from "@/types/employee-types";

interface Sidebar {
  href: string;
  label: string;
  icon: React.ReactElement;
  roles: string[];
}
const style = classNames("flex items-center pl-1 gap-4 mt-1");

export const sidebarLinks: Sidebar[] = [
  {
    href: "/orgId/",
    label: "Dashboard",
    icon: <MdSpaceDashboard className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/orgId/",
    label: "Employee",
    icon: <FaUser className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
  {
    href: "/orgId/",
    label: "Team Roles ",
    icon: <RiTeamFill className={style} style={{ fontSize: "19px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
];
