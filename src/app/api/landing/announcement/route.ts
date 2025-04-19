import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function GET() {
  try {
    const announcement = await prisma.adminAnnouncement.findFirst({
      where: {
        role: "common",
      },
      select: {
        title: true,
        description: true,
      },
    });

    return NextResponse.json(announcement || {});
  } catch (error) {
    console.error("Failed to fetch announcements", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
