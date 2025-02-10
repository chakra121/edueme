import Hero from "./Hero";
import Features from "./Features";
import Schools from "./Schools";
import Products from "./Products";
import Services from "./Services";
import Gallery from "./Gallery";
import AnnouncementScroller from "./AnnouncementScroller";
import MOFC from "./mofc";

export default function HomePage() {
   const announcements = [
     "Welcome to Edueme!, Enhance your future with Robust Education",
   ];
  return (
    <div>
      <Hero />
      <AnnouncementScroller announcements={announcements} /> 
      <Schools />
      <Services />
      <Products />
      <MOFC/>
      <Gallery />
    </div>
  );
}
