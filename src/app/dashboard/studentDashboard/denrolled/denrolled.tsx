"use client";
import Link from "next/link";
import StudentSideBar from "../sideBar";
import React from "react";

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Content */}
      <main className="ml-72 mr-14 w-full flex-1 ">
        {/* Header Section */}
        <div className="card mb-4 bg-base-100  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
            Enrolled Courses 📚            </h2>
            <p className="text-lg text-base-content">
            Here are the courses you're currently enrolled in.
          </p>
          </div>
        </div>

        
        {/* Enrolled Courses */}
        <section className="mt-6">
          <h3 className="mb-4 text-2xl font-bold text-gray-600">Your Courses</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="card bg-base-100 shadow-md p-6">
                <h4 className="text-xl font-bold text-primary">{course.title}</h4>
                <p className="mt-1 text-gray-600">Instructor: {course.instructor}</p>
                <p className="mt-1 text-sm text-gray-500">Duration: {course.duration}</p>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <progress className="progress progress-primary w-full" value={course.progress} max="100"></progress>
                  <p className="mt-2 text-sm text-gray-500">Progress: {course.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="mt-8">
          <h3 className="mb-4 text-2xl font-bold text-gray-600">Recommended Courses</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="card bg-base-200 shadow-md p-6">
                <h4 className="text-xl font-bold text-gray-800">{course.title}</h4>
                <p className="mt-1 text-gray-600">Instructor: {course.instructor}</p>
                <p className="mt-1 text-sm text-gray-500">Duration: {course.duration}</p>
                <button className="mt-4 btn btn-primary">
                  Enroll Now →
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EnrolledCourses;
