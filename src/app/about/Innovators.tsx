'use client';

import Image from 'next/image';
import React from 'react';

const Innovators: React.FC = () => {
  // Array of images (ensure you have these images in your public folder)
  const images = [
    { src: "/young_innovators.jpg", alt: "Image 1" },
    { src: "/ai_robotics.jpg", alt: "Image 2" },
    { src: "/nuroscience.jpg", alt: "Image 3" },
    { src: "/mech_logo.jpg", alt: "Image 4" },
    { src: "/org_edume.png", alt: "Image 5" }
  
  ];

  return (
    <div className="bg-light-blue py-16">
      <div className="wrapper text-center">
        <h6 className="text-lg font-semibold uppercase text-green-600">
          Innovators
        </h6>
        <h2 className="text-4xl font-extrabold leading-tight text-white">
          Helping 4M students find their inner expertise and{" "}
          <span className="mt-4 block text-4xl font-bold text-white">
            become the leaders and innovators of tomorrow.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-white">
          At Edueme, we offer designed courses to provide students with hands-on
          experience in robotics, enabling them to develop the practical skills
          necessary to construct their own innovative ideas.
        </p>

        {/* Image Carousel Section */}
        <div className="mt-8">
          <div className="relative overflow-hidden">
            <div className="carousel-wrapper">
              <div className="carousel flex">
                {images.map((image, index) => (
                  <div key={index} className="w-1/4 flex-none p-2">
                    <div className="overflow-hidden rounded-md shadow-md">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full rounded-lg"
                        style={{ maxWidth: "200px" }} // Reduce image size
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate images for smooth looping effect */}
                {images.map((image, index) => (
                  <div
                    key={index + images.length}
                    className="w-1/4 flex-none p-2"
                  >
                    <div className="overflow-hidden rounded-md shadow-md">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className="h-auto w-full rounded-lg"
                        width={500}
                        height={300}
                        style={{ maxWidth: "200px" }} // Reduce image size
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Animation */}
      <style jsx>{`
        .carousel-wrapper {
          display: flex;
          overflow: hidden;
        }

        .carousel {
          display: flex;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Innovators;
