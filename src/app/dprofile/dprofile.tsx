"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rohit",
    email: "rohit@gmail.com",
    phone: "8948426515",
    bio: "Passionate learner and technology enthusiast.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen">
      
      {/* Main Profile Section */}
        <main className="flex-1 p-6">
          {/* Profile Header */}
          <section className="bg-blue-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-black">
              Profile Overview
            </h2>
            <p className="text-gray-600 mt-2">
              Manage and edit your personal information.
            </p>
          </section>

          {/* Profile Details */}
          <section className="mt-6 bg-white p-6 text-black rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Details</h3>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-semibold text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-gray-600">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block font-semibold text-gray-600">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-2 border rounded-md ${
                    isEditing ? "border-blue-400" : "bg-gray-100"
                  }`}
                ></textarea>
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
              {isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>
          </section>

          {/* Summary Section */}
          <section className="mt-6 bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-700">Summary</h3>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">{profile.name}</span> is a registered
              user with the email <span className="font-bold">{profile.email}</span>. Phone contact is{" "}
              <span className="font-bold">{profile.phone}</span>.
            </p>
            <p className="mt-4 italic text-gray-500">"{profile.bio}"</p>
          </section>
        </main>
    </div>
  );
};

export default Profile;
