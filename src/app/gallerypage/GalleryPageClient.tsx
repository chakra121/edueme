"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const GalleryPageClient = () => {
  const titleColorClass = "text-orange-500";

  return (
    <div className="min-h-screen bg-base-100 py-12">
      {/* Top Heading */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-4xl font-bold text-base-content">
          Gallery
        </h1>
      </motion.div>
    </div>
  );
};

export default GalleryPageClient;
