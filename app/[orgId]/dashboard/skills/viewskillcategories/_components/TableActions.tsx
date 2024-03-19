"use client";

import { MoreHorizontal, Pencil } from "lucide-react";
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
import DeleteCategory from "@/app/[orgId]/dashboard/skills/viewskillcategories/_components/DeleteCategory";

const TableActions = ({
  categoryName,
  categoryId,
}: {
  categoryName: string;
  categoryId: string;
}) => {
  const currentPath = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Dialog>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="w-full"
          >
            <DeleteCategory categoryId={categoryId} />
          </DropdownMenuItem>
        </Dialog>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Link
            href={`${currentPath}/udpatecategory?name=${categoryName}&id=${categoryId}`}
            className="flex w-full items-center gap-2"
          >
            <Pencil size={16} />
            Update
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
