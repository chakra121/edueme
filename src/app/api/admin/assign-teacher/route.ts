import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure correct import path

// ✅ Define request body type
interface AssignTeacherRequest {
  studentId: string;
  teacherId: string;
}

export async function POST(req: NextRequest) {
  try {
    // ✅ Parse request body with explicit type
    const body = (await req.json()) as AssignTeacherRequest;
    const { studentId, teacherId } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 },
      );
    }

    // ✅ Step 1: Update teacherID in the User model
    await prisma.user.update({
      where: { id: studentId },
      data: { teacherID: teacherId === "none" ? null : teacherId },
    });

    // ✅ Step 2: Handle `classLinkId` logic
    if (teacherId === "none") {
      // 🔹 Remove `classLinkId` when the teacher is removed
      await prisma.user.update({
        where: { id: studentId },
        data: { classLinkId: null },
      });
    } else {
      // 🔹 Find the corresponding `classLinkId` for the new teacher
      const classLink = await prisma.classLink.findFirst({
        where: { teacherID: teacherId },
      });

      // 🔹 Update `classLinkId` safely
      await prisma.user.update({
        where: { id: studentId },
        data: { classLinkId: classLink?.id ?? null }, // ✅ Safely set classLinkId
      });
    }

    return NextResponse.json({
      message: "Teacher assignment updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating teacher assignment:", error);
    return NextResponse.json(
      { error: "Failed to update teacher assignment" },
      { status: 500 },
    );
  }
}
