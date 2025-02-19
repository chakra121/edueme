import NextAuth, { NextAuthOptions, User } from "next-auth";
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
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          await connectToDatabase();

          // Check in User model
          let user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (user && user.hashedPassword) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.hashedPassword,
            );
            if (isValid) {
              return {
                id: user.id,
                name: user.firstName + " " + user.lastName,
                email: user.email,
                role: "student",

              };
            }
          }

          // Check in Teacher model
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

          // Check in Admin model
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

          // If no match found
          return null;
        } catch (error) {
          console.error(error);
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
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
 
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // Expire in 24 hours
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "student" | "teacher" | "superadmin";
        session.user.name = token.name;
        session.user.email = token.email;
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
