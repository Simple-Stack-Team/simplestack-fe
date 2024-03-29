import classNames from "classnames";
import { EMPLOYEE_ROLES } from "@/types/employee-types";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FileSpreadsheet } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import {
  LuLayoutGrid,
  LuFileCheck,
  LuHome,
  LuFileBarChart2,
  LuSquareCode,
  LuUserPlus,
  LuBellRing,
} from "react-icons/lu";

interface Sidebar {
  href: string;
  label: string;
  icon: React.ReactElement;
  roles: EMPLOYEE_ROLES[];
}
const style = classNames("flex items-center text-[#8b8a8d]");

export const sidebarLinks: Sidebar[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LuHome className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/employees",
    label: "Employee",
    icon: <FaRegUser className={style} style={{ fontSize: "19px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/teamroles",
    label: "Team Roles ",
    icon: <HiOutlineUserGroup className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/departments",
    label: "Departments",
    icon: <LuLayoutGrid className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.ORGANIZATION_ADMIN],
  },
  {
    href: "/dashboard/mydepartment",
    label: "My department",
    icon: <LuLayoutGrid className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
  {
    href: "/dashboard/skillassignment",
    label: "Skill Assignment",
    icon: <LuFileCheck className={style} style={{ fontSize: "20px" }} />,
    roles: [
      EMPLOYEE_ROLES.ORGANIZATION_ADMIN,
      EMPLOYEE_ROLES.DEPARTMENT_MANAGER,
      EMPLOYEE_ROLES.PROJECT_MANAGER,
      EMPLOYEE_ROLES.EMPLOYEE,
    ],
  },
  {
    href: "/dashboard/skills",
    label: "Skills",
    icon: <LuFileBarChart2 className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: <LuSquareCode className={style} style={{ fontSize: "21px" }} />,
    roles: [EMPLOYEE_ROLES.PROJECT_MANAGER, EMPLOYEE_ROLES.EMPLOYEE],
  },
  {
    href: "/dashboard/departmentassign",
    label: "Assign members",
    icon: <LuUserPlus className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
  {
    href: "/dashboard/proposals",
    label: "Proposals",
    icon: (
      <FileSpreadsheet
        className={style}
        style={{ fontSize: "20px", marginRight: "-2px", marginLeft: "-2px" }}
      />
    ),
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
  {
    href: "/dashboard/notifications",
    label: "Notification",
    icon: <LuBellRing className={style} style={{ fontSize: "20px" }} />,
    roles: [EMPLOYEE_ROLES.DEPARTMENT_MANAGER],
  },
];
