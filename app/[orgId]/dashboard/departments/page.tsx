import DepartmentsTable from "./DepartmentsTable";
import CreateDepartments from "./CreateDepartments";

const DepartmentPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-xl font-semibold">Departments</h1>
        <div className="flex justify-between gap-2">
          <CreateDepartments />
        </div>
      </div>
      <div className="mt-8">
        <DepartmentsTable />
      </div>
    </div>
  );
};

export default DepartmentPage;
