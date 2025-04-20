"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import type { UpcomingEvent } from "@/types/upcomingEvents";

interface EventCardProps {
  event: UpcomingEvent;
}

export default function EventCard({ event }: EventCardProps) {
  // Format the registration end date
  const formattedRegEndDate = event.regEndDate
    ? new Date(event.regEndDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-lg card bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex h-full flex-col">
        <h2 className="text-2xl font-bold text-purple-600">{event.title}</h2>
        {event.subTitle && (
          <p className="mt-1 text-lg text-indigo-500">{event.subTitle}</p>
        )}

        <div className="mt-4 flex-grow space-y-3">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-purple-500" />
            <span className="text-gray-700">{event.eventdate}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaLocationDot className="text-purple-500" />
            <span className="text-gray-700">{event.eventVenue}</span>
          </div>


          {formattedRegEndDate && (
            <div className="flex items-center space-x-2">
              <HiClock className="text-purple-500" />
              <span className="text-gray-700">
                Register by: {formattedRegEndDate}
              </span>
            </div>
          )}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            href={`/events/${event.slug}`}
            className="block rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:from-purple-700 hover:to-indigo-700"
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
