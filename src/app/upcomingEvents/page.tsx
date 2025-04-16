'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState('events');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const events = [
    {
      img: '/g1.jpg',
      title: 'Robo Soccer',
      date: 'APRIL 15, 2025',
      fee: '₹300',
    },
    {
      img: '/g2.jpg',
      title: 'Mystery Box',
      date: 'APRIL 16, 2025',
      fee: '₹500',
    },
    {
      img: '/g3.jpg',
      title: 'Fox Hunt',
      date: 'APRIL 30, 2025',
      fee: '₹400',
    },
  ];

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

      {/* Events Section with Swiper */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">The Events</h2>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="w-full max-w-5xl mx-auto"
          >
            {events.map((event, index) => (
              <SwiperSlide
                key={index}
                className="w-64 h-96 rounded-xl overflow-hidden bg-black shadow-lg"
              >
                <div className="relative h-full">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white font-bold">{event.date}</p>
                    <p className="text-white">REGISTRATION FEE: {event.fee}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mt-4">{event.title}</h3>
              </SwiperSlide>
            ))}
          </Swiper>

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
