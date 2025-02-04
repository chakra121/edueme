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

const EnrolledCourses = () => {
  // Mock data for enrolled and recommended courses
  const enrolledCourses = [
    {
      id: 1,
      title: "AI ON FINGERTIPS",
      instructor: "Prof. John Smith",
      progress: 75,
      duration: "Dec 10 - Dec 30, 2024",
    },
    {
      id: 2,
      title: "ROBOTICS WORLD",
      instructor: "Jane Doe",
      progress: 40,
      duration: "Jan 1 - Feb 10, 2025",
    },
  ];

  const recommendedCourses = [
    {
      id: 3,
      title: "IOT",
      instructor: "Dr. Sarah Lee",
      duration: "Feb 15 - Mar 30, 2025",
    },
    {
      id: 4,
      title: "Introduction to Robotics",
      instructor: "Dr. Alan Turing",
      duration: "Mar 1 - Apr 10, 2025",
    },
  ];

  return (
    <>
    {/* Content Container */}
  <div className="flex  min-h-screen ">
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

{/* Main Content */}
<main className="flex-1 w-full ml-72 mr-14 ">
          {/* Header Section */}
          <section className="bg-blue-100 p-6 rounded-lg max-w-full shadow-sm">
            <h2 className="text-3xl font-bold text-black">
              Enrolled Courses 📚
            </h2>
            <p className="text-gray-600 mt-2">
              Here are the courses you're currently enrolled in.
            </p>
          </section>

          {/* Enrolled Courses */}
          <section className="mt-6">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Your Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold text-blue-600">
                    {course.title}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Duration: {course.duration}
                  </p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      Progress: {course.progress}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          <section className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Recommended Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-bold text-gray-700">
                    {course.title}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Duration: {course.duration}
                  </p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Enroll Now →
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

</div>
</>
  );
};

export default EnrolledCourses;