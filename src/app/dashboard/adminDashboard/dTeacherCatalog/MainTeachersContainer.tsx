"use client";

import { useState, useEffect } from "react";
import type { Teacher, Course } from "./TeacherTypes";
import { fetchTeachers, fetchCourses } from "./TeacherService";
import CreateTeacherForm from "./CreateTeacherForm";
import ViewTeachersComponent from "./ViewTeachersComponent";
import DeleteTeacherComponent from "./DeleteTeacherComponent";
import UpdateTeacherComponent from "./UpdateTeacherComponent";
import ToastComponent from "./ToastComponent";

export default function MainTeachersContainer() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({
    message: "",
    type: "info" as "success" | "error" | "info",
  });

  const loadTeachers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTeachers();
      console.log("Teachers data in component:", data);

      // Validate each teacher object to ensure it has the required fields
      const validTeachers = Array.isArray(data)
        ? data.filter((teacher) => {
            return (
              teacher &&
              typeof teacher === "object" &&
              "email" in teacher &&
              "teacherName" in teacher
            );
          })
        : [];

      if (
        validTeachers.length === 0 &&
        Array.isArray(data) &&
        data.length > 0
      ) {
        console.warn("Teachers data format is incorrect:", data);
        setError("Teacher data has invalid format. Check console for details.");
      }

      setTeachers(validTeachers);
      setTotal(validTeachers.length);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setError("Failed to load teachers. See console for details.");
      setTeachers([]);
      setTotal(0);
      setToast({
        message: "Failed to load teachers",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      const validCourses = Array.isArray(data)
        ? data.filter((course) => {
            return (
              course &&
              typeof course === "object" &&
              "id" in course &&
              "courseName" in course
            );
          })
        : [];

      setCourses(validCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      setToast({
        message: "Failed to load courses",
        type: "error",
      });
    }
  };

  useEffect(() => {
    void loadTeachers();
    void loadCourses();
  }, []);

  const handleTeacherAdded = async () => {
    await loadTeachers();
    setToast({
      message: "Teacher added successfully",
      type: "success",
    });
  };

  const handleTeacherDeleted = async () => {
    await loadTeachers();
    setToast({
      message: "Teacher deleted successfully",
      type: "success",
    });
  };

  const handleTeacherUpdated = async () => {
    await loadTeachers();
    setToast({
      message: "Teacher updated successfully",
      type: "success",
    });
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        CRUD Panel for Teacher
      </h1>

      {toast.message && (
        <ToastComponent
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "info" })}
        />
      )}

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      <div role="tablist" className="tabs-boxed tabs mt-3">
        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Create"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <CreateTeacherForm courses={courses} onSuccess={handleTeacherAdded} />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <ViewTeachersComponent
            teachers={teachers}
            total={total}
            loading={loading}
            onRefresh={loadTeachers}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <DeleteTeacherComponent
            teachers={teachers}
            loading={loading}
            onTeacherDeleted={handleTeacherDeleted}
          />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <UpdateTeacherComponent
            teachers={teachers}
            onTeacherUpdated={handleTeacherUpdated}
          />
        </div>
      </div>
    </div>
  );
}
