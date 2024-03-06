import TeamRolesTable from "./TeamRolesTable";
import CreateTeamRoles from "./CreateTeamRoles";

const TeamRolesPage = () => {
  return (
    <div className="border-[1.5px] border-gray-300 p-4 rounded-lg min-h-screen">
      <CreateTeamRoles />
      <div className="mt-8">
        <TeamRolesTable />
      </div>
    </div>
  );
};

export default TeamRolesPage;
