// src/app/dashboard/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Correct import for v2
import exp from "constants";
const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key"; // Replace in .env

const Dashboard = () => {
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    // Retrieve the global variable
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Verify and decode the token
      const decoded = jwt.decode(token) as {
        id: string;
        name: string;
        email: string;
        role: string;
      };
      console.log("Decoded token:", decoded);

        setUserData(decoded); // Save user data in the state
      } catch (error) {
        console.error("Error verifying token:", (error as Error).message);
        // Optionally: Handle invalid/expired token
      }
    }
  }, []);
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
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 rounded-lg bg-blue-100 p-6 text-black shadow-sm  h-screen fixed ">
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
              Course Progress
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
              Student Analysis
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dupsessions"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Class Details
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dhelp"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Clear Doubts
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14">
        {/* Welcome Section */}
        <section className="rounded-lg bg-blue-100 p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-black">Welcome back {userData?.name}!</h2>
          <p className="mt-2 text-gray-600">
            Ready to continue your learning journey? You're making great
            progress!
          </p>
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Resume Journey →
          </button>
        </section>

        {/* Assessment Section */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Assessment Activity */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-black">
              Assessment Activity
            </h3>
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
              Please visit the{" "}
              <span className="font-bold">Assessments page</span> for all active
              assignments.
            </p>
          </section>

          {/* Announcements */}
          <section className="rounded-lg bg-white p-6 text-center shadow-md">
            <h3 className="text-xl font-bold text-gray-700">Announcements</h3>
            <div className="mt-6 text-6xl text-pink-400">💬</div>
            <p className="mt-4 text-gray-500">No Announcements</p>
            <p className="text-sm text-gray-400">
              Check back later for important updates and news!
            </p>
          </section>
        </div>

        {/* Upcoming Live Classes */}
        <section className="mt-6 rounded-lg bg-white p-6 text-black shadow-md">
          <h3 className="mb-4 text-xl font-bold">Upcoming Live Classes</h3>
          <div className="rounded-md bg-blue-50 p-4">
            <h4 className="text-lg font-semibold">
              AI on Fingertips | 2024 | BATCH 1
            </h4>
            <p className="mt-1 text-gray-600">
              📅 Dec 11, 2024 - Dec 31, 2024 &nbsp;&nbsp; 🕒 02:30 PM - 04:30 PM
            </p>
            <div className="mt-4 flex items-center justify-between">
              <Link
                href="/classdetail"
                className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
              >
                JOIN CLASS
              </Link>
              <div className="space-x-2">
                <button className="rounded bg-blue-200 px-3 py-1 text-sm hover:bg-blue-300">
                  Mark Attendance for 2024-12-18
                </button>
                <button className="rounded bg-blue-200 px-3 py-1 text-sm hover:bg-blue-300">
                  Give Session Feedback
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Performance */}
        <section className="mt-6 rounded-lg bg-white p-6 text-center text-black shadow-md">
          <h3 className="text-xl font-bold text-gray-700">
            Overall Performance
          </h3>
          <p className="mt-2 text-gray-500">
            No test attempts found. Please take an assessment to view your
            results.
          </p>
          <p className="mt-4 text-3xl font-bold text-blue-600">
            Overall Mastery
          </p>
          <p className="mt-2 text-5xl font-bold text-gray-400">0.0%</p>
        </section>
      </main>
    </div>
  );
};
export default Dashboard;