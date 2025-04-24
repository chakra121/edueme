import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure this path is correct

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.courses.findMany({
      select: {
        id: true,
        courseCode: true,
        courseName: true,
        courseFee: true,
        courseDescription: true,
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
      id: course.id,
      courseCode: course.courseCode,
      courseName: course.courseName,
      courseFee: course.courseFee,
      courseDescription: course.courseDescription || "NaN",
      teacher: course.teacher ? course.teacher.teacherName : "NaN",
      chapters: course._count?.chapters ?? "NaN",
    }));

    // Create response object
    const response = NextResponse.json(formattedCourses);

    // Set cache-control headers to prevent caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
