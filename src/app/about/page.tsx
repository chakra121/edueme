import React from "react";
import AboutHeader from "./AboutHeader";
import AboutStats from "./AboutStats";
import Innovators from "./Innovators";

const About = () => {
  return (
    <div className="flex flex-col items-center py-[6rem]">
      <AboutHeader />
      <AboutStats />
      <Innovators />

    </div>
  );
};

export default About;
