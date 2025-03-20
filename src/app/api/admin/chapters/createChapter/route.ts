import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function POST(req: Request) {
  try {
    const {
      chapterCode,
      chapterName,
      chapterDescription,
      courseID,
      notesLink,
    } = await req.json();

    if (!chapterCode || !chapterName || !chapterDescription || !courseID || !notesLink) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    const newChapter = await prisma.chapter.create({
      data: {
        chapterCode,
        chapterName,
        chapterDescription,
        courseID,
        notesLink,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chapter created successfully!",
        data: newChapter,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating chapter." },
      { status: 500 },
    );
  }
}
