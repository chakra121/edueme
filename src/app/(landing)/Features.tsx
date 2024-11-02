import Link from "next/link";
import React from "react";

const Features = () => {
  return (
    <div className="flex h-screen flex-col lg:flex-row items-center justify-center px-[20%] gap-[5%]">
      {/* Left Section */}
      <div>
        <div>
          <h1 className="text-3xl uppercase text-[#ffbf11] font-light">ensuing</h1>
          <h1 className="text-4xl font-semibold">Featured Services</h1>
        </div>

        <div className="mt-4 text-balance">
          <p>
            Edueme provides innovative learning resources to inspire future
            innovators. Our all-encompassing robotics and AI curriculum covers
            programming, circuit design, mechanical engineering, and machine
            learning. From beginner to expert, we offer engaging, hands-on
            courses for all ages and skill levels.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] text-balance">
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Exceptional Teachers</h2>
          <p>Our team of expert instructors ensures top-quality robotics and AI education, guiding students with passion and expertise.</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Tailored Programs</h2>
          <p>Choose from specialized tracks in robotics: Electronics and Artificial Intelligence, designed for a focused and structured learning experience.</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Global Certification</h2>
          <p>Earn industry-recognized certification in robotics and AI, equipping you with the latest skills and best practices.</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Practical Knowledge</h2>
          <p>Gain hands-on experience with the latest technology, preparing you for real-world applications in robotics and AI.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
