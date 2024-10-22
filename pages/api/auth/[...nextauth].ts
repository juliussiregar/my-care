import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { CustomJWT, UserData } from '../../../src/types/auth';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials): Promise<UserData | null> {
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
    
              // Check for both access_token and sub property
              if (data.access_token && typeof data.access_token === 'string') {
                const decodedToken = jwtDecode<CustomJWT>(data.access_token);
    
                //  Optional Chaining and Nullish Coalescing
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
                  hospital_id: sub.hospital_id,
                  specialization: sub.specialization,
                  availability_schedule: sub.availability_schedule,
                };
    
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
        async jwt({ token, user }: { token: CustomJWT; user?: Partial<UserData> }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
            token.role = user.role;
            token.hospital_id = user.hospital_id;
            token.specialization = user.specialization;
            token.availability_schedule = user.availability_schedule;
            token.jwt = user.jwt;
          }
          return token;
        },
        async session({ session, token }: { session: any; token: CustomJWT }) {
          if (token) {
            session.user = {
              id: token.id,
              email: token.email,
              role: token.role,
              hospital_id: token.hospital_id,
              specialization: token.specialization,
              availability_schedule: token.availability_schedule,
              jwt: token.jwt,
            };
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