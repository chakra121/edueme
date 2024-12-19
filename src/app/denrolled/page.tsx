import React from 'react';
import EnrolledCourses from './denrolled';
import Sidepanel from "@/components/Sidepanel";

const Enrolled = () => {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidepanel */}
      <aside className="  w-1/4 bg-gray-200 p-4 shadow-md h-screen">
        <Sidepanel />
      </aside>

      {/* Enrolled Courses */}
      <main className=" flex-1 p-6 -mt-6">
        <EnrolledCourses />
      </main>
    </div>
  );
};

export default Enrolled;
