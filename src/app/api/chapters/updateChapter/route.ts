import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  try {
    const { chapters } = await req.json();

    if (!chapters || !Array.isArray(chapters)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    // Bulk update chapters
    await Promise.all(
      chapters.map(({ id, isCompleted }) =>
        prisma.chapter.update({
          where: { id },
          data: { isCompleted },
        }),
      ),
    );
revalidatePath("/dashboard/teacherDashboard/dCourseCatalog");
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  } 
}
