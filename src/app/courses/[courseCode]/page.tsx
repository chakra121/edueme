// app/courses/[courseCode]/page.tsx
import { getCourseByCode } from "@/lib/courses";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
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
    <div 
      className="min-h-screen px-4 py-8 pt-[5%]"
      style={{
        backgroundImage: 'url(/coursebg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto">
        <CourseDetails 
          course={{
            ...course,
            chapters: course.chapters?.map(chapter => ({
              id: chapter.id,
              title: chapter.chapterName,
            })),
            teacher: course.teacher
              ? { name: course.teacher.teacherName }
              : undefined,
          }} 
        />

        {!isLoggedIn && (
          <div className="item-center mt-5 flex justify-center">
            <div
              role="alert"
              className="alert alert-warning alert-outline w-auto px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-lg font-medium whitespace-nowrap">
                Please Login to purchase this course
              </span>
            </div>
          </div>
        )}

        {isLoggedIn && !isStudent && (
          <div className="mt-5 flex justify-center">
            <div
              role="alert"
              className="alert alert-info w-auto px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-lg font-medium whitespace-nowrap">
                Only students can purchase this course
              </span>
            </div>
          </div>
        )}

        {isLoggedIn && isStudent && hasAccessToCourse && (
          <div className="mt-5 flex justify-center">
          <div
            role="alert"
            className="alert alert-success alert-outline w-auto px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg font-medium whitespace-nowrap">
              You already have access to this course
            </span>
            </div>
          </div>
        )}

        {isLoggedIn && isStudent && !hasAccessToCourse && (
          <PurchaseCourseButton course={course} userId={session.user.id} />
        )}
      </div>
    </div>
  );
}
