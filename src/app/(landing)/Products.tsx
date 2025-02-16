
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Products = () => {

  return (
    <div className="flex flex-col items-center justify-center bg-base-100 px-4 py-10 text-base-content lg:px-20">
      {/* Animated Title Section */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} // Start faded and lower
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-bold sm:text-4xl">Our Products:</h1>
      </motion.div>

      {/* Products Section */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {[
          { src: "/nuroscience.jpg", alt: "Product - Neuroscience" },
          { src: "/ai_robotics.jpg", alt: "Product - AI Robotics" },
          { src: "/young_innovators.jpg", alt: "Product - Young Innovators" },
          { src: "/mech_logo.jpg", alt: "Mechatronites_Club" },
        ].map((product, index) => (
          <motion.div
            key={product.src}
            initial={{ opacity: 0, scale: 0.8 }} // Start small and faded
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }} // Staggered effect
           
            whileHover={{
              scale: 1.12, // Faster hover effect
              transition: { duration: 0.2, ease: "easeOut" }, // Quick response
            }}
          >
            <Image
              width={300}
              height={300}
              className="h-[10rem] w-[10rem] rounded-full border-2 text-base-content p-1 md:h-[12rem] md:w-[12rem] lg:h-[15rem] lg:w-[15rem]"
              alt={product.alt}
              src={product.src}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
