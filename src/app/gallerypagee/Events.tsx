"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  imageSrc: string;
  index: number;
}

const EventCard = ({ title, imageSrc, index }: EventCardProps) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className={`group relative flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-700 ease-out 
      lg:hover:flex-[3.5] lg:flex-[0.5] 
      hover:flex-[10] flex-[2]`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="absolute object-cover rounded-[24px]"
      />

      <div className="group-hover:opacity-100 opacity-0 absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
        <div className="flex justify-center items-center h-[60px] rounded-[24px] mb-[16px] bg-sky-500 hover:bg-sky-700 transition-all duration-300">
          <p className="object-contain font-normal text-[16px] leading-[20.16px] text-white uppercase">
            More Info
          </p>
        </div>
        <h2 className="mt-[24px] font-semibold sm:text-[32px] bg-slate-900 p-2 rounded-xl text-[24px] text-white">
          {title}
        </h2>
      </div>

      <h3 className="font-semibold sm:text-[26px] text-[18px] bg-slate-900 p-2 rounded-xl text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] group-hover:hidden">
        {title}
      </h3>
    </motion.div>
  );
};

const Events = () => {
  const events = [
    {
      id: 0,
      title: "Image 1",
      imageSrc: "/galldesing/g1.jpeg",
    },
    {
      id: 1,
      title: "Image 2",
      imageSrc: "/galldesing/g2.jpeg",
    },
    {
      id: 2,
      title: "Image 3",
      imageSrc: "/galldesing/g3.jpeg",
    },
    {
      id: 3,
      title: "Image 4",
      imageSrc: "/galldesing/g4.jpeg",
    },
    {
      id: 4,
      title: "Image 5",
      imageSrc: "/galldesing/g5.jpeg",
    },
  ];  

  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 h-auto" id="events">
      <div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col">
        <h2 className="mt-[8px] font-bold text-center text-white text-[40px]">
          Upgrading Education with Forward-Thinking Initiatives
        </h2>

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.title}
              imageSrc={event.imageSrc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
