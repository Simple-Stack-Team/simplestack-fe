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
import DeleteCategory from "./DeleteCategory";

const TableActions = ({ categoryName, categoryId }: { categoryName: string, categoryId: string }) => {
  const currentPath = usePathname();

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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
            <DeleteCategory categoryId={categoryId} />
          </DropdownMenuItem>
        </Dialog>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2">
            <Pencil size={16} />
            <Link href={`${currentPath}/udpatecategory?name=${categoryName}&id=${categoryId}`}>
              Update
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
