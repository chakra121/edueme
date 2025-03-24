"use client";

export default function PageLoader({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100">
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="h-32 w-32"
      >
        <source src="/loader.webm" type="video/webm" />
      </video> */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="/logo_icon.png"
          alt="Logo"
          className="h-16 w-auto animate-bounce rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          style={{
            animationDuration: "1.7s",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        />
        <span className="loading loading-bars loading-md text-3xl "></span>
        {/* <p className="text-lg font-medium">Loading Edueme...</p> */}
      </div>
    </div>
    
  );
}