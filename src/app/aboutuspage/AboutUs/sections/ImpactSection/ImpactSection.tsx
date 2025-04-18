// components/ImpactSection.tsx
"use client";
import { motion } from "framer-motion";

export default function ImpactSection() {
  const stats = [
    { label: "Students Enrolled", value: "75+" },
    { label: "Teachers", value: "100+" },
    { label: "Schools Registered", value: "50+" },
    { label: "Courses Offered", value: "30+" },
    { label: "Years of Experience", value: "5+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white px-6 py-20 text-center">
      <motion.h2
        className="text-5xl font-extrabold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Impact in Numbers
      </motion.h2>

      <motion.p
        className="max-w-xl mx-auto text-lg text-gray-600 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        A snapshot of the milestones and achievements that drive our success.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="bg-white/60 backdrop-blur-xl shadow-xl p-8 rounded-xl hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-4xl font-bold text-yellow-600 mb-2">{item.value}</h3>
            <p className="text-gray-700">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
