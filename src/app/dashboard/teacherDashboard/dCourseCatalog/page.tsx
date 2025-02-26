"use client";

import { useState, useEffect } from "react";
import CourseCard from "../components/courseCard";
import AddClassModal from "../components/addClassModal";
import UpdateChapterModal from "../components/updateChapterModal";

interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  chapters: {
    id: string;
    chapterName: string;
    isCompleted: boolean;
    classes: { id: string }[];
  }[];
}

export default function CoursesPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ State for modals
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isUpdateChapterOpen, setIsUpdateChapterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<Course["chapters"]>(
    [],
  );

  useEffect(() => {
    async function fetchCourse() {
      setIsLoading(true);
      try {
        const response = await fetch("/api//teachers/getTeacherCourse");
        const data = await response.json();
        setCourse(data.course);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
      setIsLoading(false);
    }
    fetchCourse();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!course) return <p>No course assigned.</p>;

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title mb-4 text-3xl font-bold">Course Catalog</h1>

        <CourseCard
          course={course}
          onAddClass={() => {
            setSelectedCourse(course);
            setIsAddClassOpen(true);
          }}
          onUpdateChapter={() => {
            setSelectedCourse(course);
            setSelectedChapters(course.chapters);
            setIsUpdateChapterOpen(true);
          }}
        />

        <span className="mb-4 text-base text-gray-500">
          Note:
          <ul className="mt-2 list-disc space-y-3 pl-8">
            <li>
              Click the "Add Class" button, select the chapter, fill the class
              title and class link to add a class into the chapter.
            </li>
            <li>
              Click the "Update Chapter" button to change the status of the
              chapter.
            </li>
          </ul>
        </span>
      </div>

      {/* ✅ Modals moved to page level */}
      {isAddClassOpen && selectedCourse && (
        <AddClassModal
          course={selectedCourse}
          onClose={() => setIsAddClassOpen(false)}
        />
      )}

      {isUpdateChapterOpen && selectedCourse && (
        <UpdateChapterModal
          courseId={selectedCourse.id}
          chapters={selectedChapters}
          onClose={() => setIsUpdateChapterOpen(false)}
        />
      )}
    </div>
  );
}
