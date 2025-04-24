// UpdateCourseComponent.tsx
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Course, CourseFormData } from "./CourseTypes";

type UpdateCourseProps = {
  courses: Course[];
  loading: boolean;
  onUpdate: (id: string, data: CourseFormData) => Promise<void>;
};

const UpdateCourseComponent: React.FC<UpdateCourseProps> = ({
  courses,
  loading,
  onUpdate,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>();

  const handleSelectCourse = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setSelectedCourse(id);
      setValue("courseCode", course.courseCode);
      setValue("courseName", course.courseName);
      setValue("courseFee", course.courseFee);
      setValue("courseDescription", course.courseDescription);
    }
  };

  const handleUpdateSubmit = async (data: CourseFormData) => {
    if (!selectedCourse) return;

    try {
      await onUpdate(selectedCourse, data);
      setSelectedCourse(null);
      reset();
    } catch {
      // Error handling is done in the parent component
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Update Course</h2>

      {/* Course Selection */}
      <div className="form-control">
        <label className="mb-1 block text-lg font-medium text-gray-700">
          <span className="label-text">Select Course to Update :</span>
        </label>
        <select
          className="select select-bordered w-full"
          onChange={(e) => handleSelectCourse(e.target.value)}
          value={selectedCourse ?? ""}
        >
          <option value="">-----Select a course-----</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName} ({course.courseCode})
            </option>
          ))}
        </select>
      </div>

      {/* Update Form */}
      {selectedCourse && (
        <form
          onSubmit={handleSubmit(handleUpdateSubmit)}
          className="mt-5 space-y-4"
        >
          {/* Course Code Input */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Course Code</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("courseCode", {
                required: "Course code is required",
              })}
            />
            {errors.courseCode && (
              <span className="text-error text-sm">
                {errors.courseCode.message}
              </span>
            )}
          </div>

          {/* Course Name Input */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Course Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("courseName", {
                required: "Course name is required",
              })}
            />
            {errors.courseName && (
              <span className="text-error text-sm">
                {errors.courseName.message}
              </span>
            )}
          </div>
          {/* Course Fee Input */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Course Fee :</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("courseFee", {
                required: "Course Fee is required",
                valueAsNumber: true,
              })}
            />
            {errors.courseCode && (
              <span className="text-error mt-1 text-sm">
                {errors.courseCode.message}
              </span>
            )}
          </div>

          {/* courseDescription */}
          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              <span className="label-text">Course Description :</span>
            </label>

            <textarea
              className="textarea textarea-bordered w-full"
              rows={5}
              {...register("courseDescription", {
                required: "Course Description is required",
              })}
            ></textarea>

            {errors.courseDescription && (
              <span className="text-error mt-1 text-sm">
                {errors.courseDescription.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update Course"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCourseComponent;
