// src/app/dashboard/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

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
      <aside className="w-64 bg-stone-800 text-white p-6 opacity-70">
        <h2 className="text-2xl font-bold mb-8">Student LMS</h2>
        <ul className="space-y-6">
          <li>
            <button className="block w-full text-left hover:underline">
              Home
            </button>
          </li>
          <li>
            <button className="block w-full text-left hover:underline">
              Profile
            </button>
          </li>
          <li>
            <button className="block w-full text-left hover:underline">
              Courses Registered
            </button>
          </li>
          <li>
            <button className="block w-full text-left hover:underline">
              Account
            </button>
          </li>
          <li>
            <button className="block w-full text-left hover:underline">
              Help
            </button>
          </li>
          <li>
            <button className="block w-full text-left hover:underline">
              Live Classes
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Welcome Message */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, SRI CHAKRA!
          </h1>
          <p className="text-gray-600"></p>
        </section>

        {/* Enrolled Courses */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Enrolled Courses
          </h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Artificial intelligence</li>
            
          </ul>
        </section>

        {/* Live Classes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Upcoming Live Classes
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                   Robotics on fingers 101 Live Session
                </p>
                <p className="text-gray-600">2024-11-28 10:00 AM</p>
              </div>
              <Link
                href="/classdetail"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
              Join
              </Link>
            </div>
            <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  AI in mind Live Session
                </p>
                <p className="text-gray-600">2024-11-29 11:00 AM</p>
              </div>
              <Link
                href="/classdetail"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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