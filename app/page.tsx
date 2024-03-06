import AppBar from "@/app/AppBar";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/constants/next-auth-config";
import { redirect } from "next/navigation";

export default async function HelloWorld() {
  const session = await getServerSession(authOption);

  //@ts-ignore
  const orgId = session?.user.user.orgId;
  if (session) redirect(`/${orgId}/dashboard`);

  return (
    <div>
      <AppBar />
    </div>
  );
}
