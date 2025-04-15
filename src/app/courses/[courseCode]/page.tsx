// app/courses/[courseCode]/page.tsx
import { getCourseByCode } from "@/lib/courses";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import PurchaseCourseButton from "../components/PurchaseCourseButton";
import CourseDetails from "../components/CourseDetails";

export default async function CourseDetailPage({
  params,
}: {
  params: { courseCode: string };
}) {
  const { courseCode } = params;
  const course = await getCourseByCode(courseCode);

  if (!course) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  // Check if user is logged in
  const isLoggedIn = !!session?.user;

  // Check if user is a student
  const isStudent = session?.user?.role === "student";

  // Check if user has already purchased the course
  const hasAccessToCourse =
    isLoggedIn &&
    session.user.courseID === course.id;

  return (
    <div className="container mx-auto px-4 py-8 pt-[5%]">
      <CourseDetails course={course} />

      {!isLoggedIn && (
        <div role="alert" className="alert alret-soft alert-warning">
          <span>
            Please log in to purchase this course.
          </span>
        </div>
      )}

      {isLoggedIn && !isStudent && (
        <div className="mt-8 rounded-lg border-2 border-yellow-400 bg-yellow-100 p-4">
          <p className="text-lg font-semibold">
            Only students can purchase courses.
          </p>
        </div>
      )}

      {isLoggedIn && isStudent && hasAccessToCourse && (
        <div className="mt-8 rounded-lg border-2 border-green-400 bg-green-100 p-4">
          <p className="text-lg font-semibold">
            You already have access to this course.
          </p>
        </div>
      )}

      {isLoggedIn && isStudent && !hasAccessToCourse && (
        <PurchaseCourseButton course={course} userId={session.user.id} />
      )}
    </div>
  );
}
