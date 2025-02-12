"use client";
import Hero from "./Hero";
import Features from "./Features";
import Schools from "./Schools";
import Products from "./Products";
import Services from "./Services";
import Gallery from "./Gallery";
import AnnouncementScroller from "./AnnouncementScroller";
import MOFC from './Mofc';
import CH from './curriculumh';
import ICL from './Iclearning';
import Reviews from './reviews';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { useSession,signOut } from "next-auth/react";

export default function HomePage() {
  // const data = await getServerSession(authOptions);
   const announcements = [
     "Welcome to Edueme!, Enhance your future with Robust Education",
   ];

   const logouthandler = async () => {
     await signOut();
   }
   const { data } = useSession();
  return (
    <div>
      <Hero />
      {JSON.stringify(data)}
      <button onClick={logouthandler}> Logout</button> 
      <AnnouncementScroller announcements={announcements} /> 
      <Schools />
      <Services />
      <Products />
      <MOFC/>
      <CH/>
      <ICL/>
      <Reviews/>
      <Gallery />
    </div>
  );
}
