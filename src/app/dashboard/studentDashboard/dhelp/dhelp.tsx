"use client";
import { useState, useEffect } from "react";
import { PaperAirplaneIcon, CameraIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Doubt {
  id: number;
  question: string;
  image?: string;
  answer?: string;
}

const Help = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [newDoubt, setNewDoubt] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoubts = async () => {
      // try {
        const response = await fetch("/api/doubts"); // Mock API call
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const submitDoubt = async () => {
    if (!newDoubt.trim()) return;

    setLoading(true);
    let imageUrl = "";

    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await uploadResponse.json();
      imageUrl = result.url;
    }

    const newEntry = { id: Date.now(), question: newDoubt, image: imageUrl , answer :""};
    setDoubts([...doubts, newEntry]);
    setNewDoubt("");
    setSelectedImage(null);

    await fetch("/api/doubts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    setMessage("Doubt submitted successfully!");
    setTimeout(() => setMessage(""), 2000);
    setLoading(false);
  };

  const fetchDoubts = async () => {
    try {
      const response = await fetch("/api/doubts"); // Fetch updated doubts
      const data = await response.json();
      setDoubts(data);
    } catch (error) {
      console.error("Error fetching doubts:", error);
    }
  };
  
  // Call the fetchDoubts function when the component is mounted or updated
  useEffect(() => {
    fetchDoubts();
  }, [message]); // Re-fetch doubts when a message is displayed (answer is posted)

  return (
    <>
    {/* Content Container */}
  <div className="flex gap-6 min-w-full min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 rounded-lg bg-blue-100 p-6 text-black shadow-sm  h-screen fixed">
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
              Enrolled Courses
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
              Attendance
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dupsessions"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Upcoming Sessions
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link
              href="/dashboard/studentDashboard/dhelp"
              className="ml-2 text-left font-sans text-lg hover:cursor-pointer hover:font-bold"
            >
              Any Doubts?
            </Link>
          </li>
        </ul>
      </aside>

    {/* main announcement content */}

    <div className="flex-1 w-full ml-72 mr-14">

    <div className="rounded-lg bg-blue-100 p-6 shadow-sm">
    <h2 className="text-3xl font-bold text-black dark:text-blue-400 mb-6">
        Need HELP? Ask Your Doubts!
      </h2>
      </div>
      
    <div className=" mx-auto p-6 mt-4 bg-white text-black dark:bg-gray-900 shadow-lg rounded-xl">
      
      {/* Doubt Input Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          value={newDoubt}
          onChange={(e) => setNewDoubt(e.target.value)}
          placeholder="Type your question..."
          className="w-full p-2 bg-transparent focus:outline-none dark:text-white mb-3"
        />

        {/* Image Upload Section */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
            <CameraIcon className="h-5 w-5" />
            Add Image
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="h-20 w-20 object-cover rounded-lg border border-gray-300"
              />
              <button
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => setSelectedImage(null)}
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>

        <button
          onClick={submitDoubt}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Submitting..." : "Ask"}
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Success Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 text-green-600 font-semibold"
        >
          {message}
        </motion.p>
      )}

      {/* List of Doubts */}
      <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
        Your Questions
      </h3>
      <div className="mt-3 space-y-4">
        {doubts.length === 0 ? (
          <p className="text-gray-500">No doubts asked yet.</p>
        ) : (
          doubts.map((doubt) => (
            <motion.div
              key={doubt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800"
            >
              <p className="font-medium text-gray-900 dark:text-white">{doubt.question}</p>
              {doubt.image && (
                <img src={doubt.image} alt="Doubt" className="mt-2 h-32 w-auto rounded-lg border" />
              )}
              {doubt.answer? (
                <p className="text-green-600 dark:text-green-400 mt-2">Teacher: {doubt.answer}</p>
              ) : (
                <p className="text-gray-500 mt-2">Awaiting response...</p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>

    </div>
</div>
</>
  );
};

export default Help;