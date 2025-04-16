// MainChaptersContainer.tsx - Main container component
"use client";
import React, { useEffect, useState } from 'react';
import { fetchChapters, fetchCourses } from './ChapterService';
import { deleteChapter } from '@/app/actions/deleteChapter';
import { updateChapter } from '@/app/actions/updateChapter';
import { CreateChapterForm } from './CreateChapterForm';
import { ViewChaptersComponent } from './ViewChaptersComponent';
import { DeleteChapterComponent } from './DeleteChapterComponent';
import { UpdateChapterComponent } from './UpdateChapterComponent';
import type { Course, Chapter, ToastMessage } from './ChapterTypes';

const ManageChaptersContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [toast, setToast] = useState<ToastMessage>({
    message: "",
    type: null,
  });

  // Load initial data
  useEffect(() => {
    loadInitialData().catch(error => {
      console.error("Failed to load initial data:", error);
    });
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    const coursesData = await fetchCourses();
    const chaptersData = await fetchChapters();
    setCourses(coursesData);
    setChapters(chaptersData);
    setLoading(false);
  };

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: null }), 3000);
  };

  // Handle chapter deletion
  const handleDelete = async (id: string) => {
    setLoading(true);
    const result = await deleteChapter(id);
    setLoading(false);
    if (result.success) {
      const updatedChapters = await fetchChapters();
      setChapters(updatedChapters);
    }
    showToast(result.message, result.success ? "success" : "error");
  };

  // Handle chapter update
  const handleUpdate = async (data: Chapter) => {
    setLoading(true);
    const result = await updateChapter(data);
    setLoading(false);
    
    if (result.success) {
      const updatedChapters = await fetchChapters();
      setChapters(updatedChapters);
      setSelectedCourse("");
    }
    
    showToast(result.message, result.success ? "success" : "error");
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Manage Chapters
      </h1>

      <div role="tablist" className="tabs-border tabs mt-3">
        {/* Create Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Create"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <CreateChapterForm 
            courses={courses} 
            onSuccess={() => {
              fetchChapters()
                .then(setChapters)
                .catch(error => console.error("Failed to fetch chapters:", error));
            }} 
          />
        </div>

        {/* View Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <ViewChaptersComponent
            chapters={chapters}
            courses={courses}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
            onRefresh={() => {
              setLoading(true);
              fetchChapters()
                .then((data: Chapter[]) => {
                  setChapters(data);
                })
                .catch(error => {
                  console.error("Failed to fetch chapters:", error);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
            loading={loading}
          />
        </div>

        {/* Delete Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <DeleteChapterComponent
            chapters={chapters}
            courses={courses}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
            onDelete={handleDelete}
            toast={toast}
          />
        </div>

        {/* Update Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <UpdateChapterComponent
            chapters={chapters}
            courses={courses}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
            onUpdate={handleUpdate}
            loading={loading}
            toast={toast}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageChaptersContainer;