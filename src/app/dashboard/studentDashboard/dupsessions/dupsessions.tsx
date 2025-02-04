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

const Upcoming = () => {
  interface Session {
    id: string;
    title: string;
    instructor: string;
    date: string;
    time: string;
    duration: string;
    description: string;
    joinLink: string;
  }
  
  const upcomingSessions: Session[] = [
    {
      id: "1",
      title: "Introduction to React",
      instructor: "John Doe",
      date: "2023-10-25",
      time: "10:00 AM",
      duration: "1 hour",
      description: "Learn the basics of React and build your first component.",
      joinLink: "#",
    },
    {
      id: "2",
      title: "Advanced TypeScript",
      instructor: "Jane Smith",
      date: "2023-10-27",
      time: "2:00 PM",
      duration: "1.5 hours",
      description: "Deep dive into advanced TypeScript concepts.",
      joinLink: "#",
    },
    {
      id: "3",
      title: "Tailwind CSS Workshop",
      instructor: "Alice Johnson",
      date: "2023-10-30",
      time: "11:00 AM",
      duration: "2 hours",
      description: "Master Tailwind CSS and build responsive designs.",
      joinLink: "#",
    },
  ];

  return (
    <>
    {/* Content Container */}
  <div className="flex gap-6 min-w-full min-h-screen">
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

    {/* main announcement content */}

    <div className="flex-1 w-full ml-72 mr-14">
      
    <div className="rounded-lg bg-blue-100 p-6 shadow-sm">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Sessions</h1>

      </div>

    <div className="p-6 rounded-xl -ml-6 mt-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{session.title}</h2>
              <p className="text-gray-600 mb-4">{session.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Instructor:</span> {session.instructor}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Date:</span> {session.date}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Time:</span> {session.time}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Duration:</span> {session.duration}
                </p>
              </div>
              <a
                href={session.joinLink}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Join Session
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    </div>
</div>
</>
  );
};

export default Upcoming;