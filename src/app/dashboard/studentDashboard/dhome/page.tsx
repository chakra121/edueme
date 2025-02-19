import React from 'react'
import Link from 'next/link';

const DHomePage= () => {
  return (
    <div>
      <div className="card mb-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-4xl text-base-content">
            Welcome Student 👋
          </h2>
          <p className="text-lg text-base-content">
            Ready to learn somthing new today?
          </p>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card card-compact bg-base-100 p-6">
          <div className="py-2 text-center text-2xl font-semibold text-base-content">
            Course Progress
          </div>
          <div className="card-body">
            <span className="text-start text-2xl font-bold text-base-content">
              Robotics with AI
            </span>
            <span className="text-end text-2xl font-bold text-base-content">
              40%
            </span>
            <progress
              className="progress progress-primary h-5 w-full"
              value="40"
              max="100"
            ></progress>
          </div>
        </div>
        <div className="card card-compact bg-base-100 p-6">
          <div className="py-2 text-center text-2xl font-semibold text-base-content">
            Announcements
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="text-lg text-base-content">
                  Dear Students, We have a Robotics Practical Sessions in Arka
                  International School
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 bg-base-100">
        <div className="card-body">
          <h3 className="card-title text-base-content">Upcoming Classes</h3>
          <p className="text-base-content">Stay tuned for upcoming classes!</p>
          <Link href="/dashboard/studentDashboard/dupsessions">
            <button className="btn btn-primary mt-2">View All Sessions</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DHomePage;