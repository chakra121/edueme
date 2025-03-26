"use client";
import { useState } from "react";
import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Navikarana 1.0",
    category: "Robotics",
    image: "/robotics-events2.jpg",
    description: "A showcase of cutting-edge robotics technology.",
    date: "2025-03-15",
    time: "10:00 AM",
    location: "Arka International School,LB Nagar",
  },
  {
    id: 2,
    title: "AI & Robotics Summit",
    category: "Robotics with AI",
    image: "/robotics-events1.png",
    description: "Exploring the fusion of AI and robotics.",
    date: "2025-04-10",
    time: "2:00 PM",
    location: "Takshashila Public School,Shanthi nagar",
  },
  {
    id: 3,
    title: "Robotics Workshop",
    category: "Robotics",
    image: "/robotics-events2.jpg",
    description: "Hands-on workshop on robotics basics.",
    date: "2025-02-20",
    time: "3:00 PM",
    location: "789 Oak St, Chicago",
  },
];

type Event = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  date: string;
  time: string;
  location: string;
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    events.find((event) => event.title === "Navikarana 1.0") ?? null,
  );

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date(),
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date(),
  );

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Banner */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(/banner.jpg)` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">All Events</h1>
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
            Register Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex px-4 py-8">
        {/* Sidebar */}
        <aside className="w-1/4 pr-4">
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="cursor-pointer rounded-lg bg-gray-200 p-4 shadow-md transition duration-300 hover:bg-gray-300"
                onClick={() => handleEventClick(event)}
              >
                <h3 className="text-lg font-semibold text-black">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {event.date} - {event.time}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Event Details */}
        <section className="w-3/4">
          {selectedEvent ? (
            <div className="mx-auto h-full min-h-[200px] max-w-md rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-2 text-2xl font-semibold">
                {selectedEvent.title}
              </h2>
              <p className="mb-2 text-sm text-gray-600">
                {selectedEvent.date} - {selectedEvent.time}
              </p>
              <p className="mb-2 text-sm text-gray-600">
                {selectedEvent.location}
              </p>
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                width={500}
                height={300}
                className="mb-4 h-32 w-full rounded-md object-cover"
              />
              <p className="mb-4 text-gray-700">{selectedEvent.description}</p>
              <button className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
                Register Now
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">
                Select an event from the sidebar to see more details.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Past Events */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Past Events</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="cursor-pointer rounded-lg bg-gray-200 p-4 shadow-md transition duration-300 hover:bg-gray-300"
              onClick={() => handleEventClick(event)}
            >
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={300}
                className="mb-2 h-40 w-full rounded-md object-cover"
              />
              <h3 className="text-lg font-semibold text-black">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">
                {event.date} - {event.time}
              </p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
