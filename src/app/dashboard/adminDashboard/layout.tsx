import { ReactNode } from "react";
import AdminSideBar from "./sideBar";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div className="px-[4rem] pt-[5rem]">
      <div className="card fixed w-64 bg-base-100 p-4">
        <AdminSideBar />
      </div>
      <main className="ml-64 mb-5 px-4 w-full">{children}</main>
    </div>
  );
}
