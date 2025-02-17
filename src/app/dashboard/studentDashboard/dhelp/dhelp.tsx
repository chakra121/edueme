"use client";
import { useState, useEffect } from "react";
import { PaperAirplaneIcon, CameraIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import StudentSideBar from "../sideBar";
import { motion } from "framer-motion"; // Ensure you have this library

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
      const response = await fetch("/api/doubts"); // Mock API call
      const data = await response.json();
      setDoubts(data);
    };
    fetchDoubts();
    const interval = setInterval(fetchDoubts, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
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

    const newEntry = { id: Date.now(), question: newDoubt, image: imageUrl, answer: "" };
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

  return (
    <>
      {/* Content Container */}
      <div className="flex min-h-screen min-w-full gap-6">
        {/* Sidebar */}
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>
        {/* Main content */}
        <div className="ml-72 mr-14 w-full flex-1">
          <div className="rounded-lg bg-base-100 p-6 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold text-white dark:text-blue-400">
              Need HELP? Ask Your Doubts!
            </h2>
          </div>

          <div className="mx-auto mt-4 rounded-xl bg-white p-6 text-black shadow-lg dark:bg-gray-900">
            {/* Doubt Input Section */}
            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800">
              <input
                type="text"
                value={newDoubt}
                onChange={(e) => setNewDoubt(e.target.value)}
                placeholder="Type your question..."
                className="mb-3 w-full bg-transparent p-2 focus:outline-none dark:text-white"
              />

              {/* Image Upload Section */}
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-all hover:bg-primary-focus">
                  <CameraIcon className="h-5 w-5" />
                  Add Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
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
                      className="h-20 w-20 rounded-lg border border-gray-300 object-cover"
                    />
                    <button
                      className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </div>

              <button
                onClick={submitDoubt}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-all hover:bg-primary-focus"
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
                className="mt-2 font-semibold text-green-600"
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
                    className="rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {doubt.question}
                    </p>
                    {doubt.image && (
                      <img
                        src={doubt.image}
                        alt="Doubt"
                        className="mt-2 h-32 w-auto rounded-lg border"
                      />
                    )}
                    {doubt.answer ? (
                      <p className="mt-2 text-green-600 dark:text-green-400">
                        Teacher: {doubt.answer}
                      </p>
                    ) : (
                      <p className="mt-2 text-gray-500">Awaiting response...</p>
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
