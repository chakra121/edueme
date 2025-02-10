// src/app/dashboard/teacherDashboard/dannounce/Dannounce.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import TeacherSideBar from "../sideBar";
import {
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const Announcements = ({ userData }: { userData: { id: string; name: string; email: string; role: string } | null }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Class Update",
      description: "Your upcoming session on AI is rescheduled to 3 PM.",
      date: new Date().toLocaleString(),
      pinned: false,
      attachment: null,
    },
    {
      id: 2,
      title: "New Course Announcement",
      description: "Enroll in the new Blockchain Technology course starting next week.",
      date: new Date().toLocaleString(),
      pinned: false,
      attachment: null,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newAnnouncement = {
      id: announcements.length + 1,
      title: newTitle,
      description: newDescription,
      date: new Date().toLocaleString(),
      pinned: false,
      attachment: selectedFile ? selectedFile.name : null,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewDescription("");
    setSelectedFile(null);
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
  };

  const handlePin = (id: number) => {
    setAnnouncements(
      announcements.map((ann) =>
        ann.id === id ? { ...ann, pinned: !ann.pinned } : ann
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full ml-72 px-4">
        {/* Page Title */}
        <div className="card bg-base-100 p-6 shadow">
          <h2 className="text-3xl font-bold text-base-content">
            Announcements 📢
          </h2>
          <p className="text-black mt-2">
            Stay updated with the latest news and updates.
          </p>
        </div>

        {/* Create New Announcement */}
        <div className="card bg-base-100 mt-6 p-6 text-black shadow">
          <h3 className="text-lg font-bold text-black mb-4">
            Create a New Announcement
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter announcement details"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <PaperClipIcon className="h-5 w-5 text-gray-500" /> Attach File
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post Announcement
            </button>
          </form>
        </div>

        {/* List of Announcements */}
        <div className="mt-6 space-y-4">
          {announcements
            .sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1))
            .map((ann) => (
              <div
                key={ann.id}
                className={`card p-6 shadow flex justify-between items-start ${
                  ann.pinned ? "bg-yellow-50 border border-yellow-400" : "bg-white"
                }`}
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-700">
                    {ann.title}
                  </h3>
                  <p className="text-gray-500">{ann.description}</p>
                  <p className="mt-1 text-sm text-gray-400">{ann.date}</p>
                  {ann.attachment && (
                    <a href="#" className="text-blue-500 hover:underline">
                      📎 {ann.attachment}
                    </a>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handlePin(ann.id)}
                  >
                    <StarIcon
                      className={`h-5 w-5 ${
                        ann.pinned ? "text-yellow-600" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(ann.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
