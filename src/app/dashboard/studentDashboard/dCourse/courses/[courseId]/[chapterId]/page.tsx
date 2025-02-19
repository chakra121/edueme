"use client";
import { useParams, useRouter } from "next/navigation";

const recordedClasses = [
  {
    id: "class-1",
    title: "Class 1: Introduction Video",
    url: "https://example.com/video1",
  },
  {
    id: "class-2",
    title: "Class 2: Components Deep Dive",
    url: "https://example.com/video2",
  },
];

export default function ChapterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const chapterId = params?.chapterId as string;

  if (!courseId || !chapterId)
    return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="card bg-base-100 p-6">
      {/* Back Button to navigate back to courses/[courseId] */}
      <div>
        <button
          onClick={() =>
            router.push(
              `/dashboard/studentDashboard/dCourse/courses/${courseId}`,
            )
          }
          className="btn btn-outline btn-secondary mb-4"
        >
          ← Back
        </button>
      </div>
      <h1 className="text-3xl font-bold text-base-content">
        Chapter: {chapterId}
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {recordedClasses.map((recording) => (
          <div key={recording.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{recording.title}</h2>
              <a
                href={recording.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
