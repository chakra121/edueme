import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    if (!session?.user || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch students belonging to this teacher
    const students = await prisma.user.findMany({
      where: {
        teacherID: session.user.id,
        courseID: { not: null },
      },
      select: {
        id: true,
        firstName: true,
        gender: true,
        grade: true,
        phoneNumber: true,
        email: true,
        schoolName: true,
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
