import { ReactNode } from "react";
import AdminSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="px-[4rem] pt-[5rem] flex space-x-4">
      <div className="card w-64 bg-base-100 p-4">
      <AdminSideBar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}
