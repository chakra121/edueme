import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import EventsList from '../../components/EventsList';

// Avatar images
const avatars = ["/avatar-1.jpg", "/avatar-2.jpg", "/avatar-3.jpg"];

export default function Home() {
    const featuredEvents = [
      {
        id: 1,
        title: "Navikarana 1.0",
        date: "Apr 05, 2025",
        time: "10:00 AM - 2:00 PM",
        location: "Arka International School, Hyderabad",
        image: "/events/evenbg.jpg",
      },
    ];

    return (
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-96"
          style={{ backgroundImage: "url('/events/evenbg.jpg')" }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
          <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
            <h2 className="text-4xl font-bold">All Events</h2>
          </div>
        </section>

        {/* Featured Event */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute top-8 left-8 z-10">
                <span className="bg-[#4e6cff] text-white px-4 py-1.5 rounded-md text-sm font-medium">
                  Featured Event
                </span>
              </div>
              <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
                <img
                  src="/events/evencaro1.jpg"
                  alt="Featured Event"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col">
                  <div className="flex items-center text-white text-sm mb-1">
                    <span className="mr-2">{featuredEvents[0]?.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredEvents[0]?.time}</span>
                  </div>
                  <h2 className="text-white text-3xl font-bold mb-1">
                    {featuredEvents[0]?.title}
                  </h2>
                  <div className="flex items-center text-white text-sm mb-6">
                    <span>{featuredEvents[0]?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Listings */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <EventsList />
          </div>
        </section>
      </main>
    );
}