// app/courses/page.tsx
import { getCourses } from "@/lib/courses";
import CourseCard from "./components/CourseCard";
import { Suspense } from "react";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 pt-[5%] py-8">
      <h1 className="p-2 py-8 text-center font-sans text-4xl font-bold">
        Courses Offered by Edueme
      </h1>

      <Suspense
        fallback={<div className="text-center">Loading courses...</div>}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
