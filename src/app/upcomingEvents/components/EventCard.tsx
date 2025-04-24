"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import type { UpcomingEvent } from "@/types/upcomingEvents";
import { useRef, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component

// Import the CSS file (adjust path if needed)
import './animation.css';

interface EventCardProps {
  event: UpcomingEvent;
  borderColor?: string; // Optional prop for border color
  hoverTextColor?: string; // Optional prop for text hover color
}

// Default colors if props aren't provided
const DEFAULT_BORDER_COLOR = "#ffb800"; // Orange
const DEFAULT_HOVER_TEXT_COLOR = "#fff5d9"; // Light Orange

export default function EventCard({
  event,
  borderColor = DEFAULT_BORDER_COLOR,
  hoverTextColor = DEFAULT_HOVER_TEXT_COLOR
}: EventCardProps) {

  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card container

  // Format the registration end date
  const formattedRegEndDate = event.regEndDate
    ? new Date(event.regEndDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // Effect to handle mouse move for border rotation and set initial styles
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Set CSS Variables for colors
    element.style.setProperty('--border-color', borderColor);
    element.style.setProperty('--hover-text-color', hoverTextColor);

    // Set the background gradient dynamically (needed because it uses --border-color)
    // Read the --color-bg-inner defined in CSS
    const innerBgColor = getComputedStyle(element).getPropertyValue('--color-bg-inner').trim() || '#1a1a1d'; // Fallback just in case
    element.style.backgroundImage = `linear-gradient(${innerBgColor}, ${innerBgColor}), conic-gradient(from var(--rotation), ${borderColor} 0deg, ${borderColor} 90deg, ${innerBgColor} 90deg, ${innerBgColor} 360deg)`;


    // Find the text effect element and set its background color
    const textEffectElement = element.querySelector('.card-title-effect')!;
    if (textEffectElement instanceof HTMLElement) {
        textEffectElement.style.backgroundColor = borderColor;
    }


    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      // Calculate mouse position relative to the element's center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Calculate angle in radians
      const angle = Math.atan2(y, x);
      // Update the --rotation CSS variable
      element.style.setProperty("--rotation", `${angle}rad`);
    };

    element.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [borderColor, hoverTextColor]); // Rerun effect if colors change

  return (
    // Apply file-container class and ref here.
    <motion.div
      ref={cardRef}
      className="file-container" // Use the class from the CSS
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="inner-container"> {/* Inner container for background and padding */}

        {/* Image Container */}
        <div className="image-container">
           {/* Use Next.js Image for optimization, ensure /temp.avif is in public folder */}
           <Image
             src="/temp.avif" // Path relative to the public folder
             alt={event.title} // Use event title for alt text
             fill // Makes image fill the container
             style={{ objectFit: 'cover' }} // Equivalent to object-fit: cover
             className="file-image" // Keep class if needed for other CSS rules
             priority // Add priority if the image is above the fold
           />
           {/* Fallback if Next Image isn't used or preferred:
           <img
             src="/temp.avif"
             alt={event.title}
             className="file-image"
           />
           */}
        </div>

        {/* Content Area */}
        <div className="card-content">

          {/* Title structure for hover effect */}
          <h2 className="card-title-wrapper">
            {/* card-title color set in CSS */}
            <span className="card-title">{event.title}</span>
            <span className="card-title-effect"></span>
          </h2>

          {event.subTitle && (
             // Use adjusted Tailwind color class (defined in animation.css)
            <p className="mt-0.5 text-lg text-orange-400">{event.subTitle}</p>
          )}

          {/* Details Section */}
          <div className="mt-2 space-y-2"> {/* Removed flex-grow */}
            <div className="flex items-center space-x-2">
              {/* text-purple-400 defined in animation.css */}
              <FaCalendarAlt className="text-orange-400" />
              {/* text-gray-300 defined in animation.css */}
              <span className="text-orange-200">{event.eventdate}</span>
            </div>

            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-orange-400" />
              <span className="text-orange-200">{event.eventVenue}</span>
            </div>

            {formattedRegEndDate && (
              <div className="flex items-center space-x-2">
                <HiClock className="text-orange-400" />
                <span className="text-orange-200">
                  Register by: {formattedRegEndDate}
                </span>
              </div>
            )}
          </div>

          {/* Button - with minimal margin */}
          <div className="mt-1">
            <Link
              href={`/upcomingEvents/${event.slug}`}
              className="card-button-link"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}