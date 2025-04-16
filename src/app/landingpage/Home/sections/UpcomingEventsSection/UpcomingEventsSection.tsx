"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const events = [
  {
    title: "Robotics Hackathon",
    date: "April 28, 2025",
    img: "/eventssection/1.jpeg",
  },
  {
    title: "AI in Classrooms",
    date: "May 5, 2025",
    img: "/eventssection/2.jpeg",
  },
  {
    title: "Innovators' Expo",
    date: "May 20, 2025",
    img: "/eventssection/3.jpeg",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const UpcomingEventsSection = () => {
  const router = useRouter();

  return (
    <section
      id="events-preview"
      className="relative py-24 bg-white text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4 bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent"
        >
          🚀 Upcoming Tech Thrills!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-black mb-12 max-w-2xl mx-auto"
        >
          Get ready to witness innovation, creativity, and future-defining moments in our events!
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-sm shadow-2xl hover:shadow-yellow-500/50 hover:ring-2 hover:ring-yellow-400 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
            >
              <Image
                src={event.img}
                alt={event.title}
                width={500}
                height={300}
                className="rounded-md object-cover w-full h-40 mb-4 border border-yellow-400/20 group-hover:shadow-yellow-400"
              />
              <h3 className="text-xl font-bold text-yellow-300 group-hover:text-black transition duration-200">
                {event.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">{event.date}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/allevents")}
          className="mt-14 px-8 py-3 rounded-full text-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition duration-300 shadow-lg shadow-yellow-500/30"
        >
          Explore All Events →
        </motion.button>
      </div>
    </section>
  );
};
