import React from "react";
import ClassroomTech from "./components/ClassroomTech";
import Expos from "./components/Expos";
import TechTours from "./components/TechTours";

const GalleryPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-[6rem]">
      <h1 className="text-4xl font-semibold mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClassroomTech
          src="/classtech.jpg"
          alt="Classroom Tech"
        />
        <Expos
          src="/expo.png"
          alt="Expos"
        />
        <TechTours
          src="/techtour.jpg"
          alt="Tech Tours"
        />
      </div>
    </div>
  );
};

export default GalleryPage;
