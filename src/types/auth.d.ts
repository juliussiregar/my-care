import { User } from "next-auth";

// Extend the UserData interface to include all necessary properties
export interface UserData extends User {
  id: string;                     // User ID
  jwt: string;                    // JWT token
  email: string;                  // User email
  role: string;                   // User role
  hospital_id: number;            // Hospital ID
  specialization: string;         // User specialization
  availability_schedule?: {       // Optional availability schedule
    [key: string]: string;        // Key is day and value is time
  };
}

// Extend the CustomJWT interface to handle all IDs and properties
export interface CustomJWT {
  jwt?: string;                   // JWT token
  email?: string;                 // User email
  id?: string;                    // User ID
  role?: string;                  // User role
  hospital_id?: number;           // Hospital ID
  specialization?: string;        // User specialization
  availability_schedule?: {       // Availability schedule
    [key: string]: string;        // Key is day and value is time
  };
  sub?: {                         // User subject containing user details
    user_id: number;              // User ID
    role: string;                 // User role
    email: string;                // User email
    hospital_id: number;          // Hospital ID
    specialization: string;       // User specialization
    availability_schedule: {       // Availability schedule
      [key: string]: string;      // Key is day and value is time
    };
  };
}
