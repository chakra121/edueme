import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CreatingInnovatorsSection = (): JSX.Element => {
  return (
    <section className="py-24 px-6 md:px-20 bg-linear-to-r from-yellow-50 to-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 leading-snug"
      >
        Creating <span className="text-yellow-500">Innovators</span> in Classrooms
      </motion.h2>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Left Text Block */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6"
        >
          <p className="text-gray-700 text-lg leading-relaxed">
            Innovation starts with curiosity. Our classrooms are equipped with tools and activities that encourage students to tinker, explore, and think outside the box.
          </p>
          <ul className="space-y-4 text-gray-800 text-md list-disc list-inside">
            <li>Hands-on projects with real-world relevance</li>
            <li>Collaborative learning and peer brainstorming</li>
            <li>STEM-based modules and maker activities</li>
            <li>Encouraging design thinking from a young age</li>
          </ul>
        </motion.div>

        {/* Right Image Slider */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full"
        >
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
            dynamicHeight={false}
          >
            <div>
              <Image
                src="/innovators/img1.jpg"
                alt="Students building prototypes"
                width={800}
                height={500}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div>
              <Image
                src="/innovators/img2.jpg"
                alt="STEM activity"
                width={800}
                height={500}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div>
              <Image
                src="/innovators/img3.jpg"
                alt="Design thinking in class"
                width={800}
                height={500}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};


