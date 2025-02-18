import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    const teachers = await prisma.teacher.findMany({
      select: {
        teacherName: true,
        phoneNumber: true,
        email: true,
        employeeID: true,
        courseID: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ teachers, total: teachers.length });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching teachers:", error);

    // Return an error response
    return NextResponse.json(
      {
        message: "Error fetching teachers",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
