import React from "react";
import Link from "next/link";

interface CardProps {
  src: string;
  alt: string;
}

const TechTours: React.FC<CardProps> = ({ src, alt }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg hover:scale-105 transition-transform">
      <img src={src} alt={alt} className="w-full h-auto rounded-md" />
      <Link href="/pages/tech.tsx" className="mt-4 text-2xl font-bold hover:underline">
        {alt}
      </Link>
      <p className="mt-2 text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula.
      </p>
    </div>
  );
};

export default TechTours;
