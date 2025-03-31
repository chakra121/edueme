import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/globalPrisma";
import { connectToDatabase } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import type { NextApiHandler } from "next";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter email" },
        password: { label: "Password", placeholder: "Enter password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectToDatabase();

          // Try to find user in each model sequentially
          let user;
          let userRole = "";

          // Check in user model (student)
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user) {
            userRole = "student";
          }

          // If not found, check in teacher model
          if (!user) {
            user = await prisma.teacher.findUnique({
              where: { email: credentials.email },
            });
            if (user) {
              userRole = "teacher";
            }
          }

          // If still not found, check in admin model
          if (!user) {
            user = await prisma.admin.findUnique({
              where: { email: credentials.email },
            });
            if (user) {
              userRole = "superadmin";
            }
          }

          // If no user found in any model
          if (!user) {
            return null;
          }

          // Determine which password field to use
          const passwordField =
            "hashedPassword" in user ? user.hashedPassword : user.password;

          if (!passwordField) {
            return null;
          }

          // Compare passwords
          const isValid = await bcrypt.compare(
            credentials.password,
            passwordField,
          );

          if (!isValid) {
            return null;
          }

          // Return authenticated user with role
          return {
            id: user.id,
            email: user.email,
            role: userRole as "student" | "teacher" | "superadmin",
          };
        } catch (error) {
          console.error("Authorization Error:", error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24-hour expiry
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions) as NextApiHandler;
export { handler as GET, handler as POST };
