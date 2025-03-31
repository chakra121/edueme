"use client";
import React, { useState, useEffect } from "react";

interface Student {
  id: string;
  firstName: string;
  gender: string;
  grade: string;
  phoneNumber: string;
  email: string;
  schoolName: string;
}

const ManageStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/courseStudents", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating delay

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = (await response.json()) as Student[];
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchStudents();
  }, []);

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-base-content">
            Students of this course
          </h1>
          <button
            onClick={fetchStudents}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-sm font-semibold">
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>School Name</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <td key={i}>
                          <div className="skeleton h-4 w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                : students.map((student, index) => (
                    <tr key={student.id} className="text-base">
                      <td>{index + 1}</td>
                      <td>{student.firstName}</td>
                      <td>{student.gender}</td>
                      <td>{student.grade}</td>
                      <td>{student.phoneNumber}</td>
                      <td>{student.email}</td>
                      <td>{student.schoolName}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
