"use server";
import prisma from "@/lib/globalPrisma";

export async function deleteCourse(courseId: string | undefined) {

  if (!courseId) {
    console.error("deleteCourse Error: courseID is undefined!");
    return { success: false, message: "Invalid course ID" };
  }

  try {
    await prisma.courses.delete({
      where: { id: courseId },
    });

    return {
      success: true,
      message: "Course and all related data deleted successfully!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to delete course" };
  }
}
