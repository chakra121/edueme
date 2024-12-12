import ClassPage from "./class";
import ExpoPage from "./expo";
import TechPage from "./tech";

export default function Page() {
  return (
    <div className="flex flex-col gap-[2rem] pb-[4rem] pt-[5rem] lg:px-[10%]">
      <ClassPage />
      <ExpoPage />
      <TechPage />
    </div>
  );
}
