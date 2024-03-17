import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Projects } from "@/types/projects-types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: "Project name",
  },
  {
    accessorKey: "createdAt",
    header: "Deadline date",
    cell: ({ row }) => {
      const formatedDate = row.original.deadlineDate ? new Date(row.original.deadlineDate).toLocaleDateString() : '-';

      return <div>{formatedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.original.members;

      return <div className="flex flex-wrap gap-1">{members.map(member => <Badge variant="outline" key={member.employee.name}>{member.employee.name}</Badge>)}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => {
      return <Link href={`projects/${row.original.id}`}>
        <Button variant="outline">
          See project
          <ChevronRight className="ml-2" size={20} />
        </Button>
      </Link>
    },
  },
];
