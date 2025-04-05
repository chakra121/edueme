import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ImpactNumbersSection = (): JSX.Element => {
  // Data for the impact cards
  const impactCards = [
    {
      id: 1,
      title: "Innovation",
      description:
        "Encouraging creativity and out-of-the-box thinking to solve real-world problems",
      image: "./about/about-bg-1.png",
      hasImage: true,
      lineImage: "/about/line-3-1.svg",
    },
    {
      id: 2,
      title: "Inclusivity",
      description:
        "Creating equal opportunities for learners of all backgrounds to thrive.",
      image: "",
      hasImage: false,
      lineImage: "/about/line-3-3.svg",
    },
    {
      id: 3,
      title: "Excellence",
      description:
        "Striving for high-quality education with hands-on, impactful learning experiences.",
      image: "",
      hasImage: false,
      lineImage: "/about/line-3-3.svg",
    },
    {
      id: 4,
      title: "Growth",
      description:
        "Empowering continuous learning, curiosity, and personal development.",
      image: "/about/info1-1.png",
      hasImage: true,
      lineImage: "/about/line-3-2.svg",
    },
  ];

  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-2 gap-10 px-[100px] mb-10">
        {impactCards.slice(0, 2).map((card) => (
          <Card
            key={card.id}
            className="relative h-[331px] rounded-[45px] border-[#191a23] shadow-[0px_5px_0px_#191a23] overflow-hidden"
          >
            <CardContent className="flex flex-col h-full p-10">
              <div className="flex flex-col gap-7 w-full">
                <div className="flex items-start w-full">
                  <div className="flex items-end gap-5 pr-[76px]">
                    <div className="relative h-[26px]">
                      <div className="font-h-4 font-[number:var(--h-4-font-weight)] text-[#000000] text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] [font-style:var(--h-4-font-style)]">
                        {card.title}
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  className="w-full h-0.5 object-cover"
                  alt="Line"
                  src={card.lineImage}
                />

                <div className="w-[317px] font-p font-[number:var(--p-font-weight)] text-[#000000] text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
                  {card.description}
                </div>
              </div>

              {card.hasImage && (
                <img
                  className="absolute w-[269px] h-[190px] top-[98px] right-[35px] object-cover"
                  alt={`${card.title} background`}
                  src={card.image}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-10 px-[100px]">
        {impactCards.slice(2, 4).map((card) => (
          <Card
            key={card.id}
            className="relative h-[331px] rounded-[45px] border-[#191a23] shadow-[0px_5px_0px_#191a23] overflow-hidden"
          >
            <CardContent className="flex flex-col h-full p-10">
              <div className="flex flex-col gap-7 w-full">
                <div className="flex items-start w-full">
                  <div className="flex items-end gap-5 pr-[76px]">
                    <div className="relative h-[26px]">
                      <div className="font-h-4 font-[number:var(--h-4-font-weight)] text-[#000000] text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] [font-style:var(--h-4-font-style)]">
                        {card.title}
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  className="w-full h-0.5 object-cover"
                  alt="Line"
                  src={card.lineImage}
                />

                <div className="w-[317px] font-p font-[number:var(--p-font-weight)] text-[#000000] text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
                  {card.description}
                </div>
              </div>

              {card.hasImage && (
                <img
                  className="absolute w-[276px] h-[276px] top-[55px] right-[35px] object-cover"
                  alt={`${card.title} background`}
                  src={card.image}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
