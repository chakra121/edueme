import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
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
      <div className="card border-4 border-yellow-700 bg-linear-to-r from-yellow-50 to-yellow-100 shadow-lg">
        <div className="card-body flex flex-col items-center justify-center space-y-4">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
          <h2 className="text-2xl font-semibold text-yellow-700">
            No Courses Found
          </h2>
          <p className="text-center text-lg text-yellow-600">
            You haven&apos;t enrolled in any course yet. Explore our offerings and
            begin your learning journey today!
          </p>
          <a href="/courses" className="btn btn-secondary mt-2">
            Browse Courses
          </a>
        </div>
      </div>
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
