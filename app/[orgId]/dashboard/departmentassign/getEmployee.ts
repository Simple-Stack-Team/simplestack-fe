import { getServerSession } from "next-auth";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";

export const getEmployee = async () => {
  const session = await getServerSession(authOption);

  //@ts-ignore
  const employeeId = session?.user?.user.sub;
  //@ts-ignore
  const orgId = session?.user?.user.orgId;
  //@ts-ignore
  const token = session?.user?.access_token;

  const url = `${process.env.NEXT_PUBLIC_API_URL!}/organizations/${orgId}/employees/${employeeId}/employee`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) return;

  return res.json();
};
