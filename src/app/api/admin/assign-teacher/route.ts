import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure correct import path

export async function POST(req: NextRequest) {
  try {
    const { studentId, teacherId } = await req.json();

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 },
      );
    }

    // ✅ Step 1: Connect to the database
    await prisma.$connect();

    // ✅ Step 2: Update teacherID in the User model
    await prisma.user.update({
      where: { id: studentId },
      data: { teacherID: teacherId === "none" ? null : teacherId },
    });

    // ✅ Step 3: Handle `classLinkId` logic
    if (teacherId === "none") {
      // 🔹 Remove the classLinkId if teacher is removed
      await prisma.user.update({
        where: { id: studentId },
        data: { classLinkId: null },
      });
    } else {
      // 🔹 Find corresponding `classLinkId` for the new teacher
      const classLink = await prisma.classLink.findFirst({
        where: { teacherID: teacherId },
      });

      // 🔹 Update `classLinkId` in the User model
      await prisma.user.update({
        where: { id: studentId },
        data: { classLinkId: classLink?.id || null }, // Null if no ClassLink exists
      });
    }

    return NextResponse.json({
      message: "Teacher assignment updated successfully",
    });
  } catch (error) {
    console.error("Error updating teacher assignment:", error);
    return NextResponse.json(
      { error: "Failed to update teacher assignment" },
      { status: 500 },
    );
  } finally {
    // ✅ Step 4: Disconnect from Prisma
    await prisma.$disconnect();
  }
}
