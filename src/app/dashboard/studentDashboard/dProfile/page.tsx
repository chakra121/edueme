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
  const [toastMessage, setToastMessage] = useState("");
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
        const response = await fetch("/api/user/getProfile", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = (await response.json()) as ProfileData;
        setFormData(data);
      } catch {
        showToast("Error fetching profile", "error");
      }
    };

    void fetchUserProfile();
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

      const result = (await response.json()) as { error?: string };

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

  const showToast = (message: string, _type: "success" | "error") => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="max-w-full">
      {toastMessage && (
        <div className="fixed right-4 bottom-4 z-50">
          <div
            className={`alert ${
              toastMessage.includes("success") ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <section className="card bg-base-100 mb-4 p-6 shadow-lg">
        <h2 className="text-center text-xl font-bold">Student&#39;s Profile</h2>

        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          {/* First Name */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="firstName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              First Name:
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="lastName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Last Name:
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Gender */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="gender"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Gender:
            </label>
            <select
              id="gender"
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

          {/* School Name */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="schoolName"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              School Name:
            </label>
            <input
              id="schoolName"
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Parent Email */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="parentEmail"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Parent Email:
            </label>
            <input
              id="parentEmail"
              type="text"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Grade */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="grade"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Grade:
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              disabled={!editing}
              className="select select-bordered"
            >
              <option disabled value="">
                Select Grade
              </option>
              <option>2 to 3</option>
              <option>4 to 5</option>
              <option>6 to 7</option>
              <option>8 to 9</option>
              <option>10 to 12</option>
            </select>
          </div>

          {/* Email (Read-only) */}
          <div className="form-control flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="input input-bordered w-full cursor-not-allowed bg-gray-200 text-gray-500"
            />
          </div>
        </div>

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
