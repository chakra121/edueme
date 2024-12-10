'use client';

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
        <h6 className="text-lg font-semibold text-green-600 uppercase">Innovators</h6>
        <h2 className="text-4xl font-extrabold text-white leading-tight ">
          Helping 4M students find their inner expertise and{" "}
          <span className="block mt-4 text-4xl font-bold text-white ">
            become the leaders and innovators of tomorrow.
          </span>
        </h2>
        <p className="text-white mt-4 max-w-3xl mx-auto">
          At Edueme, we offer designed courses to provide students with hands-on experience in robotics, enabling them to develop the practical skills necessary to construct their own innovative ideas.
        </p>

        {/* Image Carousel Section */}
        <div className="mt-8">
          <div className="overflow-hidden relative">
            <div className="carousel-wrapper">
              <div className="carousel flex">
                {images.map((image, index) => (
                  <div key={index} className="flex-none w-1/4 p-2">
                    <div className="shadow-md rounded-md overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto rounded-lg"
                        style={{ maxWidth: '200px' }} // Reduce image size
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate images for smooth looping effect */}
                {images.map((image, index) => (
                  <div key={index + images.length} className="flex-none w-1/4 p-2">
                    <div className="shadow-md rounded-md overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto rounded-lg"
                        style={{ maxWidth: '200px' }} // Reduce image size
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
