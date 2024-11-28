import React from "react";
import Brief from "./brief";
import PriceCard from "./priceCard";
import CourseContent from "./courseContent";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Brief />
      <CourseContent />
    </div>
  );
};

export default page;
