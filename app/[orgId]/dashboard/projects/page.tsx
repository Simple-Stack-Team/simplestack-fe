"use client";

import { Button } from "@/components/ui/button";
import { FaEllipsis } from "react-icons/fa6";
import Link from "next/link";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import SkeletonTable from "@/components/SkeletonTable";
import { Toaster } from "@/components/ui/sonner";
import useFetchProjects from "@/hooks/useFetchProjects";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import RoleCheck from "@/components/RoleCheck";
import { EMPLOYEE_ROLES } from "@/types/employee-types";

type Props = {
  params: { orgId: string };
};

const ProjectsPage = ({ params: { orgId } }: Props) => {
  const { projectsFetch, isLoading, error } = useFetchProjects(orgId);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold lg:mb-4">Projects</h1>
        <div className="hidden justify-between gap-2 md:flex">
          <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
            <Button asChild>
              <Link href={`/${orgId}/dashboard/projects/new`}>New project</Link>
            </Button>
          </RoleCheck>
          <Button asChild variant="outline">
            <Link href={`/${orgId}/dashboard/projects/myprojects`}>
              My Projects
            </Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <FaEllipsis />
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="mt-6 flex flex-col gap-4 border">
                <RoleCheck roles={[EMPLOYEE_ROLES.PROJECT_MANAGER]}>
                  <Button asChild>
                    <Link href={`/${orgId}/dashboard/projects/new`}>
                      New project
                    </Link>
                  </Button>
                </RoleCheck>
                <Button asChild variant="outline">
                  <Link href={`/${orgId}/dashboard/projects/myprojects`}>
                    My Projects
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          {isLoading ? (
            <div className="space-y-2">
              {skeleton.map((item) => (
                <SkeletonTable key={item} />
              ))}
            </div>
          ) : (
            <>
              <DataTable
                columns={columns}
                data={projectsFetch}
                showToolbar={true}
              />
              <Toaster />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
