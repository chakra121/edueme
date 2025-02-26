import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";


export async function GET(req: Request) {
  try {
    const courses = await prisma.courses.findMany({
      include: {
        chapters: {
          select: {
            id: true,
            chapterName: true,
            isCompleted: true,
            classes: { select: { id: true } }, // Only get class IDs
          },
        },
      },
    });

    // Ensure `isCompleted` is always boolean (convert null → false)
    const formattedCourses = courses.map((course) => ({
      ...course,
      chapters: course.chapters.map((chapter) => ({
        ...chapter,
        isCompleted: chapter.isCompleted ?? false, // Ensure boolean
      })),
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
