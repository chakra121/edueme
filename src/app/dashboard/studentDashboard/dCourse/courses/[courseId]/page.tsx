"use client";
import { useParams, useRouter } from "next/navigation";
import ChapterCard from "../../../components/ChapterCard";

const chapters = [
  { id: "chapter-1", name: "Introduction" },
  { id: "chapter-2", name: "Components & Props" },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;

  if (!courseId) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="card bg-base-100 p-6">
      {/* Back Button to navigate back to dCourse/page.tsx */}
      <div>
        <button
          onClick={() => router.push("/dashboard/studentDashboard/dCourse")}
          className="btn btn-outline btn-secondary mb-4"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-base-content">
        Course: {courseId}
      </h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            courseId={courseId}
            id={chapter.id}
            name={chapter.name}
          />
        ))}
      </div>
    </div>
  );
}
