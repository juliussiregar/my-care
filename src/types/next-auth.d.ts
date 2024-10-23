import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { UserData } from "./auth";

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown> {
    jwt?: string;
    email?: string;
    id?: string;
    role?: string;
    // Doctor specific fields
    hospital_id?: number;
    specialization?: string;
    availability_schedule?: {
      [key: string]: string;
    };
    // Patient specific fields
    patient_id?: number;
    patient_name?: string;
    patient_address?: string;
    patient_phonenumber?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      jwt: string;
      email: string;
      role: string;
      // Doctor specific fields
      hospital_id?: number;
      specialization?: string;
      availability_schedule?: {
        [key: string]: string;
      };
      // Patient specific fields
      patient_id?: number;
      patient_name?: string;
      patient_address?: string;
      patient_phonenumber?: string;
    };
  }

  interface User extends UserData {}
}
