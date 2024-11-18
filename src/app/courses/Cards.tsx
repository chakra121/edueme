import Link from "next/link";
import React from "react";

const Cards = () => {
  return (
    <div className="flex justify-center space-x-20 px-16 pb-8 pt-[8rem]">
      {/* Orange Card */}
      {/* This course offers you wide range of experience into the world of
      robotics. This is a complete beginner course where this course objective
      is to stem education amoung the students. */}
      <div className="flex transform flex-col items-center rounded-xl border-4 border-orange-500 bg-orange-100 p-4 text-orange-900 transition duration-300 ease-in-out hover:scale-110 hover:bg-orange-200 dark:border-orange-700 dark:bg-orange-900 dark:text-orange-100 dark:hover:bg-orange-800">
        <h1 className="p-2 text-left font-sans text-2xl font-bold">Robotics</h1>
        <p className="text-center text-lg font-semibold">
          This course offers you wide range of experience into the world of
          robotics. This is a complete beginner course where this course
          objective is to promote STEM education and ideas amoung the students
          with a hands-on-learning environment.
          <br />
          This will develop the knowledge of how to program and design there own
          robots.
        </p>
        {/* Price */}
        <div className="flex items-baseline justify-between space-x-2 p-2">
          <h1 className="text-xl font-medium text-black">₹16,000</h1>
          <p className="text-xs text-orange-500">Save 20%</p>
          <p className="text-sm text-gray-600 line-through">₹20,000</p>
        </div>
        <Link
          href=""
          className="rounded-md bg-orange-600 px-[1rem] py-2 text-orange-50 transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-400 hover:text-orange-900"
        >
          Explore Course
        </Link>
      </div>
      {/* Yellow Card */}
      <div className="flex transform flex-col items-center rounded-xl border-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-900 transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800">
        <h1 className="p-2 text-left font-sans text-2xl font-bold">
          Robotics with Arificial Intellegence(AI)
        </h1>
        <p className="text-center text-lg font-semibold">
          This course offers you wide range of experience into the world of
          robotics. This is a complete beginner course where this course
          objective is to promote STEM education and ideas amoung the students
          with a hands-on-learning environment.
          <br />
          This will develop the knowledge of how to program and design there own
          robots.
        </p>
        {/* Price */}
        <div className="flex items-baseline justify-between space-x-2 p-2">
          <h1 className="text-xl font-medium text-black">₹17,200</h1>
          <p className="text-xs text-yellow-500">Save 20%</p>
          <p className="text-sm text-gray-600 line-through">₹21,500</p>
        </div>
        <Link
          href=""
          className="rounded-md bg-yellow-600 px-[1rem] py-2 text-yellow-50 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-400 hover:text-yellow-900"
        >
          Explore Course
        </Link>
      </div>
    </div>
  );
};

export default Cards;
