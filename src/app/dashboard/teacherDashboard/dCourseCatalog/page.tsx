"use client";

import { useState, useEffect } from "react";
import CourseCard from "../components/courseCard";
import AddClassModal from "../components/addClassModal";
import UpdateChapterModal from "../components/updateChapterModal";
import UpdateClassModal from "../components/updateClassModal";
import DeleteClassModal from "../components/deleteClassModal";

import {Class, Chapter, Course} from "../types"

export default function CoursesPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ✅ State for modals
  const [isAddClassOpen, setIsAddClassOpen] = useState<boolean>(false);
  const [isUpdateChapterOpen, setIsUpdateChapterOpen] =
    useState<boolean>(false);
  const [isUpdateClassOpen, setIsUpdateClassOpen] = useState<boolean>(false);
  const [isDeleteClassOpen, setIsDeleteClassOpen] = useState<boolean>(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<Chapter[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/teachers/getTeacherCourse");
      const data = await response.json();
      setCourse(data.course);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
    setIsLoading(false);
  };

  // Update useEffect to use the new function
  useEffect(() => {
    fetchCourseData();
  }, []);

  if (isLoading) return (
    <div className="card w-full bg-base-100">
      <div className="card-body flex w-[40%] flex-col gap-4">
        <h1 className="card-title mb-4 text-3xl font-bold">Course Catalog</h1>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
  if (!course) return (
    <div className="card w-full bg-base-100">
      <div className="card-body flex w-[40%] flex-col gap-4">
        <h2 className="mb-4 text-3xl font-bold">No Course Found</h2>
      </div>
    </div>
  );

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title mb-4 text-3xl font-bold">Course Catalog</h1>
        <div className="w-fit mb-5">
          <CourseCard
            course={course}
            onAddClass={() => {
              setSelectedCourse(course);
              setIsAddClassOpen(true);
            }}
            onUpdateClass={() => {
              setSelectedCourse(course);
              setIsUpdateClassOpen(true);
            }}
            onDeleteClass={() => {
              setSelectedCourse(course);
              setIsDeleteClassOpen(true);
            }}
            onUpdateChapter={() => {
              setSelectedCourse(course);
              setSelectedChapters(course.chapters);
              setIsUpdateChapterOpen(true);
            }}
          />
        </div>
        <span className="mb-3 text-base text-gray-500">
          Note:
          <ul className="mt-2 list-disc space-y-3 pl-8">
            <li>
              Click "Add Class" to select a chapter and add a class with title &
              link.
            </li>
            <li>Click "Update Chapter" to change the chapter's status.</li>
            <li>Click "Update Class" to modify class details.</li>
            <li>Click "Delete Class" to remove a class from the course.</li>
          </ul>
        </span>
      </div>

      {/* ✅ Modals with fixed typing */}
      {isAddClassOpen && selectedCourse && (
        <AddClassModal
          course={selectedCourse}
          onClose={() => setIsAddClassOpen(false)}
        />
      )}

      {isUpdateClassOpen && selectedCourse && (
        <UpdateClassModal
          course={selectedCourse}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          onClose={() => setIsUpdateClassOpen(false)}
        />
      )}

      {isDeleteClassOpen && selectedCourse && (
        <DeleteClassModal
          course={selectedCourse}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          onClose={() => setIsDeleteClassOpen(false)}
        />
      )}

      {isUpdateChapterOpen && selectedCourse && (
        <UpdateChapterModal
          courseId={selectedCourse.id}
          chapters={selectedChapters}
          onClose={() => setIsUpdateChapterOpen(false)}
        />
      )}
    </div>
  );
}
