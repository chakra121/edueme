"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChapterCard from "../../../components/ChapterCard";

interface Chapter {
  id: string;
  chapterCode: string;
  chapterName: string;
  isCompleted: boolean;
  notesLink: string;
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
        const res = await fetch(`/api/courses/${courseCode}/chapters`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });
        const data = (await res.json()) as APIResponse; // ✅ Explicitly cast response

        if (!res.ok) throw new Error(data.error ?? "Failed to load chapters");

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
    void (async () => {
      await fetchChapters();
    })();
  }, [courseCode]); // ✅ Ensure all dependencies are included

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error)
    return (
      <div className="card bg-base-100 p-6">
        <p>{error}</p>
      </div>
    );

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
        Chapters in {courseCode}
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
              isCompleted={chapter.isCompleted}
              notesLink={chapter.notesLink}
              chapterDescription={chapter.chapterDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
}
