
import React from "react";
import { motion } from "framer-motion";

const CurriculumHighlights = () => {


  const highlights = [
    { name: "Innovation", image: "unused.jpg" },
    { name: "Technology", image: "unused.jpg" },
    { name: "Research", image: "unused.jpg" },
    { name: "Development", image: "unused.jpg" },
    { name: "Collaboration", image: "unused.jpg" },
    { name: "Growth", image: "unused.jpg" },
  ];

  return (
    <section className="flex flex-col items-center justify-center bg-base-100 py-16 text-base-content transition-all duration-500">
      {/* Animated Title */}
      <motion.h2
        className="mb-10 text-center text-4xl font-bold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Curriculum Highlights
      </motion.h2>

      {/* Animated Grid */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            className="flex h-[8cm] w-[5.5cm] transform flex-col items-center rounded-lg bg-base-200 p-4 text-center text-base-content shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex h-[4.5cm] w-[4.5cm] items-center justify-center overflow-hidden rounded-full bg-base-300 shadow-lg">
              <motion.img
                src={highlight.image}
                alt={highlight.name}
                className="h-full w-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              className="mt-2 text-lg font-semibold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {highlight.name}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CurriculumHighlights;
