import { Projects } from "@/types/projects-types";
import { ColumnDef } from "@tanstack/react-table";

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

      return <div>{members.map(member => <p key={member.employee.name}>{member.employee.name}</p>)}</div>;
    },
  },
];
