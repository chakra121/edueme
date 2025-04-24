import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { generateSlug } from "@/lib/event-utils";

export async function POST(request: Request) {
  try {
    interface EventData {
      title: string;
      regEndDate:Date;
      regFee: string;
      [key: string]: unknown; // Allow additional properties
    }

    const data = await request.json() as EventData;

    if (typeof data.title !== "string") {
      throw new Error("Invalid data: 'title' must be a string");
    }

    // Generate slug from title
    const slug = generateSlug(data.title);

    // Parse regEndDate if it exists
    const regEndDate = data.regEndDate ? new Date(data.regEndDate) : null;

    // Create event with slug
    const event = await prisma.upcomingEvent.create({
      data: {
        ...data,
        slug,
        regEndDate,
        description: typeof data.description === "string" ? data.description : "Default description", // Provide default or required values
        eventVenue: typeof data.eventVenue === "string" ? data.eventVenue : "Default venue",
        eventdate: typeof data.eventdate === "string" ? data.eventdate : new Date().toISOString(), // Ensure a valid date is provided
        contactUs: typeof data.contactUs === "string" ? data.contactUs : "Default contact info",
        category: typeof data.category === "string" ? data.category : "Default category", // Add default category
        regFee: typeof data.regFee === "string" ? data.regFee : "0", // Add default registration fee
        registrationLink: typeof data.registrationLink === "string" ? data.registrationLink : "https://default.link", // Add default registration link
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}