"use client";
import Link from "next/link";
import { Camera as CameraIcon } from "lucide-react";
import { QrCode as QrCodeIcon } from "lucide-react";
import { Pencil as PencilIcon } from "lucide-react";
import StudentSideBar from "../sideBar";

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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>

        {/* Attendance Section */}
        <main className="ml-72 mr-14 w-full flex-1">
          <div className="mx-auto w-full space-y-8">
            {/* Welcome Section */}
            <div className="rounded-lg bg-blue-100 p-6 shadow">
              <h2 className="text-3xl font-bold text-black">
                Attendance Management
              </h2>
              <p className="mt-2 text-gray-500">
                Explore advanced tools for managing and marking attendance
                seamlessly.
              </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Facial Recognition */}
              <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
                <CameraIcon className="mb-4 h-16 w-16 text-blue-400" />
                <h3 className="text-lg font-bold text-gray-700">
                  Facial Recognition
                </h3>
                <p className="text-center text-gray-500">
                  Use AI-powered facial recognition to mark attendance in
                  real-time.
                </p>
                <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                  Mark Now
                </button>
              </div>

              {/* QR Code Scanning */}
              <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
                <QrCodeIcon className="mb-4 h-16 w-16 text-green-400" />
                <h3 className="text-lg font-bold text-gray-700">
                  QR Code Scanning
                </h3>
                <p className="text-center text-gray-500">
                  Scan QR codes to register your attendance effortlessly.
                </p>
                <button className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                  Scan Now
                </button>
              </div>

              {/* Manual Entry */}
              <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
                <PencilIcon className="mb-4 h-16 w-16 text-yellow-400" />
                <h3 className="text-lg font-bold text-gray-700">
                  Manual Entry
                </h3>
                <p className="text-center text-gray-500">
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