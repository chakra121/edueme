import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

 const academicTimeline = [
  {
    title: "Foundation & Orientation",
    description:
      "Kick off the year with introductory sessions, setting the tone with creativity, collaboration, and curiosity. Students explore tech basics and get hands-on with exciting activities.",
    image: "/images/orientation.jpg",
  },
  {
    title: "Hands-on Skill Training",
    description:
      "Students dive into practical sessions on robotics, coding, AI, and design thinking. Mentorship and real-world tasks ignite their passion for innovation.",
    image: "/images/skill-training.jpg",
  },
  {
    title: "Mid-Year Project Showcase",
    description:
      "Learners present their progress through mid-year expos. They build prototypes, solve community problems, and get real feedback from peers and experts.",
    image: "/images/project-showcase.jpg",
  },
  {
    title: "Hackathons & Tech Fests",
    description:
      "Exciting hackathons and competitions build team spirit and innovation under pressure. This phase enhances creativity, critical thinking, and time management.",
    image: "/images/hackathon.jpg",
  },
  {
    title: "Final Project & Graduation",
    description:
      "The year culminates with final project presentations and certification. Students reflect on growth and plan the next stage of their innovation journey.",
    image: "/images/graduation.jpg",
  },
];

export const AcademicYearSection = (): JSX.Element => {
  return (
    <section className="py-20 px-6 md:px-16 ">
      <h2 className="text-4xl font-bold text-center mb-16">
        <span className="text-yellow-500">Academic Year</span> Program Journey
      </h2>
      <div className="relative border-l-4 border-yellow-400 ml-4 pl-6 space-y-20">
        {academicTimeline.map((step, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:flex-row items-center md:items-start gap-10"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Marker */}
            <div className="absolute left-[-35px] top-4 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white shadow-md" />

            {/* Image */}
            <div className="w-full md:w-1/2">
              <Image
                src={step.image}
                alt={step.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <h3 className="text-2xl font-semibold text-yellow-600">{step.title}</h3>
              <p className="text-gray-700 text-md leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

