"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AwardRecognitionSection } from "./sections/AwardRecognitionSection";
import { CoreValueSection } from "./sections/CoreValueSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { ImpactNumbersSection } from "./sections/ImpactNumbersSection/ImpactNumbersSection";
import { IndustryRecognitionSection } from "./sections/IndustryRecognitionSection";
import { JourneyHeadingSection } from "./sections/JourneyHeadingSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";

export const AboutUs = (): JSX.Element => {
  // Impact numbers data
  const impactNumbers = [
    { value: "75+", label: "Students Enrolled" },
    { value: "100+", label: "Teachers" },
    { value: "50+", label: "Schools Registered" },
    { value: "30+", label: "Courses Offered" },
    { value: "5+", label: "Years of Experience" },
  ];

  // Awards data
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
    <div className="bg-white flex flex-col items-center w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full relative">
        <HeroSection />
        <img
          className="w-[488px] h-20 mx-auto mt-[55px] object-cover"
          alt="Logo"
          src="/about/image-12.png"
        />
      </section>

      {/* Testimonials Section */}
      <section className="w-full relative mt-8 flex justify-center">
        <TestimonialsSection />
      </section>

      {/* Industry Recognition Section */}
      <section className="w-full relative mt-8 flex justify-center">
        <IndustryRecognitionSection />
      </section>

      {/* Core Value Section */}
      <section className="w-full relative mt-8 flex justify-center">
        <CoreValueSection />
      </section>

      {/* Journey Heading Section */}
      <JourneyHeadingSection />

      {/* Impact Numbers Section */}
      <section className="w-full mt-16">
        <ImpactNumbersSection />

        <Card className="w-[1240px] h-[513px] mx-auto mt-16 bg-[#0D1B2A] rounded-[45px] overflow-hidden">
          <CardContent className="p-0 relative h-full">
            <div className="absolute w-[428px] top-[47px] right-[73px] py-4 px-6 rounded-lg">
              <p className="font-normal text-white text-[40px] tracking-[0] leading-normal font-['Souliyo_Unicode-Regular',Helvetica]">
              &quot;At EdueMe, we believe that innovation begins with curiosity,
              and every learner has the potential to change the world🚀&quot;
              </p>
            </div>
            <img
              className="absolute w-[447px] h-[465px] top-12 left-[139px] object-cover"
              alt="Global certificate"
              src="/about/globalcertificate-1.png"
            />
          </CardContent>
        </Card>
      </section>

      {/* Awards and Recognition Section */}
      <section className="w-full max-w-[1440px] mt-16 px-[100px]">
        <div className="flex justify-between items-start">
          <div className="inline-flex flex-col items-start">
            <div className="inline-flex flex-col items-start gap-2.5 px-[7px] py-0 bg-[#ffb800] rounded-[7px]">
              <h2 className="font-h-2 text-[length:var(--h-2-font-size)] leading-[var(--h-2-line-height)] tracking-[var(--h-2-letter-spacing)] text-black">
                Awards and Recognition
              </h2>
            </div>
          </div>
          <div className="w-[576px] font-p text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)]">
            Our Commitment to Excellence has been recognized by industry
            leaders. Here are some of our proudest achievements.
          </div>
        </div>

        <div className="flex justify-between mt-16">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="w-[272px] h-[433px] bg-grey rounded-[75px]"
            >
              <CardContent className="p-0 relative h-full">
                <img
                  className="w-[220px] h-[220px] mx-auto mt-3 object-cover"
                  alt={`Award ${index + 1}`}
                  src={award.image}
                />
                <h3 className="absolute w-[169px] top-[216px] left-[50%] transform -translate-x-1/2 font-m3-label-large text-black text-[length:var(--m3-label-large-font-size)] tracking-[var(--m3-label-large-letter-spacing)] leading-[var(--m3-label-large-line-height)]">
                  {award.title}
                </h3>
                <p className="w-[233px] absolute top-[253px] left-[50%] transform -translate-x-1/2 font-p text-black text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)]">
                  {award.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Award Recognition Section */}
      <AwardRecognitionSection />

      <section className="w-full relative">
        <img
          className="w-[488px] h-20 mx-auto mt-[55px] object-cover"
          alt="Logo"
          src="/about/image-12.png"
        />
      </section>

    </div>
  );
};


export default AboutUs;