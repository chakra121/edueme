// ViewChaptersComponent.tsx - Component for viewing chapters
"use client";
import React from "react";
import type { Chapter, Course } from "./ChapterTypes";

interface ViewChaptersProps {
  chapters: Chapter[];
  courses: Course[];
  selectedCourse: string;
  onCourseChange: (courseId: string) => void;
  onRefresh: () => void;
  loading: boolean;
}

export const ViewChaptersComponent: React.FC<ViewChaptersProps> = ({
  chapters,
  courses,
  selectedCourse,
  onCourseChange,
  onRefresh,
  loading,
}) => {
  // Filter chapters based on selected course
  const filteredChapters = selectedCourse
    ? chapters.filter((chapter) => chapter.courseID === selectedCourse)
    : chapters;

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">View Chapters</h2>

      <div className="mb-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <label className="label font-semibold">Filter by Course:</label>
          <select
            className="select select-bordered"
            onChange={(e) => onCourseChange(e.target.value)}
            value={selectedCourse}
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onRefresh}
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 font-semibold">
            <th>#</th>
            <th>Chapter Code</th>
            <th>Chapter Name</th>
            <th>Course</th>
            <th>Notes</th>
            <th>No. of Classes</th>
            <th>IsCompleted</th>
          </tr>
        </thead>
        <tbody>
          {filteredChapters.map((chapter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{chapter.chapterCode}</td>
              <td>{chapter.chapterName}</td>
              <td>{chapter.courseName}</td>
              <td>
                {chapter.notesLink ? (
                  <a
                    href={chapter.notesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </a>
                ) : (
                  "No Notes"
                )}
              </td>
              <td>{chapter._count?.classes ?? 0}</td>
              <td>{!chapter.isCompleted ? "False" : "True"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
