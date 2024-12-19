import React from 'react';
import EnrolledCourses from './denrolled';
import Sidepanel from "@/components/Sidepanel";

const Enrolled = () => {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidepanel */}
      <aside className="  p-4 shadow-md">
        <Sidepanel />
      </aside>

      {/* Enrolled Courses */}
      <main className=" p-4 min-h-screen">
        <EnrolledCourses />
      </main>
    </div>
  );
};

export default Enrolled;
