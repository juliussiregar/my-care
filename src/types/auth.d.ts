import { User } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

export interface UserData extends User {
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
}

export interface CustomJWT extends NextAuthJWT {
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
  sub?: {
    user_id: number;
    role: string;
    email: string;
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