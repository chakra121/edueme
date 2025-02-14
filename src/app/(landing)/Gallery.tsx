"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const GalleryPage = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const titleColorClass = "text-orange-500"; // Apply this class to the titles

  return (
    <div className="min-h-screen bg-base-100 py-12 transition-all duration-500">
      {/* Top Heading Outside the Container */}
      <div className="mb-6 text-center">
        <h1 className={`text-white text-4xl font-bold ${titleColorClass}`}>
          Gallery
        </h1>
      </div>

      {/* Main Container */}
      <div className="container mx-auto max-w-5xl overflow-hidden rounded-lg bg-base-200 px-6 shadow-lg">
        {/* Top Section */}
        <div className="px-4 py-6 text-center">
          <h1 className={`mb-4 text-3xl font-bold ${titleColorClass}`}>
            Upgrading Education with Forward-Thinking Initiatives
          </h1>
          <p className="leading-relaxed text-base-content">
            EduMe has tailored its products, curriculum, and services to meet
            the needs of the general public through its innovative initiatives
            in <strong>schools</strong> and <strong>impact programs</strong>.
            These programs are designed to achieve desired outcomes and adhere to
            the educational standards established by modern policies worldwide.
          </p>
        </div>

        {/* Reusable Component for Each Section */}
        {[
          {
            title: "Classroom Learning",
            description:
              "EduME's AI and Robotics Lab is upgrading ICT labs in schools by integrating modern ICT, coding, AI, and robotics education into the curriculum for classes 3-12.",
            stats: "500+ hours classroom teaching",
            link: "/gall/class",
            image: "/g1.jpeg",
          },
          {
            title: "Expos",
            description:
              "EduME offers comprehensive end-to-end assistance in establishing and running expos in various schools to promote talent in young minds.",
            stats: "500+ expo visits",
            link: "/gall/expo",
            image: "/g2.jpeg",
            reverse: true,
          },
          {
            title: "Tech Tours",
            description:
              "EduME organizes multiple tech tours throughout the academic year to promote knowledge expansion in real-world situations and industry-ready projects to develop students' interests.",
            stats: "50+ Tech tour visits",
            link: "/gall/tech",
            image: "/g3.jpeg",
          },
        ].map((section, index) => (
          <div
            key={index}
            className={`mb-6 flex flex-col items-stretch md:flex-row ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="group relative w-full md:w-1/3">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full w-full bg-yellow-600 opacity-0 transition duration-500 group-hover:opacity-100"></div>
                <div className="absolute left-0 top-0 h-full w-full bg-yellow-500 opacity-0 transition duration-500 group-hover:rotate-6 group-hover:opacity-100"></div>
                <div className="absolute left-0 top-0 h-full w-full bg-yellow-400 opacity-0 transition duration-500 group-hover:-rotate-6 group-hover:opacity-100"></div>
                <Image
                  width={500}
                  height={500}
                  src={section.image}
                  alt={section.title}
                  className="relative h-64 w-full object-cover transition duration-500 group-hover:rotate-6"
                />
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className={`mb-2 text-2xl font-bold ${titleColorClass}`}>
                {section.title}
              </h2>
              <p className="mb-1 font-semibold text-base-content">{section.stats}</p>
              <p className="mb-4 leading-snug text-base-content">{section.description}</p>
              <div>
                <Link href={section.link}>
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
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
