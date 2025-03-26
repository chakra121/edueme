"use client";

import type { ReactNode } from "react"; // ✅ Use `import type` for type-only imports
import { motion, useScroll, useTransform } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrophy,
  FaUserGraduate,
  FaMicrochip,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function FloatingRobot({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCard({
  title,
  content,
  Icon,
}: {
  title: string;
  content: string;
  Icon: ReactNode;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [50, 0]); // Adjust the range as needed

  return (
    <motion.div
      style={{ y }} // Animate based on scroll position
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-6 flex items-center space-x-4 rounded-lg bg-white p-6 shadow-lg"
    >
      <div className="text-3xl text-purple-600">{Icon}</div>
      <div>
        <h3 className="text-xl font-bold text-purple-600">{title}</h3>
        <p className="mt-2 text-gray-700">{content}</p>
      </div>
    </motion.div>
  );
}

export default function RoboticsEvent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-20">
      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <FloatingRobot>
          <RiRobot2Fill className="mx-auto h-24 w-24 text-purple-600" />
        </FloatingRobot>
        <h1 className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-5xl font-extrabold text-transparent">
          Navikarana 1.0
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-indigo-600">
          Empowering Intelligence
        </h2>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">
          Join us at Mechatronites Club&apos;s national level fest with
          workshops, seminars, and competitions!
        </p>
      </div>
      <div className="relative mt-12 text-center">
        <p className="text-3xl font-bold text-gray-800">
          Registration Fee: ₹500/-
        </p>
        <motion.div
          initial={{ x: 0, y: 10, opacity: 1, scale: 1 }}
          animate={{
            x: [0, -5, 0],
            y: [15, 20, 15],
            scale: [1, 0.9, 1],
            opacity: [1, 1, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[52%] top-[52%] h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <Image
            src="/cursor-click.svg"
            alt="Mouse Cursor"
            width={50}
            height={50}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block"
        >
          <Link
            href="https://forms.gle/7RbpBT6USpgXoqot8"
            className="cursor-pointer rounded-full bg-white px-8 py-4 text-xl font-semibold text-purple-600 shadow-lg transition-transform hover:shadow-xl"
          >
            Register Now!
          </Link>
        </motion.div>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <AnimatedCard
          title="Date"
          content="01st & 02nd March 2025"
          Icon={<FaCalendarAlt />}
        />
        <AnimatedCard
          title="Venue"
          content="Arka International School, Hyderabad"
          Icon={<FaMapMarkerAlt />}
        />
        <AnimatedCard
          title="Events"
          content="Robotics & AI Expo, Open Mic, Guest Talk, Workshops"
          Icon={<FaMicrochip />}
        />
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatedCard
          title="Junior Category"
          content="Grade 5 to 12"
          Icon={<FaUserGraduate />}
        />
        <AnimatedCard
          title="Prize Rewards"
          content="1st Prize: ₹10,000 | Runners-up: ₹7,000 & ₹3,000"
          Icon={<FaTrophy />}
        />
      </div>
    </div>
  );
}
