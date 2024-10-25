import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { CustomJWT, UserData } from '../../../src/types/auth';
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

        try {
          const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("Failed to login:", res.statusText);
            return null;
          }

          const data = await res.json();

          if (data.access_token && typeof data.access_token === 'string') {
            const decodedToken = jwtDecode<CustomJWT>(data.access_token);

            const sub = decodedToken.sub;
            if (!sub) {
              console.error("JWT is missing 'sub' property:", decodedToken);
              return null;
            }

            const userData: UserData = {
              id: sub.user_id.toString(),
              email: sub.email,
              jwt: data.access_token,
              role: sub.role,
              name: null, // Required by NextAuth User type
            };

            // Add doctor-specific fields if role is doctor
            if (sub.role === 'doctor') {
              userData.hospital_id = sub.hospital_id;
              userData.specialization = sub.specialization;
              userData.availability_schedule = sub.availability_schedule;
            }

            // Add patient-specific fields if role is patient
            if (sub.role === 'patient') {
              userData.patient_id = sub.patient_id;
              userData.patient_name = sub.patient_name;
              userData.patient_address = sub.patient_address;
              userData.patient_phonenumber = sub.patient_phonenumber;
            }

            return userData;
          } else {
            console.error("Access token not found or invalid in response", data);
            return null;
          }

        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | null }): Promise<JWT> {
      if (user) {
        const userData = user as UserData;
        token.id = userData.id;
        token.email = userData.email;
        token.role = userData.role;
        token.jwt = userData.jwt;

        // Add doctor-specific fields if role is doctor
        if (userData.role === 'doctor') {
          token.hospital_id = userData.hospital_id;
          token.specialization = userData.specialization;
          token.availability_schedule = userData.availability_schedule;
        }

        // Add patient-specific fields if role is patient
        if (userData.role === 'patient') {
          token.patient_id = userData.patient_id;
          token.patient_name = userData.patient_name;
          token.patient_address = userData.patient_address;
          token.patient_phonenumber = userData.patient_phonenumber;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          jwt: token.jwt as string,
        };

        // Add doctor-specific fields if role is doctor
        if (token.role === 'doctor') {
          session.user.hospital_id = token.hospital_id as number;
          session.user.specialization = token.specialization as string;
          session.user.availability_schedule = token.availability_schedule as {
            [key: string]: string;
          };
        }

        // Add patient-specific fields if role is patient
        if (token.role === 'patient') {
          session.user.patient_id = token.patient_id as number;
          session.user.patient_name = token.patient_name as string;
          session.user.patient_address = token.patient_address as string;
          session.user.patient_phonenumber = token.patient_phonenumber as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);