// app/api/courses/check-access/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { checkUserHasCourse } from "@/lib/courses";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ hasAccess: false }, { status: 401 });
    }

    const body = (await request.json()) as { courseId: string };
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    const hasAccess = await checkUserHasCourse(session.user.id, courseId);

    return NextResponse.json({ hasAccess });
  } catch (error) {
    console.error("Failed to check course access:", error);
    return NextResponse.json(
      { error: "Failed to check course access" },
      { status: 500 },
    );
  }
}
