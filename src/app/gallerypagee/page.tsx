import React from "react";
import Events from "./Events";
import Hero from "./Hero";

export default function Home() {
  return (
    <main className="bg-black min-h-screen overflow-hidden">
      <Hero />
      <Events />
    </main>
  );
}
