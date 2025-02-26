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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-base-100 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Add Class</h2>
        <ChapterDropdown
          chapters={course.chapters}
          onSelect={setSelectedChapter}
        />
        {selectedChapter && (
          <ClassForm chapterId={selectedChapter} onClose={onClose} />
        )}
        <button className="btn btn-error" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
