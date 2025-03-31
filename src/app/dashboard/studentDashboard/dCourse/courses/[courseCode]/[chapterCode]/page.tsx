"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ClassItem {
  id: string;
  classTitle: string;
  youTubeLink: string;
}

interface APIResponse {
  classes: ClassItem[];
  error?: string;
}

export default function ChapterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseCode = params?.courseCode as string;
  const chapterCode = params?.chapterCode as string;

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterCode) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `/api/courses/${courseCode}/chapters/${chapterCode}/classes`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          },
        );
        const data = (await res.json()) as APIResponse; // ✅ Explicitly cast response

        if (!res.ok) throw new Error(data.error ?? "Failed to load classes");

        if (!data.classes || !Array.isArray(data.classes)) {
          throw new Error("Invalid API response");
        }

        setClasses(data.classes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // ✅ Use an IIFE to handle async function
    void (async () => {
      await fetchClasses();
    })();
  }, [chapterCode, courseCode]); // ✅ Added `courseCode` to dependencies

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-error">{error}</p>;

  return (
    <div className="card bg-base-100 p-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() =>
            router.push(
              `/dashboard/studentDashboard/dCourse/courses/${courseCode}`,
            )
          }
          className="btn btn-outline btn-secondary mb-4"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-base-content">
        Chapter: {chapterCode}
      </h1>

      {/* Display Classes with YouTube Links */}
      {classes.length === 0 ? (
        <p className="text-center text-xl text-warning">
          No classes found for this chapter.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {classes.map((classItem) => (
            <div key={classItem.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{classItem.classTitle}</h2>
                {classItem.youTubeLink ? (
                  <a
                    href={classItem.youTubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Watch Video
                  </a>
                ) : (
                  <p className="text-gray-500">No video available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
