"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";


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

const Announcements = () => {
 

  return (
    <>
    {/* Content Container */}
  <div className="flex gap-6 min-w-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 rounded-lg bg-blue-100 p-6 text-black shadow-sm  h-screen fixed ">
        <h2 className="mb-8 text-2xl font-bold"></h2>
        <ul className="space-y-6">
          <li className="active flex items-center">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dhome"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Home
            </Link>
          </li>
          <li className="active flex items-center">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dprofile"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Profile
            </Link>
          </li>
          <li className="active flex items-center">
            <BookOpenIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dcourseprogress"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Course Progress
            </Link>
          </li>
          <li className="active flex items-center">
            <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dannounce"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Announcements
            </Link>
          </li>
          <li className="active flex items-center">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dstudentanalysis"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Student Analysis
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dclassdetails"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Class Details
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/teacherDashboard/dcleardoubts"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Clear Doubts
            </Link>
          </li>
        </ul>
      </aside>

    {/* main announcement content */}

    <div className="flex-1 p-0 w-full ml-72">
      {/* Page Title */}
      <div className="rounded-lg bg-blue-100 p-6 shadow">
        <h2 className="text-3xl font-bold text-black">Announcements</h2>
        <p className="text-gray-500 mt-2">Stay updated with the latest news and updates.</p>
      </div>

      {/* Create New Announcement */}
      <div className="rounded-lg mt-8 bg-white p-6 shadow">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Create a New Announcement</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter announcement title"
              className="w-full rounded-md border px-4 py-2 text-sm text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              placeholder="Enter announcement details"
              className="w-full rounded-md border px-4 py-2 text-sm text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Post Announcement
          </button>
        </form>
      </div>

      {/* Recent Announcements */}
      <div className="space-y-4 mt-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-700">Class Update</h3>
          <p className="text-gray-500">Your upcoming session on AI is rescheduled to 3 PM.</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-bold text-gray-700">New Course Announcement</h3>
          <p className="text-gray-500">Enroll in the new Blockchain Technology course starting next week.</p>
        </div>
      </div>
</div>
</div>
</>
  );
};

export default Announcements;