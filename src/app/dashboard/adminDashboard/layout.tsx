import type { ReactNode } from "react";
import AdminSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="min-h-screen bg-base-content px-[4rem] pb-5 pt-[5rem]">
      <div className="card fixed w-64 bg-base-100 p-4">
        <AdminSideBar />
      </div>
      <div className="ml-64 px-4">{children}</div>
    </div>
  );
}
