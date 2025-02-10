"use client";
import { useState, useEffect } from "react";
import TeacherSideBar from "../sideBar";
import { Pie } from "react-chartjs-2";
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import "chart.js/auto";

// Generate 100 dummy students
const generateStudents = () => {
  const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Hannah", "Ian", "Julia"];
  const courses = ["AI", "ML", "Robotics", "Data Science", "Cybersecurity"];
  let students = [];
  for (let i = 1; i <= 100; i++) {
    students.push({
      id: i,
      name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
      course: courses[Math.floor(Math.random() * courses.length)],
      grade: ["A", "B", "C", "D", "F"][Math.floor(Math.random() * 5)],
      attendance: Math.floor(Math.random() * 50) + 50, // 50% - 99%
      progress: Math.floor(Math.random() * 100), // 0% - 100%
    });
  }
  return students;
};

const StudentAnalysis = () => {
  const [students, setStudents] = useState(generateStudents());
  const [filterCourse, setFilterCourse] = useState<string | null>(null);
  const [filterAttendance, setFilterAttendance] = useState<number | null>(null);
  const [filterProgress, setFilterProgress] = useState<number | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<{ [key: number]: any }>({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setStudents(generateStudents()); // ✅ Populate data only on the client
  }, []);

   // Handle Edit Mode
   const handleEdit = (id: number, field: string, value: string | number) => {
    setEditedData({ ...editedData, [id]: { ...editedData[id], [field]: value } });
  };

  // Save Edited Data
  const handleSave = (id: number) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...editedData[id] } : student
      )
    );
    setEditingId(null);
  };

  // Delete Student
  const deleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };


  // Sorting Function
  const sortStudents = (criteria: string) => {
    const sorted = [...students].sort((a, b) => {
      if (a[criteria] < b[criteria]) return sortOrder === "asc" ? -1 : 1;
      if (a[criteria] > b[criteria]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setSortCriteria(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setStudents(sorted);
  };

  // Filtering Logic
  const filteredStudents = students.filter((student) => {
    return (
      (!filterCourse || student.course === filterCourse) &&
      (!filterAttendance || student.attendance >= filterAttendance) &&
      (!filterProgress || student.progress >= filterProgress)
    );
  });

  // Graph Data
  const courseCount = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const courseData = {
    labels: Object.keys(courseCount),
    datasets: [{ data: Object.values(courseCount), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
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
          <h2 className="text-3xl font-bold text-base-content">Student Analysis 📊</h2>
          <p className="text-gray-500 mt-2">Comprehensive insights into student performance and trends.</p>
        </div>

        {/* Sorting & Filtering Options */}
        <div className="mt-4 flex flex-wrap gap-4">
          {/* Sorting Options */}
          <button className="btn bg-white btn-outline flex items-center" onClick={() => sortStudents("name")}>
            Sort by Name {sortCriteria === "name" ? (sortOrder === "asc" ? <ArrowUpIcon className="h-5 w-5 ml-1" /> : <ArrowDownIcon className="h-5 w-5 ml-1" />) : ""}
          </button>
          <button className="btn btn-outline bg-white flex items-center" onClick={() => sortStudents("attendance")}>
            Sort by Attendance {sortCriteria === "attendance" ? (sortOrder === "asc" ? <ArrowUpIcon className="h-5 w-5 ml-1" /> : <ArrowDownIcon className="h-5 w-5 ml-1" />) : ""}
          </button>
          <button className="btn bg-white btn-outline flex items-center" onClick={() => sortStudents("progress")}>
            Sort by Progress {sortCriteria === "progress" ? (sortOrder === "asc" ? <ArrowUpIcon className="h-5 w-5 ml-1" /> : <ArrowDownIcon className="h-5 w-5 ml-1" />) : ""}
          </button>

          {/* Filtering Options */}
          <select className="select text-black select-bordered" onChange={(e) => setFilterCourse(e.target.value || null)}>
            <option value="">Filter by Course</option>
            <option value="AI">AI</option>
            <option value="ML">ML</option>
            <option value="Robotics">Robotics</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <select className="select text-black select-bordered" onChange={(e) => setFilterAttendance(Number(e.target.value) || null)}>
            <option value="">Filter by Attendance</option>
            <option value="90">Above 90%</option>
            <option value="80">Above 80%</option>
            <option value="70">Above 70%</option>
            <option value="60">Above 60%</option>
          </select>

          <select className="select  text-black select-bordered" onChange={(e) => setFilterProgress(Number(e.target.value) || null)}>
            <option value="">Filter by Progress</option>
            <option value="90">Above 90%</option>
            <option value="80">Above 80%</option>
            <option value="70">Above 70%</option>
            <option value="60">Above 60%</option>
          </select>
        </div>

        {/* Course Distribution Chart */}
        <div className="mt-6 card bg-base-100 p-6 shadow">
          <h3 className="text-lg font-bold text-gray-700">Course Distribution</h3>
          <Pie data={courseData} />
        </div>

        {/* Student Table */}
        <div className="mt-6 card bg-base-100 text-black p-6 shadow">
          <h3 className="text-lg font-bold text-black">Filtered Student Data</h3>
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100 text-black">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Course</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Attendance (%)</th>
                  <th className="px-4 py-2">Progress (%)</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, showAll ? students.length : 10).map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="px-4 py-2">
                      {editingId === student.id ? (
                        <input
                          type="text"
                          value={editedData[student.id]?.name || student.name}
                          onChange={(e) => handleEdit(student.id, "name", e.target.value)}
                          className="input input-sm input-bordered w-full"
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingId === student.id ? (
                        <select
                          value={editedData[student.id]?.grade || student.grade}
                          onChange={(e) => handleEdit(student.id, "grade", e.target.value)}
                          className="select select-sm select-bordered"
                        >
                          <option value="A">Robotics</option>
                          <option value="B">IoT</option>
                          <option value="C">Robotics+AI</option>
                        </select>
                      ) : (
                        student.grade
                      )}
                    </td>                    
                    <td className="px-4 py-2">
                      {editingId === student.id ? (
                        <select
                          value={editedData[student.id]?.grade || student.grade}
                          onChange={(e) => handleEdit(student.id, "grade", e.target.value)}
                          className="select select-sm select-bordered"
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                      ) : (
                        student.grade
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingId === student.id ? (
                        <input
                          type="number"
                          value={editedData[student.id]?.attendance || student.attendance}
                          onChange={(e) => handleEdit(student.id, "attendance", Number(e.target.value))}
                          className="input input-sm input-bordered w-full"
                        />
                      ) : (
                        `${student.attendance}%`
                      )}
                    </td>                    
                    <td className="px-4 py-2">
                      {editingId === student.id ? (
                        <input
                          type="number"
                          value={editedData[student.id]?.progress || student.progress}
                          onChange={(e) => handleEdit(student.id, "progress", Number(e.target.value))}
                          className="input input-sm input-bordered w-full"
                        />
                      ) : (
                        `${student.progress}%`
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {editingId === student.id ? (
                        <button className="btn btn-sm btn-success" onClick={() => handleSave(student.id)}>
                          <CheckIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-warning" onClick={() => setEditingId(student.id)}>
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button className="btn btn-sm btn-error" onClick={() => deleteStudent(student.id)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More / Show Less Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-outline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "Show More"}
              {showAll ? <ChevronUpIcon className="h-5 w-5 ml-2" /> : <ChevronDownIcon className="h-5 w-5 ml-2" />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentAnalysis;
