import type { ReactNode } from "react";
import StudentSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="min-h-screen bg-base-content px-[4rem] pt-[5rem]"> {/* Removed pb-5 */}
      <div className="card fixed w-64 bg-base-100 p-4">
        <StudentSideBar />
      </div>
      {/* Main content area with height calculation */}
      <div 
        className="ml-64 px-4 h-[calc(100vh-5rem)] overflow-y-auto" 
        style={{ height: 'calc(100dvh - 5rem)' }}
      >
        {children}
      </div>
    </div>
  );
}