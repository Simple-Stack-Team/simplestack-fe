import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import classNames from "classnames";
interface Sidebar {
  href: string;
  label: string;
  icon: React.ReactElement;
}
const style = classNames("flex items-center pl-1 gap-4 mt-1");

export const sidebarLinks: Sidebar[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: <MdSpaceDashboard className={style} style={{ fontSize: "20px" }} />,
  },
  {
    href: "/",
    label: "Employee",
    icon: <FaUser className={style} style={{ fontSize: "20px" }} />,
  },
  {
    href: "/",
    label: "Team Roles ",
    icon: <RiTeamFill className={style} style={{ fontSize: "19px" }} />,
  },
];
