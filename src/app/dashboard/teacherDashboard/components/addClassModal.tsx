import { useState } from "react";
import ChapterDropdown from "./chapterDropdown";
import ClassForm from "./classForm";

interface Course {
  id: string;
  courseName: string;
  chapters: { id: string; chapterName: string; classes: { id: string }[] }[];
}

export default function AddClassModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-content bg-opacity-50">
      <div className="card bg-base-100 shadow-lg w-1/3">
        <div className="card-body">
          <h2 className="card-title mb-4 text-xl font-bold">Add Class</h2>

          <div className="">
            <ChapterDropdown
              chapters={course.chapters}
              onSelect={setSelectedChapter}
            />
            {selectedChapter && (
              <ClassForm chapterId={selectedChapter} onClose={onClose} />
            )}
          </div>
          <button className="btn btn-error" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
