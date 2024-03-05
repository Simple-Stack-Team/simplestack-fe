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
