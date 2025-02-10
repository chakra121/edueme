"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const reviews = [
  {
    name: "Principal",
    institution: "Arka International School",
    review: "EduMe Research Labs has transformed the way we approach education. Their resources and expertise are invaluable.",
    rating: 5,
  },
  {
    name: "Dr. Madhuri",
    institution: "XYZ University",
    review: "The collaboration with EduMe has been incredible. Our students are gaining real-world skills and experience.",
    rating: 4.8,
  },
  {
    name: "Prof. Anita Sharma",
    institution: "ABC Institute",
    review: "EduMe's research-driven approach is outstanding. Faculty and students benefit immensely from their programs.",
    rating: 5,
  },
  {
    name: "Dean Rajesh Verma",
    institution: "PQR College",
    review: "EduMe has created a space for knowledge exchange that truly benefits both educators and learners.",
    rating: 4.7,
  },
];

const ReviewCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <section className="bg-black text-white py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-10">Listen to our Clients</h2>
      <div className="w-full max-w-3xl">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="text-center px-6">
              <p className="text-xl italic">"{review.review}"</p>
              <p className="mt-4 text-lg font-semibold">- {review.name}</p>
              <p className="text-gray-400">{review.institution}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewCarousel;