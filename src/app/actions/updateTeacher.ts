"use server";

import prisma from "@/lib/globalPrisma";

export async function updateTeacher(
  email: string,
  updates: { teacherName?: string; phoneNumber?: string; employeeID?: string },
) {
  try {
    await prisma.$connect();

    const updatedTeacher = await prisma.teacher.update({
      where: { email },
      data: updates,
    });

    return {
      success: true,
      message: "Teacher updated successfully",
      updatedTeacher,
    };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { success: false, message: "Error updating teacher" };
  } finally {
    await prisma.$disconnect();
  }
}
