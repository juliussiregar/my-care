import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend the UserData interface to include all necessary properties
export interface UserData {
  id: string;                          // User ID
  jwt: string;                         // JWT token
  email: string;                       // User email
  role: string;                        // User role
  hospital_id: number;                 // Hospital ID
  specialization: string;              // User specialization
  availability_schedule?: {            // Availability schedule
    [key: string]: string;             // Key is day and value is time
  };
}

// Extend JWT to handle all IDs and properties
declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string;                      // JWT token
    email?: string;                    // User email
    id?: string;                       // User ID
    role?: string;                     // User role
    hospital_id?: number;              // Hospital ID
    specialization?: string;           // User specialization
    availability_schedule?: {          // Availability schedule
      [key: string]: string;           // Key is day and value is time
    };
  }
}

// Extend Session to include user properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;                          // User ID
      jwt: string;                         // JWT token
      email: string;                       // User email
      role: string;                        // User role
      hospital_id: number;                 // Hospital ID
      specialization: string;              // User specialization
      availability_schedule?: {            // Availability schedule
        [key: string]: string;             // Key is day and value is time
      };
    };
  }
}
