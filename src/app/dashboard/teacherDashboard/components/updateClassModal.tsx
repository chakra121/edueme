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

const UpdateClassModal: React.FC<Props> = ({
  course,
  selectedClassId,
  setSelectedClassId,
  onClose,
}) => {
  const [classTitle, setClassTitle] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
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

  const handleUpdate = async () => {
    if (!selectedClassId) {
      setToastMessage("Please select a class.");
      setToastType("error");
      return;
    }

    try {
      const response = await fetch(`/api/class/${selectedClassId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classTitle, youTubeLink }),
      });

      if (response.ok) {
        setToastMessage("Class updated successfully.");
        setToastType("success");
        setTimeout(onClose, 2000);
      } else {
        setToastMessage("Failed to update class.");
        setToastType("error");
      }
    } catch (error) {
      console.error("Update error:", error);
      setToastMessage("Failed to update class.");
      setToastType("error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="card w-2/5 bg-base-100">
        <div className="card-body">
          <h3 className="card-title mb-4 text-xl font-bold">Update Class</h3>

          <div className="mb-3">
            <ClassDropdown
              classes={course.chapters.flatMap<Class>(
                (ch: Chapter) => ch.classes,
              )}
              selectedClassId={selectedClassId}
              setSelectedClassId={(id: string) => {
                setSelectedClassId(id);
                const selectedClass = course.chapters
                  .flatMap((ch: Chapter) => ch.classes)
                  .find((cls: Class) => cls.id === id);
                if (selectedClass) {
                  setClassTitle(selectedClass.classTitle);
                  setYouTubeLink(selectedClass.youTubeLink);
                }
              }}
            />
          </div>

          <input
            type="text"
            className="input input-bordered mb-3 w-full"
            placeholder="Class Title"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered mb-3 w-full"
            placeholder="YouTube Link"
            value={youTubeLink}
            onChange={(e) => setYouTubeLink(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button className="btn btn-success" onClick={handleUpdate}>
              Update
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

export default UpdateClassModal;
