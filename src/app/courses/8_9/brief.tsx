import Link from "next/link";
import React from "react";

const Brief = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-4 py-4 pt-20">
      <div className="relative flex flex-col justify-between bg-orange-100 px-6 py-6 md:px-12 lg:px-24">
        {/* Background image with opacity */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/courses/briefBg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col space-y-6 md:flex-row md:space-x-20 md:space-y-0">
          {/* Course Details */}
          <div className="relative">
            <h1 className="py-4 font-sans text-5xl font-bold text-black">
              Robotics
            </h1>
            <h2 className="py-3 font-sans text-2xl font-bold text-black">
              8th and 9th Grade
            </h2>
            <p className="text-xl font-semibold leading-relaxed text-black">
              Lets delve into the exciting and interdisciplinary world of
              robotics. It introduces key concepts such as robot anatomy,
              sensors, actuators, and programming while exploring real-world
              applications like automation, IoT, and artificial
              intelligence.Here, Students learn to use Arduino boards, program
              with mBlock and embedded C++, and work on hands-on projects like
              traffic signal automation, anti-theft alarms, and IoT-based
              systems. The guide also introduces Python programming and AI
              integration, encouraging learners to build smarter robots capable
              of autonomous tasks.
              <br />
              <br />
              With step-by-step instructions, detailed diagrams, and engaging
              projects, the book helps students develop practical skills,
              creativity, and problem-solving abilities, preparing them for
              advanced technology and innovation.
            </p>
          </div>

          {/* Sticky Price Card */}
          <div className="sticky top-24 self-start rounded-lg bg-white bg-opacity-30 p-4 text-black shadow-lg">
            <p className="p-1 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              facere eveniet sapiente illo deserunt repudiandae suscipit quidem
              voluptatibus eligendi repellendus dolor, unde laborum consequatur
              voluptates blanditiis reprehenderit laboriosam perferendis autem!
            </p>
            <p className="m-3 text-center text-2xl font-bold">₹399</p>
            <div className="flex justify-center">
              <Link
                href=""
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brief;
