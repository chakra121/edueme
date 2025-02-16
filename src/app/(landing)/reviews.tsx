
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const reviews = [
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
      "EduMe's research-driven approach is outstanding. Faculty and students benefit immensely from their programs.",
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
    <section className="bg-base-100 py-16 flex flex-col items-center text-base-content transition-all duration-500">
      <h2 className="text-4xl font-bold text-center mb-10">Listen to our Clients</h2>
      <div className="w-full text-base-content max-w-3xl">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-base-200 shadow-lg rounded-3xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-4 border-base-content shadow-md"
                />
              </div>
              <p className="text-base-content text-lg italic mb-4">"{review.review}"</p>
              <div className="flex justify-center mb-4">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="mb-1 text-lg font-semibold text-base-content">{review.name}</p>
              <p className="mb-1 text-base-content font-medium">{review.position}</p>
              <p className="mb-1 text-base-content">{review.institution}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewCarousel;
