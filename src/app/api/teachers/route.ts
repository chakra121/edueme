import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    const teachers = await prisma.teacher.findMany({
      select: {
        teacherName: true,
        phoneNumber: true,
        email: true,
        employeeID: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ teachers, total: teachers.length });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching teachers" },
      { status: 500 },
    );
  } finally{
    await prisma.$disconnect();
  }
}
