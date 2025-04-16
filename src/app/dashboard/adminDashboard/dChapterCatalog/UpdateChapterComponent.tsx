// UpdateChapterComponent.tsx - Component for updating chapters
"use client";
import React, { useState, useEffect } from "react";
import type { Chapter, Course, ToastMessage } from "./ChapterTypes";
import { Toast } from "./ToastComponent";

interface UpdateChapterProps {
  chapters: Chapter[];
  courses: Course[];
  selectedCourse: string;
  onCourseChange: (courseId: string) => void;
  onUpdate: (data: Chapter) => Promise<void>;
  loading: boolean;
  toast: ToastMessage;
}

export const UpdateChapterComponent: React.FC<UpdateChapterProps> = ({
  chapters,
  courses,
  selectedCourse,
  onCourseChange,
  onUpdate,
  loading,
  toast,
}) => {
  const [selectedChapter, setSelectedChapter] = useState("");
  const [chapterCode, setChapterCode] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [notesLink, setNotesLink] = useState("");

  // Filter chapters based on selected course
  const filteredChapters = selectedCourse
    ? chapters.filter((chapter) => chapter.courseID === selectedCourse)
    : chapters;

  // Update form fields when a chapter is selected
  useEffect(() => {
    if (selectedChapter) {
      const chapter = chapters.find((ch) => ch.id === selectedChapter);
      if (chapter) {
        setChapterCode(chapter.chapterCode || "");
        setChapterName(chapter.chapterName || "");
        setChapterDescription(chapter.chapterDescription || "");
        setNotesLink(chapter.notesLink || "");
      }
    }
  }, [selectedChapter, chapters]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data object (only include non-empty fields)
    const updatedData: Chapter = {
      id: selectedChapter || "", // Ensure id is always a string
      chapterCode: chapterCode.trim(),
      chapterName: chapterName.trim(),
      chapterDescription: chapterDescription.trim(),
      courseID: selectedCourse,
      notesLink: notesLink.trim(),
    };

    await onUpdate(updatedData);

    // Reset form after successful update
    setSelectedChapter("");
  };

  return (
    <>
      <h2 className="mb-3 text-2xl font-bold">Update Chapter</h2>
      <Toast toast={toast} />

      {/* Select Course */}
      <div className="form-control">
        <label className="mb-1 block text-lg font-medium text-gray-700">
          Select Course:
        </label>
        <select
          onChange={(e) => onCourseChange(e.target.value)}
          className="select select-bordered w-full"
          value={selectedCourse}
        >
          <option value="">----- Select a Course -----</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {/* Select Chapter - Only visible after selecting a course */}
      {selectedCourse && (
        <div className="form-control mt-3">
          <label className="mb-1 block text-lg font-medium text-gray-700">
            Select Chapter:
          </label>
          <select
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="select select-bordered w-full"
            value={selectedChapter}
          >
            <option value="">----- Select a Chapter -----</option>
            {filteredChapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.chapterName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Update Form - Only visible after selecting a chapter */}
      {selectedChapter && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input type="hidden" value={selectedChapter} />

          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              Chapter Code:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={chapterCode}
              onChange={(e) => setChapterCode(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              Chapter Name:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              Description:
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={chapterDescription}
              onChange={(e) => setChapterDescription(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="mb-1 block text-lg font-medium text-gray-700">
              Notes Link:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={notesLink}
              onChange={(e) => setNotesLink(e.target.value)}
              placeholder="Enter URL for chapter notes"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Chapter"}
          </button>
        </form>
      )}
    </>
  );
};
