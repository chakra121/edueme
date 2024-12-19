import React from "react";
import Brief from "./brief";
import CourseContent from "./courseContent";
import StickyCard from "../2_3/stickyCard";

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
