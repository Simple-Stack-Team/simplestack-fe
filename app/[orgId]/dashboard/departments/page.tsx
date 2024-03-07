import DepartmentsTable from "./DepartmentsTable";
import CreateDepartments from "./CreateDepartments";

const DepartmentPage = () => {
  return (
    <div>
      <CreateDepartments />
      <div className="mt-8">
        <DepartmentsTable />
      </div>
    </div>
  );
};

export default DepartmentPage;
