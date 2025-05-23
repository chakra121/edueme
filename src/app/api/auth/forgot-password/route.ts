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
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Password Reset - Edueme</title>
            <style>
              @media only screen and (max-width: 600px) {
                .container {
                  width: 100% !important;
                  padding: 0 10px !important;
                }
      
                .button {
                  width: 100% !important;
                  box-sizing: border-box;
                }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f4f4f7;">
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" class="container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <tr style="background-color: #4f46e5;">
                      <td align="center" style="padding: 20px;">
                        <a href="${baseUrl}" target="_blank" style="display: inline-block;">
                          <img src="${baseUrl}/logo_white.png" alt="Edueme Logo" height="70" style="display: block;" draggable="false" oncontextmenu="return false;" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px 30px;">
                        <h2 style="margin: 0 0 15px; color: #333333;">Reset Your Password</h2>
                        <p style="margin: 0 0 20px; font-size: 16px; color: #555;">
                          You’ve requested to reset your password for your Edueme account.
                          Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.
                        </p>
                        <p style="text-align: center; margin: 30px 0;">
                          <a href="${resetUrl}" class="button" style="background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-size: 16px; display: inline-block;">
                            Reset Password
                          </a>
                        </p>
                        <p style="margin-top: 30px; font-size: 14px; color: #777;">
                          If you didn’t request this password reset, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="background-color: #f0f0f0; padding: 20px; font-size: 13px; color: #888;">
                        Best regards,<br />
                        The Edueme Team
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
