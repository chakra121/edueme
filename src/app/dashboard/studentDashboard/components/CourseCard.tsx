"use client";
import { useRouter } from "next/navigation";


interface CourseCardProps {
  courseId: string;
  courseName: string;
  courseCode: string;
 chapterCount: number;
}

export default function CourseCard({ courseCode, courseName, chapterCount }: CourseCardProps) {
  const router = useRouter();

  return (
    <div className="card w-auto text-base-content cursor-pointer border-2 bg-base-100 transition-all hover:shadow-md">
      <div className="card-body">
        <h2 className="card-title">{courseName}</h2>
        <h2 className="text-lg font-semibold">Course Code : {courseCode}</h2>
        <h2 className="text-lg font-semibold">No. of Chapters : {chapterCount}</h2>
        <div className="card-actions justify-start">
        <button className="btn btn-primary" onClick={() => router.push(`dCourse/courses/${courseCode}`)}>View Chapters</button>
      </div>
      </div>
    </div>
  );
}
