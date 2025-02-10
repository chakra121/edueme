"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const reviews = [
  {
    name: "Usha Ramaswamy",
    position: "Vice Principal",
    institution: "The Shri Ram Universal School, Hyderabad",
    review:
      "We are delighted that the CognoSpace Science curriculum for middle school enables teachers to deliver activity-based modules. The hands-on science experiments have ensured that students love their classes and look forward to them. The modules have helped to consolidate concepts while igniting curiosity among students. Thank you Team CognoSpace!",
    rating: 5,
    image: "/profile-image.avif", // Replace with actual image URL
  },
  {
    name: "Dr. Madhuri",
    position: "Professor",
    institution: "XYZ University",
    review:
      "The collaboration with EduMe has been incredible. Our students are gaining real-world skills and experience.",
    rating: 4.8,
    image: "/placeholder.jpg",
  },
  {
    name: "Prof. Anita Sharma",
    position: "Faculty",
    institution: "ABC Institute",
    review:
      "EduMe's research-driven approach is outstanding. Faculty and students benefit immensely from their programs.",
    rating: 5,
    image: "/placeholder.jpg",
  },
  {
    name: "Dean Rajesh Verma",
    position: "Dean",
    institution: "PQR College",
    review:
      "EduMe has created a space for knowledge exchange that truly benefits both educators and learners.",
    rating: 4.7,
    image: "/placeholder.jpg",
  },
  {
    name: "Principal Arjun Rao",
    position: "Principal",
    institution: "Arka International School",
    review:
      "EduMe Research Labs has transformed the way we approach education. Their resources and expertise are invaluable.",
    rating: 5,
    image: "/placeholder.jpg",
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
    <section className="bg-black py-16 flex flex-col items-center text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Listen to our Clients</h2>
      <div className="w-full max-w-3xl">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-900 shadow-lg rounded-3xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <p className="text-gray-300 text-lg italic">"{review.review}"</p>
              <div className="flex justify-center mt-4">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="mt-4 text-lg font-semibold text-yellow-400">{review.name}</p>
              <p className="text-gray-400 font-medium">{review.position}</p>
              <p className="text-gray-500">{review.institution}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewCarousel;
