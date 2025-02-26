"use client";
import { useState } from "react";

interface Chapter {
  id: string;
  chapterName: string;
  isCompleted: boolean;
}

interface UpdateChapterModalProps {
  courseId: string;
  chapters: Chapter[];
  onClose: () => void;
}

export default function UpdateChapterModal({
  courseId,
  chapters,
  onClose,
}: UpdateChapterModalProps) {
  const [updatedChapters, setUpdatedChapters] = useState(chapters);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleToggle = (chapterId: string) => {
    setUpdatedChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isCompleted: !chapter.isCompleted }
          : chapter,
      ),
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/chapters/updateChapter", {
        method: "POST",
        body: JSON.stringify({ courseId, chapters: updatedChapters }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update chapters");

      setToastMessage("Chapters updated successfully!");
      setToastType("success");

      setTimeout(() => {
        setToastMessage(null);
        onClose(); // Close modal after success
      }, 2000);
    } catch (error) {
      console.error("Error updating chapters:", error);
      setToastMessage("Error updating chapters!");
      setToastType("error");

      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Update Chapter Status</h2>
        <div className=" mx-3 text-lg mb-4 flex font-semibold justify-between">
            <span>Chapters</span>
            <span>isCompleted</span>
        </div>
          {/* List of chapters with toggle switches */}
          <div className="space-y-2">
            {updatedChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex space-x-28 items-center justify-between rounded-md border-t p-3"
              >
                <span>{chapter.chapterName}</span>
                <div className="px-10 items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={chapter.isCompleted}
                  onChange={() => handleToggle(chapter.id)}
                />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 mb-4 flex justify-end">
            <button className="btn btn-outline mr-2" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {toastMessage && (
            <div className={`alert alert-${toastType} text-white`}>
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
