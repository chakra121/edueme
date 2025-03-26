"use client";

import Image from "next/image";

export default function PageLoader({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo_icon.png"
          alt="Logo"
          width={64} // Define width explicitly
          height={64} // Define height explicitly
          priority // Ensures it's loaded quickly
          className="animate-bounce rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          style={{
            animationDuration: "1.7s",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        />
        <span className="loading loading-bars loading-md text-3xl"></span>
      </div>
    </div>
  );
}
