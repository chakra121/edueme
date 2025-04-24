"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ChapterCardProps {
  chapterCode: string;
  courseCode: string;
  chapterId: string;
  chapterName: string;
  isCompleted: boolean;
  notesLink: string;
  chapterDescription: string;
}

export default function ChapterCard({
  courseCode,
  chapterCode,
  chapterName,
  isCompleted,
  notesLink,
  chapterDescription,
}: ChapterCardProps) {
  const router = useRouter();

  return (
    <div className="card bg-base-100 text-base-content border-2 transition-all ease-out hover:scale-105 hover:shadow-md">
      <div className="card-body">
        <h2 className="card-title">{chapterName}</h2>
        <p className="mb-2 text-gray-500">{chapterDescription}</p>
        <p className="mb-3 text-gray-500">{chapterCode}</p>

        {isCompleted == true ? (
          <div className="card-actions justify-between">
            <a
              href={notesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              onClick={(e) => e.stopPropagation()}
            >
              View Notes
            </a>
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
        ) : (
          <div className="card-actions justify-between">
            <div className="flex items-center justify-center">
              <div className="badge badge-outline badge-accent">
                Yet to Complete
              </div>
            </div>
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
        )}
      </div>
    </div>
  );
}
