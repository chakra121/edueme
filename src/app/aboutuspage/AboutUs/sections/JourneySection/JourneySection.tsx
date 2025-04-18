// components/JourneySection.tsx
"use client";
import { motion } from "framer-motion";

export default function JourneySection() {
  const journey = [
    {
      year: "2022",
      title: "The Beginning",
      description:
        "Our journey started with a passion to revolutionize education through technology.",
    },
    {
      year: "2023",
      title: "Innovation and Recognition",
      description:
        "We gained recognition and introduced innovative teaching tools.",
    },
    {
      year: "2024",
      title: "Expansion",
      description:
        "Expanded to more schools and communities across the country.",
    },
    {
      year: "2025",
      title: "Leading the Future",
      description:
        "Now becoming a leader in accessible, tech-driven learning platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-yellow-50 to-white px-6 py-20">
      <motion.h2
        className="text-5xl font-extrabold text-center text-gray-900 mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Journey
      </motion.h2>

      <motion.p
        className="max-w-xl mx-auto text-center text-lg text-gray-600 mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        A timeline of achievements that shaped who we are.
      </motion.p>

      <div className="relative border-l-4 border-yellow-500 pl-10 max-w-3xl mx-auto">
        {journey.map((item, i) => (
          <motion.div
            key={i}
            className="mb-14 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <div className="absolute -left-[30px] top-1 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white shadow-md" />
            <div className="bg-white/60 backdrop-blur-lg shadow-lg p-6 rounded-lg hover:scale-[1.02] transition-transform">
              <h3 className="text-xl font-bold text-gray-800">
                {item.year} - {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
