"use client";
import { useState } from "react";
import Link from "next/link";
import TeacherSideBar from "../sideBar";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const CourseProgress = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Robotics with AI", progress: 40 },
    { id: 2, name: "Machine Learning Basics", progress: 75 },
    { id: 3, name: "Python for Data Science", progress: 60 },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: "AI Research Paper", deadline: "Feb 20, 2025" },
    { id: 2, title: "Python ML Project", deadline: "Feb 28, 2025" },
  ]);

  const [teacherActivities, setTeacherActivities] = useState([
    { id: 1, activity: "AI Webinar", date: "Feb 25, 2025" },
    { id: 2, activity: "Guest Lecture on ML", date: "March 5, 2025" },
  ]);

  // Handle Course Progress Update
  const updateCourseProgress = (id: number, newProgress: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, progress: newProgress } : course
      )
    );
  };

  // Handle Course Deletion
  const deleteCourse = (id: number) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  // Handle Assignment Deletion
  const deleteAssignment = (id: number) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment.id !== id)
    );
  };

  // Handle Teacher Activity Deletion
  const deleteActivity = (id: number) => {
    setTeacherActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full ml-72 mr-14 px-4">
        <div className="max-w-full mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-4xl text-base-content">
                Course Progress Overview 📚
              </h2>
              <p className="mt-3 text-lg text-base-content">
                Track your course progress and manage assignments.
              </p>
            </div>
          </div>

          {/* Courses Progress */}
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-base-content">Your Courses</h2>
              <div className="mt-4 space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="card bg-gray-100 p-4 shadow-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-black">{course.name}</h3>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => deleteCourse(course.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <progress
                      className="progress progress-primary  mt-2"
                      value={course.progress}
                      max="100"
                    ></progress>
                    <p className="text-sm text-gray-600">{course.progress}% Completed</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assignments Section */}
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-base-content">Assignments</h2>
              <ul className="mt-4 space-y-3">
                {assignments.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md"
                  >
                    <div>
                      <p className="font-semibold text-black">{assignment.title}</p>
                      <p className="text-sm text-gray-600">Deadline: {assignment.deadline}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteAssignment(assignment.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Teacher Activities */}
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-base-content">Upcoming Teacher Activities</h2>
              <ul className="mt-4 text-black space-y-3">
                {teacherActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md"
                  >
                    <div>
                      <p className="font-semibold">{activity.activity}</p>
                      <p className="text-sm text-gray-600">Date: {activity.date}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteActivity(activity.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add New Course Button */}
          <div className="flex justify-end">
            <Link href="/dashboard/teacherDashboard/addCourse">
              <button className="btn btn-primary flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" /> Add New Course
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseProgress;
