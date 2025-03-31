"use client";

import { useState, useEffect } from "react";
import CourseCard from "../components/courseCard";
import AddClassModal from "../components/addClassModal";
import UpdateChapterModal from "../components/updateChapterModal";
import UpdateClassModal from "../components/updateClassModal";
import DeleteClassModal from "../components/deleteClassModal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import type { Chapter, Course } from "../types";

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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("/api/teachers/getTeacherCourse");

      if (!response.ok) throw new Error("Failed to fetch course data");

      const data = (await response.json()) as { course: Course };
      setCourse(data.course);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCourseData();
  }, []);

  if (isLoading)
    return (
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

  if (!course)
    return (
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
        <div className="mb-5 w-fit">
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
          <div className="mt-4 flex justify-center">
            <button
              onClick={fetchCourseData}
              className="btn btn-outline btn-sm"
              disabled={isLoading}
            >
              <ArrowPathIcon
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Refreshing..." : "Refresh Course Data"}
            </button>
          </div>
        </div>
        <span className="mb-3 text-base text-gray-500">
          Note:
          <ul className="mt-2 list-disc space-y-3 pl-8">
            <li>
              Click <strong>Add Class</strong> to select a chapter and add a
              class with title &amp; link.
            </li>
            <li>
              Click <strong>Update Class</strong> to modify class details.
            </li>
            <li>
              Click <strong>Delete Class</strong> to remove a class.
            </li>
            <li>
              Click <strong>Update Chapter</strong> to change the chapter&apos;s
              status.
            </li>
            <li className="font-bold">
              Click <strong>Refresh Course Data</strong> after every operation
              to reload the course data.
            </li>
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
