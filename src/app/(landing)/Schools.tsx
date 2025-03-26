
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const schoolsList = [
  { img: "/schools/logo1.png" },
  { img: "/schools/logo2.png" },
  { img: "/schools/logo3.png" },
  { img: "/schools/logo4.png" },
  { img: "/schools/logo5.png" },
  { img: "/schools/logo6.png" },
  { img: "/schools/logo7.png" },
  { img: "/schools/logo8.png" },
  { img: "/schools/logo9.png" },
  { img: "/schools/logo10.png" },
  { img: "/schools/logo11.png" },
  { img: "/schools/logo12.jpg" },
];

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <motion.figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border px-[2rem] py-[1rem]",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
      whileHover={{ scale: 1.1 }} // Slight hover effect
    >
      <img
        width="120"
        height="120"
        alt={img}
        src={img}
        className="rounded-md"
      />
    </motion.figure>
  );
};

export default function Schools() {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-base-100 px-4 py-10 lg:py-16">
      {/* Animated Heading */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }} // Starts off invisible and moves up
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-balance text-2xl font-bold text-base-content sm:text-3xl lg:text-4xl">
          Schools in Collaboration:
        </h1>
      </motion.div>

      {/* Marquee with animation */}
      <motion.div
        className="mt-8 w-full"
        initial={{ opacity: 0, x: -50 }} // Fades in from the left
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {schoolsList.map((review, index) => (
            <motion.div
              key={review.img}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }} // Starts small and faded
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </Marquee>
      </motion.div>

      {/* Gradient Fades on Left and Right */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-base-100"></div>
    </div>
  );
}
