// app/api/courses/check-purchasable/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user role
    if (session.user.role !== "student") {
      return NextResponse.json(
        { error: "Only students can purchase courses" },
        { status: 403 },
      );
    }

    const userId = session.user.id;

    // Check if the user already has a purchased course
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: userId,
        status: "completed",
      },
    });

    // If user already has a completed payment, they can't purchase another course
    return NextResponse.json({
      canPurchase: !existingPayment,
      existingCourse: existingPayment
        ? {
            courseId: existingPayment.courseId,
          }
        : null,
    });
  } catch (error) {
    console.error("Error checking course access:", error);
    return NextResponse.json(
      { error: "Failed to check course access" },
      { status: 500 },
    );
  }
}
