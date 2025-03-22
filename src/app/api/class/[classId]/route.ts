// api/class/[classId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  try {
    const { classTitle, youTubeLink } = await req.json();

    const updatedClass = await prisma.class.update({
      where: { id: params.classId },
      data: { classTitle, youTubeLink },
    });

    return NextResponse.json(updatedClass);
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting class" },
      { status: 500 },
    );
  }
}
