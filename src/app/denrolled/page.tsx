import React from 'react';
import EnrolledCourses from './denrolled';
import Sidepanel from "../../components/Sidepanel";


const Enrolled = () => {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidepanel */}
      <aside className="  w-1/4 bg-blue-100 p-6 rounded-lg text-black shadow-md h-screen mt-10 ml-5">
        <Sidepanel />
      </aside>

      {/* Enrolled Courses */}
      <main className=" p-4 flex">
        <EnrolledCourses />
      </main>
    </div>
  );
};

export default Enrolled;
