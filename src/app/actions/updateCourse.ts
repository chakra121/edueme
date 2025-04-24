"use server";

import prisma from "@/lib/globalPrisma";

export async function updateCourse(
  id: string,
  updates: { courseCode?: string; courseName?: string; courseFee?: number; courseDescription?: string; },
) {
  try {
    await prisma.$connect();

    const updatedCourse = await prisma.courses.update({
      where: { id },
      data: updates,
    });

    return {
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, message: "Error updating course" };
  } finally {
    await prisma.$disconnect();
  }
}
