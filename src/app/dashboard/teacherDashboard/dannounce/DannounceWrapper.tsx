// src/app/dashboard/teacherDashboard/dannounce/DannounceWrapper.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Announcements from "./dannounce";

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key";

const DannounceWrapper = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  const userData = token
    ? (jwt.decode(token) as {
        id: string;
        name: string;
        email: string;
        role: string;
      })
    : null;

  return <Announcements userData={userData} />;
};

export default DannounceWrapper;
