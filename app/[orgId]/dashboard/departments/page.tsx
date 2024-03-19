import DepartmentsTable from "@/app/[orgId]/dashboard/departments/DepartmentsTable";
import CreateDepartments from "@/app/[orgId]/dashboard/departments/CreateDepartments";
import { Toaster } from "@/components/ui/sonner"

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
      <Toaster />
    </div>
  );
};

export default DepartmentPage;
