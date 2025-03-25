import React from "react";
import { motion } from "framer-motion";

const Services: React.FC = () => {

  // Variants for text animations
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2 }, // Stagger effect
    }),
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 px-4 py-10 text-base-content">
      {/* Animated Text Section */}
      <motion.div
        className="mb-10 px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Services by Edueme
        </h1>
        <p className="max-w-2xl text-center text-lg md:text-xl">
          Edueme provides educators and students with the tools to cultivate
          coding and problem-solving skills, enabling them to engineer their
          future.
        </p>
      </motion.div>

      {/* Grid Container with Cards */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {[
          { id: 1, imageSrc: "/servic/lab_setups.jpeg", title: "Lab Setup" },
          {
            id: 2,
            imageSrc: "/servic/online_learning.jpeg",
            title: "Online Training",
          },
          { id: 3, imageSrc: "/servic/s3.jpeg", title: "Curriculum" },
          {
            id: 4,
            imageSrc: "/servic/skilled_trinners.jpeg",
            title: "Skilled Trainers",
          },
          {
            id: 5,
            imageSrc: "/servic/classrooom.jpeg",
            title: "Offline Training",
          },
          { id: 6, imageSrc: "/servic/tech_tours.jpeg", title: "Tech Tours" },
          {
            id: 7,
            imageSrc: "/servic/competition.jpg",
            title: "Inter School Competition",
          },
          {
            id: 8,
            imageSrc: "/servic/tech_summit.webp",
            title: "Tech Summit",
          },
          {
            id: 9,
            imageSrc: "/servic/robot_exhibition.webp",
            title: "Robot Exhibition",
          },
        ].map((card, index) => (
          <motion.div
            key={card.id}
            className="card card-compact flex w-full transform flex-col items-center bg-base-300 shadow-xl transition-transform hover:scale-105 sm:w-80"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={cardVariants}
            custom={index} // Stagger effect using index
          >
            <figure className="h-48 w-full overflow-hidden">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="h-full w-full border-b-2 border-orange-950 object-cover"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-lg font-semibold text-base-content">
                {card.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
