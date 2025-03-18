"use client";

import { useState, useEffect, useTransition } from "react";
import { deleteTeacher } from "@/app/actions/deleteTeacher";
import { updateTeacher } from "@/app/actions/updateTeacher";

export default function DTeacherCatalogPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    teacherName: "",
    phoneNumber: "",
    email: "",
    password: "",
    employeeID: "",
    courseID :""
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setFormErrors({ ...formErrors, [e.target.name]: "" });
};

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setLoading(true);
  setFormErrors({});
  setSuccessMessage("");

  const teacherData = {
    ...formData,
    userRole: "teacher",
  };

  let errors: Record<string, string> = {};

  // Validate required fields
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
  if (!teacherData.courseID) errors.courseID = "Course selection is required."; // Add this line

  // Validate email format
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
    const response = await fetch("/api/auth/registerTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong!");
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
      courseID: "", // Reset courseID
    });
  } catch (error: any) {
    console.error("Error registering teacher:", error);
    setFormErrors({ server: error.message || "Failed to register teacher." });
  } finally {
    setLoading(false);
  }
};
  // <<<<<<<<<Get teacher for table>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
interface Teacher {
  teacherName: string;
  phoneNumber: string;
  email: string;
  employeeID: string;
  courseID:String;
  createdAt: string;
}

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [total, setTotal] = useState(0);
  const [Tloading, setTLoading] = useState(false);

  const fetchTeachers = async () => {
    setTLoading(true);
    try {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data.teachers);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setTLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);  

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const [deleting, setDeleting] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

   const handleDelete = (email: string) => {
     if (!confirm("Are you sure you want to delete this teacher?")) return;

     setDeleting(email);
     startTransition(async () => {
       const result = await deleteTeacher(email);
       if (result.success) {
         setTeachers((prev) =>
           prev.filter((teacher) => teacher.email !== email),
         );
       } else {
         alert(result.message);
       }
       setDeleting(null);
     });
   };

  //  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [updateData, setUpdateData] = useState({ teacherName: "", phoneNumber: "", employeeID: "" });
  const [updating, setUpdating] = useState(false);

 const handleSelectTeacher = (e: React.ChangeEvent<HTMLSelectElement>) => {
   if (!e.target || !e.target.value) return; // Prevent undefined errors

   const teacher = teachers.find((t) => t.email === e.target.value);

   if (teacher) {
     setSelectedTeacher(teacher);
     setUpdateData({
       teacherName: teacher.teacherName || "",
       phoneNumber: teacher.phoneNumber || "",
       employeeID: teacher.employeeID || "",
     });
   }
 };


  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = () => {
    if (!selectedTeacher) return;

    setUpdating(true);
    startTransition(async () => {
      const result = await updateTeacher(selectedTeacher.email, updateData);
      if (result.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.email === selectedTeacher.email ? { ...t, ...updateData } : t,
          ),
        );
        alert("Teacher updated successfully!");
        setSelectedTeacher(null);
      } else {
        alert(result.message);
      }
      setUpdating(false);
    });
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        CRUD Panel for Teacher
      </h1>

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
                name="courseID" // Ensure this matches the key in formData
                className="select select-bordered w-full"
                value={formData.courseID}
                onChange={handleChange} // Use the updated handleChange function
              >
                <option value="">-- Select a Course --</option>
                <option value="R2-3">Robotics 2-3</option>
                <option value="R4-5">Robotics 4-5</option>
                <option value="R6-7">Robotics 6-7</option>
                {/* Add more courses as needed */}
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
                    "Creating..."
                  </>
                ) : (
                  "Create Teacher"
                )}
              </button>
            </div>

            {successMessage && (
              <div className="mt-4 w-full p-2">
                <div className="alert alert-info shadow-lg">
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            {formErrors.server && (
              <div className="w-full p-2">
                <div className="alert alert-error">{formErrors.server}</div>
              </div>
            )}
          </form>
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
          {/* <<<<<<<<<>>>>>>>>> */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Total Teachers: {total}</h2>
              <button
                className="btn btn-primary"
                onClick={fetchTeachers}
                disabled={Tloading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>EmployeeID</th>
                    <th>CourseID</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{teacher.teacherName}</td>
                      <td>{teacher.phoneNumber}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.employeeID}</td>
                      <td>{teacher.courseID}</td>
                      <td>
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <<<<<<<<<>>>>>>>>> */}
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
          <h2 className="mb-4 text-2xl font-bold">Delete Teacher</h2>
          {Tloading ? <p>Loading...</p> : null}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.email}
                className="card border bg-base-100 p-4 shadow-xl"
              >
                <h3 className="text-lg font-semibold">{teacher.teacherName}</h3>
                <p className="text-base">🪪 {teacher.employeeID}</p>
                <p className="text-base">📧 {teacher.email}</p>
                <p className="text-base">📞 {teacher.phoneNumber}</p>
                <p className="text-base">📖 {teacher.courseID}</p>
                <p className="text-base text-gray-500">
                  Created: {new Date(teacher.createdAt).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-error btn-sm mt-3"
                  onClick={() => handleDelete(teacher.email)}
                  disabled={isPending || deleting === teacher.email}
                >
                  {deleting === teacher.email ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
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
          <h2 className="mb-4 text-2xl font-bold">Update Teacher</h2>

          {/* Teacher Selection */}
          <div className="mb-4">
            <label className="block font-semibold">Select Teacher:</label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => handleSelectTeacher(e)} // Ensure event is passed
            >
              <option value="">-- Select a Teacher --</option>
              {teachers.map((teacher) => (
                <option key={teacher.email} value={teacher.email}>
                  {teacher.teacherName} - {teacher.email}
                </option>
              ))}
            </select>
          </div>

          {/* Update Form */}
          {selectedTeacher && (
            <div className="card bg-base-100 p-4 shadow-xl">
              <h3 className="text-lg font-semibold">
                Updating: {selectedTeacher.teacherName}
              </h3>

              <div className="mt-4 space-y-3">
                <label className="block">Teacher Name:</label>
                <input
                  type="text"
                  name="teacherName"
                  value={updateData.teacherName}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />

                <label className="block">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={updateData.phoneNumber}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />

                <label className="block">Employee ID:</label>
                <input
                  type="text"
                  name="employeeID"
                  value={updateData.employeeID}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                className="btn btn-primary mt-4"
                onClick={handleUpdateSubmit}
                disabled={isPending || updating}
              >
                {updating ? "Updating..." : "Update Teacher"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
