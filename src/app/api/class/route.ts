import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { revalidatePath } from "next/cache";

// ✅ Define the expected request body type
interface ClassRequest {
  chapterId: string;
  classTitle: string;
  classLink: string;
}

export async function POST(req: Request) {
  try {
    const { chapterId, classTitle, classLink } = await req.json() as ClassRequest;

    if (!chapterId || !classTitle || !classLink) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // ✅ Create new class with explicit typing
    const newClass = await prisma.class.create({
      data: {
        classTitle,
        youTubeLink: classLink,
        chapter: { connect: { id: chapterId } },
      },
    });

    // ✅ Connect the class to the chapter correctly
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { classes: { connect: { id: newClass.id } } }, // Removed extra fields
    });

    revalidatePath("/dashboard/teacherDashboard/dCourseCatalog");

    return NextResponse.json({
      success: true,
      classId: newClass.id,
      classTitle: newClass.classTitle,
      youtubeLink: newClass.youTubeLink,
    });
  } catch (error: unknown) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
