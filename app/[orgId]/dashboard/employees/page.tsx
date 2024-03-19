import EmployeesList from "@/app/[orgId]/dashboard/employees/EmployeesList";
import { Toaster } from "@/components/ui/sonner";

const Employees = () => {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Employees</h1>
      <EmployeesList />
      <Toaster />
    </div>
  );
};

export default Employees;
