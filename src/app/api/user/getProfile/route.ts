import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.$connect();
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        firstName: true,
        lastName: true,
        gender: true,
        grade: true,
        schoolName: true,
        phoneNumber: true,
        email: true,
        parentEmail: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }finally{
    await prisma.$disconnect();
  }
}

interface UserProfileUpdate {
  firstName?: string;
  lastName?: string;
  gender?: string;
  grade?: string;
  schoolName?: string;
  phoneNumber?: string;
  parentEmail?: string;
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await req.json()) as UserProfileUpdate;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
