import Robotics from "./Robotics";
import RoboticsAI from "./RoboticsAI";

export default function Courses() {
  return (
    <div className="flex flex-col gap-[2rem] lg:px-[20%] pb-[4rem]">
      <Robotics />
      <RoboticsAI />
    </div>
  );
}
