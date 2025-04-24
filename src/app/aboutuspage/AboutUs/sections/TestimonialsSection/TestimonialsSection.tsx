import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const TestimonialsSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-dark rounded-[45px] overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="flex p-12 gap-8 items-start">
          <Image 
          width={51} 
          height={49}
          className="w-[51px] h-[49px]" alt="Vector" src="/vector.svg" />

          <div className="flex flex-col gap-6">
            <h2 className="[font-family:'Souliyo_Unicode-Regular',Helvetica] font-normal text-white text-[40px] tracking-[0] leading-[normal]">
              The Beginning
            </h2>

            <p className="[font-family:'Souliyo_Unicode-Regular',Helvetica] text-white text-xl font-normal tracking-[0] leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
