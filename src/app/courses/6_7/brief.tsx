import Link from "next/link";
import React from "react";

const Brief = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-4 py-4 pt-20">
      <div className="relative flex flex-col justify-between bg-orange-100 px-6 py-6 md:px-12 lg:px-24">
        {/* Background image with opacity */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
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
            <h2 className="py-2 font-sans text-2xl font-bold text-black">
              6th and 7th Grade
            </h2>
            <p className="text-xl font-semibold leading-relaxed text-black">
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
          <br/>
              With hands-on activities and clear instructions, this platform
              makes learning robotics fun, sparking creativity and
              problem-solving skills for young learners. Overall, robotics makes
              learning engaging and helps kids develop a love for discovery!
              </p>
          </div>

          {/* Sticky Price Card */}
          <div className="sticky top-24 self-start rounded-lg bg-white bg-opacity-30 p-4 text-black shadow-lg">
            <p className="font-semibold p-1">
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
