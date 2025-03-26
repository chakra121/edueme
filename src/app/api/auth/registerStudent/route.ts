import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

// ✅ Define expected request body type
interface RegisterStudentData {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  schoolName: string;
  phoneNumber: string;
  email: string;
  parentEmail: string;
  password: string;
  userRole: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // ✅ Step 1: Parse and type request body
    const requestBody: RegisterStudentData = await req.json();

    const {
      firstName,
      lastName,
      gender,
      grade,
      schoolName,
      phoneNumber,
      email,
      parentEmail,
      password,
      userRole,
    } = requestBody;

    // ✅ Step 2: Validate input fields
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !grade ||
      !schoolName ||
      !phoneNumber ||
      !parentEmail ||
      !userRole ||
      !email ||
      !password
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // ✅ Step 3: Hash the password securely
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // ✅ Step 4: Store student data in the database
    await prisma.$connect();
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        gender,
        grade,
        schoolName,
        phoneNumber,
        email,
        parentEmail,
        userRole,
        hashedPassword: hashedPassword, // ✅ Make sure your Prisma schema expects `password`, not `hashedPassword`
      },
    });

    return NextResponse.json(
      { message: "Registration saved successfully", success: true },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error registering:", error);

    // ✅ Step 5: Handle Prisma unique constraint errors properly
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Email already exists", success: false },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to save registration", success: false },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
};
