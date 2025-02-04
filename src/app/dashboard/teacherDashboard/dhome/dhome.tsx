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
} from "@heroicons/react/24/outline";
import ReactApexChart from "react-apexcharts"; // Import ApexCharts component

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [doubts, setDoubts] = useState(3); // Example of unresolved doubts
  const [assignedClass, setAssignedClass] = useState({
    name: "AI on Fingertips | 2024 | BATCH 1",
    startDate: "Dec 11, 2024",
    endDate: "Dec 31, 2024",
    time: "02:30 PM - 04:30 PM",
    teacher: "Professor John Doe",
    attendanceMarked: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          setUserData(decoded); // Set user data after decoding JWT
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading user data...</p>
      </div>
    );
  }

  // Attendance Chart Data Example
  const attendanceChartData = {
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    chart: {
      type: "bar",
      height: 240,
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 h-screen fixed rounded-lg bg-blue-100 p-6 text-black shadow-sm">
        <h2 className="mb-8 text-2xl font-bold">Dashboard</h2>
        <ul className="space-y-6">
          {[{ href: '/dashboard/teacherDashboard/dhome', icon: HomeIcon, label: 'Home' },
            { href: '/dashboard/teacherDashboard/dprofile', icon: UserIcon, label: 'Profile' },
            { href: '/dashboard/teacherDashboard/dcourseprogress', icon: BookOpenIcon, label: 'Course Progress' },
            { href: '/dashboard/teacherDashboard/dannounce', icon: ClipboardDocumentIcon, label: 'Announcements' },
            { href: '/dashboard/teacherDashboard/dstudentanalysis', icon: Cog6ToothIcon, label: 'Student Analysis' },
            { href: '/dashboard/teacherDashboard/dclassdetails', icon: ClockIcon, label: 'Class Details' },
            { href: '/dashboard/teacherDashboard/dcleardoubts', icon: QuestionMarkCircleIcon, label: 'Clear Doubts' }].map(({ href, icon: Icon, label }) => (
            <li key={href} className="flex items-center">
              <Icon className="h-6 w-6 text-gray-400" />
              <Link href={href} className="ml-2 text-lg font-sans hover:cursor-pointer hover:font-bold">{label}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 w-full ml-72 mr-14">
        <section className="rounded-lg bg-blue-100 p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-black">Welcome back, {userData?.name}!</h2>
          <p className="mt-2 text-gray-600">You're doing an amazing job guiding your students!</p>
          <p className="mt-4 text-gray-600">
            You currently have <strong>{assignedClass.name}</strong> with {assignedClass.teacher}.
            Your next class is on <strong>{assignedClass.startDate}</strong> at <strong>{assignedClass.time}</strong>.
          </p>
          <div className="mt-4">
            <Link
              href="/dashboard/teacherDashboard/dclassdetails"
              className="btn btn-primary"
            >
              View Class Details
            </Link>
          </div>
        </section>

       
        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* Courses Section */}
          <section className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-black">Your Courses</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Robotics Grade 4-5</li>
              <li>Robotics with AI Grade 2-3</li>
            </ul>
          </section>

          {/* Announcements Section */}
          <section className="rounded-lg bg-white p-6 text-center shadow-md">
            <h3 className="text-xl font-bold text-gray-700">Announcements</h3>
            <div className="mt-6 text-6xl text-pink-400">💬</div>
            <p className="mt-4 text-gray-500">No Announcements</p>
            <p className="text-sm text-gray-400">Check back later for important updates and news!</p>
          </section>
        </div>

        {/* Live Classes Section */}
        <section className="mt-6 rounded-lg bg-white p-6 text-black shadow-md">
          <h3 className="mb-4 text-xl font-bold">Live Classes</h3>
          <div className="rounded-md bg-blue-50 p-4">
            <h4 className="text-lg font-semibold">
              {assignedClass.name}
            </h4>
            <p className="mt-2 text-gray-600">
              📚 <a href="https://yourclasslink.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Class Link
              </a>
            </p>
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/teacherDashboard/dclassdetails"
                className="btn btn-warning btn-sm"
              >
                Update Class
              </Link>
            </div>
          </div>
        </section>

        {/* Doubts Section */}
        <section className="mt-6 rounded-lg bg-yellow-50 p-6 shadow-md">
          <h4 className="text-lg font-semibold flex items-center justify-center text-black">
            Doubts
            <span className="ml-2 text-red-500 text-xs font-semibold bg-red-100 rounded-full px-2 py-1">
              {doubts}
            </span>
          </h4>
          <p className="mt-1 text-gray-600 text-center">💬 Students have raised {doubts} unresolved doubts for this session. Click to view.</p>
          <div className="mt-4 text-center">
            <Link href="/dashboard/teacherDashboard/dcleardoubts" className="btn btn-warning">
              View Doubts
            </Link>
          </div>
        </section>

         {/* Bar Chart Section */}
         <section className="mt-6 rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-bold text-black mb-4">Attendance</h3>
          <ReactApexChart options={attendanceChartData} series={attendanceChartData.series} type="bar" height={240} />
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
