import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";


export async function GET(_req: Request) {
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
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
