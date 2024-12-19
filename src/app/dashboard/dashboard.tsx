// src/app/dashboard/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Correct import for v2



const Dashboard = () => {
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch upcoming courses and student information from your API
  //       const coursesResponse = await fetch('/api/courses'); // Replace with your API endpoint
  //       const studentResponse = await fetch('/api/student'); // Replace with your API endpoint

  //       if (!coursesResponse.ok || !studentResponse.ok) {
  //         throw new Error('Failed to fetch data');
  //       }

  //       const coursesData = await coursesResponse.json();
  //       const studentData = await studentResponse.json();

  //       setUpcomingCourses(coursesData);
  //       setStudentInfo(studentData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 p-6 rounded-lg shadow-sm text-black ">
        <h2 className="mb-8 text-2xl font-bold"></h2>
        <ul className="space-y-6">
          <li className="active flex items-center">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <Link href="/dashboard" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Home
            </Link>
          </li>
          <li className="active flex items-center">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <Link href="/dprofile" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Profile
            </Link>
          </li>
          <li className="active flex items-center">
            <BookOpenIcon className="h-6 w-6 text-gray-400" />
            <Link href="/denrolled" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Enrolled Courses
            </Link>
          </li>
          <li className="active flex items-center">
            <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
            <Link href="dassesments" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Assessments
            </Link>
          </li>
          <li className="active flex items-center">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <Link href="dprogress" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Course Progress
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link href="dupsessions"className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Upcoming Sessions
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link href="dhelp" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Help
            </Link>
          </li>
        </ul>
      </aside>
      
      {/* Main Content */}
        <main className="flex-1 p-6 -mt-6">
        {/* Welcome Section */}
        <section className="bg-blue-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-black">
            Welcome Back, <span className="text-blue-600">BUDDDY!</span> ✨
          </h2>
          <p className="text-gray-600 mt-2">Ready to continue your learning journey? You're making great progress!</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Resume Journey →
          </button>
        </section>

        {/* Assessment Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Assessment Activity */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-black font-bold mb-4">Assessment Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-blue-600">
                <p className="text-3xl font-bold">10</p>
                <p>Tests Assigned</p>
              </div>
              <div className="text-green-600">
                <p className="text-3xl font-bold">2</p>
                <p>Tests Completed</p>
              </div>
              <div className="text-purple-600">
                <p className="text-3xl font-bold">35</p>
                <p>Questions Attempted</p>
              </div>
              <div className="text-orange-600">
                <p className="text-3xl font-bold">12 mins</p>
                <p>Total Time Spent</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Please visit the <span className="font-bold">Assessments page</span> for all active assignments.
            </p>
          </section>

          {/* Announcements */}
          <section className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-700">Announcements</h3>
            <div className="text-pink-400 mt-6 text-6xl">💬</div>
            <p className="mt-4 text-gray-500">No Announcements</p>
            <p className="text-sm text-gray-400">Check back later for important updates and news!</p>
          </section>
        </div>

        {/* Upcoming Live Classes */}
        <section className="bg-white p-6 text-black rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold mb-4">Upcoming Live Classes</h3>
          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="text-lg font-semibold">AI on Fingertips | 2024 | BATCH 1</h4>
            <p className="text-gray-600 mt-1">
              📅 Dec 11, 2024 - Dec 31, 2024 &nbsp;&nbsp; 🕒 02:30 PM - 04:30 PM
            </p>
            <div className="mt-4 flex justify-between items-center">
              <Link href="/classdetail"className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
              JOIN CLASS
              </Link>
              <div className="space-x-2">
                <button className="text-sm bg-blue-200 px-3 py-1 rounded hover:bg-blue-300">
                  Mark Attendance for 2024-12-18
                </button>
                <button className="text-sm bg-blue-200 px-3 py-1 rounded hover:bg-blue-300">
                  Give Session Feedback
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Performance */}
        <section className="bg-white p-6 text-black rounded-lg shadow-md mt-6 text-center">
          <h3 className="text-xl font-bold text-gray-700">Overall Performance</h3>
          <p className="text-gray-500 mt-2">
            No test attempts found. Please take an assessment to view your results.
          </p>
          <p className="text-blue-600 text-3xl font-bold mt-4">Overall Mastery</p>
          <p className="text-5xl font-bold text-gray-400 mt-2">0.0%</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;