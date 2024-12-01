import Hero from "./Hero";
import Features from "./Features";
import Schools from "./Schools";
import Products from "./Products";
import Services from "./Services";
import Gallery from "./Gallery";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Schools />
      <Products />
      <Services />
      <Gallery/>
    </div>
  );
}
