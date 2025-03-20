import { Prisma } from "@prisma/client";
import { connectToDatabase } from "@/lib/connectDB";
import prisma from "@/lib/globalPrisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { teacherName, phoneNumber, email, password, employeeID, userRole, courseID } =
      await req.json();

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

    // Create Teacher
    const teacher = await prisma.teacher.create({
      data: {
        teacherName,
        phoneNumber,
        email,
        hashedPassword,
        employeeID,
        userRole,
        courseID
      },
    });

    // Create ClassLink with a Dummy `courseID` for compatibility
    const classLinkData = {
      classLink: "",
      topics: [],
      description: "",
      teacherID: teacher.id,
      courseID: teacher.courseID || "", 
      DateAndTime: new Date().toISOString(),
    };

    await prisma.classLink.create({ data: classLinkData });

    return NextResponse.json({ teacher }, { status: 201 });
  } catch (error: any) {
    console.error("Error registering teacher:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(error);
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
