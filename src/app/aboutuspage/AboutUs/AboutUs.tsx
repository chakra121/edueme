"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AwardRecognitionSection } from "./sections/AwardRecognitionSection";
import  ImpactSection  from "./sections/ImpactSection/ImpactSection";
import  JourneySection from "./sections/JourneySection/JourneySection";



export const AboutUs = (): JSX.Element => {

  const awards = [
    {
      image: "/about/image-18.png",
      title: "Best Learning Platform",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      image: "/about/image-19.png",
      title: "Best Learning Platform",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      image: "/about/image-removebg-preview--1--1.png",
      title: "Best Learning Platform",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      image: "/about/image-20.png",
      title: "Best Learning Platform",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
  ];

  return (
    <div className="bg-white flex pt-15 flex-col items-center w-full overflow-x-hidden">
  

      {/* Journey Section */}
      <section className="w-full mt-8 flex justify-center">
        <JourneySection />
      </section>

      {/* Core Value Section
      <section className="w-full mt-8 flex justify-center">
        <CoreValueSection />
      </section> */}

      {/* Journey Heading Section
      <JourneyHeadingSection /> */}

      {/* Impact Numbers Section */}
      <section className="w-full mt-16 px-4 sm:px-6 lg:px-8">
        <ImpactSection />

        <Card className="w-full max-w-6xl mx-auto mt-16 bg-[#0D1B2A] rounded-3xl overflow-hidden">
          <CardContent className="p-0 relative flex flex-col md:flex-row items-center md:items-start">
            <Image
              className="w-60 sm:w-80 md:w-[447px] h-auto mt-8 md:mt-12 md:ml-10 object-cover"
              alt="Global certificate"
              src="/about/globalcertificate-1.png"
              width={10}
              height={10}
            />
            <div className="px-6 py-6 md:py-10 md:pr-16 text-center md:text-left">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed">
                &quot;At EdueMe, we believe that innovation begins with curiosity,
                and every learner has the potential to change the world 🚀&quot;
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Awards and Recognition Section */}
      <section className="w-full max-w-7xl mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
          <div className="flex flex-col">
            <div className="bg-[#ffb800] px-3 py-1 rounded-md w-fit">
              <h2 className="text-black text-lg sm:text-xl font-semibold">
                Awards and Recognition
              </h2>
            </div>
          </div>
          <p className="text-black text-base sm:text-lg max-w-xl">
            Our Commitment to Excellence has been recognized by industry
            leaders. Here are some of our proudest achievements.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="w-[90%] sm:w-[280px] h-auto bg-grey rounded-[40px] flex flex-col items-center p-4"
            >
              <Image
                width={180}
                height={180}
                className="w-[180px] h-[180px] object-cover mt-2"
                alt={`Award ${index + 1}`}
                src={award.image}
              />
              <h3 className="mt-4 text-center text-black text-lg font-semibold">
                {award.title}
              </h3>
              <p className="text-sm text-black text-center mt-2">
                {award.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
        <br></br>
      {/* Award Recognition Section */}
      <AwardRecognitionSection />

      {/* Footer Logo */}
      <section className="w-full mt-10">
        <Image
          width={488}
          height={0}
          className="w-64 sm:w-80 md:w-[488px] h-auto mx-auto object-cover"
          alt="Logo"
          src="/about/image-12.png"
        />
      </section>
    </div>
  );
};

export default AboutUs;
