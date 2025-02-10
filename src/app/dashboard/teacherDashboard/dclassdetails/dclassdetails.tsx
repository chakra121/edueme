"use client";
import { useState } from "react";
import TeacherSideBar from "../sideBar";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// Sample Class Data
const generateClasses = () => [
  { id: 1, title: "AI Basics", course: "AI101", date: "2025-02-15", time: "10:00 AM", duration: 60, status: "scheduled", description: "Introduction to AI", meetingLink: "#" },
  { id: 2, title: "Neural Networks", course: "ML202", date: "2025-02-20", time: "02:30 PM", duration: 90, status: "ongoing", description: "Understanding deep learning", meetingLink: "#" },
  { id: 3, title: "Cybersecurity Fundamentals", course: "CYB301", date: "2025-02-25", time: "04:00 PM", duration: 75, status: "completed", description: "Basics of cybersecurity", meetingLink: "#" },
];

const ClassManagement = () => {
  const [classes, setClasses] = useState(generateClasses());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({ id: 0, title: "", course: "", date: "", time: "", duration: "", status: "scheduled", description: "" });

  // Handle Input Change
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Class Submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(classes.map(cls => (cls.id === editingClass.id ? { ...formData, id: cls.id } : cls)));
    } else {
      setClasses([...classes, { ...formData, id: classes.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditingClass(null);
    setFormData({id:0, title: "", course: "", date: "", time: "", duration: "", status: "scheduled", description: "" });
  };

  // Handle Edit Class
  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      id: cls.id,
      title: cls.title,
      course: cls.course,
      date: cls.date,
      time: cls.time,
      duration: cls.duration,
      status: cls.status,
      description: cls.description,
      meetingLink: cls.meetingLink,
    });
    setIsModalOpen(true);
  };

  // Handle Delete Class
  const handleDelete = (id) => setClasses(classes.filter(cls => cls.id !== id));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14 px-4">
        <div className="card bg-base-100 p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-primary">Class Management</h2>
          <p className="text-gray-500 mt-2">Manage, schedule, and edit your classes seamlessly.</p>
        </div>

        {/* Add New Class Button */}
        <div className="flex justify-end mt-6">
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">+ Schedule New Class</button>
        </div>

        {/* Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-black gap-6 mt-6">
          {classes.map(cls => (
            <div key={cls.id} className="card bg-base-100 shadow-lg p-4">
              <div className="flex justify-between">
                <span className={`badge ${cls.status === "scheduled" ? "badge-primary" : cls.status === "ongoing" ? "badge-success" : "badge-neutral"}`}>
                  {cls.status}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cls)} className="btn btn-sm btn-outline">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(cls.id)} className="btn btn-sm btn-error">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-2">{cls.title}</h3>
              <p className="text-gray-600">{cls.description}</p>

              <div className="mt-3 text-sm">
                <p>📅 {cls.date} | {cls.time}</p>
                <p>⏳ {cls.duration} minutes</p>
                <p>📚 {cls.course}</p>
              </div>

              <a href={cls.meetingLink} className="btn btn-success mt-4 w-full">Start Class</a>
            </div>
          ))}
        </div>

        {/* Class Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="card bg-base-100 p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold">{editingClass ? "Edit Class" : "New Class"}</h2>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <input type="text" name="title" placeholder="Class Title" value={formData.title} onChange={handleInputChange} className="input input-bordered w-full" required />
                <input type="text" name="course" placeholder="Course Code" value={formData.course} onChange={handleInputChange} className="input input-bordered w-full" required />
                
                <div className="flex gap-2">
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="input input-bordered w-full" required />
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="input input-bordered w-full" required />
                </div>

                <input type="number" name="duration" placeholder="Duration (minutes)" value={formData.duration} onChange={handleInputChange} className="input input-bordered w-full" required />

                <select name="status" value={formData.status} onChange={handleInputChange} className="select select-bordered w-full">
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
                <input type="text" name="meetingLink" placeholder="Meeting Link" value={formData.meetingLink} onChange={handleInputChange} className="input input-bordered w-full" required/>
                <textarea name="description" placeholder="Class Description" value={formData.description} onChange={handleInputChange} className="textarea textarea-bordered w-full"></textarea>

                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingClass ? "Update" : "Create"} Class</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClassManagement;
