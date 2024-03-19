"use client";

import { MoreHorizontal, UserPlus, FilesIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDepartmentStore } from "@/lib/store";
import UpdateDepartment from "@/app/[orgId]/dashboard/departments/UpdateDepartments";
import DeleteDepartments from "@/app/[orgId]/dashboard/departments/DeleteDepartments";

interface Props {
  departmentId: string;
  name: string;
}

const ActionsTable = ({ departmentId, name }: Props) => {
  const { data: session } = useSession();
  const { orgId } = useParams();
  const path = usePathname();

  const token = session?.user?.access_token;

  const deleteDepartment = useDepartmentStore(
    (state) => state.deleteDepartment,
  );

  const onDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/departments/${departmentId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: departmentId,
      }),
    });

    if (res.ok) {
      deleteDepartment(departmentId);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`${path}/assignmanager?depId=${departmentId}`}
            className="flex w-full items-center gap-2"
          >
            <UserPlus size={16} />
            Assign manager
          </Link>
        </DropdownMenuItem>
        <Dialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <UpdateDepartment name={name} departmentId={departmentId} />
          </DropdownMenuItem>
        </Dialog>
        <DeleteDepartments onDelete={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTable;
