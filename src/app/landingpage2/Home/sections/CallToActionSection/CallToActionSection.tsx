import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const partnerLogos = [
  { src: "/nuroscience.jpg", alt: "Product - Neuroscience" },
  { src: "/ai_robotics.jpg", alt: "Product - AI Robotics" },
  { src: "/young_innovators.jpg", alt: "Product - Young Innovators" },
  { src: "/mech_logo.jpg", alt: "Mechatronites_Club" }
];

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="w-full px-4 py-12 md:px-6 lg:px-[100px]">
      <Card className="bg-grey relative w-full overflow-hidden rounded-[45px] border-none">
        <CardContent className="p-8 lg:p-[60px]">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            {/* Left content */}
            <div className="max-w-[500px]">
              <div className="mb-4">
                <div className="inline-block rounded-lg bg-[#ffb800] px-4 py-2 text-4xl leading-tight font-bold text-black">
                  Our Services
                </div>
              </div>
              <p className="text-base leading-relaxed text-gray-700">
                At EduMe, we provide a range of cutting-edge solutions designed
                to enhance education and streamline learning experiences for
                students, educators, and institutions.
              </p>
            </div>

            {/* Simplified Logo Grid with circular shapes */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-8">
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="relative h-[160px] w-[160px]">
                    {/* Outer border with gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 p-[2px]">
                      {/* Inner white background */}
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white p-5 shadow-lg">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={120}
                          className="rounded-full object-contain"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};