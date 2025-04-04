import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const chapters = await prisma.chapter.findMany({
      select: {
        id: true,
        chapterCode: true,
        chapterName: true,
        chapterDescription: true,
        notesLink: true,
        isCompleted:true,
        courseID: true,
        course: {
          select: { courseName: true },
        },
      _count: {
          select: { classes: true }, // Fetch chapter count
        },
      },
    });

    return NextResponse.json(
      chapters.map((chapter) => ({
        ...chapter,
        courseName: chapter.course.courseName,
      })),
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch chapters" },
      { status: 500 },
    );
  }
}
