import React from "react";
import Brief from "./brief";
import CourseContent from "./courseContent";

const page = () => {
  return (
    <div className="relative">
      <div className="pt-[10%] grid grid-cols-3">
        <div></div>
        <div className="fixed top-20 z-20 rounded-lg bg-red-600 col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum nam
          neque natus iste beatae facere, enim magni. Voluptatibus labore
          provident laboriosam vel vero quidem mollitia natus. Adipisci cum
          dicta quae?
        </div>
      </div>
      <div className="relative">
        <Brief />
        <CourseContent />
      </div>
    </div>
  );
};

export default page;
