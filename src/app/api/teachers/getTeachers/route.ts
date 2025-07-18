import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        course: true,
      },
    });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 },
    );
  }
}
