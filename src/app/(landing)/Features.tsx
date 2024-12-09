import Link from "next/link";
import React from "react";

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 px-10 py-8 lg:flex-row lg:px-20">
      {/* Left Section */}
      <div className="max-w-lg text-center lg:text-left">
        <div>
          <h1 className="text-3xl font-light uppercase text-[#ffbf11]">
            ensuing
          </h1>
          <h1 className="text-4xl font-semibold">Featured Services</h1>
        </div>

        <div className="mt-6 text-gray-400">
          <p className="text-lg">
            Edueme provides innovative learning resources to inspire future
            innovators. Our all-encompassing robotics and AI curriculum covers
            programming, circuit design, mechanical engineering, and machine
            learning. From beginner to expert, we offer engaging, hands-on
            courses for all ages and skill levels.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block rounded-md bg-yellow-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-yellow-600"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Exceptional Teachers</h2>
          <p className="mt-2 text-gray-400">
            Our team of expert instructors ensures top-quality robotics and AI
            education, guiding students with passion and expertise.
          </p>
        </div>

        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Tailored Programs</h2>
          <p className="mt-2 text-gray-400">
            Choose from specialized tracks in robotics: Electronics and
            Artificial Intelligence, designed for a focused and structured
            learning experience.
          </p>
        </div>

        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Global Certification</h2>
          <p className="mt-2 text-gray-400">
            Earn industry-recognized certification in robotics and AI, equipping
            you with the latest skills and best practices.
          </p>
        </div>

        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Practical Knowledge</h2>
          <p className="mt-2 text-gray-400">
            Gain hands-on experience with the latest technology, preparing you
            for real-world applications in robotics and AI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
