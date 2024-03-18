import TeamRolesTable from "@/app/[orgId]/dashboard/teamroles/TeamRolesTable";
import CreateTeamRoles from "@/app/[orgId]/dashboard/teamroles/CreateTeamRoles";

const TeamRolesPage = () => {
  return (
    <div>
      <CreateTeamRoles />
      <div className="mt-8">
        <TeamRolesTable />
      </div>
    </div>
  );
};

export default TeamRolesPage;
