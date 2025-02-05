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
      <div className="flex min-h-screen min-w-full gap-6">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>

        {/* main announcement content */}

        <div className="ml-72 mr-14 w-full flex-1">
          <div className="rounded-lg bg-blue-100 p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              Upcoming Sessions
            </h1>
          </div>

          <div className="-ml-6 mt-4 min-h-screen rounded-xl p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-semibold text-gray-800">
                      {session.title}
                    </h2>
                    <p className="mb-4 text-gray-600">{session.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Instructor:</span>{" "}
                        {session.instructor}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Date:</span>{" "}
                        {session.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Time:</span>{" "}
                        {session.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Duration:</span>{" "}
                        {session.duration}
                      </p>
                    </div>
                    <a
                      href={session.joinLink}
                      className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
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