"use client";
import StudentSideBar from "../sideBar";
import { Camera as CameraIcon, QrCode as QrCodeIcon, Pencil as PencilIcon } from "lucide-react";
import React from "react";

const Attendance = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Content */}
      <main className="ml-72 mr-14 w-full flex-1">
        {/* Header Section */}
        <div className="card mb-4 bg-base-100  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
            📅 Attendance Management            </h2>
            <p className="text-lg text-base-content">
            Manage and mark attendance effortlessly.            </p>
          </div>
        </div>

        

        {/* Features Section */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Facial Recognition */}
          <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center">
            <CameraIcon className="mb-4 h-16 w-16 text-blue-400" />
            <h3 className="text-lg font-bold text-gray-700">Facial Recognition</h3>
            <p className="text-gray-500">Use AI-powered facial recognition to mark attendance in real-time.</p>
            <button className="mt-4 btn btn-primary">Mark Now</button>
          </div>

          {/* QR Code Scanning */}
          <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center">
            <QrCodeIcon className="mb-4 h-16 w-16 text-green-400" />
            <h3 className="text-lg font-bold text-gray-700">QR Code Scanning</h3>
            <p className="text-gray-500">Scan QR codes to register your attendance effortlessly.</p>
            <button className="mt-4 btn btn-success">Scan Now</button>
          </div>

          {/* Manual Entry */}
          <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center">
            <PencilIcon className="mb-4 h-16 w-16 text-yellow-400" />
            <h3 className="text-lg font-bold text-gray-700">Manual Entry</h3>
            <p className="text-gray-500">Enter attendance manually when needed for flexibility.</p>
            <button className="mt-4 btn btn-warning">Enter Now</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Attendance;
