"use client";
import React, { useEffect, useState, useCallback } from "react";
import { deleteCourse } from "@/app/actions/deleteCourse";
import { updateCourse } from "@/app/actions/updateCourse";
import CreateCourseForm from "./CreateCourseForm";
import ViewCoursesComponent from "./ViewCoursesComponent";
import DeleteCourseComponent from "./DeleteCourseComponent";
import UpdateCourseComponent from "./UpdateCourseComponent";
import ToastComponent from "./ToastComponent";
import { CourseService } from "./CourseService";
import type { Course, CourseFormData, ToastMessage } from "./CourseTypes";

// Make server actions available to the client
interface CustomWindow extends Window {
  deleteCourse: typeof deleteCourse;
  updateCourse: typeof updateCourse;
}

(window as CustomWindow).deleteCourse = deleteCourse;
(window as CustomWindow).updateCourse = updateCourse;

const MainCoursesContainer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [toast, setToast] = useState<ToastMessage>({
    message: "",
    type: null,
  });

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: null }), 3000);
  };

  // Fetch courses - using useCallback to prevent unnecessary re-renders
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CourseService.fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      showToast("Failed to fetch courses", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create course handler
  const handleCreateCourse = async (data: CourseFormData) => {
    try {
      setLoading(true);
      await CourseService.createCourse(data);
      await fetchCourses(); // Refresh the course list
      showToast("Course created successfully", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Failed to create course",
        "error",
      );
      throw error; // Re-throw to be caught by the form component
    } finally {
      setLoading(false);
    }
  };

  // Delete course handler
  const handleDeleteCourse = async (id: string) => {
    try {
      setLoading(true);
      const result = await CourseService.deleteCourse(id);

      if (result.success) {
        await fetchCourses(); // Refresh course list
        showToast(result.message, "success");
      } else {
        showToast(result.message, "error");
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to delete course",
        "error",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update course handler
  const handleUpdateCourse = async (id: string, data: CourseFormData) => {
    try {
      setLoading(true);
      const result = await CourseService.updateCourse(id, data);

      if (result.success) {
        await fetchCourses(); // Refresh course list
        showToast(result.message, "success");
      } else {
        showToast(result.message, "error");
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to update course",
        "error",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Course Management System
      </h1>

      {/* Single Toast component for the entire system */}
      {toast.type && <ToastComponent toast={toast} />}

      <div role="tablist" className="tabs-boxed tabs mt-3">
        {/* Create Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Create"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <h2 className="mb-4 text-2xl font-semibold">Create New Course</h2>
          <CreateCourseForm onSubmit={handleCreateCourse} loading={loading} />
        </div>

        {/* View Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <ViewCoursesComponent
            courses={courses}
            loading={loading}
            onRefresh={fetchCourses}
          />
        </div>

        {/* Update Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <UpdateCourseComponent
            courses={courses}
            loading={loading}
            onUpdate={handleUpdateCourse}
          />
        </div>

        {/* Delete Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <DeleteCourseComponent
            courses={courses}
            loading={loading}
            onDelete={handleDeleteCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCoursesContainer;
