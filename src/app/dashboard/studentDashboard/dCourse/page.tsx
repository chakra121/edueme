import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
import CourseCard from "../components/CourseCard";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <p className="text-center text-xl text-error">
        Please log in to view your courses.
      </p>
    );
  }

  // Fetch user with course details
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { course: { include: { chapters: true } } }, // Fix: Include chapters properly
  });

  if (!user || !user.course) {
    return (
      <p className="text-center text-xl text-warning">
        You haven't purchased any course.
      </p>
    );
  }

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title text-3xl font-bold text-base-content">
          Your Enrolled Courses
        </h1>
        <div className="mt-4 w-[50%] space-y-4">
          <CourseCard
            courseId={user.course.id}
            courseCode={user.course.courseCode}
            courseName={user.course.courseName}
            chapterCount={user.course.chapters.length} // Fix: Use correct relation
          />
        </div>
      </div>
    </div>
  );
}
