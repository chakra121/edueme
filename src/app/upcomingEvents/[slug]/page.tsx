"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { RiRobot2Fill } from "react-icons/ri";
import {
  FaLocationDot,
  FaMicrochip,
  FaPhone,
  FaUserGraduate,
} from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import type { UpcomingEvent } from "@/types/upcomingEvents";
import type { ReactNode } from "react";

// Floating animation component
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

// Animated info card
function AnimatedCard({
  title,
  content,
  Icon,
}: {
  title: string;
  content: string | ReactNode;
  Icon: ReactNode;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [50, 0]);

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-6 flex items-center space-x-4 rounded-lg bg-white p-6 shadow-lg"
    >
      <div className="text-3xl text-purple-600">{Icon}</div>
      <div>
        <h3 className="text-xl font-bold text-purple-600">{title}</h3>
        <div className="mt-2 text-gray-700">{content}</div>
      </div>
    </motion.div>
  );
}

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/upcomingEvents?slug=${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = (await response.json()) as UpcomingEvent;
        setEvent(data ?? null);
      } catch (err) {
        setError("Error loading event details. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      void fetchEvent();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
        <div className="text-center">
          <p className="text-lg text-red-500">{error ?? "Event not found"}</p>
          <Link
            href="/upcomingEvents"
            className="mt-4 inline-block text-purple-600 hover:underline"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-6 md:p-20">
      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <FloatingRobot>
          <RiRobot2Fill className="mx-auto h-24 w-24 text-purple-600" />
        </FloatingRobot>
        <h1 className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-5xl font-extrabold text-transparent">
          {event.title}
        </h1>
        {event.subTitle && (
          <h2 className="mt-4 text-2xl font-bold text-indigo-600">
            {event.subTitle}
          </h2>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700">{event.description}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <AnimatedCard
          title="Date"
          content={event.eventdate}
          Icon={<FaCalendarAlt />}
        />
        <AnimatedCard
          title="Venue"
          content={event.eventVenue}
          Icon={<FaLocationDot />}
        />
        <AnimatedCard
          title="Contact"
          content={event.contactUs}
          Icon={<FaPhone />}
        />
      </div>

      <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatedCard
          title="Category"
          content={event.category}
          Icon={<FaUserGraduate />}
        />
        <AnimatedCard
          title="Programs"
          content={
            <ul className="list-disc pl-5">
              {event.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          }
          Icon={<FaMicrochip />}
        />
      </div>

      {event.note && (
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600">
              Important Note
            </h3>
            <p className="mt-4 text-gray-700">{event.note}</p>
          </div>
        </div>
      )}
      <div className="relative mt-12 text-center">
        <p className="text-3xl font-bold text-gray-800">
          Registration Fee: {event.regFee}
        </p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block"
        >
          <Link
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full bg-white px-8 py-4 text-xl font-semibold text-purple-600 shadow-lg transition-transform hover:shadow-xl"
          >
            Register Now!
          </Link>
        </motion.div>
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/upcomingEvents"
          className="inline-block rounded-md bg-purple-100 px-6 py-3 font-medium text-purple-600 transition-colors hover:bg-purple-200"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
