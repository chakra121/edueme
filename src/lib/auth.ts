import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/globalPrisma";
import { connectToDatabase } from "@/lib/connectDB";
import bcrypt from "bcrypt";

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
          throw new Error("Invalid credentials!");
        }

        try {
          await connectToDatabase();

          const user =
            (await prisma.user.findFirst({
              where: { email: credentials.email },
            })) ??
            (await prisma.teacher.findFirst({
              where: { email: credentials.email },
            })) ??
            (await prisma.admin.findFirst({
              where: { email: credentials.email },
            }));

          if (!user || !("hashedPassword" in user || "password" in user)) {
            throw new Error("Invalid credentials!");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            "hashedPassword" in user ? user.hashedPassword : user.password,
          );

          if (!isValid) {
            throw new Error("Invalid credentials!");
          }

          return {
            id: user.id,
            email: user.email,
            role:
              "teacherName" in user
                ? "teacher"
                : "superadmin" in user
                  ? "superadmin"
                  : "student",
          };
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
        session.user.role = token.role as "student" | "teacher" | "superadmin";
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
