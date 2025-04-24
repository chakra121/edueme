"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import EventCard from "./components/EventCard";
import type { UpcomingEvent } from "@/types/upcomingEvents";

// Floating animation component
function FloatingRobot() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <RiRobot2Fill className="mx-auto h-24 w-24 text-purple-600" />
    </motion.div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/upcomingEvents");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json() as UpcomingEvent[];
        setEvents(data);
      } catch (err) {
        setError("Error loading events. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEvents();
  }, []);

  return (
    <div 
      style={{
        backgroundImage: "url('/uebg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-screen p-6 md:p-12"
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <FloatingRobot />
        <h1 className="mt-6 bg-gradient-to-r from-[#ffb800] to-indigo-600 bg-clip-text text-5xl font-extrabold text-transparent">
          Upcoming Events
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          Discover our exciting robotics and AI events
        </p>
      </div>

      {isLoading ? (
        <div className="mt-12 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading events...</p>
        </div>
      ) : error ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700">
            No upcoming events at the moment. Please check back later!
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
