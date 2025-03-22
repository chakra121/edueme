"use client";
import { useState } from "react";
import ClassDropdown from "./classDropdown";
import { Course, Chapter, Class } from "../types"; // Add import

interface Props {
  course: Course; // Now using imported type
  selectedClassId: string | null;
  setSelectedClassId: (id: string) => void;
  onClose: () => void;
}

const DeleteClassModal: React.FC<Props> = ({
  course,
  selectedClassId,
  setSelectedClassId,
  onClose,
}) => {
  const handleDelete = async () => {
    if (!selectedClassId) return alert("Please select a class.");

    try {
      const response = await fetch(`/api/class/${selectedClassId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Class deleted successfully.");
        onClose();
      } else {
        alert("Failed to delete class.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete class.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="card bg-base-100 shadow-lg w-1/3">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl font-bold">Delete Class</h2>

          <div className="mb-3">
            <ClassDropdown
              classes={course.chapters.flatMap<Class>(
                (ch: Chapter) => ch.classes,
              )}
              selectedClassId={selectedClassId}
              setSelectedClassId={setSelectedClassId}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteClassModal;
