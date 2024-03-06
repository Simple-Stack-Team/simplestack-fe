import { create } from "zustand";
import { Employee } from "@/types/Employee";

type EmployeeStore = {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  updateEmployeeRoles: (employeeId: string, newRoles: string[]) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  setEmployees: (newEmployees) => set({ employees: newEmployees }),
  updateEmployeeRoles: (employeeId: string, newRoles: string[]) =>
    set((state) => ({
      employees: state.employees.map((employee) => {
        if (employee.id === employeeId) {
          return { ...employee, roles: newRoles };
        }
        return employee;
      }),
    })),
}));

type Department = {
  id: string;
  name: string;
  createdAt: string;
  orgnizationId: string;
  managerId: string;
};

type DepartmentStore = {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  deleteDepartment: (departmentId: string) => void;
};

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  setDepartments: (newDepartments) => set({ departments: newDepartments }),
  deleteDepartment: (departmentId) =>
    set((state) => ({
      departments: state.departments.filter(
        (department) => department.id !== departmentId
      ),
    })),
}));