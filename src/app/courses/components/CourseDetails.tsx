// components/CourseDetails.tsx
import Image from "next/image";
import { Courses } from "@prisma/client";

interface CourseDetailsProps {
  course: Courses & {
    chapters?: any[];
    teacher?: any;
  };
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="overflow-hidden rounded-xl bg-white/30 backdrop-blur-sm drop-shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3">
            <Image
              src="/courses/rbai.png"
              width={400}
              height={400}
              alt={course.courseName}
              className="h-auto w-full"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              {course.courseName}
            </h1>

            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Course Code:
              </span>
              <span className="ml-2 text-lg text-gray-600">
                {course.courseCode}
              </span>
            </div>

            {course.teacher && (
              <div className="mb-4">
                <span className="text-lg font-semibold text-gray-700">
                  Instructor:
                </span>
                <span className="ml-2 text-lg text-gray-600">
                  {course.teacher.name}
                </span>
              </div>
            )}

            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Chapters:
              </span>
              <span className="ml-2 text-lg text-gray-600">
                {course.chapters?.length || 0}
              </span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-orange-500">
                ₹{course.courseFee}
              </span>
            </div>

            <div className="mb-6 rounded-lg bg-gray-100 p-4">
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Course Description
              </h2>
              <p className="text-gray-700">
                Learn {course.courseName} from scratch with comprehensive
                curriculum designed for holistic understanding. This course
                includes hands-on projects and interactive lessons to master all
                concepts.
              </p>
            </div>

            {course.chapters && course.chapters.length > 0 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                  Chapter List
                </h2>
                <ul className="list-disc pl-5">
                  {course.chapters.map((chapter) => (
                    <li key={chapter.id} className="text-gray-700">
                      {chapter.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
