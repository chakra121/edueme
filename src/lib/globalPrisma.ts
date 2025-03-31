/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

// ✅ Extend globalThis properly to avoid `any` issues
declare global {
  var prisma: PrismaClient | undefined;
}

// ✅ Use a singleton pattern to avoid multiple instances
const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
