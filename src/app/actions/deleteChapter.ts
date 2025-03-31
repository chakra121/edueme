"use server";
import prisma from "@/lib/globalPrisma";

// Delete Chapter
export const deleteChapter = async (id: string) => {
  try {
    await prisma.chapter.delete({ where: { id } });
    return { success: true, message: "Chapter deleted successfully!" };
  } catch {
    return { success: false, message: "Failed to delete chapter." };
  }
};