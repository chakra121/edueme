import { Prisma } from "@prisma/client";
import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const {
      teacherName,
      phoneNumber,
      email,
      password,
      employeeID,
      courseID,
      userRole,
    } = await req.json();

    if (
      !teacherName ||
      !phoneNumber ||
      !email ||
      !password ||
      !employeeID ||
      !courseID ||
      !userRole
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();

    const user = await prisma.teacher.create({
      data: {
        teacherName,
        phoneNumber,
        email,
        hashedPassword,
        employeeID,
        courseID,
        userRole,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error("Error registering teacher:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Email already exists", success: false },
          { status: 409 },
        );
      }
    }

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
