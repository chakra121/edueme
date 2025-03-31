// ViewCoursesComponent.tsx
"use client";
import React from "react";
import type { Course } from "./CourseTypes";

type ViewCoursesProps = {
  courses: Course[];
  loading: boolean;
  onRefresh: () => Promise<void>;
};

const ViewCoursesComponent: React.FC<ViewCoursesProps> = ({
  courses,
  loading,
  onRefresh,
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">View Courses</h2>
        <button
          className="btn btn-primary"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {loading ? (
        <div className="p-5 text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Teacher Assigned</th>
                <th>No. of Chapters</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                    <td>{course.teacher || "Not assigned"}</td>
                    <td>{course.chapters || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    No courses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewCoursesComponent;
