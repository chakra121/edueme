import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure this path is correct

export async function GET() {
  try {
    const courses = await prisma.courses.findMany({
      select: {
        id: true,
        courseCode: true,
        courseName: true,
        teacher: {
          select: { teacherName: true }, // Fetch teacher name if available
        },
        _count: {
          select: { chapters: true }, // Fetch chapter count
        },
      },
    });

    // Handle missing data (if no teacher or chapters exist, return NaN)
    const formattedCourses = courses.map((course) => ({
      id : course.id,
      courseCode: course.courseCode,
      courseName: course.courseName,
      teacher: course.teacher ? course.teacher.teacherName : "NaN",
      chapters: course._count?.chapters ?? "NaN",
    }));

    return NextResponse.json(formattedCourses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
