import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseCode: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseCode } = params;
    if (!courseCode) {
      return NextResponse.json(
        { error: "Course code missing" },
        { status: 400 },
      );
    }

    // Find the course by courseCode
    const course = await prisma.courses.findUnique({
      where: { courseCode },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Ensure the user is enrolled in this course
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { courseID: true },
    });

    if (user?.courseID !== course.id) {
      return NextResponse.json(
        { error: "You are not enrolled in this course" },
        { status: 403 },
      );
    }

    // Fetch chapters linked to the course
    const chapters = await prisma.chapter.findMany({
      where: { courseID: course.id },
      select: {
        id: true,
        chapterName: true,
        chapterDescription: true,
        chapterCode: true,
      },
    });

    if (!chapters.length) {
      return NextResponse.json({ error: "No chapters found" }, { status: 404 });
    }

    return NextResponse.json({ chapters, totalChapters: chapters.length });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
