import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseCode, courseName } = body;

    if (!courseCode || !courseName) {
      return NextResponse.json(
        { message: "Course code and name are required" },
        { status: 400 },
      );
    }

    const existingCourse = await prisma.courses.findUnique({
      where: { courseCode },
    });

    if (existingCourse) {
      return NextResponse.json(
        { message: "Course code already exists" },
        { status: 400 },
      );
    }

    const newCourse = await prisma.courses.create({
      data: { courseCode, courseName },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
