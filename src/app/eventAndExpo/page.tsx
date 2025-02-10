"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const events = [
  { id: 1, title: "Robotics Expo", category: "Robotics", image: "/robotics-events2.jpg", description: "A showcase of cutting-edge robotics technology." },
  { id: 2, title: "AI & Robotics Summit", category: "Robotics with AI", image: "/robotics-events1.png", description: "Exploring the fusion of AI and robotics." },
  { id: 3, title: "Autonomous Machines", category: "Robotics", image: "/robotics-events3.jpg", description: "Discover the future of autonomous machines." },
];

type Event = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
};

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const router = useRouter();

  const filteredEvents = filter === "All" ? events : events.filter(event => event.category === filter);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('/event-banner.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Upcoming Tech Events</h1>
          <button onClick={() => router.push("/events")} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Explore</button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">More Upcoming Events</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded bg-white text-black">
          <option value="All">All</option>
          <option value="Robotics">Robotics</option>
          <option value="Robotics with AI">Robotics with AI</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-gray-200 shadow-md rounded-lg p-4 cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-2 text-lg font-semibold text-black">{event.title}</h3>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-700">{selectedEvent.description}</p>
            <button onClick={() => setSelectedEvent(null)} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
