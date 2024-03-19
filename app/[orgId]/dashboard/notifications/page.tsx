"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  description: string;
  isRead: boolean;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null,
  );

  const [depId, setDepId] = useState<number | null>(null);
  const { orgId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

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

  function markAllUnread() {
    setNotifications((prev) =>
      prev ? prev.map((n) => ({ ...n, isRead: false })) : null,
    );
  }

  async function onClick(data: Notification) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/departments/notification/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      },
    );
    if (res.ok) {
      setNotifications((prevNotifications) => {
        if (prevNotifications) {
          const updatedNotifications = prevNotifications.filter(
            (n) => n.id !== data.id,
          );
          return updatedNotifications;
        }
        return null;
      });
      router.push(`/${orgId}/dashboard/proposals`);
    }
  }

  function handleNotificationClick(id: number): void {}
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="title">
            <h1 className="mb-4 text-center text-xl font-semibold">
              Notifications
              <span className="badge ml-2 rounded-full bg-red-500 px-2 py-0.5 text-white">
                {notifications && notifications.filter((n) => !n.isRead).length}
              </span>
            </h1>
          </div>
          <button id="mark" onClick={markAllUnread}></button>
        </header>
        <div className="wrapper mt-4 flex flex-col items-center">
          {notifications &&
            notifications.map((n, index) => (
              <div key={n.id} className={`mt-${index !== 0 ? "2" : "2"}`}>
                {!n.isRead && (
                  <Card
                    className={`notification mt-2 flex h-24 w-full max-w-xl items-center justify-center p-3 ${n.isRead ? "bg-gray-100" : "bg-gray-400"}`} // Adăugăm clasele max-w-xl, w-full și h-24 pentru a specifica lățimea dorită pe axa x și înălțimea dorită pe axa y
                    onClick={() => handleNotificationClick(n.id)}
                  >
                    <CardContent>
                      <div className="notification-content mt-5">
                        <div className="post">
                          <div>
                            <span>{n.description}</span>
                            {n.isRead && <span className="isUnread"></span>}
                            <Button onClick={() => onClick(n)} className="m-2">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Notifications;
