import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { chapterCode: string } },
) {
  try {
    const { chapterCode } = params; // Properly extract chapterCode

    // Fetch chapter ID using chapterCode
    const chapter = await prisma.chapter.findUnique({
      where: { chapterCode },
      select: { id: true },
    });

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Fetch classes belonging to the chapter
    const classes = await prisma.class.findMany({
      where: { chapterID: chapter.id },
      select: {
        id: true,
        classTitle: true,
        youTubeLink: true,
      },
    });

    if (!classes.length) {
      return NextResponse.json({ error: "No classes found" }, { status: 404 });
    }

    return NextResponse.json({ classes, totalClasses: classes.length });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
