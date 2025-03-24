"use client"
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  isUpcoming: boolean; // Add this field
}

const categories = ["All", "Academic", "Cultural", "Sports", "Workshop", "Seminar"];

// Add this function before the EventsList component
const isUpcomingEvent = (eventDate: string): boolean => {
  const today = new Date();
  const eventDateObj = new Date(eventDate);
  return eventDateObj > today;
};

// Update the dummyEvents array with both upcoming and past events
const dummyEvents: Event[] = [
  // Upcoming Events
  {
    id: 1,
    title: "AI & Future of Education Summit",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Hub, Bangalore",
    category: "Seminar",
    image: "/events/img1.jpeg",
    isUpcoming: true
  },
  {
    id: 2,
    title: "National Science Exhibition",
    date: "Apr 30, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Science City, Mumbai",
    category: "Academic",
    image: "/events/img2.jpg",
    isUpcoming: true
  },

  // Past Events
  {
    id: 3,
    title: "Annual Sports Meet 2024",
    date: "Feb 15, 2024",
    time: "8:00 AM - 6:00 PM",
    location: "National Stadium, Delhi",
    category: "Sports",
    image: "/events/img3.jpg",
    isUpcoming: false
  },
  {
    id: 4,
    title: "Cultural Festival",
    date: "Jan 20, 2024",
    time: "5:00 PM - 9:00 PM",
    location: "Art Center, Chennai",
    category: "Cultural",
    image: "/events/img4.jpg",
    isUpcoming: false
  },
  {
    id: 5,
    title: "Coding Bootcamp",
    date: "Mar 1, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Tech Institute, Hyderabad",
    category: "Workshop",
    image: "/events/img5.jpg",
    isUpcoming: false
  }
];

const ITEMS_PER_PAGE = 5;

const EventsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState<'upcoming' | 'past'>('upcoming');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(dummyEvents);

  useEffect(() => {
    let result = dummyEvents;
    
    // Filter by upcoming/past
    result = result.filter(event => 
      eventType === 'upcoming' ? event.isUpcoming : !event.isUpcoming
    );

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(event => event.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(result);
  }, [selectedCategory, searchQuery, eventType]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        {/* Add event type toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setEventType('upcoming')}
            className={`px-6 py-2 rounded-full font-medium ${
              eventType === 'upcoming'
                ? 'bg-[#4e6cff] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setEventType('past')}
            className={`px-6 py-2 rounded-full font-medium ${
              eventType === 'past'
                ? 'bg-[#4e6cff] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Past Events
          </button>
        </div>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-medium ${
                selectedCategory === category
                  ? 'text-[#4e6cff] border-b-2 border-[#4e6cff]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 border rounded-md bg-white shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-[#4e6cff] focus:border-transparent
            placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {currentEvents.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row border rounded-md overflow-hidden shadow-sm">
            <div className="w-full md:w-48 h-48 relative">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between w-full">
              <div className="space-y-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <span>{event.date}</span>
                  <span className="mx-4">•</span>
                  <span>{event.time}</span>
                </div>
                <h3 className="text-lg font-medium">{event.title}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>{event.location}</span>
                </div>
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                  {event.category}
                </span>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                {event.isUpcoming ? (
                  <button className="bg-[#4e6cff] hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Register Now
                  </button>
                ) : (
                  <button className="bg-[#FFB800] hover:bg-orange-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Gallery
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default EventsList;