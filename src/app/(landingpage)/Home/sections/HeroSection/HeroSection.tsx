"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";

export const HeroSection = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["/bgphoto.png", "/interactive_learning.jpg", "/g1.jpg", "/g2.jpg", "/g3.jpg"];

  // Add auto-advance effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  // Optional: Add navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Partner logos
  const partnerLogos = [
    { src: "/schools/logo1.png", alt: "School logo 1" },
    { src: "/schools/logo2.png", alt: "School logo 2" },
    { src: "/schools/logo3.png", alt: "School logo 3" },
    { src: "/schools/logo4.png", alt: "School logo 4" },
    { src: "/schools/logo5.png", alt: "School logo 5" },
    { src: "/schools/logo6.png", alt: "School logo 6" },
    { src: "/schools/logo7.png", alt: "School logo 7" },
    { src: "/schools/logo8.png", alt: "School logo 8" },
    { src: "/schools/logo9.png", alt: "School logo 9" },
    { src: "/schools/logo10.png", alt: "School logo 10" },
    { src: "/schools/logo11.png", alt: "School logo 11" },
    { src: "/schools/logo12.jpg", alt: "School logo 12" },
  ];

  return (
    <section className="relative flex w-full flex-col items-start gap-[30px]">
      {/* Hero Content */}
      <div className="flex w-full flex-col items-center justify-between bg-gray-50 px-10 py-20 md:flex-row">
        {/* Text Content */}
        <motion.div
          className="text-center md:w-1/2 md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl leading-tight font-bold">
            Welcome to <br />
            EdueMe
          </h1>
          <p className="mt-6 text-xl font-semibold text-gray-600">
            Robotics, AI, and IoT - The RA(I)oT Curriculum for Future Innovators
          </p>
        </motion.div>

        {/* Updated Image Carousel */}
        <motion.div
          className="relative mt-10 md:mt-0 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Carousel Image ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
                priority={index === 0}
              />
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
              aria-label="Next slide"
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentSlide === index ? "w-4 bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partner Logos */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-8 lg:py-8">
        <div className="pb-4">
          <h1 className="text-base-content pb-5 text-2xl font-bold text-balance sm:text-3xl lg:text-4xl">
            Schools in Collaboration
          </h1>
        </div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Marquee
            gradient={true}
            gradientColor="white"
            speed={50}
            pauseOnHover={true}
            className="py-4"
          >
            {partnerLogos.map((logo, index) => (
              <motion.figure
                key={index}
                className="mx-8 cursor-pointer overflow-hidden rounded-xl border border-gray-300 bg-white px-8 py-4 transition-all duration-100 hover:border hover:border-gray-300 hover:shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  width={120}
                  height={120}
                  alt={logo.alt}
                  src={logo.src}
                  className="rounded-md object-contain"
                />
              </motion.figure>
            ))}
          </Marquee>
        </motion.div>

        {/* Gradient Fades */}
        <div className="from-base-100 pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r" />
        <div className="from-base-100 pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l" />
      </div>
    </section>
  );
};