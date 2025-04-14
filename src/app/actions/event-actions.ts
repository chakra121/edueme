"use server";

import prisma from "@/lib/globalPrisma";
import { generateSlug } from "@/lib/event-utils";
import { revalidatePath } from "next/cache";

// Update event server action
export async function updateEvent(eventData) {
  try {
    const { id, ...data } = eventData;

    // Generate new slug if title changed
    if (data.title) {
      data.slug = generateSlug(data.title);
    }

    // Convert regEndDate to Date object if provided
    if (data.regEndDate) {
      data.regEndDate = new Date(data.regEndDate);
    }

    const updatedEvent = await prisma.upcomingEvent.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/dashboard/events");

    return { success: true, data: updatedEvent };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

// Delete event server action
export async function deleteEvent(id: string) {
  try {
    await prisma.upcomingEvent.delete({
      where: { id },
    });

    revalidatePath("/admin/dashboard/events");

    return { success: true, message: "Event deleted successfully" };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}
