import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const IndustryRecognitionSection = (): JSX.Element => {
  return (
    <Card className="w-full bg-dark rounded-[45px] overflow-hidden relative">
      <CardContent className="p-0">
        <div className="relative p-12">
          <Image
            width={51}
            height={49}
            className="absolute top-[10px] left-[4px] w-[51px] h-[49px]"
            alt="Vector"
            src="/about/vector.svg"
          />

          <div className="ml-[63px]">
            <h2 className="text-[40px] text-white font-normal [font-family:'Souliyo_Unicode-Regular',Helvetica] mb-8">
              Innovation and Growth
            </h2>

            <p className="text-xl text-white font-normal [font-family:'Souliyo_Unicode-Regular',Helvetica] max-w-[428px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
