import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/constants/next-auth-config";
import Register from "./Register";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await getServerSession(authOption);

  if (session) {
    // @ts-ignore
    const orgId = session?.user?.user.orgId;

    redirect(`/${orgId}/dashboard`);
  }

  return <Register />;
};

export default SignupPage;
