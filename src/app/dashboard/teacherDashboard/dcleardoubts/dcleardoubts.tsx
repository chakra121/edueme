"use client";
import { useState, useEffect } from "react";
import TeacherSideBar from "../sideBar";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import "chart.js/auto";

interface Doubt {
  id: number;
  question: string;
  image?: string;
  answer?: string;
}

const ClearDoubts = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  // Fetch all doubts from backend
  useEffect(() => {
    const fetchDoubts = async () => {
       try {
        const response = await fetch("/api/doubts"); // Mock API Call
        const data = await response.json();
        setDoubts(data);
       } catch (error) {
         console.error("Error fetching doubts:", error);
       }
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14 px-4">
        <div className="card bg-base-100 p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-primary">Student Doubts & Responses</h2>
          <p className="text-gray-500 mt-2">Answer students' questions to help them understand better.</p>
        </div>

        {/* List of Doubts */}
        <div className="mt-6 space-y-6">
          {doubts.length === 0 ? (
            <p className="text-gray-500 text-center">No doubts to answer.</p>
          ) : (
            doubts.map((doubt) => (
              <motion.div
                key={doubt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-base-100 p-5 shadow-lg"
              >
                <p className="font-medium text-gray-900">{doubt.question}</p>

                {/* Display Image if attached */}
                {doubt.image && (
                  <img src={doubt.image} alt="Doubt" className="mt-3 h-32 w-auto rounded-lg border" />
                )}

                {/* If already answered */}
                {doubt.answer ? (
                  <p className="text-green-600 font-semibold mt-3">Answer: {doubt.answer}</p>
                ) : (
                  <div className="mt-3 flex flex-col text-black sm:flex-row gap-3">
                    <input
                      type="text"
                      value={answers[doubt.id] || ""}
                      onChange={(e) => setAnswers({ ...answers, [doubt.id]: e.target.value })}
                      placeholder="Write your answer..."
                      className="input input-bordered flex-grow"
                    />
                    <button
                      onClick={() => submitAnswer(doubt.id)}
                      className="btn btn-success flex items-center gap-2"
                    >
                      {loading[doubt.id] ? "Submitting..." : "Submit"} <CheckCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ClearDoubts;
