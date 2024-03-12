import { getServerSession } from "next-auth";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";

export async function getData(url: string) {
  const session = await getServerSession(authOption);
  if (!session) return null;

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;

  // @ts-ignore
  const token = session?.user?.access_token;

  const res = await fetch(`${apiKey}${url}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}