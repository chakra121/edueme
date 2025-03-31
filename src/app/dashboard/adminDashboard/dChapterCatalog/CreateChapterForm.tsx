// CreateChapterForm.tsx - Component for creating chapters
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Course, ToastMessage } from "./ChapterTypes";
import { createChapter } from "./ChapterService";
import { Toast } from "./ToastComponent";

interface CreateChapterFormProps {
  courses: Course[];
  onSuccess: () => void;
}

export const CreateChapterForm: React.FC<CreateChapterFormProps> = ({
  courses,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage>({ message: "", type: null });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    chapterCode: string;
    chapterName: string;
    chapterDescription: string;
    notesLink: string;
    courseID: string;
  }>();

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: null }), 3000);
  };

  // Handle Create Chapter
  const handleCreateChapter = async (data: {
    chapterCode: string;
    chapterName: string;
    chapterDescription: string;
    notesLink: string;
    courseID: string;
  }) => {
    setLoading(true);
    const result = await createChapter(data);
    setLoading(false);

    showToast(result.message, result.success ? "success" : "error");

    if (result.success) {
      reset();
      onSuccess();
    }
  };

  return (
    <div className="card bg-base-200 p-4 shadow-lg">
      <h2 className="p-3 text-2xl font-bold">Create Chapter</h2>
      <Toast toast={toast} />

      <form onSubmit={handleSubmit(handleCreateChapter)} className="space-y-4">
        <div className="form-control">
          <label className="label">Chapter Code:</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("chapterCode", { required: "Required" })}
          />
          {errors.chapterCode && (
            <span className="text-sm text-error">
              {errors.chapterCode.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Chapter Name:</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("chapterName", { required: "Required" })}
          />
          {errors.chapterName && (
            <span className="text-sm text-error">
              {errors.chapterName.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Chapter Description:</label>
          <textarea
            className="textarea textarea-bordered"
            {...register("chapterDescription", { required: "Required" })}
          />
          {errors.chapterDescription && (
            <span className="text-sm text-error">
              {errors.chapterDescription.message}
            </span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            Notes Link (https://***www.example.com***) :
          </label>
          <input
            type="url"
            className="input input-bordered"
            {...register("notesLink", { required: "Required" })}
          />
        </div>

        <div className="form-control">
          <label className="label">Select Course:</label>
          <select
            className="select select-bordered"
            {...register("courseID", { required: "Required" })}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Chapter"}
        </button>
      </form>
    </div>
  );
};
