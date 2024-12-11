import Link from "next/link";
import React from "react";
import StarRating from "../../Stars";

const Brief = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-4 py-4 pt-20">
      <div className="relative flex w-full flex-col justify-between bg-cyan-300 px-6 py-12 md:px-12 lg:px-24">
        {/* Content */}
        <div className="relative z-10 flex flex-col space-y-6 md:flex-row md:space-x-20 md:space-y-0">
          {/* Course Details */}
          <div className="relative">
            <h2 className="py-2 font-sans text-5xl font-bold text-black">
              Grade - 2nd and 3rd
            </h2>
            <h2 className="py-2 font-sans text-4xl font-bold text-black">
              Robotics with Artificial Intelligence Course
            </h2>
            <p className="text-xl font-semibold leading-relaxed text-black">
              A full beginner level and practical course with online learning
              modules
              <br />
              Virtual classes | Certification included | Excersics | Practical
              sessions
            </p>
            <div className="flex space-x-2 py-2">
              <span className="rounded bg-yellow-500 p-[1%] text-black">
                Bestseller
              </span>
              <StarRating />
            </div>
            <div className="flex space-x-1">
              <p className="text-sm font-medium leading-relaxed text-black">
                Created by
              </p>
              <a href="/" className="text-sm text-violet-600 underline">
                Edueme Research Labs
              </a>
            </div>
          </div>
        </div>

        {/* column */}
      </div>
    </div>
  );
};

export default Brief;
