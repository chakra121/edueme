"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import StudentSideBar from "../sideBar";

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
        setFormData(decoded);
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
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, profilePhoto: file.name });
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Profile Section */}
      <main className="ml-72 mr-14 w-full flex-1 ">
          {/* Welcome Section */}
          <div className="card mb-4 bg-base-100  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
            Welcome Back!  👋
            </h2>
            <p className="text-lg text-base-content">
            Update your profile and keep it up to date.            </p>
          </div>
        </div>

          

          {/* Profile Content */}
          <section className="card bg-base-100 p-8 shadow-lg">
            <h2 className="text-center text-4xl font-bold">Profile</h2>

            {/* Profile Photo Upload */}
            <div className="mt-6 flex items-center text-black justify-center space-x-6">
              {profilePhotoPreview ? (
                <img
                  src={profilePhotoPreview}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover shadow-md border-2 border-primary"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 shadow-md">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
              {isEditing && (
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-600">Upload Photo</label>
                  <input
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary"
                    onChange={handleProfilePhotoChange}
                  />
                </div>
              )}
            </div>

            {/* Profile Details Form */}
            <div className="mt-8 grid grid-cols-1  gap-6 md:grid-cols-2">
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
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium text-black">{field.label}</label>
                  {isEditing ? (
                    field.type === "select" ? (
                      <select
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleInputChange}
                        className="select select-bordered text-black w-full"
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
                        className="input input-bordered text-black w-full"
                      />
                    )
                  ) : (
                    <p className="mt-1 text-gray-800">{(profileData as any)?.[field.name]}</p>
                  )}
                </div>
              ))}

              {/* Bio Field */}
              <div className="col-span-2">
                <label className="block font-medium text-black">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered text-black w-full"
                  ></textarea>
                ) : (
                  <p className="mt-1 text-gray-800">{profileData?.bio || "N/A"}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-outline btn-neutral"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </section>
      </main>
      </div>
  );
};

export default Profile;
