import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="p-8 lg:p-[60px] max-w-[500px]">
              <h3 className="text-black text-[32px] font-bold tracking-tight leading-tight mb-[26px]">
                Our Products
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-[26px]">
                At EduMe, we provide a range of cutting-edge solutions designed
                to enhance education and streamline learning experiences for
                students, educators, and institutions.
              </p>
            </div>

            <div className="relative w-full lg:w-[450px] h-[450px] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[350px] h-[350px] bg-gradient-to-b from-gray-50 to-transparent rounded-full">
                  <motion.div
                    animate={{
                      y: [0, -400, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="flex flex-col gap-8 items-center"
                  >
                    {partnerLogos.map((logo, index) => (
                      <motion.div
                        key={index}
                        className="w-[160px] h-[160px] bg-white rounded-xl shadow-lg p-5 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={130}
                          height={130}
                          className="object-contain"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-full h-full border-2 border-dashed border-gray-200 rounded-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
