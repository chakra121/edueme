// app/api/auth/reset-password/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import bcrypt from "bcrypt";
import type { UserType } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = (await req.json()) as { token: string; password: string };
    const token = body.token;
    const password = body.password;

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 },
      );
    }

    // Minimum password length check
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    const now = new Date();
    let userType: UserType | null = null;
    let userId: string | null = null;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check and find user with valid token in User model
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: now,
        },
      },
    });

    if (user) {
      userType = "user";
      userId = user.id;
    }

    // Check and find user with valid token in Teacher model if not found in User
    if (!userType) {
      const teacher = await prisma.teacher.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: now,
          },
        },
      });

      if (teacher) {
        userType = "teacher";
        userId = teacher.id;
      }
    }

    // Check and find user with valid token in Admin model if not found in Teacher
    if (!userType) {
      const admin = await prisma.admin.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: now,
          },
        },
      });

      if (admin) {
        userType = "admin";
        userId = admin.id;
      }
    }

    // If user with valid token found, update the password
    if (userType && userId) {
      const resetData = {
        hashedPassword,
        resetToken: null as string | null,
        resetTokenExpiry: null as Date | null,
      };

      if (userType === "user") {
        await prisma.user.update({
          where: { id: userId },
          data: resetData,
        });
      } else if (userType === "teacher") {
        await prisma.teacher.update({
          where: { id: userId },
          data: resetData,
        });
      } else if (userType === "admin") {
        await prisma.admin.update({
          where: { id: userId },
          data: resetData,
        });
      }

      return NextResponse.json(
        {
          message: "Password has been reset successfully",
          userType,
        },
        { status: 200 },
      );
    }

    // If user not found or token is invalid
    return NextResponse.json(
      { message: "Invalid or expired reset token" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
