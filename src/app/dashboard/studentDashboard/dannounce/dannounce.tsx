"use client";
import Link from "next/link";
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

const Announcements = () => {
 

  return (
    <>
      {/* Content Container */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>

        {/* main announcement content */}

        <div className="ml-72 mr-14 w-full flex-1">
          {/* Page Title */}
          <div className="rounded-lg bg-blue-100 p-6 shadow">
            <h2 className="text-3xl font-bold text-black">Announcements</h2>
            <p className="mt-2 text-gray-500">
              Stay updated with the latest news and updates.
            </p>
          </div>

          {/* Recent Announcements */}
          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-bold text-gray-700">Class Update</h3>
              <p className="text-gray-500">
                Your upcoming session on AI is rescheduled to 3 PM.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-bold text-gray-700">
                New Course Announcement
              </h3>
              <p className="text-gray-500">
                Enroll in the new Blockchain Technology course starting next
                week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;