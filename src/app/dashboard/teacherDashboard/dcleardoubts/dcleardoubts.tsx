// src/app/dashboard/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Correct import for v2

interface Doubt {
  id: number;
  question: string;
  image?: string;
  answer?: string;
}

const Cleardoubts = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  // Fetch all doubts from backend
  useEffect(() => {
    const fetchDoubts = async () => {
      // try {
        const response = await fetch("/api/doubts"); // Mock API Call
        const data = await response.json();
        setDoubts(data);
      // } catch (error) {
      //   console.error("Error fetching doubts:", error);
      // }
    };
    fetchDoubts();
    const interval = setInterval(fetchDoubts, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle answering a doubt
  const submitAnswer = async (id: number) => {
    if (!answers[id]) return;

    setLoading((prev) => ({ ...prev, [id]: true }));

    await fetch(`/api/doubts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: answers[id] }),
    });

    setDoubts((prev) =>
      prev.map((doubt) => (doubt.id === id ? { ...doubt, answer: answers[id] } : doubt))
    );

    setAnswers((prev) => ({ ...prev, [id]: "" }));
    setLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed rounded-lg bg-blue-100 p-6 text-black shadow-sm">
        <h2 className="mb-8 text-2xl font-bold"></h2>
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

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14">
        
      <div className=" mx-auto p-6 bg-white text-black dark:bg-gray-900 shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">
        Student Doubts & Responses
      </h2>

      {/* List of Doubts */}
      <div className="space-y-6">
        {doubts.length === 0 ? (
          <p className="text-gray-500 text-center">No doubts to answer.</p>
        ) : (
          doubts.map((doubt) => (
            <motion.div
              key={doubt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
            >
              <p className="font-medium text-gray-900 dark:text-white">{doubt.question}</p>

              {/* Display Image if attached */}
              {doubt.image && (
                <img src={doubt.image} alt="Doubt" className="mt-3 h-32 w-auto rounded-lg border" />
              )}

              {/* If already answered */}
              {doubt.answer ? (
                <p className="text-green-600 dark:text-green-400 mt-3 font-semibold">
                  Answer: {doubt.answer}
                </p>
              ) : (
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={answers[doubt.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [doubt.id]: e.target.value })}
                    placeholder="Write your answer..."
                    className="flex-grow p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => submitAnswer(doubt.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    {loading[doubt.id] ? "Submitting..." : "Submit"} <CheckCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>

      </main>
    </div>
  );
};
export default Cleardoubts;