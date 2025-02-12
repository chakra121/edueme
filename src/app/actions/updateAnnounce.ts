"use server";
import prisma from "@/lib/globalPrisma";
import { revalidatePath } from "next/cache";

// Function to update announcements with role "common"
export async function updateCommonAnnouncement(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.$connect(); 

    await prisma.adminAnnouncement.updateMany({
      where: {
        id: id,
        role: "common",
      },
      data: {
        title: title,
        description: description,
        date: new Date(),
      },
    });

    console.log(`Common announcement (ID: ${id}) updated successfully.`);
  } catch (error) {
    console.error("Error updating common announcement:", error);
  } finally {
    await prisma.$disconnect(); 
    revalidatePath("./dashboard/adminDashboard/dAnnounce");
  }
}

// Function to update announcements with role "student"
export async function updateStudentAnnouncement(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.$connect(); 

    await prisma.adminAnnouncement.updateMany({
      where: {
        id: id,
        role: "student",
      },
      data: {
        title: title,
        description: description,
        date: new Date(),
      },
    });

    console.log(`Student announcement (ID: ${id}) updated successfully.`);
  } catch (error) {
    console.error("Error updating student announcement:", error);
  } finally {
    await prisma.$disconnect(); 
    revalidatePath("./dashboard/adminDashboard/dAnnounce");
  }
}
