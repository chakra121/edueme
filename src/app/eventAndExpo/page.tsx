"use client";

import React from "react";
import { motion } from "framer-motion";


interface Event {
  id: number;
  name: string;
  caption: string;
  summary: string;
  registerDate: string;
  venue: string;
  contact: string;
  eventsHeld: string[];
  prizeDetails: string;
  fee: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "AI Robotics Championship",
    caption: "Innovate. Compete. Win!",
    summary:
      "An intense robotics competition where teams showcase their AI-driven robots in various challenges.",
    registerDate: "March 10, 2025",
    venue: "Tech Arena, Robotics University",
    contact: "+91 9876543210",
    eventsHeld: ["AI Bot Racing", "Autonomous Navigation", "Robotic Warfare"],
    prizeDetails: "Total Prize Pool: $10,000",
    fee: "$50 per team",
  },
  {
    id: 2,
    name: "IoT & Automation Workshop",
    caption: "Build Smart Systems!",
    summary:
      "A hands-on workshop where participants learn to build IoT-based automation projects.",
    registerDate: "April 5, 2025",
    venue: "Innovation Hub, City Center",
    contact: "+91 8765432109",
    eventsHeld: ["Smart Home Automation", "Industry 4.0 IoT"],
    prizeDetails: "Certification & IoT Kits for Winners",
    fee: "$30 per participant",
  },
];

export default function RoboticsEvent() {
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 Upcoming Robotics Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-bold text-blue-400">{event.name}</h2>
            <p className="text-gray-300 italic mb-3">{event.caption}</p>
            <p className="text-gray-400 mb-3">{event.summary}</p>
            <div className="text-sm space-y-2">
              <p>
                <strong>📅 Register by:</strong> {event.registerDate}
              </p>
              <p>
                <strong>📍 Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>📞 Contact:</strong> {event.contact}
              </p>
              <p>
                <strong>🏆 Events to be held:</strong>{" "}
                {event.eventsHeld.join(", ")}
              </p>
              <p>
                <strong>🎖️ Prizes:</strong> {event.prizeDetails}
              </p>
              <p>
                <strong>💰 Fee:</strong> {event.fee}
              </p>
            </div>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all">
              Register Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

