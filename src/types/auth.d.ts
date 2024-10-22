import { User } from "next-auth";

export interface UserData extends User {
  user_id: number;
  role: string;
  email: string;
  hospital_id: number;
  specialization: string;
  availability_schedule: {
    [key: string]: string;
  };
  jwt: string;
}

export interface CustomJWT {
  jwt?: string;
  user_id?: number;
  role?: string;
  email?: string;
  hospital_id?: number;
  specialization?: string;
  availability_schedule?: {
    [key: string]: string;
  };
}