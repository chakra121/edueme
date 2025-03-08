"use server";

import prisma from "@/lib/globalPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getClassLink = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { error: "Not Signed In or Email not found" };
  }

  try {
    // Find the user and get their classLinkId
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { classLinkId: true },
    });

    if (!user?.classLinkId) {
      return { error: "No class details available" };
    }

    // Fetch the class link using classLinkId
    const classLink = await prisma.classLink.findUnique({
      where: { id: user.classLinkId },
      select: {
        id: true,
        classLink: true,
        topics: true,
        description: true,
        DateAndTime: true,
        updatedAt: true,
      },
    });

    if (!classLink) {
      return { error: "Class details not found" };
    }

    return { classLink };
  } catch (error) {
    console.error("Error fetching class details:", error);
    return { error: "An error occurred while fetching class details" };
  }
};
