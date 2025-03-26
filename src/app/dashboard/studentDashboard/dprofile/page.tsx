"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type ProfileData = {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  schoolName: string;
  phoneNumber: string;
  email: string;
  parentEmail: string;
};

const DProfilePage = () => {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // ✅ Toast message state
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    schoolName: "",
    phoneNumber: "",
    email: "",
    parentEmail: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch("/api/user/getProfile");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data: ProfileData = await response.json(); // ✅ Enforce TypeScript type
        setFormData(data);
      } catch (err) {
        showToast("Error fetching profile", "error");
      }
    };

    void fetchUserProfile(); // ✅ Avoid no-floating-promise error
  }, [session?.user?.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value.trim() === "")) {
      showToast("All fields must be filled!", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showToast("Profile updated successfully!", "success");
        setEditing(false);
      } else {
        showToast(result?.error ?? "Update failed. Try again!", "error");
      }
    } catch {
      showToast("Something went wrong. Try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Function to show toast
  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="max-w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`alert ${toastMessage.includes("success") ? "alert-success" : "alert-error"} shadow-lg`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Profile Section */}
      <section className="card mt-4 bg-base-100 p-6 shadow-lg">
        <h2 className="text-center text-xl font-bold">Profile</h2>

        {/* Form Fields */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name:</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name:</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender:</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!editing}
              className="select select-bordered"
            >
              <option disabled value="">
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Email (Always Disabled) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="input input-bordered w-full cursor-not-allowed bg-gray-200"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          {!editing ? (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Update Details
            </button>
          ) : (
            <>
              <button
                className={`btn btn-success ${isLoading ? "btn-disabled" : ""}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="btn btn-error"
                onClick={() => setEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default DProfilePage;
