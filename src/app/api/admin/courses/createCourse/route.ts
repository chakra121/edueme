import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function POST(req: NextRequest) {
  try {
    // ✅ Step 1: Parse and type request body
    const body = (await req.json()) as { courseCode: string; courseName: string, courseFee: number, courseDescription: string };
    const { courseCode, courseName, courseFee, courseDescription } = body;

    // ✅ Step 2: Validate input
    if (!courseCode || !courseName || !courseFee || !courseDescription) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // ✅ Step 3: Check if the course already exists
    const existingCourse = await prisma.courses.findUnique({
      where: { courseCode },
    });

    if (existingCourse) {
      return NextResponse.json(
        { message: "Course code already exists" },
        { status: 400 },
      );
    }

    // ✅ Step 4: Create a new course in the database
    const newCourse = await prisma.courses.create({
      data: {
        courseCode,
        courseName,
        courseFee,
        courseDescription,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error); // ✅ Log error properly

    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 },
    );
  }
}
