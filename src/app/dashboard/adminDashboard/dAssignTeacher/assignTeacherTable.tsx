"use client";

import React, { useEffect, useState } from "react";
import TeacherDropdown from "./teacherDropdown";
import { updateTeacherAssignment } from "./api/updateTeacher";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  schoolName: string;
  email: string;
  phoneNumber: string;
  teacherID?: string | null;
  course: {
    courseCode: string ;
  };
}

interface Teacher {
  id: string;
  teacherName: string;
  courseID: string | null;
  course: {
    courseCode: string;
  };
}

const AssignTeacherTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
  const studentRes = await fetch("/api/user/getStudents", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
  const teacherRes = await fetch("/api/teachers/getTeachers", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      
    },
  });
        const studentsData = (await studentRes.json()) as Student[];
        const teachersData = (await teacherRes.json()) as Teacher[];
        
        setStudents(studentsData);
        setTeachers(teachersData);

        const initialAssignments: Record<string, string> = studentsData.reduce(
          (acc, student) => {
            acc[student.id] = student.teacherID ?? "none";
            return acc;
          },
          {} as Record<string, string>
        );
        setAssignments(initialAssignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, []);

  const handleAssignTeacher = async () => {
    setLoading(true); // Start loading
    try {
      const updates = Object.keys(assignments).map(async (studentId) => {
        return updateTeacherAssignment(
          studentId,
          assignments[studentId] ?? "none",
        );
      });

      await Promise.all(updates);

      showToast("Teachers assigned successfully!", "success");
    } catch (error) {
      showToast("Error updating teacher assignments!", "error");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-sm">
              <th className="w-[180px]">Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>School Name</th>
              <th>Course</th>
              <th>Assign Teacher</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr className="text-sm font-semibold" key={student.id}>
                <td className="py-3 pl-4 pr-0">
                  {student.firstName} {student.lastName}
                </td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.schoolName}</td>
                <td>{student.course.courseCode}</td>
                <td>
                  <TeacherDropdown
                    teachers={teachers}
                    selected={assignments[student.id] ?? "none"}
                    onChange={(teacherId: string) =>
                      setAssignments((prev) => ({
                        ...prev,
                        [student.id]: teacherId,
                      }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary mt-4 flex items-center gap-2"
        onClick={handleAssignTeacher}
        disabled={loading} // Disable button when loading
      >
        {loading && <span className="loading loading-infinity"></span>}
        {loading ? "Assigning..." : "Assign Teacher to Students"}
      </button>
    </div>
  );
};

// DaisyUI Toast Function
const showToast = (message: string, type: "success" | "error") => {
  const toastContainer = document.getElementById("toast-container");
  if (toastContainer) {
    const newToast = document.createElement("div");
    newToast.className = `alert ${type === "success" ? "alert-success" : "alert-error"}`;
    newToast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(newToast);

    setTimeout(() => {
      newToast.remove();
    }, 3000);
  }
};

export default AssignTeacherTable;
