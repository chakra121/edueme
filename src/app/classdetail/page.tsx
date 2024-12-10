import React from "react";

const ClassDetails: React.FC = () => {
  const classInfo = {
    title: "Robotics on fingers 101 Live Session",
    time: "2024-11-28 10:00 AM",
    description:
      "This session covers advanced calculus topics, including real-world applications. Ensure you have your materials ready.",
    meetLink: "https://meet.google.com/example-link", // Replace with actual Meet link
  };

  return (
    <div className="max-h-screen bg-gray-100 p-8 pt-28">
      {/* Class Title */}
      <h1 className="text-3xl font-bold text-gray-800">
        {classInfo.title}
      </h1>
      <p className="text-gray-600 mb-8">{classInfo.time}</p>

      {/* Class Details */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4"></h2>
        <p className="text-gray-700">{classInfo.description}</p>
      </section>

      {/* Start Class Button */}
      <div className="mt-8">
        <a
          href="https://meet.google.com/msb-ixmz-nkb"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
        >
          Start Class
        </a>
      </div>
    </div>
  );
};

export default ClassDetails;
