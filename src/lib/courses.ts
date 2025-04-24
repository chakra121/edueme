// lib/courses.ts
import prisma from "./globalPrisma";

export async function getCourses() {
  try {
    const courses = await prisma.courses.findMany({
      include: {
        chapters: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export async function getCourseByCode(courseCode: string) {
  try {
    const course = await prisma.courses.findUnique({
      where: {
        courseCode,
      },
      include: {
        chapters: true,
        teacher: true,
      },
    });
    return course;
  } catch (error) {
    console.error(`Failed to fetch course with code ${courseCode}:`, error);
    return null;
  }
}

export async function getUserCourses(id: string) {
  try {
    const userCourse = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          include: {
            chapters: true,
            teacher: true,
          },
        },
      },
    });
    return userCourse;
  } catch (error) {
    console.error(`Failed to fetch course with code ${id}:`, error);
    return null;
  }
}

export async function checkUserHasCourse(userId: string, courseId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        course: true,
      },
    });

    if (!user) return false;

    return Array.isArray(user.course) && user.course.some((course: { id: string }) => course.id === courseId);
  } catch (error) {
    console.error("Failed to check user course access:", error);
    return false;
  }
}