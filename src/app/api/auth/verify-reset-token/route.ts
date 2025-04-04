// app/api/auth/verify-reset-token/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import type { UserType } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Reset token is required" },
        { status: 400 },
      );
    }

    // Check if token exists in any of the user models and is not expired
    const now = new Date();
    let userType: UserType | null = null;

    // Check in user model
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
    }

    // Check in teacher model if not found in user
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
      }
    }

    // Check in admin model if not found in teacher
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
      }
    }

    // If token is valid
    if (userType) {
      return NextResponse.json({ valid: true, userType }, { status: 200 });
    }

    // If token not found or expired
    return NextResponse.json(
      { message: "Invalid or expired reset token" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Verify token error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
