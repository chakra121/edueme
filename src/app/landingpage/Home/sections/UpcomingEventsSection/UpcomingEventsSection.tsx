"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Type definition
type EventData = {
  title: string;
  eventdate: string;
  eventVenue: string;
  regEndDate?: string; // ISO format
};

// Animation config
const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Countdown utility
const getTimeRemaining = (endDate: string) => {
  const total = Date.parse(endDate) - Date.now();
  if (total <= 0) return null;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};

export const UpcomingEventsSection = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/landing/upcomingEvent");
        const data = await res.json();
        // Sort events by event date
        const sorted = [...data].sort(
          (a, b) => Date.parse(a.eventdate) - Date.parse(b.eventdate),
        );
        setEvents(sorted);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated: Record<number, string> = {};
      events.forEach((event, index) => {
        if (!event.regEndDate) return;
        const time = getTimeRemaining(event.regEndDate);
        if (time) {
          updated[index] =
            `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
        } else {
          updated[index] = "🔒 Registration closed";
        }
      });
      setCountdowns(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <section
      id="events-preview"
      className="relative overflow-hidden bg-white py-22 text-black"
    >
      <div className="mx-auto max-w-7xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-4 bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-4xl font-extrabold tracking-wide text-transparent md:text-5xl"
        >
          🚀 Upcoming Tech Thrills!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-lg text-black md:text-xl"
        >
          Get ready to witness innovation, creativity, and future-defining
          moments in our events!
        </motion.p>

        <div className="flex mb-5 flex-col flex-wrap items-center justify-center gap-6 md:flex-row">
          {events.map((event, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-sm rounded-xl border border-yellow-300 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/40"
            >
              <h3 className="mb-2 text-xl font-bold text-yellow-500">
                {event.title}
              </h3>

              <p className="text-md text-gray-700">📍 {event.eventVenue}</p>
              <p className="text-md mt-1 text-gray-800">
                📅{" "}
                {new Date(event.eventdate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {event.regEndDate && (
                <p className="text-md mt-2 font-medium text-red-500">
                  ⏳ {countdowns[i] || "Loading..."}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <Link href="/upcomingEvents" className="btn mt-5 btn-primary btn-lg transition duration-300 ease-out hover:scale-110">
          Explore All Events →
        </Link>
      </div>
    </section>
  );
};
