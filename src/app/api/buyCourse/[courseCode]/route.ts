// app/api/courses/[courseCode]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseCode: string } },
) {
  try {
    const { courseCode } = params;

    if (!courseCode) {
      return NextResponse.json(
        { error: "Course code is required" },
        { status: 400 },
      );
    }

    const course = await prisma.courses.findUnique({
      where: {
        courseCode,
      },
      include: {
        chapters: true,
        teacher: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if the user has purchased the course
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    let hasAccess = false;

    if (userId) {
      const userCourse = await prisma.courses.findFirst({
        where: {
          id: course.id,
          students: {
            some: {
              id: userId,
            },
          },
        },
      });

      hasAccess = !!userCourse;
    }

    // Format response
    const formattedCourse = {
      id: course.id,
      courseCode: course.courseCode,
      courseName: course.courseName,
      courseFee: course.courseFee,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      teacher: course.teacher
        ? {
            id: course.teacher.id,
            name: course.teacher.teacherName,
            email: course.teacher.email,
          }
        : null,
      chapters: hasAccess
        ? course.chapters
        : course.chapters.map((chapter) => ({
            id: chapter.id,
            title: chapter.chapterName,
            // Only return preview data if the user hasn't purchased the course
            description: chapter.chapterDescription || null,
          })),
      studentsCount: course._count.students,
      hasAccess,
    };

    return NextResponse.json(formattedCourse);
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}
