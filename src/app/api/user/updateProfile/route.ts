import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";// Adjust if needed
import prisma from "@/lib/globalPrisma"; // Ensure Prisma is correctly set up

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    type UserProfile = {
      firstName: string;
      lastName: string;
      gender?: string;
      grade?: string;
      schoolName?: string;
      phoneNumber: string;
      parentEmail: string;
    };

    const {
      firstName,
      lastName,
      gender,
      grade,
      schoolName,
      phoneNumber,
      parentEmail,
    } = (await req.json()) as UserProfile;

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !parentEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate phone number format (basic check for numbers only)
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 },
      );
    }

    // Validate parent email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(parentEmail)) {
      return NextResponse.json(
        { error: "Invalid parent email" },
        { status: 400 },
      );
    }

    // Update user profile in MongoDB using Prisma
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName,
        lastName,
        gender,
        grade,
        schoolName,
        phoneNumber,
        parentEmail,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
