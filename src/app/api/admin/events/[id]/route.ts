// app/api/events/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

// GET a specific event
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.upcomingEvent.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
  }
}
