export interface SessionTypes {
  user: {
    access_token: string;
    user: {
      sub: string;
      email: string;
      name: string;
      roles: string[];
      orgId: string;
    };
    exp: number;
    iat: number;
    jti: string;
  };
  expires: string;
}
