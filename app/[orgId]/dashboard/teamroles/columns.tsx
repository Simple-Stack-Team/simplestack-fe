import { ColumnDef } from "@tanstack/react-table";
import ActionsTable from "./ActionsTable";

interface TeamRoles {
  id: string;
  name: string;
  organizationId: string;
}

export const columns: ColumnDef<TeamRoles>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teamrole = row.original;

      console.log(teamrole);

      return (
        <div>
          <ActionsTable teamRoleId={teamrole.id} name={teamrole.name} />
        </div>
      );
    },
  },
];
