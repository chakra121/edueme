import React from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaLaptopCode,
} from "react-icons/fa";
import Image from "next/image";
import { PiCertificateFill } from "react-icons/pi";


const ICTraining = () => {

  const points = [
    {
      title: "Interactive Learning",
      description:
        "Engage with instructors in real-time, ask questions, and participate in discussions for a better understanding.",
      icon: <FaChalkboardTeacher className="text-5xl text-base-content" />,
      image: "/interactive_learning.jpg",
    },
    {
      title: "Collaborative Environment",
      description:
        "Work together with peers, share ideas, and improve teamwork skills through group activities and projects.",
      icon: <FaUsers className="text-5xl text-base-content" />,
      image: "/collaborative_learning.jpg",
    },
    {
      title: "Hands-On Practical Sessions",
      description:
        "Gain real-world experience with lab exercises, coding sessions, and live demonstrations.",
      icon: <FaLaptopCode className="text-5xl text-base-content" />,
      image: "/hands_on_learning.jpg",
    },
    {
      title: "Certified Courses",
      description:
        "Complete instructor-led courses and earn industry-recognized certifications to boost your career.",
      icon: <PiCertificateFill className="text-5xl text-base-content" />,
      image: "/certification.jpg",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center bg-base-100 py-16 text-base-content">
      {/* Animated Title */}
      <motion.h2
        className="mb-10 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        In-Classroom Training
      </motion.h2>

      {/* Animated Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {points.map((point, index) => (
          <motion.div
            key={index}
            className="card relative h-[450px] overflow-hidden bg-base-200 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <motion.figure
              className="h-1/2 w-full"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={point.image}
                alt={point.title}
                width={500}
                height={300}
                className="h-full w-full object-cover text-base-content transition-transform duration-500"
              />
            </motion.figure>
            <div className="card-body flex h-1/2 flex-col justify-center">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                {point.icon}
                <h3 className="text-2xl font-semibold">{point.title}</h3>
              </motion.div>
              <motion.p
                className="mt-2 text-lg text-base-content"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.4 }}
                viewport={{ once: true }}
              >
                {point.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ICTraining;
