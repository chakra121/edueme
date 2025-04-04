import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/globalPrisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacher = await prisma.teacher.findUnique({
    where: { email: session.user.email },
    include: {
      course: {
        include: { chapters: { include: { classes: true } } },
      },
    },
  });

  if (!teacher?.course) {
    return NextResponse.json({ course: null });
  }

  return NextResponse.json({
    course: {
      id: teacher.course.id,
      courseName: teacher.course.courseName,
      courseCode: teacher.course.courseCode,
      chapters: teacher.course.chapters.map((chapter) => ({
        id: chapter.id,
        chapterName: chapter.chapterName,
        isCompleted: chapter.isCompleted ?? false,
        classes: chapter.classes.map((cls) => ({
          id: cls.id,
          classTitle:cls.classTitle,
          youTubeLink:cls.youTubeLink,
        })),
      })),
    },
  });
}
