"use client"
import { useState } from 'react'

const events = [
  { id: 1, title: "Navikarana 1.0", category: "Robotics", image: "/robotics-events2.jpg", description: "A showcase of cutting-edge robotics technology.", date: "2025-03-15", time: "10:00 AM", location: "Arka International School,LB Nagar" },
  { id: 2, title: "AI & Robotics Summit", category: "Robotics with AI", image: "/robotics-events1.png", description: "Exploring the fusion of AI and robotics.", date: "2025-04-10", time: "2:00 PM", location: "Takshashila Public School,Shanthi nagar" },
  { id: 3, title: "Robotics Workshop", category: "Robotics", image: "/robotics-events2.jpg", description: "Hands-on workshop on robotics basics.", date: "2025-02-20", time: "3:00 PM", location: "789 Oak St, Chicago" },
  { id: 4, title: "Autonomous Machines", category: "Robotics", image: "/robotics-events3.jpg", description: "Discover the future of autonomous machines.", date: "2025-02-20", time: "3:00 PM", location: "789 Oak St, Chicago" },
  { id: 5, title: "Future Robotics Expo", category: "Robotics", image: "/robotics-events2.jpg", description: "An expo showcasing the latest in robotics technology.", date: "2025-05-10", time: "11:00 AM", location: "Tech Park, Silicon Valley" },
  { id: 6, title: "Past Event 1", category: "Robotics", image: "/robotics-events3.jpg", description: "Description of Past Event 1.", date: "2023-01-15", time: "10:00 AM", location: "Location 1" },
  { id: 7, title: "Past Event 2", category: "Robotics with AI", image: "/robotics-events3.jpg", description: "Description of Past Event 2.", date: "2023-02-20", time: "2:00 PM", location: "Location 2" },
  { id: 8, title: "Past Event 3", category: "Robotics", image: "/robotics-events3.jpg", description: "Description of Past Event 3.", date: "2023-03-10", time: "3:00 PM", location: "Location 3" },
  { id: 9, title: "Past Event 4", category: "Robotics", image: "/robotics-events3.jpg", description: "Description of Past Event 4.", date: "2023-04-25", time: "10:00 AM", location: "Location 4" },
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
  const [filter, setFilter] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(events.find(event => event.title === "Navikarana 1.0") || null);

  const filteredEvents = filter === "All" ? events : events.filter(event => event.category === filter);
  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-white text-black">
  
      {/* Banner */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(/banner.jpg)` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">All Events</h1>
          <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300">Register Now</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex">
        {/* Sidebar */}
        <aside className="w-1/4 pr-4">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-gray-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-300 transition duration-300" onClick={() => handleEventClick(event)}>
                <h3 className="text-lg font-semibold text-black">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300">Register Now</button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <section className="w-3/4">
          {selectedEvent ? (
            <div className="bg-white shadow-md rounded-lg p-4 h-full min-h-[200px] max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-2">{selectedEvent.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{selectedEvent.date} - {selectedEvent.time}</p>
              <p className="text-sm text-gray-600 mb-2">{selectedEvent.location}</p>
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-32 object-cover rounded-md mb-4" />
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300">Register Now</button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">Select an event from the sidebar to see more details.</p>
            </div>
          )}
        </section>
      </main>

      {/* Past Events */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {pastEvents.map(event => (
            <div key={event.id} className="bg-gray-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-300 transition duration-300" onClick={() => handleEventClick(event)}>
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold text-black">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300">View Details</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}