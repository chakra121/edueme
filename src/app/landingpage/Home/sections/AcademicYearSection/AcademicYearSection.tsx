import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

const academicTimeline = [
  {
    title: "Foundation & Orientation",
    description: "Creative kickoff sessions with hands-on tech exploration.",
    image: "/academicyear/img1.png",
    color: "#FFD166" // Yellow
  },
  {
    title: "Hands-on Skill Training",
    description: "Practical workshops in robotics, coding, AI, and design thinking.",
    image: "/academicyear/hos.jpg",
    color: "#06D6A0" // Green
  },
  {
    title: "Mid-Year Project Showcase",
    description: "Student-led expos featuring innovative prototypes and solutions.",
    image: "/academicyear/img3.jpg",
    color: "#118AB2" // Blue
  },
  {
    title: "Hackathons & Tech Fests",
    description: "Team competitions building innovation under pressure.",
    image: "/academicyear/img4.jpg",
    color: "#EF476F" // Pink
  },
  {
    title: "Final Project & Graduation",
    description: "Culmination of learning journey with certification and reflection.",
    image: "/academicyear/img5.png",
    color: "#9B5DE5" // Purple
  },
];

interface TimelineItem {
  title: string;
  description: string;
  image: string;
  color: string;
}

const TimelineCard = ({ item, index, isEven }: { item: TimelineItem; index: number; isEven: boolean }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center justify-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} mb-24`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isEven ? 100 : -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
    >
      {/* Marker */}
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 rounded-full border-4 border-white shadow-lg"
        style={{ backgroundColor: item.color }}
      />
      
      {/* Line connector */}
      <div className={`absolute h-24 w-1 bg-gradient-to-b from-gray-300 to-transparent ${index === academicTimeline.length - 1 ? 'hidden' : ''}`} 
           style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }} />

      {/* Content container */}
      <div className="w-full md:w-5/12 flex flex-col items-center">
        <motion.div 
          className="overflow-hidden rounded-xl shadow-2xl w-full h-full"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{item.description}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty space for the other side */}
      <div className="w-full md:w-5/12"></div>
    </motion.div>
  );
};

export const AcademicYearSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-yellow-500">Academic Year</span> Journey
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow the transformative path students take throughout the year
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Center timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-blue-400 to-purple-500 transform -translate-x-1/2" />

        {/* Timeline items */}
        <div className="relative z-10">
          {academicTimeline.map((item, index) => (
            <TimelineCard 
              key={index} 
              item={item} 
              index={index} 
              isEven={index % 2 === 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};


