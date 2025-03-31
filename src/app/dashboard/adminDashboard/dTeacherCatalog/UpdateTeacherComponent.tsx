"use client";

import { useState, useTransition } from "react";
import type { Teacher, UpdateTeacherData } from "./TeacherTypes";
import { updateTeacher } from "./TeacherService";
import ToastComponent from "./ToastComponent";

interface UpdateTeacherComponentProps {
  teachers: Teacher[];
  onTeacherUpdated: () => void;
}

export default function UpdateTeacherComponent({
  teachers,
  onTeacherUpdated,
}: UpdateTeacherComponentProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isPending, startTransition] = useTransition(); // Add useTransition for server actions
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState<UpdateTeacherData>({
    teacherName: "",
    phoneNumber: "",
    employeeID: "",
  });

  const handleSelectTeacher = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherEmail = e.target.value;
    if (!teacherEmail) {
      setSelectedTeacher(null);
      return;
    }

    const teacher = teachers.find((t) => t.email === teacherEmail);
    if (teacher) {
      setSelectedTeacher(teacher);
      setUpdateData({
        teacherName: teacher.teacherName,
        phoneNumber: teacher.phoneNumber,
        employeeID: teacher.employeeID,
      });
      // Clear previous messages
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;

    // Validate inputs
    if (!updateData.teacherName.trim()) {
      setError("Teacher name cannot be empty");
      return;
    }

    if (!updateData.employeeID.trim()) {
      setError("Employee ID cannot be empty");
      return;
    }

    if (!updateData.phoneNumber.trim()) {
      setError("Phone number cannot be empty");
      return;
    }

    setUpdating(true);
    setError(null);
    setSuccess(null);

    // Use startTransition for server actions
    startTransition(async () => {
      try {
        // Call the service function that now uses the server action
        const result = await updateTeacher(selectedTeacher.email, updateData);

        if (result.success) {
          setSuccess("Teacher updated successfully!");
          onTeacherUpdated();

          // Reset fields after a delay
          setTimeout(() => {
            setSelectedTeacher(null);
            setUpdateData({
              teacherName: "",
              phoneNumber: "",
              employeeID: "",
            });
            setSuccess(null);
          }, 3000); // Adjust timeout duration as needed
        } else {
          setError(result.message || "Failed to update teacher");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setUpdating(false);
      }
    });
  };

  return (
    <div className="">
      <h2 className="mb-5 text-2xl font-bold">Update Teacher</h2>

      {/* Teacher Selection */}
      <div className="mb-4">
        <label className="mb-1 block font-semibold">Select Teacher:</label>
        <select
          className="select select-bordered w-full"
          onChange={handleSelectTeacher}
          value={selectedTeacher?.email ?? ""}
          disabled={isPending}
        >
          <option disabled value="">
            -- Select a Teacher --
          </option>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <option key={teacher.email} value={teacher.email}>
                {teacher.teacherName} - {teacher.email}
              </option>
            ))
          ) : (
            <option disabled>No teachers available</option>
          )}
        </select>
      </div>

      {/* Update Form */}
      {selectedTeacher && (
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-4 space-y-3">
            <div>
              <label className="mb-1 block">Teacher Name:</label>
              <input
                type="text"
                name="teacherName"
                value={updateData.teacherName}
                onChange={handleUpdateChange}
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label className="mb-1 block">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={updateData.phoneNumber}
                onChange={handleUpdateChange}
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label className="mb-1 block">Employee ID:</label>
              <input
                type="text"
                name="employeeID"
                value={updateData.employeeID}
                onChange={handleUpdateChange}
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-4"
            disabled={updating || isPending}
          >
            {updating || isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              "Update Teacher"
            )}
          </button>
        </form>
      )}
      {/* Error and Success Messages */}
      {error && (
        <ToastComponent
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <ToastComponent
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  );
}
