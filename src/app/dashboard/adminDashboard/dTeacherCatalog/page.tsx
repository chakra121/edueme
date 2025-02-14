"use client";

import { useState } from "react";

export default function DTeacherCatalogPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    teacherName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!teacherData.email) 
      errors.email = "Email is required.";
    if (!teacherData.password) 
      errors.password = "Password is required.";
    else if(teacherData.password.length < 8) 
      errors.password = "Password must be at least 8 characters";

    // Validate phone number length
    if (teacherData.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }

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
      }); // Reset form fields
    } catch (error: any) {
      console.error("Error registering teacher:", error);
      setFormErrors({ server: error.message || "Failed to register teacher." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        CRUD Panel for Teacher
      </h1>

      <div role="tablist" className="tabs-boxed tabs mt-3">
        <input
          type="radio"
          name="my_tabs_2"
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
          name="my_tabs_2"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
