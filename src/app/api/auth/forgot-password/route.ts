// app/api/auth/forgot-password/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import type { UserType } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = (await req.json()) as { email: string };
    const email: string = body.email;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Find which user model contains this email (student, teacher, or admin)
    let userType: UserType | null = null;

    // Check if user exists in User model
    const student = await prisma.user.findUnique({ where: { email } });
    if (student) {
      userType = "user";
    }

    // Check if user exists in Teacher model if not found in User
    if (!userType) {
      const teacher = await prisma.teacher.findUnique({ where: { email } });
      if (teacher) {
        userType = "teacher";
      }
    }

    // Check if user exists in Admin model if not found in Teacher
    if (!userType) {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (admin) {
        userType = "admin";
      }
    }

    // If user exists, update the reset token and expiry
    if (userType) {
      if (userType === "user") {
        await prisma.user.update({
          where: { email },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        });
      } else if (userType === "teacher") {
        await prisma.teacher.update({
          where: { email },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        });
      } else if (userType === "admin") {
        await prisma.admin.update({
          where: { email },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        });
      }

      // Send reset email
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

      await sendEmail({
        to: email,
        subject: "Password Reset Request - Edueme",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>You've requested to reset your password for your Edueme account.</p>
            <p>Please click the button below to set a new password. This link is valid for 1 hour.</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; margin: 20px 0; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If you didn't request this password reset, you can safely ignore this email.</p>
            <p>Best regards,<br>The Edueme Team</p>
          </div>
        `,
      });
    }

    // For security, always return the same message whether user exists or not
    return NextResponse.json(
      {
        message: "If a user with that email exists, a reset link will be sent.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
