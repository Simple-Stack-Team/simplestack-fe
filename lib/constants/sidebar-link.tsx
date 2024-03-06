import classNames from "classnames";

import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { EMPLOYEE_ROLES } from "@/types/employee-types";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrProjects } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

interface Sidebar {
  href: string;
  label: string;
  icon: React.ReactElement;
  roles: string[];
}

const style = classNames("flex items-center  text-gray-500");

export const sidebarLinks: Sidebar[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <AiOutlineFundProjectionScreen
        className={style}
        style={{ fontSize: "20px" }}
      />
    ),
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/employees",
    label: "Employee",
    icon: <FaRegUser className={style} style={{ fontSize: "20px" }} />,
    roles: [
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
    ],
  },
  {
    href: "/dashboard",
    label: "Team Roles ",
    icon: <HiOutlineUserGroup className={style} style={{ fontSize: "19px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
  {
    href: "/dashboard/departments",
    label: "Department ",
    icon: <GrProjects className={style} style={{ fontSize: "19px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
];
