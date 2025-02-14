import React, { useEffect, useState } from "react";

const AiRoboticsPage: React.FC = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-base-100 text-base-content`}>
      <div className="mb-10 text-center px-4">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold">Services by Edueme</h1>
        <p className="max-w-2xl text-center text-lg md:text-xl">
          Edueme provides educators and students with the tools to cultivate coding and problem-solving skills, enabling them to engineer their future.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 w-full max-w-6xl">
        {[
          { id: 1, imageSrc: "/servic/lab_setups.jpeg", title: "Lab Setup" },
          { id: 2, imageSrc: "/servic/online_learning.jpeg", title: "Online Learning" },
          { id: 3, imageSrc: "/servic/s3.jpeg", title: "Curriculum" },
          { id: 4, imageSrc: "/servic/skilled_trinners.jpeg", title: "Skilled Trainers" },
          { id: 5, imageSrc: "/servic/classrooom.jpeg", title: "In-class Learning" },
          { id: 6, imageSrc: "/servic/tech_tours.jpeg", title: "Tech Tours" },
        ].map((card) => (
          <div
            key={card.id}
            className="card card-compact flex flex-col items-center w-full sm:w-80 bg-base-300 shadow-xl transition-transform transform hover:scale-105"
          >
            <figure className="w-full h-48 overflow-hidden">
              <img
                src={card.imageSrc}
                alt={card.title}
                className="w-full h-full object-cover border-b-2 border-orange-950"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-base-content text-lg font-semibold">{card.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiRoboticsPage;
