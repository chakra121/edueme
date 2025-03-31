import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

// Define expected request body type
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
    // Parse and type request body
    const requestBody = (await req.json()) as RegisterTeacherData;

    const {
      teacherName,
      phoneNumber,
      email,
      password,
      employeeID,
      userRole,
      courseID,
    } = requestBody;

    // Validate input fields
    if (
      !teacherName ||
      !phoneNumber ||
      !email ||
      !password ||
      !employeeID ||
      !courseID ||
      !userRole
    ) {
      return NextResponse.json(
        {
          message: "Invalid Data",
          success: false,
        },
        { status: 422 },
      );
    }

    // Hash the password securely
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await prisma.$connect();

    // Check if email already exists
    const existingTeacherWithEmail = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existingTeacherWithEmail) {
      return NextResponse.json(
        {
          message: "Email already exists",
          success: false,
        },
        { status: 409 },
      );
    }

    // Check if courseID is already assigned to another teacher
    if (courseID) {
      const existingTeacherWithCourse = await prisma.teacher.findFirst({
        where: { courseID },
      });

      if (existingTeacherWithCourse) {
        return NextResponse.json(
          {
            message: "This course is already assigned to another teacher",
            success: false,
          },
          { status: 409 },
        );
      }
    }

    // Create Teacher
    const teacher = await prisma.teacher.create({
      data: {
        teacherName,
        phoneNumber,
        email,
        hashedPassword,
        employeeID,
        userRole,
        courseID, // This is optional in your schema
        photoLink: "", // Optional, providing empty string as default
      },
    });

    // Create ClassLink
    await prisma.classLink.create({
      data: {
        classLink: "",
        topics: [],
        description: "",
        teacherID: teacher.id,
        courseID,
        DateAndTime: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      {
        teacher,
        success: true,
        message: "Teacher registered successfully",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error registering teacher:", error);

    // Handle Prisma unique constraint errors properly
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Check the target field that caused the unique constraint error
        const target = (error.meta?.target as string[]) || [];

        if (target.includes("email")) {
          return NextResponse.json(
            { message: "Email already exists", success: false },
            { status: 409 },
          );
        }

        if (target.includes("courseID")) {
          return NextResponse.json(
            {
              message: "This course is already assigned to another teacher",
              success: false,
            },
            { status: 409 },
          );
        }

        return NextResponse.json(
          { message: "Duplicate record exists", success: false },
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
