import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-10 lg:px-20">
      {/* Title Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Our Services:
        </h1>
      </div>

      {/* Services Section */}
      <div className="flex flex-wrap items-center justify-center gap-10">
        {/* Service 1 */}
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-[8rem] w-[8rem] rounded-full border border-gray-200 object-cover p-[0.5rem] md:h-[10rem] md:w-[10rem] lg:h-[12rem] lg:w-[12rem]"
            src="services_online.jpg"
            alt="Service - Online Learning"
          />
          <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            Online Learning
          </h3>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-[8rem] w-[8rem] rounded-full border border-gray-200 object-cover p-[0.5rem] md:h-[10rem] md:w-[10rem] lg:h-[12rem] lg:w-[12rem]"
            src="services_notes.jpg"
            alt="Service - Online Notes"
          />
          <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            Online Notes
          </h3>
        </div>

        {/* Service 3 */}
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-[8rem] w-[8rem] rounded-full border border-gray-200 object-cover p-[0.5rem] md:h-[10rem] md:w-[10rem] lg:h-[12rem] lg:w-[12rem]"
            src="services_projects.avif"
            alt="Service - Projects"
          />
          <h3 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            Projects
          </h3>
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-10 flex flex-col gap-4">
        <Link
          href="/outcome"
          className="rounded-lg bg-amber-400 px-6 py-3 text-center font-semibold normal-case text-black transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-400 hover:text-yellow-900"
        >
          Courses outcome
        </Link>
        <Link
          href="/gallery"
          className="rounded-lg bg-red-500 px-6 py-3 text-center font-semibold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-red-600"
        >
          Gallery
        </Link>
      </div>
    </div>
  );
};

export default Services;
