import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    // If slug is provided, return a specific event
    if (slug) {
      const event = await prisma.upcomingEvent.findUnique({
        where: { slug, published: true },
      });

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      return NextResponse.json(event);
    }

    // Otherwise return all published events
    const events = await prisma.upcomingEvent.findMany({
      where: { published: true },
      orderBy: { eventdate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
