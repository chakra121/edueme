"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteChapter } from "@/app/actions/deleteChapter";
import { updateChapter } from "@/app/actions/updateChapter";

const ManageChapters = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<{ id: string; courseName: string }[]>(
    [],
  );
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    id: string;
    chapterCode: string;
    chapterName: string;
    chapterDescription: string;
    courseID: string;
    isCompleted: boolean;
    notesLink: string;
    classes: string | number;
  }>();

  // Fetch courses dynamically
  useEffect(() => {
    fetchCourses();
    fetchChapters();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses/getCourse");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all chapters
  const fetchChapters = async () => {
    try {
      const response = await fetch("/api/admin/chapters/getChapters");
      if (!response.ok) throw new Error("Failed to fetch chapters");
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: null }), 3000);
  };

  // Handle Create Chapter
  const handleCreateChapter = async (data: {
    chapterCode: string;
    chapterName: string;
    chapterDescription: string;
    notesLink: string;
    courseID: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/chapters/createChapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to create chapter");
      }

      reset();
      showToast("Chapter created successfully!", "success");
      fetchChapters(); // Refresh chapter list
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "An error occurred",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // Filtered Chapters
  const filteredChapters = selectedCourse
    ? chapters.filter((chapter) => chapter.courseID === selectedCourse)
    : chapters;

  // Delete Chapter
  const handleDelete = async (id: string) => {
    const result = await deleteChapter(id);
    if (result.success) fetchChapters();
    showToast(result.message, result.success ? "success" : "error");
  };


  const [chapterCode, setChapterCode] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");

  // Update Chapter
 const handleUpdate = async (e: React.FormEvent) => {
   e.preventDefault(); // Prevent page refresh

   setLoading(true);

   // Prepare the data object (only include non-empty fields)
   const updatedData: any = { id: selectedChapter };
   if (chapterCode.trim() !== "") updatedData.chapterCode = chapterCode;
   if (chapterName.trim() !== "") updatedData.chapterName = chapterName;
   if (chapterDescription.trim() !== "")
     updatedData.chapterDescription = chapterDescription;

   const result = await updateChapter(updatedData);
   setLoading(false);

   if (result.success) {
     fetchChapters();
     setChapterCode("");
     setChapterName("");
     setChapterDescription("");
     setSelectedChapter("");
     setSelectedCourse(""); 
     showToast(result.message, "success");
   } else {
     showToast(result.message, "error");
   }
 };

useEffect(() => {
  if (selectedChapter) {
    const chapter = chapters.find((ch) => ch.id === selectedChapter);
    if (chapter) {
      setChapterCode(chapter.chapterCode || "");
      setChapterName(chapter.chapterName || "");
      setChapterDescription(chapter.chapterDescription || "");
    }
  }
}, [selectedChapter]);

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Manage Chapters
      </h1>

      <div role="tablist" className="tabs-boxed tabs mt-3">
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
          <div className="card bg-base-200 p-4 shadow-lg">
            <h2 className="p-3 text-2xl font-bold">Create Chapter</h2>

            {toast.message && (
              <div className="fixed bottom-5 right-5 z-50">
                <div
                  className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}
                >
                  <span>{toast.message}</span>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(handleCreateChapter)}
              className="space-y-4"
            >
              <div className="form-control">
                <label className="label">Chapter Code:</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("chapterCode", { required: "Required" })}
                />
                {errors.chapterCode && (
                  <span className="text-sm text-error">
                    {errors.chapterCode.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Chapter Name:</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("chapterName", { required: "Required" })}
                />
                {errors.chapterName && (
                  <span className="text-sm text-error">
                    {errors.chapterName.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Chapter Description:</label>
                <textarea
                  className="textarea textarea-bordered"
                  {...register("chapterDescription", { required: "Required" })}
                />
                {errors.chapterDescription && (
                  <span className="text-sm text-error">
                    {errors.chapterDescription.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  Notes Link (https://***www.example.com***) :
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  {...register("notesLink", { required: "Required" })}
                />
              </div>

              <div className="form-control">
                <label className="label">Select Course:</label>
                <select
                  className="select select-bordered"
                  {...register("courseID", { required: "Required" })}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Chapter"}
              </button>
            </form>
          </div>
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
          <h2 className="mb-4 p-2 text-2xl font-bold">View Chapters</h2>

          <div className="mb-4 flex justify-between">
            <div className="flex items-center space-x-1">
              <label className="label font-semibold">Filter by Course :</label>
              <select
                className="select select-bordered"
                onChange={(e) => setSelectedCourse(e.target.value)}
                value={selectedCourse}
              >
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchChapters}
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 font-semibold">
                <th>#</th>
                <th>Chapter Code</th>
                <th>Chapter Name</th>
                <th>Course</th>
                <th>Notes</th>
                <th>No. of Classes</th>
                <th>IsCompleted</th>
              </tr>
            </thead>
            <tbody>
              {filteredChapters.map((chapter, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{chapter.chapterCode}</td>
                  <td>{chapter.chapterName}</td>
                  <td>{chapter.courseName}</td>
                  <td>
                    {chapter.notesLink ? (
                      <a
                        href={chapter.notesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </a>
                    ) : (
                      "No Notes"
                    )}
                  </td>
                  <td>{chapter._count.classes}</td>
                  <td>{!chapter.isCompleted ? ("False") : ("True")}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <h2 className="text-2xl font-bold">Delete Chapters</h2>
          {toast.message && (
            <div className="fixed bottom-5 right-5 z-50">
              <div
                className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}
              >
                <span>{toast.message}</span>
              </div>
            </div>
          )}
          <select
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="select select-bordered mt-3"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {filteredChapters.map((chapter) => (
              <div key={chapter.id} className="card bg-base-200 p-4 shadow-lg">
                <h3 className="text-xl font-semibold">{chapter.chapterName}</h3>
                <p className="text-lg font-semibold">
                  Course : {chapter.courseName}
                </p>
                <p className="text-md">Code : {chapter.chapterCode}</p>
                <p className="text-md">{chapter.chapterDescription}</p>
                <button
                  onClick={() => handleDelete(chapter.id)}
                  className="btn btn-error mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
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
          <h2 className="text-2xl font-bold">Update Chapter</h2>

          {toast.message && (
            <div className="fixed bottom-5 right-5 z-50">
              <div
                className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}
              >
                <span>{toast.message}</span>
              </div>
            </div>
          )}

          {/* Select Course */}
          <div className="form-control">
            <label className="label">Select Course:</label>
            <select
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="select select-bordered"
            >
              <option value="">----- Select a Course -----</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Chapter */}
          {selectedCourse && (
            <div className="form-control mt-3">
              <label className="label">Select Chapter:</label>
              <select
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="select select-bordered"
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

          {/* Update Form */}
          {selectedChapter && (
            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <input type="hidden" value={selectedChapter} />

              <div className="form-control">
                <label className="label">Chapter Code:</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={chapterCode}
                  onChange={(e) => setChapterCode(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">Chapter Name:</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">Description:</label>
                <textarea
                  className="textarea textarea-bordered"
                  value={chapterDescription}
                  onChange={(e) => setChapterDescription(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default ManageChapters;
