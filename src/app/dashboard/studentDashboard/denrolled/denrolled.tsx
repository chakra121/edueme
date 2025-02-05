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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>

        {/* Main Content */}
        <main className="ml-72 mr-14 w-full flex-1">
          {/* Header Section */}
          <section className="max-w-full rounded-lg bg-blue-100 p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-black">
              Enrolled Courses 📚
            </h2>
            <p className="mt-2 text-gray-600">
              Here are the courses you're currently enrolled in.
            </p>
          </section>

          {/* Enrolled Courses */}
          <section className="mt-6">
            <h3 className="mb-4 text-2xl font-bold text-white">Your Courses</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg bg-white p-4 shadow-md"
                >
                  <h4 className="text-lg font-bold text-blue-600">
                    {course.title}
                  </h4>
                  <p className="mt-1 text-gray-600">
                    Instructor: {course.instructor}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Duration: {course.duration}
                  </p>
                  <div className="mt-4">
                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-blue-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Progress: {course.progress}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          <section className="mt-8">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Recommended Courses
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg bg-blue-50 p-4 shadow-md"
                >
                  <h4 className="text-lg font-bold text-gray-700">
                    {course.title}
                  </h4>
                  <p className="mt-1 text-gray-600">
                    Instructor: {course.instructor}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Duration: {course.duration}
                  </p>
                  <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
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