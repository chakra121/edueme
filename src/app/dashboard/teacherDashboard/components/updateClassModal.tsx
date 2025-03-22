"use client";
import { useState } from "react";
import ClassDropdown from "./classDropdown";
import { Course, Chapter, Class } from "../types"; // Add import

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

  const handleUpdate = async () => {
    if (!selectedClassId) return alert("Please select a class.");

    try {
      const response = await fetch(`/api/class/${selectedClassId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classTitle, youTubeLink }),
      });

      if (response.ok) {
        alert("Class updated successfully.");
        onClose();
      } else {
        alert("Failed to update class.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update class.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="card bg-base-100 w-2/5">
        <div className="card-body">
          <h3 className="card-title mb-4 text-xl font-bold">Update Class</h3>

          {/* Add type annotations */}
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

          {/* Inputs */}
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
    </div>
  );
};

export default UpdateClassModal;
