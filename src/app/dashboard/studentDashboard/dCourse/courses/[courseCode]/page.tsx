"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChapterCard from "../../../components/ChapterCard";

interface Chapter {
  id: string;
  chapterCode: string;
  chapterName: string;
  chapterDescription: string;
}

interface APIResponse {
  chapters: Chapter[];
  error?: string;
}

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseCode = params?.courseCode as string;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseCode) return;

    const fetchChapters = async () => {
      try {
        const res = await fetch(`/api/courses/${courseCode}/chapters`);
        const data: APIResponse = await res.json(); // ✅ Explicitly type response

        if (!res.ok) throw new Error(data.error || "Failed to load chapters");

        if (!Array.isArray(data.chapters)) {
          throw new Error("Invalid API response");
        }

        setChapters(data.chapters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // ✅ Use an IIFE to handle async function
    (async () => {
      await fetchChapters();
    })();
  }, [courseCode]); // ✅ Ensure all dependencies are included

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-error">{error}</p>;

  return (
    <div className="card bg-base-100 p-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.push("/dashboard/studentDashboard/dCourse")}
          className="btn btn-outline btn-secondary mb-4"
        >
          ← Back
        </button>
      </div>

      <h1 className="mb-4 text-3xl font-bold text-base-content">
        Course: {courseCode}
      </h1>
      <h1 className="mb-4 text-2xl font-semibold text-base-content">
        The Chapters are:
      </h1>

      {chapters.length === 0 ? (
        <p className="text-center text-xl text-warning">
          No chapters found for this course.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              courseCode={courseCode}
              chapterCode={chapter.chapterCode}
              chapterId={chapter.id}
              chapterName={chapter.chapterName}
              chapterDescription={chapter.chapterDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
}
