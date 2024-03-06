import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import classNames from "classnames";
import { GoProjectRoadmap } from "react-icons/go";

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
    href: "/dashboard",
    label: "Dashboard",
    icon: <MdSpaceDashboard className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/employees",
    label: "Employee",
    icon: <FaUser className={style} style={{ fontSize: "20px" }} />,
    roles: [
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
    ],
  },
  {
    href: "/dashboard",
    label: "Team Roles ",
    icon: <RiTeamFill className={style} style={{ fontSize: "19px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
  {
    href: "/dashboard",
    label: "Department ",
    icon: <GoProjectRoadmap className={style} style={{ fontSize: "19px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
];
