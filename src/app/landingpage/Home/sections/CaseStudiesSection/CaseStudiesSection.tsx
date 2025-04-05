import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const CaseStudiesSection = (): JSX.Element => {
  // Data for case studies to enable mapping
  const caseStudies = [
    {
      emoji: "📚",
      title: "Smart Learning Hub",
      description:
        "Engaging, hands-on STEM education designed to spark curiosity and bridge the gap between theory and real-world application.",
      linkColor: "text-[#B9FF66]", // Green color for 1st card
      iconSrc: "/prodcuts/icon.png",
    },
    {
      emoji: "🔬",
      title: "Experiential STEM Workshops",
      description:
        "Interactive workshops that inspire innovation, critical thinking, and problem-solving through real-world STEM challenges.",
      linkColor: "text-[#61dafb]", // Blue color for 2nd card
      iconSrc: "/prodcuts/icon-1.png",
    },
    {
      emoji: "🚀",
      title: "Future-Ready Skills",
      description:
        "Empowering students with practical skills in Science, Technology, Engineering, and Mathematics to thrive in a rapidly evolving world.",
      linkColor: "text-[#B9FF66]", // Green color for 3rd card
      iconSrc: "/prodcuts/icon.png",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-[100px]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
          Mission of Curriculum
        </div>
        <p className="text-lg text-black leading-relaxed md:w-[60%]">
          Our mission is to design a dynamic and inclusive curriculum that
          fosters critical thinking, innovation, and lifelong learning.
        </p>
      </div>

      {/* Case Studies */}
      <Card className="bg-[#1e1e1e] rounded-[45px] border-none">
        <CardContent className="flex flex-col md:flex-row justify-between p-[60px] gap-8 md:gap-16">
          {caseStudies.map((study, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col gap-5">
                {/* Title and Description */}
                <div className="w-full md:w-[286px] font-p font-[number:var(--p-font-weight)] text-white text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
                  {study.emoji} {study.title}
                  <br />
                  {study.description}
                </div>

                {/* Learn More Section */}
                <div className="flex items-center gap-[15px]">
                  <div
                    className={`font-['Space_Grotesk',Helvetica] font-normal ${study.linkColor} text-xl tracking-[0] leading-7 whitespace-nowrap`}
                  >
                    Learn more
                  </div>

                  {/* Icon */}
                  <Image
                    width={20}
                    height={20}
                    className="w-[20.32px] h-[19.53px]"
                    alt="Icon"
                    src={study.iconSrc}
                  />
                </div>
              </div>

              {/* Separator */}
              {index < caseStudies.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="h-[186px] bg-white/20"
                />
              )}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
