import React from "react";
import { Badge } from "@/components/ui/badge";

export const JourneyHeadingSection = (): JSX.Element => {
  return (
    <section className="flex w-full items-start gap-10 px-[100px] py-6">
      <div className="flex flex-col items-start">
        <Badge className="bg-[#ffb800] text-black hover:bg-[#ffb800] px-[7px] py-2.5 rounded-[7px]">
          <span className="font-h-2 font-[number:var(--h-2-font-weight)] text-[length:var(--h-2-font-size)] leading-[var(--h-2-line-height)] tracking-[var(--h-2-letter-spacing)] [font-style:var(--h-2-font-style)]">
            Core Value
          </span>
        </Badge>
      </div>

      <p className="w-[344px] font-p font-[number:var(--p-font-weight)] text-[#000000] text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)]">
        At the heart of everything we do are our core values:
      </p>
    </section>
  );
};
