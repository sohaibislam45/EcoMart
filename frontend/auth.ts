import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        // Mock Admin Login
        if (email === "admin@ecomart.com" && password === "admin123") {
          return {
            id: "1",
            name: "Eco Admin",
            email: "admin@ecomart.com",
            role: "admin",
          };
        }

        // Mock User Login
        if (email === "user@ecomart.com" && password === "password123") {
          return {
            id: "2",
            name: "Eco User",
            email: "user@ecomart.com",
            role: "user",
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
});
