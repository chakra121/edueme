import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure you have a Prisma client in `lib/prisma.ts`

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where:{
        courseID: { not: null }
      },
      include: {
        course: true
      },
    });

    const studentsWithCourse = students.map(student => {
      if (!student.course) {
        student.course = null;
      }
      return student;
    });

    return NextResponse.json(studentsWithCourse, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
