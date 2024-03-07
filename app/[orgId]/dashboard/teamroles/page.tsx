import TeamRolesTable from "./TeamRolesTable";
import CreateTeamRoles from "./CreateTeamRoles";

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
