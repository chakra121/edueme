"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteCourse } from "@/app/actions/deleteCourse";
import { updateCourse } from "@/app/actions/updateCourse";

const ManageCourses = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });
  const [courses, setCourses] = useState<
    {
      id: string;
      courseCode: string;
      courseName: string;
      teacher: string;
      chapters: string | number;
    }[]
  >([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    courseCode: string;
    courseName: string;
  }>();

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ message: "", type: null });
    }, 3000);
  };

  // Handle form submission
  const handleCreateCourse = async (data: {
    courseCode: string;
    courseName: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/courses/createCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to create course");
      }

      reset();
      showToast("Course created successfully!", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "An error occurred",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // view tabbbbb

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/courses/getCourse");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete Course (Using Server Action)
  const handleDeleteCourse = async (id: string) => {
    console.log(id);
    const result = await deleteCourse(id);
    if (result.success) {
      showToast("Course deleted successfully!", "success");
      fetchCourses(); // ✅ Refresh course list after deletion
    } else {
      showToast(result.message, "error");
    }
  };

  // Update Course (Using Server Action)
  const handleSelectCourse = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setSelectedCourse(id);
      setValue("courseCode", course.courseCode);
      setValue("courseName", course.courseName);
    }
  };

  // Handle course update
  const handleUpdateCourse = async (data: {
    courseCode: string;
    courseName: string;
  }) => {
    if (!selectedCourse) {
      showToast("Please select a course to update.", "error");
      return;
    }

    try {
      setLoading(true);
      const result = await updateCourse(selectedCourse, data);

      if (result.success) {
        showToast("Course updated successfully!", "success");
        fetchCourses(); // ✅ Refresh courses list
        setSelectedCourse(null); // ✅ Clear selection
        reset(); // ✅ Reset form fields
      } else {
        showToast(result.message, "error");
      }
    } catch (error) {
      showToast("An error occurred during update.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        CRUD Panel for Course
      </h1>
      <div role="tablist" className="tabs-boxed tabs mt-3">
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
          <h1 className="p-3 text-3xl font-semibold text-base-content">
            Create New Course
          </h1>

          <div className="p-5">
            <form
              onSubmit={handleSubmit(handleCreateCourse)}
              className="space-y-4"
            >
              {/* Course Code Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Course Code</span>
                </label>
                <input
                  type="text"
                  placeholder="E.g., CS101"
                  className="input input-bordered"
                  {...register("courseCode", {
                    required: "Course code is required",
                  })}
                />
                {errors.courseCode && (
                  <span className="mt-1 text-sm text-error">
                    {errors.courseCode.message}
                  </span>
                )}
              </div>

              {/* Course Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Course Name</span>
                </label>
                <input
                  type="text"
                  placeholder="E.g., Introduction to Computer Science"
                  className="input input-bordered"
                  {...register("courseName", {
                    required: "Course name is required",
                  })}
                />
                {errors.courseName && (
                  <span className="mt-1 text-sm text-error">
                    {errors.courseName.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Create Course"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Toast Notification (Appears at the Bottom-Right) */}
          {toast.type && (
            <div
              className={`toast toast-end transition-opacity ${toast.type ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}
              >
                <span>{toast.message}</span>
              </div>
            </div>
          )}
        </div>
        {/* View Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border bg-base-100 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">View Courses</h2>
            <button
              className="btn btn-primary"
              onClick={fetchCourses}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          {loading ? (
            <div className="p-5 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>#</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Teacher Assigned</th>
                    <th>No. of Chapters</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.courseCode}</td>
                        <td>{course.courseName}</td>
                        <td>{course.teacher}</td>
                        <td>{course.chapters}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center">
                        No courses available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <h1 className="mb-4 p-3 text-3xl font-semibold text-base-content">
            Delete Course
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.id} className="card bg-base-200 p-4 shadow">
                  <h3 className="text-xl font-bold">{course.courseName}</h3>
                  <p>Code: {course.courseCode}</p>
                  <p>Chapters: {course.chapters}</p>
                  <button
                    className="btn btn-error mt-3"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="w-full text-center">No courses available</p>
            )}
          </div>
          {toast.type && (
            <div className="toast toast-end">
              <div
                className={`alert ${
                  toast.type === "success" ? "alert-success" : "alert-error"
                }`}
              >
                <span>{toast.message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Update Tab */}
        <input
          type="radio"
          name="my_tabs_4"
          role="tab"
          className="tab text-lg font-medium"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border bg-base-100 p-5"
        >
          <h2 className="mb-4 text-2xl font-semibold">Update Course</h2>

          {/* Course Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Course to Update :</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(e) => handleSelectCourse(e.target.value)}
            >
              <option value="">-----Select a course-----</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select>
          </div>

          {/* Update Form */}
          {selectedCourse && (
            <form
              onSubmit={handleSubmit(handleUpdateCourse)}
              className="mt-5 space-y-4"
            >
              {/* Course Code Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Course Code</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("courseCode", {
                    required: "Course code is required",
                  })}
                />
                {errors.courseCode && (
                  <span className="text-sm text-error">
                    {errors.courseCode.message}
                  </span>
                )}
              </div>

              {/* Course Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Course Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("courseName", {
                    required: "Course name is required",
                  })}
                />
                {errors.courseName && (
                  <span className="text-sm text-error">
                    {errors.courseName.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Update Course"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Toast Notification */}
          {toast.type && (
            <div className="toast toast-end">
              <div
                className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}
              >
                <span>{toast.message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
