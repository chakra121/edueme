import React from "react";
import Link from "next/link";

const Robotics = () => {
  return (
    <div className="flex flex-col justify-center items-center px-[1rem] pt-[6rem]">
      {/* Robotics */}
      <h1 className="p-2 text-center font-sans text-4xl font-bold">Robotics</h1>
      <div className="grid grid-cols-1 gap-[1rem] lg:grid-cols-3 items-center w-full">
        {/* 2-3 */}
        <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 p-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
          <Link href="/" className="text-2xl font-bold hover:underline">
            2nd - 3rd Grade
          </Link>
          <p className="text-lg"></p>
        </div>

        {/* 4-5 */}
        <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 p-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
          <Link href="/" className="text-2xl font-bold hover:underline">
            4th - 5th Grade
          </Link>
          <p className="text-lg"></p>
        </div>
        {/* 6-7 */}
        <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 p-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
          <Link
            href="/courses/6_7"
            className="text-2xl font-bold hover:underline"
          >
            6th - 7th Grade
          </Link>
          <p className="text-lg"></p>
        </div>

        {/* 8-9 */}
        <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 p-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
          <Link
            href="/courses/8_9"
            className="text-2xl font-bold hover:underline"
          >
            8th - 9th Grade
          </Link>
          <p className="text-lg"></p>
        </div>
        {/* 10-12 */}
        <div className="transform rounded-lg border-2 border-orange-500 bg-orange-100 p-4 font-semibold text-orange-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-orange-300 hover:text-orange-950">
          <Link
            href="/courses/10_12"
            className="text-2xl font-bold hover:underline"
          >
            10th - 12th Grade
          </Link>
          <p className="text-sm text-gray-700">4 Chapters</p>
          <p className="text-lg"></p>
        </div>
      </div>
    </div>
  );
};

export default Robotics;
