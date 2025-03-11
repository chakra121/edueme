import NextAuth, { NextAuthOptions } from "next-auth";
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request/response types
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/globalPrisma";
import { connectToDatabase } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // Session expires in 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24, // JWT expires in 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter email" },
        password: { label: "Password", placeholder: "Enter password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials!");
        }

        try {
          await connectToDatabase();

          let user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (user && user.hashedPassword) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.hashedPassword,
            );
            if (isValid) {
              return { id: user.id, email: user.email, role: "student" };
            }
          }

          let teacher = await prisma.teacher.findFirst({
            where: { email: credentials.email },
          });

          if (teacher && teacher.hashedPassword) {
            const isValid = await bcrypt.compare(
              credentials.password,
              teacher.hashedPassword,
            );
            if (isValid) {
              return {
                id: teacher.id,
                name: teacher.teacherName,
                email: teacher.email,
                role: "teacher",
              };
            }
          }

          let admin = await prisma.admin.findFirst({
            where: { email: credentials.email },
          });

          if (admin && admin.password) {
            const isValid = await bcrypt.compare(
              credentials.password,
              admin.password,
            );
            if (isValid) {
              return {
                id: admin.id,
                name: "Admin",
                email: admin.email,
                role: "superadmin",
              };
            }
          }

          throw new Error("Invalid credentials!");
        } catch (error) {
          console.error("Authorization Error:", error);
          throw new Error("Invalid credentials!");
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // Expire in 24 hours
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "student" | "teacher" | "superadmin";
        session.user.email = token.email;
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // To show the error on a custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Correct Next.js API handlers for the App Router
export const GET = (req: NextRequest) => NextAuth(authOptions);
export const POST = (req: NextRequest) => NextAuth(authOptions);
