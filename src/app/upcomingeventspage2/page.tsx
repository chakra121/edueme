"use client";

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const roboticEvents = [
  {
    id: 1,
    title: 'Event 1',
    image: '/events/img1.jpeg',
    width: 460,
    height: 400
  },
  {
    id: 2,
    title: 'Event 2',
    image: '/events/img2.jpg',
    width: 405,
    height: 427
  },
  {
    id: 3,
    title: 'Event 3',
    image: '/events/img3.jpg',
    width: 214,
    height: 409
  },
  {
    id: 4,
    title: 'Evenr 4',
    image: '/events/img4.jpg',
    width: 135,
    height: 346
  }
];

export default function RoboticEvents() {
  const [loading, setLoading] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eventTitlesRef = useRef<Array<HTMLHeadingElement | null>>([]);

  useEffect(() => {
    // Initial loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second loading screen

    if (titleRef.current) {
      titleRef.current.style.opacity = '1';
      titleRef.current.style.transform = 'none';
    }

    if (headingRef.current) {
      headingRef.current.style.opacity = '1';
      headingRef.current.style.transform = 'none';
    }

    for (const title of eventTitlesRef.current) {
      if (title) {
        title.style.opacity = '1';
        title.style.transform = 'none';
      }
    }

    return () => clearTimeout(timer);
  }, []);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
//         <div className="text-4xl md:text-6xl font-anta font-bold mb-8 bg-gradient-to-r from-[#ff3bff] to-[#5C24FF] bg-clip-text text-transparent">
//           ACUMEN ECE
//         </div>
//         <div className="w-16 h-16 border-t-4 border-[#ff3bff] border-r-4 border-[#5C24FF] rounded-full animate-spin" />
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-black overflow-hidden text-white">
      <Navbar />

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-center h-screen flex flex-col justify-center p-5"
        style={{
          backgroundImage: "url('/events-bg.jpg')",
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <section className="sm:py-6 xs:py-8 py-12 flex flex-col justify-center">
          <div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col justify-center will-change-transform will-change-opacity">
            <div className="flex justify-center items-center flex-col relative py-8 z-10">
              <h2
                ref={titleRef}
                className="mt-[8px] font-bold text-center text-[75px] font-anta bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text drop-shadow-lg gradient-move sm:text-[90px]"
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                Technical Events
              </h2>
            </div>
          </div>
        </section>
      </div>

      {/* Events Section */}
      <div className="relative">
        <section className="sm:p-16 xs:p-8 px-6 py-12" id="explore">
          <div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col will-change-transform will-change-opacity">
            <h2
              ref={headingRef}
              className="mt-[8px] font-bold text-center text-white text-[40px]"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              The Events
            </h2>

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
                slideShadows: false,
              }}
              pagination={false}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-5xl mt-8"
            >
              {roboticEvents.map((event, index) => (
                <SwiperSlide key={event.id} className="flex justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[60vh] max-h-[400px] transition-all duration-300 hover:scale-105">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={event.width}
                      height={event.height}
                      className="w-full h-full object-contain rounded-xl pointer-events-none"
                    />
                  </div>
                  <h2
                    ref={(el) => { eventTitlesRef.current[index] = el; }}
                    className="font-bold font-anta md:text-[43px] text-white text-[22px] mt-4 text-center"
                    style={{ opacity: 0, transform: 'translateY(20px)' }}
                  >
                    {event.title}
                  </h2>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
