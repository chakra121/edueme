"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const titleColorClass = "text-orange-500"; // Apply this class to the titles

  return (
    <motion.div
      className="min-h-screen bg-base-100 py-12 transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Top Heading */}
      <motion.div
        className="mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={`text-4xl font-bold text-white ${titleColorClass}`}>
          Gallery
        </h1>
      </motion.div>

      {/* Main Container */}
      <motion.div
        className="container mx-auto max-w-5xl overflow-hidden rounded-lg bg-base-200 px-6 shadow-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top Section */}
        <motion.div
          className="px-4 py-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className={`mb-4 text-3xl font-bold ${titleColorClass}`}>
            Upgrading Education with Forward-Thinking Initiatives
          </h1>
          <p className="leading-relaxed text-base-content">
            EduMe has tailored its products, curriculum, and services to meet
            the needs of the general public through its innovative initiatives
            in <strong>schools</strong> and <strong>impact programs</strong>.
            These programs are designed to achieve desired outcomes and adhere
            to the educational standards established by modern policies
            worldwide.
          </p>
        </motion.div>

        {/* Sections */}
        {[
          {
            title: "Classroom Learning",
            description:
              "EduME's AI and Robotics Lab is upgrading ICT labs in schools by integrating modern ICT, coding, AI, and robotics education into the curriculum for classes 3-12.",
            stats: "500+ hours classroom teaching",
            link: "/gall/class",
            image: "/g1.jpg",
          },
          {
            title: "Expos",
            description:
              "EduME offers comprehensive end-to-end assistance in establishing and running expos in various schools to promote talent in young minds.",
            stats: "500+ expo visits",
            link: "/gall/expo",
            image: "/g2.jpg",
            reverse: true,
          },
          {
            title: "Tech Tours",
            description:
              "EduME organizes multiple tech tours throughout the academic year to promote knowledge expansion in real-world situations and industry-ready projects to develop students' interests.",
            stats: "50+ Tech tour visits",
            link: "/gall/tech",
            image: "/g3.jpg",
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            className={`mb-6 flex flex-col items-stretch md:flex-row ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image Section with Hover Effects */}
            <motion.div
              className="group relative w-full md:w-1/3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>

            {/* Text Section */}
            <motion.div
              className="p-6 md:w-2/3"
              initial={{ opacity: 0, x: section.reverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className={`mb-2 text-2xl font-bold ${titleColorClass}`}>
                {section.title}
              </h2>
              <p className="mb-1 font-semibold text-base-content">
                {section.stats}
              </p>
              <p className="mb-4 leading-snug text-base-content">
                {section.description}
              </p>
              <div>
                <Link href={section.link}>
                  <motion.button
                    className="mr-4 rounded bg-yellow-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-yellow-600 hover:shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Explore More
                  </motion.button>
                </Link>
                <motion.button
                  className="rounded bg-orange-500 px-6 py-2 text-white transition hover:scale-105 hover:bg-orange-600 hover:shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  Watch Video
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GalleryPage;
