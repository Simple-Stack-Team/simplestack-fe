import NextAuth from "next-auth/next";
import { authOption } from "@/app/api/auth/[...nextauth]/constants/next-auth-config";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
