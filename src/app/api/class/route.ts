import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  try {
    const { chapterId, classTitle, classLink } = await req.json();

    if (!chapterId || !classTitle || !classLink) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newClass = await prisma.class.create({
      data: {
        classTitle,
        youTubeLink: classLink,
        chapter: { connect: { id: chapterId } },
      },
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: { classes: { connect: { id: newClass.id } } },
    });
    

    return NextResponse.json({ success: true, classId: newClass.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  } finally{
     revalidatePath("/dashboard/teacherDashboard/dCourseCatalog"); 
  }
}
