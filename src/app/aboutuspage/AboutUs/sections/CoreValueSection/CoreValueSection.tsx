import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const CoreValueSection = (): JSX.Element => {
  return (
    <Card className="bg-dark rounded-[45px] overflow-hidden w-full max-w-[563px]">
      <CardContent className="p-12 relative">
        <Image
          width={51}
          height={49}
          className="w-[51px] h-[49px] absolute top-[39px] left-12"
          alt="Vector"
          src="/about/vector.svg"
        />

        <div className="ml-[66px]">
          <h2 className="text-white text-[40px] font-normal [font-family:'Souliyo_Unicode-Regular',Helvetica] mb-5">
            Leading the Future
          </h2>

          <p className="text-white text-xl font-normal [font-family:'Souliyo_Unicode-Regular',Helvetica]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
