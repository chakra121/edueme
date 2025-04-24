// app/api/courses/[courseId]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const courseId = params.courseId;

    const course = await prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error getting course:", error);
    return NextResponse.json(
      { error: "Failed to get course" },
      { status: 500 },
    );
  }
}
