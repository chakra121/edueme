import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { generateSlug } from "@/lib/event-utils";

// GET all events
export async function GET() {
  try {
    const events = await prisma.upcomingEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}