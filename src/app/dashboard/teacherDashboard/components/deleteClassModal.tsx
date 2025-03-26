"use client";
import { useState, useEffect } from "react";
import ClassDropdown from "./classDropdown";
import type { Course, Chapter, Class } from "../types";

interface Props {
  course: Course;
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleDelete = async () => {
    if (!selectedClassId) {
      setToastMessage("Please select a class.");
      setToastType("error");
      return;
    }

    try {
      const response = await fetch(`/api/class/${selectedClassId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToastMessage("Class deleted successfully.");
        setToastType("success");
        setTimeout(onClose, 2000);
      } else {
        setToastMessage("Failed to delete class.");
        setToastType("error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setToastMessage("Failed to delete class.");
      setToastType("error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="card w-1/3 bg-base-100 shadow-lg">
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

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteClassModal;
