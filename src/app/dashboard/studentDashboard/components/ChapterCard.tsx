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
    <div
      className="card cursor-pointer bg-base-100 shadow-xl transition-all hover:shadow-2xl"
      onClick={() =>
        router.push(
          `/dashboard/studentDashboard/dCourse/courses/${courseCode}/${chapterCode}`,
        )
      }
    >
      <div className="card-body">
        <h2 className="card-title">{chapterName}</h2>
        <p className="text-gray-500">{chapterDescription}</p>
        <p className="text-gray-500">{chapterCode}</p>
      </div>
    </div>
  );
}
