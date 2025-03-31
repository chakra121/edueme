import type { NextRequest } from "next/server"; // ✅ Import as type
import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

// ✅ Define expected request body type
interface ClassUpdateRequest {
  classTitle: string;
  youTubeLink: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  try {
    const body = await req.json() as ClassUpdateRequest; // Explicitly cast to expected type
    const { classTitle, youTubeLink } = body; // Destructure after type assertion

    const updatedClass = await prisma.class.update({
      where: { id: params.classId },
      data: { classTitle, youTubeLink },
    });

    return NextResponse.json(updatedClass);
  } catch (error: unknown) {
    console.error("Error updating class:", error); // ✅ Log the error
    return NextResponse.json(
      { error: "Error updating class" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  try {
    await prisma.class.delete({
      where: { id: params.classId },
    });

    return NextResponse.json({ message: "Class deleted" });
  } catch (error: unknown) {
    console.error("Error deleting class:", error); // ✅ Log the error
    return NextResponse.json(
      { error: "Error deleting class" },
      { status: 500 },
    );
  }
}
