"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const DProfilePage = () => {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
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
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        alert("Error fetching profile");
      }
    };

    fetchUserProfile();
  }, [session?.user?.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value.trim() === "")) {
      alert("All fields must be filled!");
      return;
    }

    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Convert response to JSON

      if (response.ok) {
        alert("Profile updated successfully!");
        setEditing(false);
      } else {
        alert(result.error || "Update failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Try again later.");
      console.error("Fetch error:", error);
    }
  };


  return (
    <div className="max-w-full">
      {/* Header Section */}
      <div className="card bg-base-100 p-6 text-center shadow-xl">
        <h2 className="text-2xl font-bold">
          Welcome Back {formData.firstName}! 👋
        </h2>
        <p>Update your profile and keep it up to date.</p>
      </div>

      {/* Profile Section */}
      <section className="card mt-4 bg-base-100 p-6 shadow-lg">
        <h2 className="text-center text-xl font-bold">Profile</h2>

        {/* Profile Picture */}
        <div className="mt-4 flex items-center justify-center">
          <div className="avatar">
            <div className="w-24 rounded-full border">
              
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">First Name:</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Last Name:</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Gender:</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!editing}
              className={`select select-bordered text-base-content ${!editing ? "cursor-not-allowed bg-gray-200" : ""}`}
            >
              <option disabled value="">
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* School Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">School Name:</span>
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="School Name"
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">
                Phone Number:
              </span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Parent Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">
                Parent Email:
              </span>
            </label>
            <input
              type="text"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="Parent Email"
              disabled={!editing}
              className="input input-bordered w-full"
            />
          </div>

          {/* Grade Dropdown */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Grade:</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              disabled={!editing}
              className={`select select-bordered text-base-content ${!editing ? "cursor-not-allowed bg-gray-200" : ""}`}
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

          {/* Email (Always Disabled) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Email:</span>
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
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
              <button
                className="btn btn-error"
                onClick={() => setEditing(false)}
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
