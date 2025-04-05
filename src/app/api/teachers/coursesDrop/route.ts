import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.courses.findMany({
      select: {
        id: true,
        courseName: true,
        courseCode: true,
      },
    });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses." },
      { status: 500 },
    );
  }
}
