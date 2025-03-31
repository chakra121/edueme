// DeleteCourseComponent.tsx
"use client";
import React from "react";
import type { Course } from "./CourseTypes";

type DeleteCourseProps = {
  courses: Course[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
};

const DeleteCourseComponent: React.FC<DeleteCourseProps> = ({
  courses,
  loading,
  onDelete,
}) => {
  const handleDeleteCourse = async (id: string) => {
    try {
      await onDelete(id);
    } catch {
      // Error handling is done in the parent component
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Delete Course</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="card bg-base-200 p-4 shadow">
              <h3 className="text-xl font-bold">{course.courseName}</h3>
              <p>Code: {course.courseCode}</p>
              <p>Chapters: {course.chapters || 0}</p>
              <button
                className="btn btn-error mt-3"
                onClick={() => handleDeleteCourse(course.id)}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 w-full text-center">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default DeleteCourseComponent;
