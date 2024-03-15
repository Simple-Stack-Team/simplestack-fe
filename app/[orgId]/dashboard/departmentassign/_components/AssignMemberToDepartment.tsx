"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { toast } from "sonner";

interface Employee {
  id: string;
  departmentId: string;
}

const AssignMemberToDepartment = ({ empId }: { empId: string }) => {
  const [employee, setEmployee] = useState<Employee>();
  const { status, data: session } = useSession();
  const router = useRouter();

  const employeeId = session?.user?.user.sub;
  const orgId = session?.user?.user.orgId;
  const token = session?.user?.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/employees/${employeeId}/employee`;

  useEffect(() => {
    const getEmployeeDetail = async () => {
      if (status === "loading") return;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setEmployee(data);
    };

    getEmployeeDetail();
  }, [employeeId, orgId, status, token, url]);

  const depId = employee?.departmentId;

  const assignMember = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/departments/${depId}/assign-member/${empId}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) return;

    toast("Success", {
      description: `The employee with ID ${empId} has been successfully added to your department.`,
      duration: 2000,
    });

    router.refresh();
  };

  return (
    <div onClick={assignMember}>
      <Plus className="h-4 w-4" />
    </div>
  );
};

export default AssignMemberToDepartment;
