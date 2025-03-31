"use client";

import { useState, useTransition } from "react";
import type { Teacher } from "./TeacherTypes";
import { deleteTeacher } from "./TeacherService";

interface DeleteTeacherComponentProps {
  teachers: Teacher[];
  loading: boolean;
  onTeacherDeleted: () => void;
}

export default function DeleteTeacherComponent({
  teachers,
  loading,
  onTeacherDeleted,
}: DeleteTeacherComponentProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (email: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    setDeleting(email);
    setError(null);

    startTransition(async () => {
      try {
        // Call the service function that now uses the server action
        const result = await deleteTeacher(email);

        if (result.success) {
          onTeacherDeleted();
        } else {
          setError(result.message || "Failed to delete teacher");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setDeleting(null);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold">Delete Teacher</h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {teachers.length === 0 ? (
        <div className="alert alert-info">No teachers available.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.email}
              className="card border bg-base-100 p-4 shadow-xl"
            >
              <h3 className="text-lg font-semibold">{teacher.teacherName}</h3>
              <p className="text-base">🪪 {teacher.employeeID}</p>
              <p className="text-base">📧 {teacher.email}</p>
              <p className="text-base">📞 {teacher.phoneNumber}</p>
              <p className="text-base">
                📖 {teacher.course?.courseName || "No course assigned"}
              </p>
              <p className="text-base text-gray-500">
                Created: {new Date(teacher.createdAt).toLocaleDateString()}
              </p>
              <button
                className="btn btn-error btn-sm mt-3"
                onClick={() => handleDelete(teacher.email)}
                disabled={isPending || deleting === teacher.email}
              >
                {deleting === teacher.email ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
