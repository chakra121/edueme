// CreateTeacherForm.tsx
"use client";

import { useState } from "react";
import type { TeacherFormData, Course, RegisterTeacherResponse } from "./TeacherTypes";
import { registerTeacher } from "./TeacherService";
import ToastComponent from "./ToastComponent";

interface CreateTeacherFormProps {
  courses: Course[];
  onSuccess: () => void;
}

export default function CreateTeacherForm({
  courses,
  onSuccess,
}: CreateTeacherFormProps) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TeacherFormData>({
    teacherName: "",
    phoneNumber: "",
    email: "",
    password: "",
    employeeID: "",
    courseID: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setFormErrors({});
    setSuccessMessage("");

    const teacherData = { ...formData, userRole: "teacher" };
    const errors: Record<string, string> = {};

    if (!teacherData.teacherName)
      errors.teacherName = "Teacher name is required.";
    if (!teacherData.phoneNumber)
      errors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(teacherData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number (10 digits required)";
    }
    if (!teacherData.email) errors.email = "Email is required.";
    if (!teacherData.password) errors.password = "Password is required.";
    else if (teacherData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!teacherData.employeeID) errors.employeeID = "Employee ID is required.";
    if (!teacherData.courseID)
      errors.courseID = "Course selection is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teacherData.email)) {
      errors.email = "Invalid email format.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const result: RegisterTeacherResponse = await registerTeacher(teacherData);

      if (!result.success) {
        throw new Error(result.message ?? "Something went wrong!");
      }

      setSuccessMessage(
        `Teacher: "${teacherData.teacherName}" is successfully created!`,
      );
      setFormData({
        teacherName: "",
        phoneNumber: "",
        email: "",
        password: "",
        employeeID: "",
        courseID: "",
      });

      onSuccess(); // Refresh the teacher list
    } catch (error) {
      setFormErrors({
        server: (error as Error).message || "Failed to register teacher.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold">Create Teacher</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Teacher Name:</label>
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {formErrors.teacherName && (
            <span className="text-error">{formErrors.teacherName}</span>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {formErrors.phoneNumber && (
            <span className="text-error">{formErrors.phoneNumber}</span>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {formErrors.email && (
            <span className="text-error">{formErrors.email}</span>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {formErrors.password && (
            <span className="text-error">{formErrors.password}</span>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Employee ID:</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {formErrors.employeeID && (
            <span className="text-error">{formErrors.employeeID}</span>
          )}
        </div>
        <div className="w-full p-2 md:w-1/2">
          <label className="mb-1 block">Select Course:</label>
          <select
            name="courseID"
            className="select select-bordered w-full"
            value={formData.courseID}
            onChange={handleChange}
          >
            <option value="">-- Select a Course --</option>
            {Array.isArray(courses) &&
              courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
          </select>

          {formErrors.courseID && (
            <span className="text-error">{formErrors.courseID}</span>
          )}
        </div>

        <div className="w-full p-2">
          <button
            type="submit"
            className="btn btn-outline btn-secondary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-infinity loading-md"></span>{" "}
                Creating...
              </>
            ) : (
              "Create Teacher"
            )}
          </button>
        </div>
      </form>

      {successMessage && (
        <ToastComponent
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}
      {formErrors.server && (
        <ToastComponent
          message={formErrors.server}
          type="error"
          onClose={() => setFormErrors((prev) => ({ ...prev, server: "" }))}
        />
      )}
    </div>
  );
}
