import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { revalidatePath } from "next/cache";

// ✅ Define the expected request body type
interface ChapterUpdate {
  id: string;
  isCompleted: boolean;
}

export async function POST(req: Request) {
  try {
    const { chapters } = (await req.json()) as { chapters: ChapterUpdate[] };

    if (!chapters || !Array.isArray(chapters)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    // ✅ Bulk update chapters with explicit typing
    await Promise.all(
      chapters.map(({ id, isCompleted }: ChapterUpdate) =>
        prisma.chapter.update({
          where: { id },
          data: { isCompleted },
        }),
      ),
    );

    // ✅ Ensure correct cache revalidation
    revalidatePath("/dashboard/teacherDashboard/dCourseCatalog");

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error updating chapters:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
