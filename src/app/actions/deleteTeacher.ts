"use server";

import prisma from "@/lib/globalPrisma";

export async function deleteTeacher(email: string) {
  try {
    await prisma.$connect();

    // Step 1: Find the teacher's ID using their email
    const teacher = await prisma.teacher.findUnique({
      where: { email },
      select: { id: true }, // Only fetch the ID for efficiency
    });

    if (!teacher) {
      return { success: false, message: "Teacher not found" };
    }

    // Step 2: Delete the ClassLink associated with the teacher
    await prisma.classLink.delete({
      where: { teacherID: teacher.id },
    });

    // Step 3: Delete the Teacher
    const deletedTeacher = await prisma.teacher.delete({
      where: { email },
    });

    return {
      success: true,
      message: "Teacher deleted successfully",
      deletedTeacher,
    };
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return { success: false, message: "Error deleting teacher" };
  } finally {
    await prisma.$disconnect();
  }
}
