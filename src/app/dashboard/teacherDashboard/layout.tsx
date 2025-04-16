import type { ReactNode } from "react";
import TeacherSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="min-h-screen bg-base-content px-[4rem] pt-[5rem]">
      <div className="card fixed w-64 bg-base-100 p-4">
        <TeacherSideBar />
      </div>
      <div
        className="ml-64 h-[calc(100vh-5rem)] overflow-y-auto px-4"
        style={{ height: 'calc(100dvh - 5rem)' }}
      >
        {children}
      </div>
    </div>
  );
}
