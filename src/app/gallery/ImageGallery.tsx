import React from "react";
import Image from "next/image"; // Import Next.js Image component

interface ImageGalleryProps {
  links: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ links }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {links.map((link, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src={link}
            alt={`Image ${index + 1}`}
            width={400} // Set appropriate width
            height={300} // Set appropriate height
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
