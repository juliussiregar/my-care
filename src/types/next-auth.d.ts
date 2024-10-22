import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number;
      role: string;
      email: string;
      hospital_id: number;
      specialization: string;
      availability_schedule: {
        [key: string]: string;
      };
      jwt: string;
    };
  }
}