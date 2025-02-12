import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "teacher" | "superadmin";
    } & DefaultSession["user"];
    expires: string;
  }

  interface User extends DefaultUser {
    id: string;
    role: "student" | "teacher" | "superadmin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "teacher" | "superadmin";
    exp: number; // ✅ Extend JWT to include `exp`
  }
}
