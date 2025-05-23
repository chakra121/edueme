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
    <section className="w-full py-12 px-4 md:px-6 lg:px-[100px]">
      <Card className="w-full bg-grey rounded-[45px] border-none overflow-hidden relative">
        <CardContent className="p-8 lg:p-[60px]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left content */}
            <div className="max-w-[500px]">
              <h3 className="text-black text-[32px] font-bold tracking-tight leading-tight mb-[26px]">
                Our Products
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-[26px]">
                At EduMe, we provide a range of cutting-edge solutions designed
                to enhance education and streamline learning experiences for
                students, educators, and institutions.
              </p>
            </div>

            {/* Simplified Logo Grid with circular shapes */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-8">
                {partnerLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="relative w-[160px] h-[160px]"
                  >
                    {/* Outer border with gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 p-[2px]">
                      {/* Inner white background */}
                      <div className="w-full h-full bg-white rounded-full p-5 flex items-center justify-center shadow-lg">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={120}
                          className="object-contain rounded-full"
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