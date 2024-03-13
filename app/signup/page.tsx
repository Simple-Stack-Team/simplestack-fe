import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";
import Register from "@/app/signup/Register";

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
