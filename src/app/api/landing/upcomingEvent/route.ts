// app/api/events/upcoming/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await prisma.upcomingEvent.findMany({
      where: { published: true },
      select: {
        title: true,
        eventVenue: true,
        eventdate: true,
        regEndDate: true, 
        category: true,
      },
    });

    // Sort the string `eventdate` values as real dates
    const sorted = events.sort((a, b) => {
      return new Date(a.eventdate).getTime() - new Date(b.eventdate).getTime();
    });

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
