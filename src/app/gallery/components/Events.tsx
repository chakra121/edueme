"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface EventCardProps {
  title: string;
  imageSrc: string;
  index: number;
  Description: string;
  href: string;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const EventCard = ({
  title,
  imageSrc,
  href,
  index,
  Description,
  hoveredIndex,
  setHoveredIndex,
}: EventCardProps) => {
  const isRotated = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className={`group relative flex h-[600px] min-w-[170px] flex-[2] items-center justify-center transition-[flex] duration-700 ease-out hover:flex-[10] lg:flex-[0.5] lg:hover:flex-[3.5]`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="absolute rounded-[24px] object-cover"
      />

      <div className="absolute bottom-0 flex w-full flex-col justify-start rounded-b-[24px] bg-[rgba(0,0,0,0.5)] p-4 opacity-0 group-hover:opacity-100">
        <div className="my-2 justify-between px-4 flex w-full items-center gap-4">
          <h2 className="rounded-x text-[26px] font-semibold text-white sm:text-[32px]">
            {title}
          </h2>
          <div className="ml-auto flex h-full items-center justify-center">
            <Link href={href} className="btn btn-ghost btn-active">
              View Photos
            </Link>
          </div>
        </div>
        <div className="px-4 text-[16px] font-normal transition duration-50 ease-in-out text-white sm:text-[18px]">
          {Description}
          </div>
      </div>

      {/* Rotated or Normal Title */}
      <h3
        className={`absolute z-0 rounded-xl bg-slate-900 p-2 text-[18px] font-semibold whitespace-nowrap text-white transition-all duration-600 group-hover:hidden sm:text-[26px] lg:bottom-20 ${
          isRotated ? "sm:origin-[0,0] sm:rotate-[-90deg]" : ""
        }`}
      >
        {title}
      </h3>
    </motion.div>
  );
};

const Events = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const events = [
    {
      id: 0,
      title: "Classrooms",
      imageSrc: "/galldesing/classroom.jpg",
      href: "gallery/classrooms",
      Description:"Our classrooms are where the magic of learning begins. With hands-on activities in robotics and the Internet of Things, students from 3rd to 12th grade dive into the world of technology in a fun and engaging way. Each session is designed to spark curiosity, encourage creativity, and build strong problem-solving skills.",
    },
    {
      id: 1,
      title: "Expo Events",
      imageSrc: "/galldesing/expo.jpg",
      href: "gallery/expo",
      Description:"Expo events give our students a platform to showcase their projects and innovations. From local school fairs to larger exhibitions, these events highlight the dedication and talent of our young learners. It’s a chance for them to present their ideas, gain confidence, and inspire others with their creativity.",

    },
    {
      id: 2,
      title: "Tech Events",
      imageSrc: "/galldesing/techtour.jpg",
      href: "gallery/tech",
      Description:"Our tech events are dynamic workshops and sessions that immerse students in the latest trends in robotics, coding, and IoT. These events go beyond the classroom, offering unique learning experiences that challenge and excite. Students collaborate, compete, and grow as future tech leaders in a fun, interactive environment.",
    },
  ];

  return (
    <section className="xs:p-8 h-auto px-6 py-12 sm:p-16" id="events">
      <div className="mx-auto flex w-full flex-col 2xl:max-w-[1280px]">
        <h2 className="mt-[8px] text-center text-[40px] font-bold">
          Upgrading Education with Forward-Thinking Initiatives
        </h2>

        <div className="mt-[50px] flex min-h-[70vh] flex-col gap-5 lg:flex-row">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.title}
              imageSrc={event.imageSrc}
              href={event.href}
              index={index}
              Description={event.Description}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
