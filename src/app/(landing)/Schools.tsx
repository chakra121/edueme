import Marquee from '@/components/ui/marquee'
import { cn } from "@/lib/utils";
import React from 'react'


const schoolsList = [
  {
    img: "/schools/logo1.png",
  },
  {
    img: "/schools/logo2.png",
  },
  {
    img: "/schools/logo3.png",
  },
  {
    img: "/schools/logo4.png",
  },
  {
    img: "/schools/logo5.png",
  }
];

const ReviewCard = ({
  img
}: {
  img: string;
}) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border px-[2rem] py-[1rem]",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
        <img width="100" height="100" alt={img} src={img} className='rounded-md' />
    </figure>
  );
};

export default function Schools() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="text-balance text-4xl font-bold lg:max-w-[60%] lg:text-4xl">
        <h1>Schools in Collaboration:</h1>
      </div>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {schoolsList.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3"></div>
    </div>
  );
}
