"use client";
import React from "react";
import { useForm } from "react-hook-form";
import type { CourseFormData } from "./CourseTypes";

type CreateCourseFormProps = {
  onSubmit: (data: CourseFormData) => Promise<void>;
  loading: boolean;
};

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>();

  const handleFormSubmit = async (data: CourseFormData) => {
    try {
      await onSubmit(data);
      reset(); // Reset form on success
    } catch {
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Course Code Input */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Course Code</span>
        </label>
        <input
          type="text"
          placeholder="E.g., CS101"
          className="input input-bordered"
          {...register("courseCode", {
            required: "Course code is required",
          })}
        />
        {errors.courseCode && (
          <span className="mt-1 text-sm text-error">
            {errors.courseCode.message}
          </span>
        )}
      </div>

      {/* Course Name Input */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Course Name</span>
        </label>
        <input
          type="text"
          placeholder="E.g., Introduction to Computer Science"
          className="input input-bordered"
          {...register("courseName", {
            required: "Course name is required",
          })}
        />
        {errors.courseName && (
          <span className="mt-1 text-sm text-error">
            {errors.courseName.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Create Course"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
