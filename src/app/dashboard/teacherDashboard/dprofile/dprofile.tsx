"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import TeacherSideBar from "../sideBar";

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key";

const Profile = () => {
  // Initialize states
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    skills: "",
    experience: "",
    bio: "",
    resume: "",
  });

  // Fetch user token from cookies
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwt.decode(token) as {
          id: string;
          name: string;
          email: string;
          role: string;
        };

        if (decoded) {
          // Simulating fetched data from backend
          setFormData({
            firstName: "John",
            lastName: "Doe",
            designation: "AI Instructor",
            phoneNumber: "9876543210",
            email: decoded.email,
            dob: "1990-05-10",
            gender: "Male",
            skills: "Python, AI, ML",
            experience: "5 years",
            bio: "Passionate about AI and teaching.",
            resume: "john_doe_resume.pdf",
          });

          setProfilePhotoPreview("/default-profile.png"); // Default profile image
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Profile Photo Change
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Resume Upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, resume: file.name }));
    }
  };

  // Save Edited Data
  const handleSave = () => {
    // Here, you'd send `formData` to the backend API
    console.log("Updated Profile Data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14 px-4">
        <div className="max-w-full mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-4xl text-base-content">Welcome Back!</h2>
              <p className="mt-3 text-lg text-base-content">
                Ready to update your profile? You're making great progress!
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="card bg-base-100 shadow-xl p-8">
            <div className="card-body">
              <h2 className="text-4xl font-bold text-center text-base-content">Profile</h2>

              {/* Profile Image Upload */}
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={profilePhotoPreview || "/default-profile.png"} alt="Profile" />
                  </div>
                </div>
                {isEditing && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Upload Photo</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full max-w-xs"
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Designation", name: "designation" },
                  { label: "Phone Number", name: "phoneNumber" },
                  { label: "Email", name: "email" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Skills", name: "skills" },
                  { label: "Experience", name: "experience" },
                ].map((field) => (
                  <div key={field.name} className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">{field.label}</span>
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    ) : (
                      <p className="mt-1 text-base-content">{formData[field.name as keyof typeof formData] || "N/A"}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Resume Upload */}
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text text-base-content">Upload Resume</span>
                </label>
                {isEditing ? (
                  <input type="file" className="file-input file-input-bordered w-full" onChange={handleResumeChange} />
                ) : (
                  formData.resume && (
                    <a href={`/path/to/resume/${formData.resume}`} className="mt-1 text-blue-500 hover:underline">
                      View Resume
                    </a>
                  )
                )}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button className="btn btn-neutral" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
