import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function PUT(req: NextRequest) {
  try {
    interface UpdateClassLinkPayload {
      classLinkId: string;
      newClassLink: string;
      newTopics?: string[];
      newInstructions: string;
      newDateAndTime?: string;
    }

    const {
      classLinkId,
      newClassLink,
      newTopics,
      newInstructions,
      newDateAndTime,
    } = await req.json() as UpdateClassLinkPayload;

    if (!classLinkId || !newClassLink || !newInstructions || !newTopics) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const updatedClassLink = await prisma.classLink.update({
      where: { id: classLinkId },
      data: {
        classLink: newClassLink,
        topics: newTopics || [], // Ensure topics are updated if provided
        description: newInstructions, // Update instructions
        DateAndTime: newDateAndTime ? new Date(newDateAndTime) : undefined, // Update scheduled date and time
      },
    });

    return NextResponse.json(updatedClassLink);
  } catch (error) {
    console.error("Error updating class link:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
