"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import StudentSideBar from "../sideBar";

import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Correct import for v2

const Profile = () => {
  const [profileData, setProfileData] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    country: string;
    bio?: string;
    profilePhoto?: string;
  } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    bio: "",
    profilePhoto: "",
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data or decode JWT
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as typeof formData;
        setProfileData(decoded);
        setFormData(decoded); // Pre-fill the form
        setProfilePhotoPreview(decoded.profilePhoto || null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhotoPreview(reader.result as string); // Update live preview
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, profilePhoto: file.name }); // Save file name
    }
  };

  const handleSave = () => {
    // Save updated data
    setProfileData(formData);
    setIsEditing(false);
  };

  return (
    <>
      {/* Content Container */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>

        {/* Profile Section */}
        <main className="ml-72 mr-14 w-full flex-1">
          <div className="mx-auto max-w-full space-y-8">
            {/* Welcome Section */}
            <div className="rounded-lg bg-blue-100 p-6 shadow-sm">
              <h2 className="text-3xl font-bold text-black">Welcome Back!</h2>
              <p className="mt-3 text-gray-500">
                Ready to update your profile? You're making great progress!
              </p>
            </div>
            {/* Profile Content */}
            <section className="mx-auto max-w-full rounded-lg bg-white p-8 shadow-lg">
              <h2 className="text-center text-4xl font-bold text-gray-800">
                Profile
              </h2>
              <div className="mt-6 flex items-center justify-center space-x-6">
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 shadow-md">
                    <span className="text-gray-500">No Photo</span>
                  </div>
                )}
                {isEditing && (
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm font-medium text-gray-600">
                      Upload Photo
                    </label>
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      className="rounded border px-3 py-2 text-sm"
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                )}
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 border-black text-black sm:grid-cols-2">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Phone Number", name: "phoneNumber" },
                  { label: "Email", name: "email" },
                  {
                    label: "Gender",
                    name: "gender",
                    type: "select",
                    options: ["", "Male", "Female", "Other"],
                  },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  // { label: "City", name: "city" },
                  // { label: "State", name: "state" },
                  // { label: "Country", name: "country" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-medium text-gray-800">
                      {field.label}
                    </label>
                    {isEditing ? (
                      field.type === "select" ? (
                        <select
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded border px-3 py-2"
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          className="mt-1 w-full rounded border px-3 py-2"
                        />
                      )
                    ) : (
                      <p className="mt-1 text-gray-800">
                        {(profileData as any)?.[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block font-medium text-gray-600">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded border px-3 py-2"
                    ></textarea>
                  ) : (
                    <p className="mt-1 text-gray-800">
                      {profileData?.bio || "N/A"}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
