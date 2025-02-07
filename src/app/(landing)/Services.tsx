import React from "react";

const AiRoboticsPage: React.FC = () => {
  const cardsData = [
    {
      id: 1,
      imageSrc: "/servic/lab_setups.jpeg",
      title: "Lab Setup",
    },
    {
      id: 2,
      imageSrc: "/servic/online_learning.jpeg",
      title: "Online Learning",
    },
    {
      id: 3,
      imageSrc: "/servic/s3.jpeg",
      title: "Curriculum",
    },
    {
      id: 4,
      imageSrc: "/servic/skilled_trinners.jpeg",
      title: "Skilled Trainers",
    },
    {
      id: 5,
      imageSrc: "/servic/classrooom.jpeg",
      title: "In-class Learning",
    },
    {
      id: 6,
      imageSrc: "/servic/tech_tours.jpeg",
  
      title: "Tech Tours",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-10">
      {/* Title Section */}
      <div className="mb-10 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Services by Edueme</h1>
        <p className="max-w-2xl text-center text-lg">
          Edueme provides educators and students with the tools to cultivate
          coding and problem-solving skills, enabling them to engineer their
          future.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-8 px-10 sm:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="card card-compact items-center w-96 h-64 bg-base-300 shadow-xl"
          >
            <figure>
              <img src={card.imageSrc} alt="Image not found" className="border-b-orange-950 border-b-2" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-base-content">
              {card.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiRoboticsPage;
