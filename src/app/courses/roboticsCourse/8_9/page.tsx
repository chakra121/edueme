import React from "react";
import Brief from "./brief";
import CourseContent from "./courseContent";
import StickyCard from "./stickyCard";

const page = () => {
  return (
    <div>
        <Brief />
        <CourseContent />
        <StickyCard />
    </div>
  );
};

export default page;
