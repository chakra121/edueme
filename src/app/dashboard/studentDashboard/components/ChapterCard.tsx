"use client";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  chapterCode: string;
  courseCode: string;
  chapterId: string;
  chapterName: string;
  chapterDescription: string;
}

export default function ChapterCard({
  courseCode,
  chapterCode,
  chapterId,
  chapterName,
  chapterDescription,
}: ChapterCardProps) {
  const router = useRouter();

  return (
    <div className="card cursor-pointer border-2 bg-base-100 text-base-content transition-all hover:shadow-md">
      <div className="card-body">
        <h2 className="card-title">{chapterName}</h2>
        <p className="text-gray-500">{chapterDescription}</p>
        <p className="text-gray-500">{chapterCode}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/dashboard/studentDashboard/dCourse/courses/${courseCode}/${chapterCode}`,
              );
            }}
          >
            View Classes
          </button>
        </div>
      </div>
    </div>
  );
}
