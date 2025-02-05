// src/app/dashboard/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Correct import for v2

interface Session {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  meetingLink: string;
  status: 'scheduled' | 'ongoing' | 'completed';
}

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "React Advanced Patterns",
      course: "CS-401",
      date: "2023-11-05",
      time: "14:00",
      duration: "90",
      description: "Exploring advanced React component patterns and state management strategies.",
      meetingLink: "#",
      status: "scheduled"
    },
    // Add more mock data as needed
  ]);

  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Session>>({
    status: 'scheduled'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSession) {
      setSessions(sessions.map(s => s.id === editingSession.id ? { ...formData, id: s.id } as Session : s));
    } else {
      const newSession: Session = {
        id: Date.now().toString(),
        ...formData as Session
      };
      setSessions([...sessions, newSession]);
    }
    setIsModalOpen(false);
    setEditingSession(null);
    setFormData({ status: 'scheduled' });
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setFormData(session);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
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

      <main className="flex-1 w-full ml-72 mr-14 ">

      <div className="p-8 bg-gray-50 min-h-screen text-black rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            + Schedule New Class
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <div key={session.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    session.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {session.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(session)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📅</span>
                    <span>{new Date(session.date).toLocaleDateString()} | {session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">⏳</span>
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📚</span>
                    <span>{session.course}</span>
                  </div>
                </div>

                <a
                  href={session.meetingLink}
                  className="mt-4 inline-block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Class
                </a>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editingSession ? 'Edit Class' : 'New Class'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingSession(null);
                      setFormData({ status: 'scheduled' });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {editingSession ? 'Update' : 'Create'} Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

      </main>

    </div>
  );
};
export default Dashboard;