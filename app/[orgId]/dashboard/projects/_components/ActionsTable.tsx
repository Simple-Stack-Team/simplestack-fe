"use client";

import { MoreHorizontal, Pencil, SearchCode, LayoutListIcon } from "lucide-react";
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
import { useProjectStore } from "@/lib/store";
import DeleteProject from "./DeleteProject";

type Props = {
  projectId: string;
  name: string;
  period: string;
  status: string;
};

const ActionsTable = ({ projectId, name, period, status }: Props) => {
  const { data: session } = useSession();
  const { orgId, id } = useParams();
  const path = usePathname();

  // @ts-ignore
  const token = session?.user?.access_token;

  const deleteProjects = useProjectStore((state) => state.deleteProjects);

  const onDelete = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiKey}/organizations/${orgId}/projects/${projectId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: projectId,
      }),
    });

    if (res.ok) {
      deleteProjects(projectId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Dialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            asChild
          ></DropdownMenuItem>
        </Dialog>
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DeleteProject onDelete={onDelete} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="space-x-2"
        >
          <Pencil size={16} />
          <Link
            href={`/${orgId}/dashboard/projects/${projectId}/updateprojects`}
          >
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-1.5">
          <LayoutListIcon size={19} />
          <Link href={`/${orgId}/dashboard/projects/${projectId}`}>
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="space-x-2"
        >
          <SearchCode size={17} />
          <Link href={`/${orgId}/dashboard/projects/${projectId}/teamfinder`}>Team finder</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsTable;
