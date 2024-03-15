import { getServerSession } from "next-auth";
import LoginPage from "./Login";
import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession(authOption);

  if (session) {
    const orgId = session?.user?.user.orgId;
    redirect(`/${orgId}/dashboard`);
  }

  return <LoginPage />;
};

export default SigninPage;
