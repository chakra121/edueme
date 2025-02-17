"use client";
import StudentSideBar from "../sideBar";
import React from "react";

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
    <div className="flex min-h-screen gap-6">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Content */}
      <div className="ml-72 mr-14 w-full flex-1">
        {/* Header Section */}
        <div className="card mb-4 bg-base-100  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
            📅 Upcoming Sessions           </h2>
            <p className="text-lg text-base-content">
            Manage and track upcoming sessions            </p>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body p-6">
                <h2 className="card-title text-xl font-semibold text-gray-800">{session.title}</h2>
                <p className="text-gray-600">{session.description}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <p><span className="font-medium">Instructor:</span> {session.instructor}</p>
                  <p><span className="font-medium">Date:</span> {session.date}</p>
                  <p><span className="font-medium">Time:</span> {session.time}</p>
                  <p><span className="font-medium">Duration:</span> {session.duration}</p>
                </div>

                <a
                  href={session.joinLink}
                  className="mt-6 btn btn-primary text-white"
                >
                  Join Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
