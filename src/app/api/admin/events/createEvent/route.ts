import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { generateSlug } from "@/lib/event-utils";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate slug from title
    const slug = generateSlug(data.title);

    // Parse regEndDate if it exists
    let regEndDate = data.regEndDate ? new Date(data.regEndDate) : null;

    // Create event with slug
    const event = await prisma.upcomingEvent.create({
      data: {
        ...data,
        slug,
        regEndDate,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}