import { User } from "next-auth"
import { string } from "zod"



declare module "next-auth"{
   
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
 