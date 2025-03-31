import React from "react";
import Link from "next/link";
import Image from "next/image";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 py-12">
      {/* Main Container Card */}
      <div className="container mx-auto max-w-5xl overflow-hidden rounded-lg bg-white px-6 shadow-lg">
        {/* Top Section: Heading */}
        <div className="px-4 py-6 text-center">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Upgrading Education with Forward-Thinking Initiatives
          </h1>
          <p className="leading-relaxed text-gray-700">
            STEMpedia has tailored its products, curricula, and services to meet
            the needs of the general public through its innovative initiatives
            in <strong>schools</strong>, <strong>government</strong>,{" "}
            <strong>corporate social responsibility</strong>, and{" "}
            <strong>impact programs</strong>. These programs are designed to
            achieve desired outcomes and adhere to the educational standards
            established by modern policies around the world.
          </p>
        </div>

        {/* Section 1: Image and Content */}
        <div className="mb-6 flex flex-col items-stretch md:flex-row">
          <div className="image-section group relative w-full md:w-1/3">
            <div className="card relative">
              <div className="absolute left-0 top-0 h-full w-full bg-blue-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={300}
                src="/g1.jpeg"
                alt="AI & Robotics Lab"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-blue-600">
              AI & Robotics Lab for Schools
            </h2>
            <p className="mb-1 font-semibold text-gray-700">
              500+ AI and Robotics Labs Established
            </p>
            <p className="mb-4 leading-snug text-gray-700">
              STEMpedia AI and Robotics Lab are upgrading ICT labs in schools by
              integrating modern ICT, coding, AI, and robotics education into
              the curriculum for classes 3-12.
            </p>
            <div>
              <Link href="/gall/class">
                <button className="mr-4 rounded bg-blue-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-blue-600 hover:shadow-lg">
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
              <div className="absolute left-0 top-0 h-full w-full bg-blue-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={300}
                src="/g2.jpeg"
                alt="Atal Tinkering Lab"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-blue-600">
              Atal Tinkering Lab in Schools
            </h2>
            <p className="mb-1 font-semibold text-gray-700">
              500+ Atal Tinkering Labs Established
            </p>
            <p className="mb-4 leading-snug text-gray-700">
              STEMpedia offers comprehensive end-to-end assistance in
              establishing and running Atal Tinkering Labs in schools.
            </p>
            <div>
              <Link href="/gall/expo">
                <button className="mr-4 rounded bg-blue-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-blue-600 hover:shadow-lg">
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
              <div className="absolute left-0 top-0 h-full w-full bg-blue-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
              <div className="absolute left-0 top-0 h-full w-full bg-blue-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
              <Image
                width={500}
                height={300}
                src="/g3.jpeg"
                alt="Impact Programs"
                className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
              />
            </div>
          </div>
          <div className="content p-6 md:w-2/3">
            <h2 className="mb-2 text-2xl font-bold text-blue-600">
              Impact Programs
            </h2>
            <p className="mb-1 font-semibold text-gray-700">
              50+ Programs Executed
            </p>
            <p className="mb-4 leading-snug text-gray-700">
              STEMpedia provides tech and execution support for impactful
              programs at a large scale, positively impacting over 500,000
              students.
            </p>
            <div>
              <Link href="/gall/tech">
                <button className="mr-4 rounded bg-blue-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-blue-600 hover:shadow-lg">
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