import Link from "next/link";
import React from "react";

const Brief = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-4 py-4 pt-20">
      <div className="relative my-6 mb- flex flex-col justify-between bg-amber-700 px-6 py-6 md:px-12 lg:px-24">

        {/* Content */}
        <div className="relative z-10 flex flex-col space-y-6 md:flex-row md:space-x-20 md:space-y-0">
          {/* Course Details */}
          <div className="relative">
            <h1 className="py-4 font-sans text-5xl font-bold text-black">
              Robotics
            </h1>
            <h2 className="py-2 font-sans text-2xl font-bold text-black">
              6th and 7th Grade
            </h2>
            <p className="text-xl font-semibold mr-128 leading-relaxed text-black">
              Robotics is the science of designing, constructing, and
              programming robots. This module is a fun and exciting way for
              students to explore the world of robotics and encourage them to
              come up with new ideas.
          <br/><br/>
              It explains what robots are, how they work, and the basic parts
              like sensors, motors, and circuits that make them function.
              Students learn about programming robots using simple tools like
              mBlock and Arduino, making coding easy to understand and apply.
          <br/>
           </p>
          </div>

{/* column */}

        </div>
      </div>
    </div>
  );
};

export default Brief;
