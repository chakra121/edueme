import Robotics from "./Robotics";
import RoboticsAI from "./RoboticsAI";

export default function Courses() {
  return (
    <div className="flex flex-col gap-[2rem] pb-[4rem] pt-[5rem] lg:px-[10%]">
      <Robotics />
      <RoboticsAI />
    </div>
  );
}
