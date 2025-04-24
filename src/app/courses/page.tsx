// app/courses/page.tsx
import { getCourses } from "@/lib/courses";
import CourseCard from "./components/CourseCard";
import { Suspense } from "react";
import { type Courses } from "@prisma/client";

export default async function CoursesPage() {
  // Fetch courses using your existing function
  const courses: Courses[] = await getCourses();
  const primaryColor = "#ffb800"; // Your orange-500 theme color

  return (
    <div 
      className="min-h-screen text-gray-800 font-sans relative"
      style={{
        backgroundImage: 'url(/coreecourse.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Reduced opacity overlay */}
      {/* <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div> */}
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-[5%] pb-16 relative z-10">
        {/* Page Title adapted for light theme */}
        <div className="text-center mb-12 pt-8">
          <h1
            className="
              p-2 font-bold text-4xl sm:text-5xl lg:text-6xl
              inline-block // To make border-bottom work well
              relative // For pseudo-elements
            "
            style={{
                // Applying gradient text color using orange theme
                background: `linear-gradient(90deg, ${primaryColor}, #4b5563, ${primaryColor})`, // Orange to Gray-600 to Orange
                WebkitBackgroundClip: 'text',
                color: 'transparent', // Use color: transparent for WebkitTextFillColor fallback
                WebkitTextFillColor: 'transparent',
                // Adding a subtle text shadow using orange
                textShadow: `0 1px 5px ${primaryColor}30` // 30 is hex for alpha ~0.19
            }}
          >
            Edueme Course Matrix
            {/* Underline effect using orange */}
            <span
                className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-1/3 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
            ></span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive catalog of courses designed for the future.
          </p>
        </div>

        {/* Courses Grid with Suspense and updated fallback */}
        <Suspense
          fallback={
            <div className="text-center text-xl font-semibold" style={{ color: primaryColor }}>
              Loading Available Courses... Please Wait...
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              // Ensure your CourseCard component is correctly imported and used
              <CourseCard key={course.id || course.courseCode} course={course} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}