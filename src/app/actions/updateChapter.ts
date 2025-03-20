"use server";
import prisma from "@/lib/globalPrisma"; 

export const updateChapter = async (data: {
  id: string;
  chapterCode: string;
  chapterName: string;
  chapterDescription: string;
  notesLink?: string;
}) => {
  try {
    await prisma.chapter.update({
      where: { id: data.id },
      data: {
        chapterCode: data.chapterCode,
        chapterName: data.chapterName,
        chapterDescription: data.chapterDescription,
        notesLink: data.notesLink || null,
      },
    });
    return { success: true, message: "Chapter updated successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to update chapter." };
  }
};
