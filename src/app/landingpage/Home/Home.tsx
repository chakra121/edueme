import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CallToActionSection } from "./sections/CallToActionSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection/CaseStudiesSection";
import Image from "next/image";
import { ContactFormSection } from "./sections/ContactFormSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { ProcessOverviewSection } from "./sections/ProcessOverviewSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const sectionHeaders = [
  {
    id: "services",
    badge: "Services",
    description:
      "Edueme provides educators and students with the tools to cultivate coding and problem-solving skills, enabling them to engineer their future.",
  },
  {
    id: "mission",
    badge: "Mission of Curriculum",
    description:
      "Our mission is to design a dynamic and inclusive curriculum that fosters critical thinking, innovation, and lifelong learning.",
  },
  {
    id: "curriculum",
    badge: "Curriculum Highlights",
    description:
      "Our curriculum is designed to provide an immersive and hands-on STEM learning experience, fostering creativity, critical thinking, and problem-solving skills.",
  },
  {
    id: "training",
    badge: "Inclassroom Training",
    description:
      "Meet the skilled and experienced team behind our successful digital marketing strategies.",
  },
  {
    id: "testimonials",
    badge: "Listen to our Clients",
    description:
      "Hear from Our Satisfied Learners: Read our testimonials to learn more about our transformative education programs.",
  },
  {
    id: "contact",
    badge: "Contact Us",
    description: "Connect with Us: Let's Shape Your Future.",
  },
];

const Home = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1688px] relative">
        <div className="relative w-full">
          <HeroSection />
          <Image
          height={20}
          width={488}
            className="absolute w-[488px] h-20 top-0 left-[39px] object-cover"
            alt="Image"
            src="/image-12.png"
          />
        </div>

        <div className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
              <Badge className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
                {sectionHeaders?.[0]?.badge}
              </Badge>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[580px]">
              {sectionHeaders?.[0]?.description}
            </div>
          </div>
          <ServicesSection />
        </div>

        <div className="w-full relative">
          <CallToActionSection />
          <Image
            width={70}
            height={70}
            className="absolute w-[70px] h-[70px] top-56 left-[1274px]"
            alt="Image"
            src="/image-9.png"
          />
          <Image
            width={70} 
            height={70}
            className="absolute w-[70px] h-[70px] top-[294px] left-[1110px] object-cover"
            alt="Image"
            src="/image-10.png"
          />
        </div>

        <div className="w-full">
          <CaseStudiesSection />
        </div>

        <div className="w-full">
          <ProcessOverviewSection />
        </div>

        {/* Inclassroom Training Section */}
        <div className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
              <Badge className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
                {sectionHeaders?.[3]?.badge}
              </Badge>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[580px]">
              {sectionHeaders?.[3]?.description}
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <FeaturesSection />
          <Button className="absolute bottom-[68px] right-[269px] bg-dark text-white text-xl font-normal rounded-[14px] px-[35px] py-5 [font-family:'Space_Grotesk',Helvetica]">
            Explore
          </Button>
        </div>

        <div className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
              <Badge className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
                {sectionHeaders?.[4]?.badge}
              </Badge>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[576px]">
              {sectionHeaders?.[4]?.description}
            </div>
          </div>
          <TestimonialsSection />
        </div>

        <div className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
              <Badge className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
                {sectionHeaders?.[5]?.badge}
              </Badge>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[323px]">
              {sectionHeaders?.[5]?.description}
            </div>
          </div>
          <ContactFormSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
