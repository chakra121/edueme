"use client";
import { useState } from 'react';

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState('events');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50 z-0">
          <img
            src="/upco.jpg"
            alt="Circuit Board Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Upcoming Events</h1>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">The Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 relative h-80 w-64 overflow-hidden rounded-lg">
                <img 
                  src="/g1.jpg" 
                  alt="Event 1" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-bold">APRIL 15, 2025</p>
                  <p className="text-white">REGISTRATION FEE: ₹300</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Event 1</h3>
            </div>
            
            {/* Event 2 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 relative h-80 w-64 overflow-hidden rounded-lg">
                <img 
                  src="/g2.jpg" 
                  alt="Event 2" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-bold">APRIL 16, 2025</p>
                  <p className="text-white">REGISTRATION FEE: ₹500</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Event 2</h3>
            </div>
            
            {/* Event 3 */}
            <div className="flex flex-col items-center">
              <div className="mb-4 relative h-80 w-64 overflow-hidden rounded-lg">
                <img 
                  src="g3.jpg" 
                  alt="Event 3" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-bold">APRIL 30, 2025</p>
                  <p className="text-white">REGISTRATION FEE: ₹400</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Event 3</h3>
            </div>
          </div>
        
          
          {/* Register Button */}
          <div className="flex justify-center mt-12">
            <button className="bg-transparent hover:bg-pink-600 text-white font-semibold border border-pink-600 hover:border-transparent rounded-full py-2 px-8">
              Register Here
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}