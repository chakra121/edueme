// DeleteChapterComponent.tsx - Component for deleting chapters
"use client";
import React from "react";
import type { Chapter, Course, ToastMessage } from "./ChapterTypes";
import { Toast } from "./ToastComponent";

interface DeleteChapterProps {
  chapters: Chapter[];
  courses: Course[];
  selectedCourse: string;
  onCourseChange: (courseId: string) => void;
  onDelete: (id: string) => Promise<void>;
  toast: ToastMessage;
}

export const DeleteChapterComponent: React.FC<DeleteChapterProps> = ({
  chapters,
  courses,
  selectedCourse,
  onCourseChange,
  onDelete,
  toast,
}) => {
  // Filter chapters based on selected course
  const filteredChapters = selectedCourse
    ? chapters.filter((chapter) => chapter.courseID === selectedCourse)
    : chapters;

  return (
    <>
      <h2 className="text-2xl font-bold">Delete Chapters</h2>
      <Toast toast={toast} />

      <select
        onChange={(e) => onCourseChange(e.target.value)}
        className="select select-bordered mt-3"
      >
        <option value="">All Courses</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.courseName}
          </option>
        ))}
      </select>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {filteredChapters.map((chapter) => (
          <div key={chapter.id} className="card bg-base-200 p-4 shadow-lg">
            <h3 className="text-xl font-semibold">{chapter.chapterName}</h3>
            <p className="text-lg font-semibold">
              Course: {chapter.courseName}
            </p>
            <p className="text-md">Code: {chapter.chapterCode}</p>
            <p className="text-md">{chapter.chapterDescription}</p>
            <button
              onClick={() => onDelete(chapter.id)}
              className="btn btn-error mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
