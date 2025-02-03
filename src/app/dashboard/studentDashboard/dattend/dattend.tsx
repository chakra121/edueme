"use client";
import Link from "next/link";
import { Camera as CameraIcon } from "lucide-react";
import { QrCode as QrCodeIcon } from "lucide-react";
import { Pencil as PencilIcon } from "lucide-react";

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

const Attendance = () => {
 

  return (
    <>
    {/* Content Container */}
  <div className="flex gap-6 min-w-full min-h-screen p-8 mt-16">
  {/* Sidebar */}
  <aside className="w-64 rounded-lg bg-blue-100 p-6 text-black shadow-sm  h-screen fixed">
        <h2 className="mb-8 text-2xl font-bold"></h2>
        <ul className="space-y-6">
          <li className="active flex items-center">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dhome"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Home
            </Link>
          </li>
          <li className="active flex items-center">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dprofile"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Profile
            </Link>
          </li>
          <li className="active flex items-center">
            <BookOpenIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/denrolled"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Enrolled Courses
            </Link>
          </li>
          <li className="active flex items-center">
            <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dannounce"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Announcements
            </Link>
          </li>
          <li className="active flex items-center">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dattend"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Attendance
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dupsessions"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Upcoming Sessions
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dhelp"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Any Doubts?
            </Link>
          </li>
        </ul>
      </aside>

{/* Attendance Section */}
<main className="flex-1 w-full ml-72 mr-14">
        <div className="w-full mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="rounded-lg bg-blue-100 p-6 shadow">
            <h2 className="text-3xl font-bold text-black">Attendance Management</h2>
            <p className="text-gray-500 mt-2">
              Explore advanced tools for managing and marking attendance seamlessly.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facial Recognition */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
              <CameraIcon className="h-16 w-16 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-700">Facial Recognition</h3>
              <p className="text-gray-500 text-center">
                Use AI-powered facial recognition to mark attendance in real-time.
              </p>
              <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Mark Now
              </button>
            </div>

            {/* QR Code Scanning */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
              <QrCodeIcon className="h-16 w-16 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-700">QR Code Scanning</h3>
              <p className="text-gray-500 text-center">
                Scan QR codes to register your attendance effortlessly.
              </p>
              <button className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                Scan Now
              </button>
            </div>

            {/* Manual Entry */}
            <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
              <PencilIcon className="h-16 w-16 text-yellow-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-700">Manual Entry</h3>
              <p className="text-gray-500 text-center">
                Enter attendance manually when needed for flexibility.
              </p>
              <button className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
                Enter Now
              </button>
            </div>
          </div>
        </div>
      </main>

</div>
</>
  );
};

export default Attendance;