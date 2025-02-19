import { ReactNode } from "react";
import StudentSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}


export default function Page({ children }: PageProps) {
  return (
    <div className="bg-base-content pb-5 px-[4rem] pt-[5rem]">
      <div className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </div>
      <div className="ml-64 px-4">{children}</div>
    </div>
  );
}
