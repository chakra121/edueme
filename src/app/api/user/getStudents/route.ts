import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure you have a Prisma client in `lib/prisma.ts`

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where:{
        courseID: { not: null }
      },
      include: {
        course: true
      },
    });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
