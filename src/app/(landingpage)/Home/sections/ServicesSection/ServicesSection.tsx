import { ArrowRightIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const serviceCards = [
  {
    id: 1,
    tags: ["Lab", "setup"],
    bgColor: "bg-grey",
    textColor: "text-black",
    buttonBgColor: "bg-dark",
    buttonTextColor: "text-white",
    badgeBgColor: "bg-[#ffb800]",
    image: "/services/s2.png",
    imageAlt: "Tokyo magnifier web",
  },
  {
    id: 2,
    tags: ["Online & Offline", "training"],
    bgColor: "bg-[#ffb800]",
    textColor: "text-black",
    buttonBgColor: "bg-dark",
    buttonTextColor: "text-white",
    badgeBgColor: "bg-white",
    image: "/services/s4.png",
    imageAlt: "Tokyo selecting a value",
    isBackgroundImage: true,
  },
  {
    id: 3,
    tags: ["Robotics", "Curriculum"],
    bgColor: "bg-black",
    textColor: "text-white",
    buttonBgColor: "bg-white",
    buttonTextColor: "text-black",
    badgeBgColor: "bg-white",
    image: "/services/s1.png",
    imageAlt: "Tokyo browser window",
  },
  {
    id: 4,
    tags: ["Tech Tours &", "Interschool\nCompetetions"],
    bgColor: "bg-grey",
    textColor: "text-black",
    buttonBgColor: "bg-dark",
    buttonTextColor: "text-white",
    badgeBgColor: "bg-[#ffb800]",
    image: "/services/s5.png",
    imageAlt: "Tokyo sending",
  },
  {
    id: 5,
    tags: ["Skilled", "trainers"],
    bgColor: "bg-[#ffb800]",
    textColor: "text-black",
    buttonBgColor: "bg-dark",
    buttonTextColor: "text-white",
    badgeBgColor: "bg-white",
    image: "/services/s3.png",
    imageAlt: "Tokyo many browser windows",
    isBackgroundImage: true,
  },
  {
    id: 6,
    tags: ["Tech", "Summit"],
    bgColor: "bg-black",
    textColor: "text-white",
    buttonBgColor: "bg-white",
    buttonTextColor: "text-black",
    badgeBgColor: "bg-[#ffb800]",
    image: "/services/s6.png",
    imageAlt: "Tokyo volumetric analytics",
    isBackgroundImage: true,
  },
];

export const ServicesSection = (): JSX.Element => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push("/dashboard/studentDashboard/dHome");
  };

  return (
    <section className="flex flex-col w-full gap-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-[120px]">
        {serviceCards.map((card) => (
          <Card
            key={card.id}
            className={`flex items-center justify-between p-[70px] ${card.bgColor} rounded-[50px] overflow-hidden border border-solid border-[#191a23] shadow-[0px_6px_0px_#191a23]`}
          >
            <CardContent className="p-0 flex flex-col items-start justify-between gap-8">
              <div className="flex flex-col items-start">
                {card.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    className={`px-5 py-2 mb-2 ${card.badgeBgColor} rounded-lg font-bold text-black text-lg leading-tight pointer-events-none`}
                  >
                    {tag.includes("\n")
                      ? tag.split("\n").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < tag.split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))
                      : tag}
                  </Badge>
                ))}
              </div>
              <div 
                className="flex items-center gap-4 cursor-pointer" 
                onClick={handleLearnMore}
              >
                <div
                  className="w-[50px] h-[50px] p-0 bg-[#060a08] rounded-full flex items-center justify-center"
                >
                  <ArrowRightIcon
                    className="w-6 h-6 text-white transform rotate-[-45deg]"
                  />
                </div>
                <span
                  className={`[font-family:'Space_Grotesk',Helvetica] font-medium ${card.textColor} text-lg tracking-wide leading-6`}
                >
                  Learn more
                </span>
              </div>
            </CardContent>
            {card.isBackgroundImage ? (
              <div
                className="relative w-[250px] h-[220px] bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-label={card.imageAlt}
              />
            ) : (
              <div className="relative w-[250px] h-[220px]">
                <Image
                  width={250}
                  height={220}
                  className="w-full h-full object-contain"
                  alt={card.imageAlt}
                  src={card.image}
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};