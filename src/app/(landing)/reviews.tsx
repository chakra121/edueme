import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image"; // Import Next.js Image
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

type Review = {
  name: string;
  position: string;
  institution: string;
  review: string;
  rating: number;
  image: string;
};

const reviews: Review[] = [
  {
    name: "Name of Principal",
    position: "Principal",
    institution: "Arka International School, Hyderabad",
    review:
      "We are delighted that the Edueme curriculum for middle school enables teachers to deliver activity-based modules...",
    rating: 5,
    image: "/profile-image.avif",
  },
  {
    name: "Dr. Madhuri",
    position: "Professor",
    institution: "XYZ University",
    review:
      "The collaboration with EduMe has been incredible. Our students are gaining real-world skills and experience.",
    rating: 4,
    image: "/profile-image.avif",
  },
  {
    name: "Prof. Anita Sharma",
    position: "Faculty",
    institution: "ABC Institute",
    review:
      "EduMe&apos;s research-driven approach is outstanding. Faculty and students benefit immensely from their programs.",
    rating: 3.5,
    image: "/profile-image.avif",
  },
];

const ReviewCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: "linear",
  };

  return (
    <section className="flex flex-col items-center bg-base-100 py-16 text-base-content transition-all duration-500">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Listen to our Clients
      </h2>
      <div className="w-full max-w-3xl text-base-content">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-3xl bg-base-200 p-8 text-center shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={64} // Specify width & height to optimize loading
                  height={64}
                  className="rounded-full border-4 border-base-content shadow-md"
                />
              </div>
              <p className="mb-4 text-lg italic text-base-content">
                &quot;{review.review}&quot;
              </p>
              <div className="mb-4 flex justify-center">
                {[...Array<number>(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="mb-1 text-lg font-semibold text-base-content">
                {review.name}
              </p>
              <p className="mb-1 font-medium text-base-content">
                {review.position}
              </p>
              <p className="mb-1 text-base-content">{review.institution}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewCarousel;
