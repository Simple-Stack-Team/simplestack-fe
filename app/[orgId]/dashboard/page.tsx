import Image from "next/image";

import group2 from "@/public/Group2.svg";
import { Separator } from "@/components/ui/separator";
import InviteUsers from "@/components/InviteUsers";
import DashboardCard from "@/components/DashboardCard";
import EmployeeProfile from "@/app/[orgId]/dashboard/EmployeeProfile";

interface Props {
  params: { orgId: string };
}

export default async function Page({ params: { orgId } }: Props) {
  return (
    <>
      <h1 className="mb-2 text-lg font-semibold">Dashboard</h1>
      <Separator />
      <EmployeeProfile />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard title="Employees" numberOf="124" />
        <DashboardCard title="Departments" numberOf="8" />
        <DashboardCard title="Projects" numberOf="12" />
      </div>
      <div className="relative mt-8 h-[230px] w-full overflow-hidden rounded-xl border p-4 md:h-[360px]">
        <Image
          src={group2}
          alt="People connection"
          className="absolute bottom-[100px] left-[50%] hidden translate-x-[-50%] opacity-85 md:block"
        />
        <div className="flex h-full flex-col items-center md:justify-end">
          <h2 className="mb-4 font-semibold md:mb-0">Invite your first user</h2>
          <p className="mb-4 text-center text-xs text-gray-500">
            Add your team members and external users.
          </p>
          <InviteUsers />
        </div>
      </div>
    </>
  );
}
