"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  description: string;
  isRead: boolean;
}

function NotificationsCount() {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );

  const [depId, setDepId] = useState<number | null>(null);
  const { orgId } = useParams();
  const { data: session } = useSession();

  const employeeId = session?.user?.user.sub;
  const fetchedOrgId = session?.user?.user.orgId;
  const token = session?.user?.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${fetchedOrgId}/employees/${employeeId}/employee`;

  useEffect(() => {
    if (!session) return;

    const fetchEmployee = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!res.ok) throw new Error("Error fetching employee data");

        const employeeData = await res.json();
        setDepId(employeeData?.departmentId);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployee();
  }, [session, url, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!depId) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/departments/${depId}/notifications`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );

        if (!res.ok) throw new Error("Error fetching data");

        const json = await res.json();
        setNotifications(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [depId, orgId, token]);

  return (
    <Badge className="badge ml-2 rounded-2xl bg-red-500 px-2 py-0.5 text-white">
      {notifications && notifications.filter((n) => !n.isRead).length}
    </Badge>
  );
}
export default NotificationsCount;
