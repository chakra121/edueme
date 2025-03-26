import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

// ✅ Define expected request body type
interface RegisterTeacherData {
  teacherName: string;
  phoneNumber: string;
  email: string;
  password: string;
  employeeID: string;
  userRole: string;
  courseID: string;
}

export const POST = async (req: NextRequest) => {
  try {
    // ✅ Step 1: Parse and type request body
    const requestBody: RegisterTeacherData = await req.json();

    const {
      teacherName,
      phoneNumber,
      email,
      password,
      employeeID,
      userRole,
      courseID,
    } = requestBody;

    // ✅ Step 2: Validate input fields
    if (
      !teacherName ||
      !phoneNumber ||
      !email ||
      !password ||
      !employeeID ||
      !courseID ||
      !userRole
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // ✅ Step 3: Hash the password securely
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // ✅ Step 4: Store teacher data in the database
    await prisma.$connect();

    // ✅ Create Teacher
    const teacher = await prisma.teacher.create({
      data: {
        teacherName,
        phoneNumber,
        email,
        hashedPassword: hashedPassword, // ✅ Ensure Prisma schema expects `password`, not `hashedPassword`
        employeeID,
        userRole,
        courseID,
      },
    });

    // ✅ Step 5: Create ClassLink with `??` for nullish handling
    await prisma.classLink.create({
      data: {
        classLink: "",
        topics: [],
        description: "",
        teacherID: teacher.id,
        courseID: teacher.courseID ?? "", // ✅ Prefer `??` over `||` for safer default values
        DateAndTime: new Date().toISOString(),
      },
    });

    return NextResponse.json({ teacher }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error registering teacher:", error);

    // ✅ Step 6: Handle Prisma unique constraint errors properly
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Email already exists", success: false },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
};
