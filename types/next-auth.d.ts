import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      user: {
        sub: string;
        email: string;
        name: string;
        roles: string[];
        orgId: string;
      };
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
