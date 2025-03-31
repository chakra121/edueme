import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teacherID = session.user.id;

    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherID },
      include: { classLink: true }, // Fetch only class links
    });

    if (!teacher || !teacher.classLink) {
      return NextResponse.json(
        { message: "No class links found" },
        { status: 404 },
      );
    }

    return NextResponse.json(teacher.classLink);
  } catch (error) {
    console.error("Error fetching class links:", error); // 🔍 Look at this log
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
