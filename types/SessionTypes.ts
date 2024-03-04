export interface SessionTypes {
  expires: string;
  user?: {
    access_token: string;
    exp: number;
    iat: number;
    jti: string;
    user: {
      email: string;
      name: string;
      orgId: string;
      roles: string[];
      sub: string;
    };
  };
}
