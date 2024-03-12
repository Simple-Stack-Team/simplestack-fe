declare module "next-auth/jwt" {
  export interface User {
    sub: string;
    email: string;
    name: string;
    roles: string[];
    orgId: string;
  }

  export interface AccessTokenResponse {
    access_token: string;
    user: User;
  }
}
