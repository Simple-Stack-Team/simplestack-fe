import DepartmentsTable from "./DepartmentsTable";
import CreateDepartments from "./CreateDepartments";

const DepartmentPage = () => {
  return (
    <div className="border-[1.5px] border-gray-300 p-4 rounded-lg min-h-screen">
      <CreateDepartments />
      <div className="mt-8">
        <DepartmentsTable />
      </div>
    </div>
  );
};

export default DepartmentPage;
