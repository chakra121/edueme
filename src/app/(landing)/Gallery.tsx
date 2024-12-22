import React from "react";
import Link from "next/link";
import Image from "next/image";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-black py-12">
      {/* Top Heading Outside the Container */}
      <div className="mb-6 text-center">
        <h1 className="text white text-4xl font-bold">Gallery</h1>
      </div>

      {/* Main Container Card */}
      <div className="container mx-auto max-w-5xl overflow-hidden rounded-lg bg-black px-6 shadow-lg">
        {/* Top Section: Heading */}
        <div className="px-4 py-6 text-center">
          <h1 className="mb-4 text-3xl font-bold text-yellow-500">
            Upgrading Education with Forward-Thinking Initiatives
          </h1>
          <p className="leading-relaxed text-gray-300">
            EdueMe has tailored its products, curriculam, and services to meet
            the needs of the general public through its innovative initiatives
            in <strong>schools</strong>, and <strong>impact programs</strong>.
            These programs are designed to achieve desired outcomes and here to
            the educational standards established by modern policies around the
            world.
          </p>
        </div>

        {/* Section 1: Image and Content */}
        <div className="mb-6 flex flex-col items-stretch md:flex-row">
          <div className="image-section group relative w-full md:w-1/3">
            <div className="card relative">
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={500}
                src="/g1.jpeg"
                alt="AI & Robotics Lab"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-yellow-500">
              Classroom Learning
            </h2>
            <p className="mb-1 font-semibold text-gray-300">
              500+ hours classroom teaching
            </p>
            <p className="mb-4 leading-snug text-gray-300">
              EdueME's AI and Robotics Lab are upgrading ICT labs in schools by
              integrating modern ICT, coding, AI, and robotics education into
              the curriculum for classes 3-12.
            </p>
            <div>
              <Link href="/gall/class">
                <button className="mr-4 rounded bg-yellow-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-yellow-600 hover:shadow-lg">
                  Explore More
                </button>
              </Link>
              <button className="rounded bg-orange-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-lg">
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Image and Content */}
        <div className="mb-6 flex flex-col items-stretch md:flex-row-reverse">
          <div className="image-section group relative w-full md:w-1/3">
            <div className="card relative">
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={500}
                src="/g2.jpeg"
                alt="Atal Tinkering Lab"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-yellow-500">Expos</h2>
            <p className="mb-1 font-semibold text-gray-300">
              500+ expo's visits
            </p>
            <p className="mb-4 leading-snug text-gray-300">
              EDueME offers comprehensive end-to-end assistance in establishing
              and running expos in various schools to promote the talent in the
              young minds.
            </p>
            <div>
              <Link href="/gall/expo">
                <button className="mr-4 rounded bg-yellow-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-yellow-600 hover:shadow-lg">
                  Explore More
                </button>
              </Link>
              <button className="rounded bg-orange-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-lg">
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Image and Content */}
        <div className="mb-6 flex flex-col items-stretch md:flex-row">
          <div className="image-section group relative w-full md:w-1/3">
            <div className="card relative">
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-yellow-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={500}
                src="/g3.jpeg"
                alt="Impact Programs"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-yellow-500">
              Tech Tours
            </h2>
            <p className="mb-1 font-semibold text-gray-300">
              50+ Tech tours visits
            </p>
            <p className="mb-4 leading-snug text-gray-300">
              EdueME organizes multiple tech tours in throughout the academic
              year to promote knowledge expansion in real time situations and
              industry ready projects to develop the intrests among the students
            </p>
            <div>
              <Link href="/gall/tech">
                <button className="mr-4 rounded bg-yellow-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-yellow-600 hover:shadow-lg">
                  Explore More
                </button>
              </Link>
              <button className="rounded bg-orange-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-lg">
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
