// app/api/payments/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      courseId,
      userId,
    } = await request.json();

    // Verify the user ID matches the session user
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    // Check if the user already has a completed payment
    const existingCompletedPayment = await prisma.payment.findFirst({
      where: {
        userId: userId,
        status: "completed",
      },
    });

    if (existingCompletedPayment) {
      return NextResponse.json(
        { error: "You have already purchased a course" },
        { status: 403 },
      );
    }

    // Update payment status in database
    await prisma.payment.update({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "completed",
      },
    });

    // Update the User model directly to set the courseID field
    // This maintains the one-student-one-course relationship
    await prisma.user.update({
      where: { id: userId },
      data: {
        courseID: courseId,
      },
    });

    // Also keep the many-to-many relationship for compatibility with existing code
    await prisma.courses.update({
      where: { id: courseId },
      data: {
        students: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
