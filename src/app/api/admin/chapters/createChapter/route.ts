import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma"; // Ensure correct import path

// ✅ Define request body type
interface ChapterRequest {
  chapterCode: string;
  chapterName: string;
  chapterDescription: string;
  courseID: string;
  notesLink: string;
}

export async function POST(req: NextRequest) {
  try {
    // ✅ Parse request body with explicit type
    const body = (await req.json()) as ChapterRequest;
    const {
      chapterCode,
      chapterName,
      chapterDescription,
      courseID,
      notesLink,
    } = body;

    // ✅ Validate required fields
    if (
      !chapterCode ||
      !chapterName ||
      !chapterDescription ||
      !courseID ||
      !notesLink
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }
await prisma.$connect(); // ✅ Ensure Prisma connection is established
    // ✅ Create a new chapter
    const newChapter = await prisma.chapter.create({
      data: {
        chapterCode,
        chapterName,
        chapterDescription,
        courseID,
        notesLink,
      },
    });

    // ✅ Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Chapter created successfully!",
        data: newChapter,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Error creating chapter:", error); // ✅ Log error properly

    return NextResponse.json(
      {
        success: false,
        message: "Error creating chapter.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect(); // ✅ Ensure Prisma connection is closed
  }
}
