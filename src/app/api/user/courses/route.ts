// app/api/user/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserCourses } from "@/lib/courses";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courses = await getUserCourses(session.user.id);

    if (!courses || !Array.isArray(courses)) {
      return NextResponse.json({ error: "No courses found" }, { status: 404 });
    }

    // Format the response
    const formattedCourses = courses.map((course: {
      id: string;
      courseCode: string;
      courseName: string;
      courseFee: number;
      createdAt: Date;
      updatedAt: Date;
      teacher?: { name: string | null };
      chapters: { id: string }[];
    }) => ({
      id: course.id,
      courseCode: course.courseCode,
      courseName: course.courseName,
      courseFee: course.courseFee,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      teacherName: course.teacher?.name || null,
      chaptersCount: course.chapters.length,
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Failed to fetch user courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch user courses" },
      { status: 500 },
    );
  }
}
