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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-800 p-6 text-white opacity-70">
        <h2 className="mb-8 text-2xl font-bold"></h2>
        <ul className="space-y-6">
          <li className="active flex items-center">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Home
            </span>
          </li>
          <li className="active flex items-center">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Profile
            </span>
          </li>
          <li className="active flex items-center">
            <BookOpenIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Enrolled Courses
            </span>
          </li>
          <li className="active flex items-center">
            <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Assessments
            </span>
          </li>
          <li className="active flex items-center">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Course Progress
            </span>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Upcoming Sessions
            </span>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <span className="ml-2 text-left font-sans text-lg hover:font-bold">
              Help
            </span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {/* Welcome Message */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, BUDDY!</h1>
          <p className="text-gray-600"></p>
        </section>

        {/* Enrolled Courses */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Enrolled Courses
          </h2>
          <ul className="ml-6 list-disc text-gray-700">
            <li>Artificial intelligence</li>
          </ul>
        </section>

        {/* Live Classes */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Upcoming Live Classes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
              <div>
                <p className="font-medium text-gray-900">
                  Robotics on fingers 101 Live Session
                </p>
                <p className="text-gray-600">2024-11-28 10:00 AM</p>
              </div>
              <Link
                href="/classdetail"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Join
              </Link>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow">
              <div>
                <p className="font-medium text-gray-900">
                  AI in mind Live Session
                </p>
                <p className="text-gray-600">2024-11-29 11:00 AM</p>
              </div>
              <Link
                href="/classdetail"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Join
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;