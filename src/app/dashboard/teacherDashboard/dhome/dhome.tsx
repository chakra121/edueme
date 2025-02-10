import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import TeacherSideBar from "../sideBar";

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed position */}
      <aside className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </aside>

      <main className="ml-72 mr-14 w-full flex-1 px-4">
  {/* Welcome Section */}
  <div className="card mb-4 bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title text-4xl text-base-content">
        Welcome back, {userData?.name}! 👋
      </h2>
      <p className="text-lg text-base-content">
        You're doing an amazing job guiding your students!
      </p>
      <p className="mt-2 text-base-content">
        You currently have <strong></strong> with{" "}
        mr young. Your next class is on{" "}
        <strong></strong> at{" "}
        <strong></strong>.
      </p>
      <div className="mt-4">
        <Link href="/dashboard/teacherDashboard/dclassdetails" className="btn btn-primary">
          View Class Details
        </Link>
      </div>
    </div>
  </div>

  {/* Course Progress & Announcements Section */}
  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
    {/* Courses Section */}
    <div className="card card-compact bg-base-100 p-6 shadow-md">
      <div className="py-2 text-center text-2xl font-semibold text-base-content">
        Your Courses
      </div>
      <div className="card-body">
        <ul className="list-disc pl-5 text-lg text-base-content">
          <li>Robotics Grade 4-5</li>
          <li>Robotics with AI Grade 2-3</li>
        </ul>
      </div>
    </div>

    {/* Announcements */}
    <div className="card card-compact bg-base-100 p-6 shadow-md">
      <div className="py-2 text-center text-2xl font-semibold text-base-content">
        Announcements
      </div>
      <div className="card-body text-center">
        <span className="text-6xl text-pink-400">💬</span>
        <p className="mt-4 text-lg text-base-content">No Announcements</p>
        <p className="text-sm text-gray-400">
          Check back later for important updates and news!
        </p>
      </div>
    </div>
  </div>

  {/* Live Classes Section */}
  <div className="card mb-4 bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title text-base-content">Live Classes</h3>
      <div className="rounded-md bg-blue-50 p-4">
        <h4 className="text-lg font-semibold"></h4>
        <p className="mt-2 text-base-content">
          📚{" "}
          <a href="https://yourclasslink.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            Class Link
          </a>
        </p>
        <div className="mt-4 text-center">
          <Link href="/dashboard/teacherDashboard/dclassdetails" className="btn btn-warning btn-sm">
            Update Class
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Attendance Overview */}
  <div className="card mb-4 bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title text-base-content">Attendance Overview</h3>
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

  {/* Doubts Section */}
  <div className="card bg-warning mb-4 shadow-md">
    <div className="card-body text-center">
      <h4 className="text-lg font-semibold text-base-content">
        Unresolved Doubts
      </h4>
      <span className="badge badge-error"></span>
      <p className="mt-2 text-lg text-base-content">
        💬 Students have raised  unresolved doubts. Click to view.
      </p>
      <div className="mt-4">
        <Link href="/dashboard/teacherDashboard/dcleardoubts" className="btn btn-error">
          View Doubts
        </Link>
      </div>
    </div>
  </div>
</main>


      
    </div>
  );
};

export default Dashboard;
