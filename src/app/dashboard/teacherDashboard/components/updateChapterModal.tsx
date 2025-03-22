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
      <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
        <div className="card bg-base-100 shadow-lg w-2/6">
          <div className="card-body">
            
            <h2 className="card-title mb-4 text-xl font-bold">
              Update Chapter Status
            </h2>
            <div className="overflow-x-auto">
              <table className="table mb-4 w-full">
                <thead>
                  <tr className="bg-base-200 text-base font-semibold">
                    <th>Chapters</th>
                    <th>isCompleted</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {updatedChapters.map((chapter) => (
                    <tr key={chapter.id} className="border-t-2">
                      <td>{chapter.chapterName}</td>
                      <td className="place-items-center">
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox-primary checkbox transition-all hover:scale-110"
                            checked={chapter.isCompleted}
                            onChange={() => handleToggle(chapter.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {toastMessage && (
              <div className="fixed bottom-5 right-5 z-50">
              <div className={`alert ${toastType === "success" ? "alert-success" : "alert-error"} shadow-lg`}>
                <span>{toastMessage}</span>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
