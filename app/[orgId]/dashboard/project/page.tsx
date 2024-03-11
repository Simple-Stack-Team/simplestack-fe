import CreateProject from "./CreateProject";
import ProjectsTable from "./ProjectTable";

const ProjectPage = () => {
  return (
    <div>
      <CreateProject />
      <div className="mt-8">
        <ProjectsTable />
      </div>
    </div>
  );
};

export default ProjectPage;
