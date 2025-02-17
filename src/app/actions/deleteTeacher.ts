"use server";

import prisma from "@/lib/globalPrisma";

export async function deleteTeacher(email: string) {
  try {
    await prisma.$connect();

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
