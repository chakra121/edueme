import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import StudentSideBar from "../sideBar";

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key";

const Dashboard = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const userData = token
    ? (jwt.decode(token) as {
        id: string;
        name: string;
        email: string;
        role: string;
      })
    : null;

  // Simulated server-side data fetching
  const upcomingCourses = await getUpcomingCourses();
  const studentInfo = await getStudentInfo();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed position */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 px-4">
        {/* Welcome Section */}
        <div className="card mb-4 bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-4xl text-base-content">
              Welcome {userData?.name} 👋
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
                  <span className="text-lg text-base-content">Dear Students, We have a Robotics Practical Sessions in Arka International School</span>

                </div>
              </div>
            </div>
          </div>
        </div>


            <div className="card mb-4 bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-base-content">
                  Upcoming Classes
                </h3>
                <p className="text-base-content">
                  Stay tuned for upcoming classes!
                </p>
                <Link href="/dupsessions">
                  <button className="btn btn-primary mt-2">
                    View All Sessions
                  </button>
                </Link>
              </div>
            </div>
       

        {/* Attendance Graph */}
        <div className="card mb-4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-base-content">
              Attendance Overview
            </h3>
            <div className="mt-4 flex h-48 items-end gap-2">
              <div className="h-[80%] flex-1 rounded-t bg-primary/50 transition-colors hover:bg-primary"></div>
              <div className="h-[65%] flex-1 rounded-t bg-primary/50 transition-colors hover:bg-primary"></div>
              <div className="h-[90%] flex-1 rounded-t bg-primary/50 transition-colors hover:bg-primary"></div>
              <div className="h-[75%] flex-1 rounded-t bg-primary/50 transition-colors hover:bg-primary"></div>
              <div className="h-[60%] flex-1 rounded-t bg-primary/50 transition-colors hover:bg-primary"></div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-base-content">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Server-side data fetching functions
async function getUpcomingCourses() {
  // Implement actual data fetching logic here
  return [];
}

async function getStudentInfo() {
  // Implement actual data fetching logic here
  return {};
}

export default Dashboard;
