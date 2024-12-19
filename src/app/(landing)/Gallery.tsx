import React from "react";
import Link from "next/link";

const GalleryPage = () => {
  return (
    <div className="bg-black min-h-screen py-12">
      {/* Top Heading Outside the Container */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text white">Gallery</h1>
      </div>

      {/* Main Container Card */}
      <div className="bg-black shadow-lg rounded-lg overflow-hidden container mx-auto px-6 max-w-5xl">
        {/* Top Section: Heading */}
        <div className="text-center px-4 py-6">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">
            Upgrading Education with Forward-Thinking Initiatives
          </h1>
          <p className="text-gray-300 leading-relaxed">
            EdueMe has tailored its products, curriculam, and services to meet
            the needs of the general public through its innovative initiatives
            in <strong>schools</strong>, {" "}
            and{" "}
            <strong>impact programs</strong>. These programs are designed to
            achieve desired outcomes and here to the educational standards
            established by modern policies around the world.
          </p>
        </div>

        {/* Section 1: Image and Content */}
        <div className="flex flex-col md:flex-row items-stretch mb-6">
          <div className="image-section group w-full md:w-1/3 relative">
            <div className="card relative">
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-600 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 opacity-0 group-hover:opacity-100 group-hover:-rotate-6 transition duration-500"></div>
              <img
                src="/g1.jpeg"
                alt="AI & Robotics Lab"
                className="object-cover h-64 w-full relative group-hover:rotate-6 transition duration-500"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Classroom Learning
            </h2>
            <p className="text-gray-300 font-semibold mb-1">
              500+ hours classroom teaching
            </p>
            <p className="text-gray-300 leading-snug mb-4">
              EdueME's  AI and Robotics Lab are upgrading ICT labs in schools
              by integrating modern ICT, coding, AI, and robotics education
              into the curriculum for classes 3-12.
            </p>
            <div>
              <Link href="/gall/class">
                <button
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition mr-4 hover:shadow-lg hover:scale-105"
                >
                  Explore More
                </button>
              </Link>
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition hover:shadow-lg hover:scale-105"
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Image and Content */}
        <div className="flex flex-col md:flex-row-reverse items-stretch mb-6">
          <div className="image-section group w-full md:w-1/3 relative">
            <div className="card relative">
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-600 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 opacity-0 group-hover:opacity-100 group-hover:-rotate-6 transition duration-500"></div>
              <img
                src="/g2.jpeg"
                alt="Atal Tinkering Lab"
                className="object-cover h-64 w-full relative group-hover:rotate-6 transition duration-500"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Expos
            </h2>
            <p className="text-gray-300 font-semibold mb-1">
              500+ expo's visits
            </p>
            <p className="text-gray-300 leading-snug mb-4">
              EDueME offers comprehensive end-to-end assistance in
              establishing and running expos in various schools to 
              promote the talent in the young minds.
            </p>
            <div>
              <Link href="/gall/expo">
                <button
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition mr-4 hover:shadow-lg hover:scale-105"
                >
                  Explore More
                </button>
              </Link>
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition hover:shadow-lg hover:scale-105"
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Image and Content */}
        <div className="flex flex-col md:flex-row items-stretch mb-6">
          <div className="image-section group w-full md:w-1/3 relative">
            <div className="card relative">
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-600 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-500 opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 opacity-0 group-hover:opacity-100 group-hover:-rotate-6 transition duration-500"></div>
              <img
                src="/g3.jpeg"
                alt="Impact Programs"
                className="object-cover h-64 w-full relative group-hover:rotate-6 transition duration-500"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">
              Tech Tours
            </h2>
            <p className="text-gray-300 font-semibold mb-1">
              50+ Tech tours visits
            </p>
            <p className="text-gray-300 leading-snug mb-4">
              EdueME organizes multiple tech tours in throughout the academic year to promote knowledge expansion in real time situations and industry ready projects to develop the intrests among the students
            </p>
            <div>
              <Link href="/gall/tech">
                <button
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition mr-4 hover:shadow-lg hover:scale-105"
                >
                  Explore More
                </button>
              </Link>
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition hover:shadow-lg hover:scale-105"
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
