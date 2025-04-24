import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const AwardRecognitionSection = (): JSX.Element => {
  return (
    <Card className="w-full max-w-[1247px] mx-auto bg-[#ffb800] rounded-[45px] overflow-hidden border border-solid border-[#191a23] shadow-[0px_5px_0px_#191a23] relative">
      <CardContent className="p-0">
        <div className="flex flex-row items-center py-[55px] px-[79px] relative">
          {/* Left Content */}
          <div className="max-w-[580px] z-10">
            <h2 className="font-h-1 font-[number:var(--h-1-font-weight)] text-[#000000] text-[64px] tracking-[var(--h-1-letter-spacing)] leading-[var(--h-1-line-height)] [font-style:var(--h-1-font-style)] mb-[35px]">
              Unlock Your Future with EdueMe!
            </h2>

            <p className="[font-family:'Space_Grotesk',Helvetica] font-normal text-[#000000] text-xl tracking-[0] leading-7 max-w-[498px]">
              Discover engaging courses that fuel creativity and practical
              skills.
              <br /> Turn your ideas into reality and become a future-ready
              innovator.
              <br /> Join us today and start your journey to success!
            </p>
          </div>

          {/* Right Image */}
          <div className="absolute bottom-[-20px] right-[-60px]">
            <Image
              className="w-[500px] h-auto object-cover"
              alt="Hand holding a lightbulb"
              src="/about/hand.png"
              width={500}
              height={500}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
