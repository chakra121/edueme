// components/CourseCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Courses } from "@prisma/client";

interface CourseCardProps {
  course: Courses;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 px-4 pb-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
      <div className="flex justify-center">
        <Image
          src="/courses/rbai.png" // You might want to store image paths in your database
          width={300}
          height={300}
          alt={course.courseName}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Link
          href={`/courses/${course.courseCode}`}
          className="text-2xl font-bold hover:underline"
        >
          {course.courseName}
        </Link>
        <p className="text-lg">
          Learn {course.courseName} from scratch with basics of coding in a
          wholesome manner.
        </p>
        <p className="mt-2 text-xl">₹{course.courseFee}</p>
      </div>
    </div>
  );
}
