import React from "react";
import Brief from "./brief";
import StickyCard from "./stickyCard";
import CourseContent from "./courseContent";

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
