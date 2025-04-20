import React from "react";
import Events from "./components/Events";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="mt-16 min-h-screen overflow-hidden">
      <Hero />
      <div className="relative z-10 -mt-20 rounded-t-4xl bg-white">
        <Events />
      </div>
    </main>
  );
}
