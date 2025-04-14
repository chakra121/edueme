// app/api/payments/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(request: NextRequest) {
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

    // Get request body
    const { courseId, courseName, amount, userId } = await request.json();

    // Verify the user ID matches the session user
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }

    // Create a receipt ID
    const receiptId = `rcpt_${Date.now()}_${userId.substring(0, 5)}`;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: receiptId,
      notes: {
        courseId,
        courseName,
        userId,
      },
    });

    // Store order in database (optional but recommended for tracking)
    await prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount: amount,
        status: "created",
        receiptId,
        userId: userId,
        courseId: courseId,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amount,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
