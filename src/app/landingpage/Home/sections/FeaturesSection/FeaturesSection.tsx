import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Feature card data for mapping
const featureCards = [
  {
    id: 1,
    title: "Synergistic Learning",
    subtitle: "Collaborate, Connect",
    description:
      "Engage in teamwork-driven exercises to strengthen problem-solving skills.",
    imageSrc: "/prodcuts/trainbg.png",
    imageAlt: "Synergistic Learning",
  },
  {
    id: 2,
    title: "Practical Immersion",
    subtitle: "Hands-On, Minds-On",
    description:
      "Apply concepts in real-world scenarios through guided practical exercises.",
    imageSrc: "/prodcuts/picture-3.svg",
    imageAlt: "Practical Immersion",
  },
  {
    id: 3,
    title: "Accredited Excellence",
    subtitle: "Certified for Your Future",
    description:
      "Earn industry-recognized certifications that validate your expertise.",
    hasVectorImage: true,
    vectorSrc: "/prodcuts/trainbg.png",
  },
  {
    id: 4,
    title: "Accredited Excellence",
    subtitle: "Certified for Your Future",
    description:
      "Earn industry-recognized certifications that validate your expertise.",
    imageSrc: "/prodcuts/picture-3.svg",
    imageAlt: "Accredited Excellence",
  },
  {
    id: 5,
    title: "Guided Mastery",
    subtitle: "Expert-Led, Student-Centered",
    description:
      "Benefit from personalized coaching tailored to your learning needs.",
    imageSrc: "/prodcuts/trainbg.png",
    imageAlt: "Guided Mastery",
  },
  {
    id: 6,
    title: "Future-Ready Skills",
    subtitle: "Bridging Education and Industry",
    description:
      "Gain career-oriented knowledge designed to meet evolving industry demands.",
    hasVectorImage: true,
    vectorSrc: "/prodcuts/picture-3.svg",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col gap-10 w-full py-10">
      {/* First row of cards */}
      <div className="flex flex-wrap justify-center gap-10 px-[100px]">
        {featureCards.slice(0, 3).map((card) => (
          <Card
            key={card.id}
            className="w-[387px] rounded-[45px] border-[#191a23] shadow-[0px_5px_0px_#191a23] overflow-hidden"
          >
            <CardContent className="p-[35px] pt-10">
              <div className="flex flex-col gap-7">
                <div className="flex items-start">
                  <div className="flex items-end gap-5 pr-[76px] flex-1">
                    {card.hasVectorImage ? (
                      <div className="relative w-[102.82px] h-[102.82px]">
                        <div className="relative w-[103px] h-[103px]">
                          <img
                            className="absolute w-[98px] h-[98px] top-[5px] left-[5px]"
                            alt="Vector"
                            src={card.vectorSrc}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        className="w-[97.82px] h-[97.82px]"
                        alt={card.imageAlt}
                        src={card.imageSrc}
                      />
                    )}
                    <div className="relative">
                      <h4 className="font-bold text-xl text-black">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-lg text-gray-600">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="w-full h-px bg-gray-600" />

                <p className="w-full text-base text-gray-700">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second row of cards */}
      <div className="flex flex-wrap justify-center gap-10 px-[100px]">
        {featureCards.slice(3, 6).map((card) => (
          <Card
            key={card.id}
            className="w-[387px] rounded-[45px] border-[#191a23] shadow-[0px_5px_0px_#191a23] overflow-hidden"
          >
            <CardContent className="p-[35px] pt-10">
              <div className="flex flex-col gap-7">
                <div className="flex items-start">
                  <div className="flex items-end gap-5 pr-[76px] flex-1">
                    {card.hasVectorImage ? (
                      <div className="relative w-[102.82px] h-[102.82px]">
                        <div className="relative w-[103px] h-[103px]">
                          <img
                            className="absolute w-[98px] h-[98px] top-[5px] left-[5px]"
                            alt="Vector"
                            src={card.vectorSrc}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        className="w-[97.82px] h-[97.82px]"
                        alt={card.imageAlt}
                        src={card.imageSrc}
                      />
                    )}
                    <div className="relative">
                      <h4 className="font-bold text-xl text-black">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-lg text-gray-600">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="w-full h-px bg-gray-600" />

                <p className="w-full text-base text-gray-700">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
