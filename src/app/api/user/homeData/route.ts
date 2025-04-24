// app/api/studentHome/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/globalPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET route handler
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        course: {
          select: {
            id: true,
            courseName: true,
          },
        },
        classLink: {
          select: {
            updatedAt: true,
          },
        }
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const latestAnnouncement = await prisma.adminAnnouncement.findFirst({
      where: { role: "student" },
    });

    let chapterCount = 0;

    if (user.course?.id) {
      chapterCount = await prisma.chapter.count({
        where: { courseID: user.course.id }, // Assuming courseID is the correct field in `Chapter`
      });
    }

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        teacherID: user.teacherID ?? null,
        classLinkUpdatedAt: user.classLink?.updatedAt ?? null,
        course: user.course? 
        {
          courseName: user.course.courseName,
          chapterCount,
        } : null,
      },
      latestAnnouncement,
    });
  } catch (error) {
    console.error("Error in fetching your data:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
