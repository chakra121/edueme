import prisma from "@/lib/globalPrisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.upcomingEvent.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}