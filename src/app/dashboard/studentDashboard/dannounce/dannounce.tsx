"use client";
import StudentSideBar from "../sideBar";
import React from "react";

const Announcements = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Announcement Content */}
      <main className="ml-72 mr-14 w-full flex-1 ">
        {/* Page Title */}
        <div className="card mb-4 bg-base-100  shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
            Announcements 📢
            </h2>
            <p className="text-lg text-base-content">
            Stay updated with the latest news.            </p>
          </div>
        </div>
        
        {/* Recent Announcements */}
        <section className="mt-6 space-y-4">
          {/* Announcement Card 1 */}
          <div className="alert alert-info shadow-md">
            <div>
              <h3 className="font-bold text-lg">📅 Class Update</h3>
              <p>Your upcoming session on AI is rescheduled to **3 PM**.</p>
            </div>
          </div>

          {/* Announcement Card 2 */}
          <div className="alert alert-success shadow-md">
            <div>
              <h3 className="font-bold text-lg">📢 New Course Announcement</h3>
              <p>Enroll in the new **Blockchain Technology** course starting next week.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Announcements;
