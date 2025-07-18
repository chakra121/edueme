/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler: ReturnType<typeof NextAuth> = NextAuth(authOptions);

export { handler as GET, handler as POST };
